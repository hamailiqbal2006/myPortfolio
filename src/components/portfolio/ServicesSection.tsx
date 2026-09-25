'use client';

import React from 'react';
import Link from 'next/link';

interface ServiceData {
  readonly id: string;
  readonly title: string;
  readonly descriptor: string;
  readonly href: string;
}

const SERVICES: readonly ServiceData[] = [
  {
    id: '01',
    title: 'WEBSITE DEVELOPMENT',
    descriptor: 'Custom business websites and digital experiences.',
    href: '/websites',
  },
  {
    id: '02',
    title: 'SHOPIFY STORE DEVELOPMENT',
    descriptor: 'Professional storefronts built around your products and brand.',
    href: '/shopify',
  },
];

/**
 * Editorial Services Section
 * 
 * Large editorial rows (NO cards).
 * Exactly two services:
 * 01 WEBSITE DEVELOPMENT -> /websites
 * 02 SHOPIFY STORE DEVELOPMENT -> /shopify
 * 
 * Hover interactions:
 * - Text translation & brightened tone
 * - Minimal arrow movement
 * - Divider line subtlety
 */
export function ServicesSection() {
  return (
    <section
      aria-label="Services"
      className="relative w-full px-6 sm:px-10 md:px-14 lg:px-20 py-24 sm:py-32 md:py-44 bg-[#0A0A0A] text-[#FAF7F3] border-b border-[#FAF7F3]/10"
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <span className="font-mono text-xs sm:text-sm tracking-[0.26em] text-[#FAF7F3]/40 uppercase">
            SERVICES
          </span>
        </div>

        {/* Large Editorial Rows */}
        <div className="w-full flex flex-col border-t border-[#FAF7F3]/10">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative w-full block border-b border-[#FAF7F3]/10 py-8 sm:py-10 md:py-12 lg:py-14 transition-colors duration-300 hover:border-[#FAF7F3]/30 focus:outline-none"
            >
              <div className="w-full flex items-start justify-between gap-6 sm:gap-10">
                {/* Left: Index + Title + Descriptor */}
                <div className="flex items-start gap-4 sm:gap-8 md:gap-12 flex-1">
                  {/* Small Index Number */}
                  <span className="font-mono text-xs sm:text-sm md:text-base tracking-[0.16em] text-[#FAF7F3]/35 group-hover:text-[#FAF7F3] transition-colors duration-300 pt-1.5 sm:pt-2">
                    {service.id}
                  </span>

                  {/* Service Title & Descriptor */}
                  <div className="flex-1 transition-transform duration-300 ease-out group-hover:translate-x-2 sm:group-hover:translate-x-3">
                    <h3 className="font-bold tracking-[-0.04em] text-[#FAF7F3]/70 group-hover:text-[#FAF7F3] transition-colors duration-300 text-[clamp(28px,4.5vw,76px)] leading-[1.05]">
                      {service.title}
                    </h3>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#FAF7F3]/45 group-hover:text-[#FAF7F3]/75 transition-colors duration-300 font-normal leading-relaxed max-w-xl">
                      {service.descriptor}
                    </p>
                  </div>
                </div>

                {/* Right: Minimal Arrow */}
                <div
                  aria-hidden="true"
                  className="flex-shrink-0 text-xl sm:text-2xl md:text-4xl text-[#FAF7F3]/25 group-hover:text-[#FAF7F3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 font-light pt-1.5 sm:pt-2 pr-1"
                >
                  ↗
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
