'use client';

import React from 'react';

/**
 * Editorial Introduction Section
 * 
 * Content strictly adheres to prompt:
 * - Heading: HEY.
 * - Short intro:
 *   "I build websites and Shopify stores for businesses that want a stronger digital presence."
 * - Supporting sentence:
 *   "From visual design to development, each project is built around the business, its customers and how the product will actually be used."
 * 
 * Asymmetric editorial grid with generous whitespace and disciplined typography hierarchy.
 */
export function IntroSection() {
  return (
    <section
      aria-label="About"
      className="relative w-full px-6 sm:px-10 md:px-14 lg:px-20 py-24 sm:py-32 md:py-44 bg-[#0A0A0A] text-[#FAF7F3] border-b border-[#FAF7F3]/10"
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* Asymmetric 12-column editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-start">
          {/* Left Column: Bold Statement Heading */}
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(56px,8vw,120px)] font-bold tracking-[-0.045em] leading-none text-[#FAF7F3]">
              HEY.
            </h2>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-8 flex flex-col space-y-8 sm:space-y-12">
            {/* Primary Intro Statement */}
            <p className="text-[clamp(24px,3.4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-[#FAF7F3]">
              I build websites and Shopify stores for businesses that want a stronger digital presence.
            </p>

            {/* Supporting Sentence */}
            <p className="text-[clamp(16px,1.8vw,24px)] font-normal leading-[1.55] tracking-[-0.015em] text-[#FAF7F3]/60 max-w-2xl">
              From visual design to development, each project is built around the business, its customers and how the product will actually be used.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
