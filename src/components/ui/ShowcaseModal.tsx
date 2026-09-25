'use client';

import React, { useEffect } from 'react';
import { ShowcaseConfig } from '@/data/showcases';

interface ShowcaseModalProps {
  showcase: ShowcaseConfig | null;
  onClose: () => void;
}

/**
 * Clean editorial showcase modal displaying service category architectures.
 * Opens when the visitor clicks "EXPLORE ... DESIGNS" from the respective service section.
 * Prepares the category layout for future real concepts without inventing fake proof.
 */
export function ShowcaseModal({ showcase, onClose }: ShowcaseModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (showcase) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showcase, onClose]);

  if (!showcase) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="showcase-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 md:p-14 bg-[#070707]/95 backdrop-blur-xl animate-fade-in"
    >
      <div className="w-full max-w-5xl max-h-[90vh] flex flex-col justify-between overflow-y-auto bg-[#0d0f14] border border-white/[0.08] rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-white/40 uppercase block mb-2">
              Design Architecture & Showcase
            </span>
            <h2 id="showcase-title" className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-[-0.03em] text-[#f8fafc]">
              {showcase.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-2 max-w-xl">
              {showcase.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close showcase"
            className="px-4 py-2 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/[0.06] text-[10px] sm:text-xs font-mono tracking-[0.2em] text-white uppercase transition-all duration-200 cursor-pointer shrink-0 ml-4"
          >
            Close ✕
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-8">
          {showcase.categories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 sm:p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-sm sm:text-base font-medium text-white/90">
                    {cat.name}
                  </h3>
                  <span className="text-[9px] font-mono tracking-[0.18em] text-white/40 uppercase border border-white/10 px-2 py-0.5 rounded">
                    Category
                  </span>
                </div>
                <p className="text-xs text-white/55 font-light leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-[0.2em] text-white/35 uppercase">
                  Architecture Ready
                </span>
                <span className="text-[10px] text-white/40 font-mono">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-white/40 uppercase">
            Design concepts are developed specifically per client engagement.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white text-[#070707] text-[10px] sm:text-xs font-mono tracking-[0.2em] font-medium uppercase hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
          >
            Return to Story
          </button>
        </div>
      </div>
    </div>
  );
}
