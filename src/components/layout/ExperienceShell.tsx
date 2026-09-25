'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { BrandHeader } from './BrandHeader';
import { HeroSection } from '@/components/ui/HeroSection';
import { useInputGestures } from '@/hooks/useInputGestures';

// Dynamically import Canvas with SSR disabled to guarantee zero WebGL hydration mismatch
const ExperienceCanvas = dynamic(
  () => import('@/components/three/ExperienceCanvas').then((mod) => mod.ExperienceCanvas),
  { ssr: false }
);

/**
 * Root experience shell dedicated purely to the Landing / Hero Experience:
 * - Persistent Single 3D Canvas (hosting bespoke 3D sculpture and studio lighting)
 * - Minimal Luxury Editorial Header (BrandHeader)
 * - Focused Hero Section (HeroSection)
 * - Zero splash screens, zero loading bars, zero unapproved sections
 */
export function ExperienceShell() {
  // Activate natural gestures (wheel, touch swipe, keyboard) bounded to heroProgress [0.0, 1.0]
  useInputGestures();

  return (
    <main className="relative w-full h-screen min-h-[100dvh] bg-[#08080a] text-[#f8fafc] overflow-hidden">
      {/* 1. 3D Canvas Environment */}
      <ExperienceCanvas />

      {/* 2. Minimal Editorial UI Overlay */}
      <div className="experience-ui-overlay">
        <BrandHeader />
        <HeroSection />
      </div>
    </main>
  );
}
