'use client';

import { useEffect, useState } from 'react';
import { DeviceTier, ResponsiveSettings } from '@/types/device';
import { BREAKPOINTS, THREE_DEFAULTS } from '@/lib/constants';

const getInitialSettings = (): ResponsiveSettings => ({
  tier: 'desktop',
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  width: 1440,
  height: 900,
  dpr: THREE_DEFAULTS.desktopDpr,
  cameraZ: 4.5,
  sculptureScale: 1.05,
});

export function useResponsiveDevice(): ResponsiveSettings {
  const [settings, setSettings] = useState<ResponsiveSettings>(getInitialSettings);

  useEffect(() => {
    const calculateSettings = (): ResponsiveSettings => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      let tier: DeviceTier = 'desktop';
      let cameraZ = 4.5;
      let sculptureScale = 1.05;
      let targetDpr: number = THREE_DEFAULTS.desktopDpr;

      if (width < BREAKPOINTS.mobile) {
        tier = 'mobile';
        cameraZ = 6.2; // Move camera back so geometry doesn't clip on narrow mobile screens
        sculptureScale = 0.85;
        targetDpr = THREE_DEFAULTS.mobileDpr; // Clamp DPR to 1.5 to protect mobile GPUs from thermal throttling
      } else if (width < BREAKPOINTS.tablet) {
        tier = 'tablet';
        cameraZ = 5.2;
        sculptureScale = 0.95;
        targetDpr = 1.75;
      }

      // Safeguard DPR against device capabilities
      const actualDpr = typeof window !== 'undefined'
        ? Math.min(window.devicePixelRatio || 1, targetDpr)
        : 1;

      return {
        tier,
        isMobile: tier === 'mobile',
        isTablet: tier === 'tablet',
        isDesktop: tier === 'desktop',
        width,
        height,
        dpr: actualDpr,
        cameraZ,
        sculptureScale,
      };
    };

    const handleResize = () => {
      setSettings(calculateSettings());
    };

    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return settings;
}
