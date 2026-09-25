'use client';

import React from 'react';
import { useNavigation } from '@/hooks/useNavigation';

const APP_CAPABILITIES = [
  'Mobile Applications',
  'Desktop Software',
  'Web Applications',
  'Business Dashboards',
  'Admin Panels',
  'Internal Business Tools',
  'Ordering Systems',
  'Inventory Systems',
  'Booking Systems',
  'Customer Portals',
] as const;

interface AppsSectionProps {
  onOpenShowcase: () => void;
}

/**
 * Section 04 — APPS & SOFTWARE
 * Centered around progress = 3.0 (range 2.5 to 3.5).
 */
export function AppsSection({ onOpenShowcase }: AppsSectionProps) {
  const { progress } = useNavigation();

  // Opacity window around index 3 (progress ~ 3.0)
  const dist = Math.abs(progress - 3.0);
  const opacity = dist >= 0.5 ? 0 : Math.max(0, 1 - dist / 0.45);
  const translateY = (progress - 3.0) * -35;
  const isInteractive = dist < 0.35;

  return (
    <section
      aria-label="Applications section"
      className="fixed inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 md:px-14 pointer-events-none select-none"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: isInteractive ? 'auto' : 'none',
        visibility: opacity <= 0.001 ? 'hidden' : 'visible',
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center max-h-[88vh] overflow-y-auto pt-16 sm:pt-20 md:pt-0">
        <div className="w-full max-w-xl lg:max-w-2xl text-left">
          {/* Section Number & Eyebrow */}
          <div className="mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] text-white/45 uppercase">
              04 · Software & Systems
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.08] tracking-[-0.03em] text-[#f8fafc]">
            APPS & SOFTWARE
          </h2>

          {/* Supporting Sentence */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-white/65 font-light leading-relaxed max-w-lg">
            Custom applications built around your idea or business workflow.
          </p>

          {/* 10 Capabilities Grid */}
          <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.08]">
            <h3 className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-white/40 uppercase mb-3">
              Application Types
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {APP_CAPABILITIES.map((cap) => (
                <div key={cap} className="flex items-center gap-2.5 text-[11px] sm:text-xs text-white/80 font-light">
                  <span className="w-1 h-1 rounded-full bg-white/35 shrink-0" />
                  <span className="truncate">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Note & CTA */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.16em] text-white/45 uppercase max-w-sm">
              Final pricing depends on functionality, platforms, integrations and project scope.
            </p>

            <button
              type="button"
              onClick={onOpenShowcase}
              className="px-6 py-3 rounded-full bg-white text-[#070707] font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/90 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-black/30 shrink-0 self-start sm:self-auto"
            >
              Explore Application Designs →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
