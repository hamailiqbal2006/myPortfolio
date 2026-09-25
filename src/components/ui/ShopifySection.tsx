'use client';

import React from 'react';
import { useNavigation } from '@/hooks/useNavigation';

interface ShopifySectionProps {
  onOpenShowcase: () => void;
}

/**
 * Section 03 — SHOPIFY STORES
 * Centered around progress = 2.0 (range 1.5 to 2.5).
 * On desktop, positioned on the right side to balance the 3D character who glides to the left side.
 */
export function ShopifySection({ onOpenShowcase }: ShopifySectionProps) {
  const { progress } = useNavigation();

  // Opacity window around index 2 (progress ~ 2.0)
  const dist = Math.abs(progress - 2.0);
  const opacity = dist >= 0.5 ? 0 : Math.max(0, 1 - dist / 0.45);
  const translateY = (progress - 2.0) * -35;
  const isInteractive = dist < 0.35;

  return (
    <section
      aria-label="Shopify section"
      className="fixed inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 md:px-14 pointer-events-none select-none"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: isInteractive ? 'auto' : 'none',
        visibility: opacity <= 0.001 ? 'hidden' : 'visible',
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center max-h-[88vh] overflow-y-auto pt-16 sm:pt-20 md:pt-0">
        {/* Desktop: Right-aligned column; Mobile: full width */}
        <div className="w-full max-w-xl lg:max-w-2xl lg:ml-auto text-left">
          {/* Section Number & Eyebrow */}
          <div className="mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] text-white/45 uppercase">
              03 · E-Commerce
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.08] tracking-[-0.03em] text-[#f8fafc]">
            SHOPIFY STORES
          </h2>

          {/* Supporting Sentence */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-white/65 font-light leading-relaxed max-w-lg">
            Professional Shopify storefronts designed around your brand and products.
          </p>

          {/* Two Packages Only */}
          <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Package 1: Shopify Starter */}
            <div className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-sm sm:text-base font-medium text-white/90">
                    Shopify Starter
                  </h3>
                  <span className="text-xs font-mono tracking-[0.15em] text-white/80 uppercase font-medium">
                    PKR 40,000
                  </span>
                </div>
                <p className="text-[11px] text-white/60 font-light leading-relaxed">
                  Complete store setup, free theme customization, product & collection setup, cart, mobile optimization, payment & shipping setup.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/[0.05] text-[10px] font-mono text-white/50 space-y-1">
                  <p>• 2 revision rounds</p>
                  <p className="text-white/40">• Premium paid theme is not included</p>
                </div>
              </div>
            </div>

            {/* Package 2: Shopify Premium */}
            <div className="p-4 rounded-xl border border-white/15 bg-white/[0.04] flex flex-col justify-between shadow-lg shadow-black/20">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-sm sm:text-base font-medium text-white">
                    Shopify Premium
                  </h3>
                  <span className="text-xs font-mono tracking-[0.15em] text-white uppercase font-medium">
                    PKR 90,000
                  </span>
                </div>
                <p className="text-[11px] text-white/70 font-light leading-relaxed">
                  Complete store setup, premium theme included, advanced custom sections, refined product/collection layouts, stronger brand styling.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/[0.08] text-[10px] font-mono text-white/60 space-y-1">
                  <p className="text-white/80">• 10 revision rounds</p>
                  <p>• Premium theme included from approved selection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Policy Conditions */}
          <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.12em] text-white/45">
            <p>
              * Premium theme included from an approved theme selection. Any theme outside the included allowance/selection may require the client to cover the additional theme cost.
            </p>
            <p>
              * A revision round means one consolidated set of reasonable design/content changes. New functionality or major scope changes are not considered revisions.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-5 pt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={onOpenShowcase}
              className="px-6 py-3 rounded-full bg-white text-[#070707] font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/90 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-black/30"
            >
              Explore Shopify Designs →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
