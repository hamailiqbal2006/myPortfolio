'use client';

import React from 'react';
import { useNavigation } from '@/hooks/useNavigation';

const PRICING_TIERS = [
  { service: 'Websites', price: 'From PKR 60,000', note: 'Custom responsive design, up to 5 pages, WhatsApp & SEO setup' },
  { service: 'Shopify Starter', price: 'PKR 40,000', note: 'Complete store setup, free theme customization, 2 revision rounds' },
  { service: 'Shopify Premium', price: 'PKR 90,000', note: 'Premium theme included, advanced custom sections, 10 revision rounds' },
] as const;

/**
 * Section 06 — PRICING
 * Clean editorial overview (no cheap SaaS tables).
 * Centered around progress = 5.0 (range 4.5 to 5.5).
 */
export function PricingSection() {
  const { progress, goToSection } = useNavigation();

  // Opacity window around index 5 (progress ~ 5.0)
  const dist = Math.abs(progress - 5.0);
  const opacity = dist >= 0.5 ? 0 : Math.max(0, 1 - dist / 0.45);
  const translateY = (progress - 5.0) * -35;
  const isInteractive = dist < 0.35;

  return (
    <section
      aria-label="Pricing section"
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
              06 · Investment
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.08] tracking-[-0.03em] text-[#f8fafc]">
            PRICING OVERVIEW
          </h2>

          {/* Editorial Pricing List */}
          <div className="mt-5 sm:mt-7 border-t border-white/[0.08] divide-y divide-white/[0.06]">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.service}
                className="py-3 sm:py-3.5 flex flex-col xs:flex-row xs:items-baseline justify-between gap-1 xs:gap-4"
              >
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-white/90">
                    {tier.service}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-white/50 font-light">
                    {tier.note}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-mono tracking-[0.14em] text-white/95 uppercase font-medium shrink-0">
                  {tier.price}
                </span>
              </div>
            ))}
          </div>

          {/* Scope Disclaimer */}
          <div className="mt-5 pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.14em] text-white/40 uppercase max-w-md">
              Every project is scoped according to its requirements. Advanced functionality and third-party costs may affect final pricing.
            </p>

            <button
              type="button"
              onClick={() => goToSection(6)}
              className="px-6 py-2.5 rounded-full bg-white text-[#070707] font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/90 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-black/30 shrink-0 self-start sm:self-auto"
            >
              Discuss a Project →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
