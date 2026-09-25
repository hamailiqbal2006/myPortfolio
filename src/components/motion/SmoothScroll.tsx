'use client';

import Lenis from 'lenis';
import { useEffect, type ReactNode } from 'react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.12,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: .88,
    });

    const scrollToSection = (event: Event) => {
      const { target, offset } = (event as CustomEvent<{ target?: string; offset?: number }>).detail ?? {};
      const targetElement = target ? document.querySelector<HTMLElement>(target) : null;
      if (!targetElement) return;
      lenis.scrollTo(targetElement.offsetTop, { duration: 1.25, offset: offset ?? 0 });
    };
    window.addEventListener('hamail:scroll-to', scrollToSection);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hamail:scroll-to', scrollToSection);
      lenis.destroy();
    };
  }, []);

  return children;
}
