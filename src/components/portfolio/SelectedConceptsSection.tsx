'use client';

import React from 'react';

/**
 * Selected Concepts Section (Architecture Only)
 * 
 * Strictly preserves authenticity:
 * - NO fake clients, fake case studies, or mockups.
 * - Understated message: SELECTED CONCEPTS / COMING SOON
 * - Architectural framework ready for future concepts across:
 *   Website concepts, Shopify concepts.
 */
export function SelectedConceptsSection() {
  return (
    <section
      aria-label="Selected Concepts"
      className="relative w-full px-6 sm:px-10 md:px-14 lg:px-20 py-24 sm:py-32 md:py-44 bg-[#0A0A0A] text-[#FAF7F3] border-b border-[#FAF7F3]/10"
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 md:mb-28">
          <span className="font-mono text-xs sm:text-sm tracking-[0.26em] text-[#FAF7F3]/40 uppercase">
            SELECTED CONCEPTS
          </span>
        </div>

        {/* Understated Editorial Statement */}
        <div className="py-12 sm:py-20 md:py-28 flex flex-col items-start max-w-4xl">
          <h2 className="text-[clamp(32px,5.5vw,92px)] font-bold tracking-[-0.04em] leading-[1.0] text-[#FAF7F3]/30 uppercase">
            COMING SOON
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#FAF7F3]/40 max-w-lg font-normal leading-relaxed">
            Curated concept directions across websites and Shopify stores in active production.
          </p>
        </div>

        {/* Architectural Stream Grid (Future Framework) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-8 sm:pt-12 border-t border-[#FAF7F3]/10">
          <div className="py-4">
            <span className="font-mono text-xs tracking-[0.2em] text-[#FAF7F3]/30 uppercase block">
              01 / WEBSITES
            </span>
            <p className="mt-2 text-xs text-[#FAF7F3]/20 font-mono tracking-wider">
              IN PREPARATION
            </p>
          </div>
          <div className="py-4">
            <span className="font-mono text-xs tracking-[0.2em] text-[#FAF7F3]/30 uppercase block">
              02 / SHOPIFY
            </span>
            <p className="mt-2 text-xs text-[#FAF7F3]/20 font-mono tracking-wider">
              IN PREPARATION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
