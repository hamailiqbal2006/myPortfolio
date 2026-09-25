'use client';

/**
 * @component: SmoothTab
 * @origin: Kokonut UI (@kokonutui/smooth-tab)
 * @description: Animated tab switcher restyled completely for the portfolio editorial aesthetic.
 * Features a refined sliding active indicator, restrained motion transitions, and clean typography.
 */

import React, { useRef, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface SmoothTabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface SmoothTabProps {
  items: SmoothTabItem[];
  defaultTabId?: string;
  selectedTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  tabListClassName?: string;
  tabButtonClassName?: string;
  indicatorClassName?: string;
}

const contentVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 10 : -10,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? 10 : -10,
  }),
};

const transition = {
  duration: 0.35,
  ease: [0.25, 1, 0.5, 1] as const,
};

export default function SmoothTab({
  items,
  defaultTabId,
  selectedTabId,
  onChange,
  className,
  tabListClassName,
  tabButtonClassName,
  indicatorClassName,
}: SmoothTabProps) {
  const initialTab = selectedTabId ?? defaultTabId ?? items[0]?.id ?? '';
  const [selected, setSelected] = useState<string>(initialTab);
  const [direction, setDirection] = useState<number>(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, isReady: false });

  const currentTab = selectedTabId !== undefined ? selectedTabId : selected;

  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeBtn = buttonRefs.current.get(currentTab);
      const listEl = listRef.current;
      if (activeBtn && listEl) {
        const btnRect = activeBtn.getBoundingClientRect();
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: btnRect.width,
          isReady: true,
        });
      }
    };

    updateIndicator();
    const frame = requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [currentTab]);

  const handleSelect = (tabId: string) => {
    const prevIndex = items.findIndex((item) => item.id === currentTab);
    const nextIndex = items.findIndex((item) => item.id === tabId);
    setDirection(nextIndex > prevIndex ? 1 : -1);

    if (selectedTabId === undefined) {
      setSelected(tabId);
    }
    onChange?.(tabId);
  };

  const activeItem = items.find((item) => item.id === currentTab) ?? items[0];

  return (
    <div className={cn('w-full flex flex-col', className)}>
      {/* Top Thin Horizontal Tab List */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Business types"
        className={cn(
          'relative flex items-center border-b border-[#f2f0ea]/15 overflow-x-auto no-scrollbar py-1 gap-1 sm:gap-4 select-none',
          tabListClassName
        )}
      >
        {/* Sliding Indicator (Underline style, stone aesthetic) */}
        {indicatorStyle.isReady && (
          <motion.div
            className={cn(
              'absolute bottom-0 h-[2px] bg-[#dcd9d0] pointer-events-none rounded-full',
              indicatorClassName
            )}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 38,
            }}
          />
        )}

        {items.map((item) => {
          const isSelected = item.id === currentTab;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`tab-${item.id}`}
              aria-controls={`panel-${item.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              ref={(el) => {
                if (el) buttonRefs.current.set(item.id, el);
                else buttonRefs.current.delete(item.id);
              }}
              onClick={() => handleSelect(item.id)}
              className={cn(
                'relative py-3.5 px-3 sm:px-5 font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.16em] uppercase whitespace-nowrap transition-colors duration-250 cursor-pointer outline-none focus-visible:text-[#FAF7F3]',
                isSelected
                  ? 'text-[#FAF7F3] font-semibold'
                  : 'text-[#FAF7F3]/45 hover:text-[#FAF7F3]/80 font-normal',
                tabButtonClassName
              )}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel with Restrained Motion Transition */}
      <div className="relative mt-8 sm:mt-12 w-full min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentTab}
            role="tabpanel"
            id={`panel-${currentTab}`}
            aria-labelledby={`tab-${currentTab}`}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="w-full"
          >
            {activeItem?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
