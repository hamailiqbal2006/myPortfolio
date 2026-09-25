'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { NavigationState } from '@/types/navigation';
import { getSectionByIndex, TOTAL_SECTIONS } from '@/data/sections';
import { progressController } from '@/animation/progressController';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface NavigationContextValue {
  readonly state: NavigationState;
  readonly progress: number;
  readonly canGoNext: boolean;
  readonly canGoPrev: boolean;
  readonly goToSection: (targetIndex: number) => boolean;
  readonly goNext: () => boolean;
  readonly goPrev: () => boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const [state, setState] = useState<NavigationState>({
    currentIndex: 0,
    currentId: 'hero',
    targetIndex: 0,
    targetId: 'hero',
    direction: null,
    isTransitioning: false,
  });

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Subscribe to continuous progress updates across 0.0 -> 6.0
  useEffect(() => {
    const unsubscribe = progressController.subscribe((current, target) => {
      setProgress(current);

      const derivedIndex = Math.max(0, Math.min(TOTAL_SECTIONS - 1, Math.round(current)));
      const targetDerivedIndex = Math.max(0, Math.min(TOTAL_SECTIONS - 1, Math.round(target)));
      const isMoving = Math.abs(current - target) > 0.01;

      setState((prev) => {
        if (
          prev.currentIndex === derivedIndex &&
          prev.targetIndex === targetDerivedIndex &&
          prev.isTransitioning === isMoving
        ) {
          return prev;
        }

        const section = getSectionByIndex(derivedIndex);
        const targetSection = getSectionByIndex(targetDerivedIndex);

        return {
          ...prev,
          currentIndex: derivedIndex,
          currentId: section.id,
          targetIndex: targetDerivedIndex,
          targetId: targetSection.id,
          direction: targetDerivedIndex > derivedIndex ? 'next' : targetDerivedIndex < derivedIndex ? 'prev' : null,
          isTransitioning: isMoving,
        };
      });
    });

    return unsubscribe;
  }, []);

  const goToSection = useCallback((targetIndex: number): boolean => {
    const clampedIndex = Math.max(0, Math.min(targetIndex, TOTAL_SECTIONS - 1));

    if (prefersReducedMotion) {
      progressController.setInstant(clampedIndex);
    } else {
      progressController.animateTo(clampedIndex, 0.95, 'power2.out');
    }
    return true;
  }, [prefersReducedMotion]);

  const goNext = useCallback((): boolean => {
    if (stateRef.current.currentIndex < TOTAL_SECTIONS - 1) {
      return goToSection(stateRef.current.currentIndex + 1);
    }
    return false;
  }, [goToSection]);

  const goPrev = useCallback((): boolean => {
    if (stateRef.current.currentIndex > 0) {
      return goToSection(stateRef.current.currentIndex - 1);
    }
    return false;
  }, [goToSection]);

  const canGoNext = state.currentIndex < TOTAL_SECTIONS - 1;
  const canGoPrev = state.currentIndex > 0;

  const value: NavigationContextValue = {
    state,
    progress,
    canGoNext,
    canGoPrev,
    goToSection,
    goNext,
    goPrev,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
