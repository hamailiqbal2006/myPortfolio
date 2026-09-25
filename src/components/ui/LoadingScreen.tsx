'use client';

import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

/**
 * Minimal luxury loading screen that provides an elegant transition
 * while Three.js initializes shaders and geometry.
 */
export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <div
      aria-hidden={!isLoading}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060608] transition-opacity duration-1000 ease-out select-none ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="text-xl sm:text-2xl font-light tracking-[0.35em] text-white/90 uppercase">
          Hamail
        </span>

        {/* Minimal Hairline Progress Accent */}
        <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-white/60 animate-pulse" />
        </div>

        <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
          Initializing Scene
        </span>
      </div>
    </div>
  );
}
