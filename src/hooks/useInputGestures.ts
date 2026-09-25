'use client';

import { useEffect } from 'react';
import { progressController } from '@/animation/progressController';

/**
 * Global input controller managing continuous wheel, touch swipe, and keyboard gestures.
 * Smoothly advances or retreats across all 7 portfolio story sections (0.0 to 6.0).
 */
export function useInputGestures(): void {
  useEffect(() => {
    // --- MOUSE WHEEL & TRACKPAD (Continuous progress input) ---
    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && target.closest('[data-scrollable="true"]')) {
        return;
      }

      // Smoothly increment progress
      progressController.addScrollDelta(event.deltaY, 0.0022);
    };

    // --- TOUCH GESTURES (Continuous mobile swipe drag & flick) ---
    let touchStartY = 0;
    let touchLastY = 0;
    let isTouchActive = false;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        touchStartY = event.touches[0].clientY;
        touchLastY = touchStartY;
        isTouchActive = true;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isTouchActive || event.touches.length !== 1) return;

      const currentY = event.touches[0].clientY;
      const deltaY = touchLastY - currentY; // Invert so swiping up advances
      touchLastY = currentY;

      progressController.addScrollDelta(deltaY, 0.0032);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!isTouchActive) return;
      isTouchActive = false;

      if (event.changedTouches.length === 1) {
        const totalDeltaY = touchStartY - event.changedTouches[0].clientY;
        // Decisive flick transition
        if (Math.abs(totalDeltaY) > 40) {
          const currentTarget = progressController.target;
          if (totalDeltaY > 0) {
            const nextSec = Math.min(progressController.max, Math.floor(currentTarget + 1));
            progressController.animateTo(nextSec, 0.8, 'power2.out');
          } else {
            const prevSec = Math.max(0, Math.ceil(currentTarget - 1));
            progressController.animateTo(prevSec, 0.8, 'power2.out');
          }
        }
      }
    };

    // --- KEYBOARD NAVIGATION ---
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement | null;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.isContentEditable)
      ) {
        return;
      }

      const currentTarget = progressController.target;

      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
          event.preventDefault();
          progressController.animateTo(
            Math.min(progressController.max, Math.round(currentTarget + 1)),
            0.85,
            'power2.out'
          );
          break;

        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          progressController.animateTo(
            Math.max(0, Math.round(currentTarget - 1)),
            0.85,
            'power2.out'
          );
          break;

        case 'Home':
          event.preventDefault();
          progressController.animateTo(0.0, 0.9, 'power2.out');
          break;

        case 'End':
          event.preventDefault();
          progressController.animateTo(progressController.max, 0.9, 'power2.out');
          break;

        default:
          break;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
