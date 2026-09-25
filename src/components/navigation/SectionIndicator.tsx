'use client';

import React from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { TOTAL_SECTIONS } from '@/data/sections';

/**
 * Minimal, unobtrusive editorial section number indicator.
 * Displays current section status (e.g. 01 / 07) discreetly.
 */
export function SectionIndicator() {
  const { state } = useNavigation();

  const currentNum = state.currentIndex + 1;
  const formattedNum = currentNum < 10 ? `0${currentNum}` : `${currentNum}`;
  const totalNum = TOTAL_SECTIONS < 10 ? `0${TOTAL_SECTIONS}` : `${TOTAL_SECTIONS}`;

  return (
    <aside
      aria-label="Current section status"
      className="fixed bottom-8 left-6 sm:left-10 md:left-14 z-30 pointer-events-none select-none flex items-center gap-3 text-xs font-mono"
    >
      <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.24em] text-white/40">
        <span className="text-white/90 font-medium">{formattedNum}</span>
        <span className="text-white/20">/</span>
        <span className="text-white/35">{totalNum}</span>
      </div>
    </aside>
  );
}
