'use client';

import React from 'react';
import Link from 'next/link';
import { useResponsiveDevice } from '@/hooks/useResponsiveDevice';
import { progressController } from '@/animation/progressController';

/**
 * Minimal luxury editorial header:
 * - Desktop:
 *   Left: HAMAIL
 *   Right: SERVICES, CONTACT
 * - Mobile:
 *   Left: HAMAIL
 *   Right: CONTACT
 * 
 * Clean, minimal, zero glass pills, zero bulky background bars, zero borders.
 */
export function BrandHeader() {
  const { isMobile } = useResponsiveDevice();

  const handleServicesClick = () => {
    // Smoothly hints scroll progress for future storytelling
    progressController.animateTo(1.0, 1.2);
  };

  const handleHomeClick = () => {
    progressController.animateTo(0.0, 0.8);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 pt-7 pb-4 sm:px-10 md:px-14 md:pt-9 pointer-events-none select-none">
      {/* Brand Identity */}
      <button
        type="button"
        onClick={handleHomeClick}
        aria-label="Hamail Portfolio Home"
        className="pointer-events-auto group flex items-baseline cursor-pointer focus:outline-none"
      >
        <span className="text-sm sm:text-base md:text-lg font-medium tracking-[0.28em] text-[#f8fafc] uppercase transition-opacity duration-200 group-hover:opacity-75">
          HAMAIL
        </span>
      </button>

      {/* Minimal Navigation */}
      <nav aria-label="Main navigation" className="pointer-events-auto flex items-center gap-6 sm:gap-8">
        {!isMobile && (
          <button
            type="button"
            onClick={handleServicesClick}
            className="text-xs font-mono tracking-[0.24em] uppercase text-white/55 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
          >
            SERVICES
          </button>
        )}
        <Link
          href="/contact"
          className="text-xs font-mono tracking-[0.24em] uppercase text-white/55 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
        >
          CONTACT
        </Link>
      </nav>
    </header>
  );
}
