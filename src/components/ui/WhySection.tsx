'use client';

import React from 'react';
import { useNavigation } from '@/hooks/useNavigation';

const PILLARS = [
  {
    title: 'CUSTOM',
    description: 'Not locked to generic templates.',
  },
  {
    title: 'FAST ITERATION',
    description: 'Modern AI-assisted development allows ideas to move from concept to working product faster.',
  },
  {
    title: 'BUILT AROUND YOUR BUSINESS',
    description: 'Features and experiences are designed according to what the business actually needs.',
  },
] as const;

/**
 * Section 05 — WHY WORK WITH ME (BUILT DIFFERENTLY.)
 * Centered around progress = 4.0 (range 3.5 to 4.5).
 * Kept strictly to the 3 required points.
 */
export function WhySection() {
  const { progress } = useNavigation();

  // Opacity window around index 4 (progress ~ 4.0)
  const dist = Math.abs(progress - 4.0);
  const opacity = dist >= 0.5 ? 0 : Math.max(0, 1 - dist / 0.45);
  const translateY = (progress - 4.0) * -35;
  const isInteractive = dist < 0.35;

  return (
    <section
      aria-label="Why work with me section"
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
              05 · Philosophy
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.08] tracking-[-0.03em] text-[#f8fafc]">
            BUILT DIFFERENTLY.
          </h2>

          {/* Exactly Three Pillars */}
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="p-4 sm:p-5 rounded-xl border border-white/[0.07] bg-white/[0.02]"
              >
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-white font-medium uppercase mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
