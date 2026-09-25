'use client';

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { useResponsiveDevice } from '@/hooks/useResponsiveDevice';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Editorial Luxury Hero Section
 * 
 * Contains EXACTLY:
 * 1. HAMAIL (dominant large editorial typography, asymmetric left/center-left)
 * 2. Discipline labels:
 *    - WEBSITE DEVELOPMENT
 *    - SHOPIFY DEVELOPMENT
 * 3. Supporting sentence:
 *    "Digital products built for businesses that want to look and work better online."
 * 4. Exploration cue:
 *    - Desktop: SCROLL TO EXPLORE
 *    - Touch: SWIPE TO EXPLORE
 * 
 * Responsive Composition:
 * - Desktop (>= 1024px): Left column has HAMAIL, titles, and supporting sentence; 3D sculpture on right.
 * - Mobile (< 768px) & Tablet Portrait (768px-1023px): HAMAIL & titles at top, 3D sculpture breathing in center, supporting sentence and exploration cue at bottom.
 * 
 * Zero marketing bloat, zero cards, zero mockups, zero badges, zero buttons.
 */
export function HeroSection() {
  const { progress } = useNavigation(); // 0.0 -> 1.0
  const { isMobile } = useResponsiveDevice();
  const prefersReducedMotion = useReducedMotion();

  // Intro reveal stages:
  // 0.0s: Dark environment
  // 0.4s: HAMAIL reveals
  // 0.6s: Service labels reveal
  // 0.8s: Supporting sentence reveals
  // 1.1s: Exploration cue appears
  const [stage, setStage] = useState({
    hamail: false,
    services: false,
    sentence: false,
    cue: false,
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const t1 = setTimeout(() => setStage((s) => ({ ...s, hamail: true })), 280);
    const t2 = setTimeout(() => setStage((s) => ({ ...s, services: true })), 480);
    const t3 = setTimeout(() => setStage((s) => ({ ...s, sentence: true })), 680);
    const t4 = setTimeout(() => setStage((s) => ({ ...s, cue: true })), 920);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [prefersReducedMotion]);

  const isVisible = (key: 'hamail' | 'services' | 'sentence' | 'cue') =>
    prefersReducedMotion || stage[key];

  // Subtle scroll preparation (heroProgress 0 -> 1)
  const scrollShiftY = -progress * 32;
  const scrollOpacity = Math.max(0.6, 1 - progress * 0.35);

  return (
    <section
      aria-label="Hero Introduction"
      className="fixed inset-0 z-10 flex flex-col justify-between px-6 pt-24 pb-8 sm:px-10 sm:pt-28 sm:pb-10 md:px-14 md:pt-28 md:pb-12 lg:pt-0 lg:pb-0 pointer-events-none select-none"
      style={{
        transform: `translate3d(0, ${scrollShiftY}px, 0)`,
        opacity: scrollOpacity,
      }}
    >
      {/* Container:
          - Desktop (lg+): Centered vertically with left column for typography, leaving right half open for 3D sculpture.
          - Mobile & Tablet: Justified between top (titles) and bottom (sentence + cue) to give the center 3D sculpture generous breathing room.
      */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between lg:justify-center">
        
        {/* Top Block: HAMAIL & Discipline Titles */}
        <div className="w-full max-w-xl lg:max-w-2xl text-left">
          
          {/* 1. Primary Dominant Name: HAMAIL (Masked reveal with safe padding) */}
          <div className="overflow-hidden py-1 mb-3 sm:mb-5 md:mb-7">
            <h1
              className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[-0.045em] text-[#f8fafc] leading-[0.95] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible('hamail') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              HAMAIL
            </h1>
          </div>

          {/* 2. Discipline Titles (Restrained uppercase mono) */}
          <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
            <div
              className={`space-y-2 sm:space-y-2.5 font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.24em] uppercase text-white/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible('services') ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <p className="hover:text-white transition-colors duration-200">
                WEBSITE DEVELOPMENT
              </p>
              <p className="hover:text-white transition-colors duration-200">
                SHOPIFY DEVELOPMENT
              </p>
            </div>
          </div>

          {/* 3. Supporting Sentence (Desktop lg+ layout: sits directly below titles) */}
          <div className="hidden lg:block overflow-hidden">
            <p
              className={`text-xs sm:text-sm md:text-base text-white/45 font-light tracking-wide max-w-sm sm:max-w-md leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible('sentence') ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              Digital products built for businesses that want to look and work better online.
            </p>
          </div>

        </div>

        {/* Mobile & Tablet Portrait Bottom Area (supporting sentence + exploration cue) */}
        <div className="w-full flex flex-col gap-4 lg:hidden pt-4">
          <div className="overflow-hidden">
            <p
              className={`text-xs sm:text-sm text-white/45 font-light tracking-wide max-w-xs sm:max-w-sm leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible('sentence') ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Digital products built for businesses that want to look and work better online.
            </p>
          </div>

          <div className="flex items-center justify-end">
            <div
              className={`flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.26em] text-white/40 uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible('cue') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <span>{isMobile ? 'SWIPE TO EXPLORE' : 'SCROLL TO EXPLORE'}</span>
              <span className="inline-block animate-bounce text-white/60 ml-0.5">↓</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Desktop Exploration Cue (lg+ layout: anchored at bottom left) */}
      <div className="hidden lg:flex w-full max-w-7xl mx-auto items-center justify-start pb-10">
        <div
          className={`flex items-center gap-2 font-mono text-xs tracking-[0.26em] text-white/40 uppercase transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible('cue') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="inline-block animate-bounce text-white/60 ml-0.5">↓</span>
        </div>
      </div>
    </section>
  );
}
