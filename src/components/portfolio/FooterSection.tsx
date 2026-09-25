'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Editorial Footer Section
 * 
 * Strictly contains ONLY:
 * - HAMAIL
 * - WEBSITE DEVELOPMENT
 * - SHOPIFY DEVELOPMENT
 * - ©2026
 * - WhatsApp
 * 
 * No giant sitemap, no fake social links.
 */
export function FooterSection() {
  const whatsappUrl =
    'https://wa.me/923053764646?text=' +
    encodeURIComponent('Hi Hamail, I visited your portfolio and would like to discuss a project.');

  return (
    <footer
      aria-label="Footer"
      className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-12 sm:py-16 md:py-20 bg-[#0A0A0A] text-[#FAF7F3]"
    >
      <div className="w-full max-w-[1720px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-10">
        {/* Brand */}
        <div>
          <span className="font-bold tracking-[-0.04em] text-xl sm:text-2xl text-[#FAF7F3]">
            HAMAIL
          </span>
        </div>

        {/* Services Navigation */}
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-10">
          <Link
            href="/websites"
            className="text-xs sm:text-sm font-medium tracking-[0.18em] text-[#FAF7F3]/50 hover:text-[#FAF7F3] uppercase transition-colors duration-200"
          >
            WEBSITE DEVELOPMENT
          </Link>
          <Link
            href="/shopify"
            className="text-xs sm:text-sm font-medium tracking-[0.18em] text-[#FAF7F3]/50 hover:text-[#FAF7F3] uppercase transition-colors duration-200"
          >
            SHOPIFY DEVELOPMENT
          </Link>
        </nav>

        {/* Metadata & WhatsApp Link */}
        <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#FAF7F3]/40">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FAF7F3] transition-colors duration-200"
          >
            WhatsApp
          </a>
          <span>©2026</span>
        </div>
      </div>
    </footer>
  );
}
