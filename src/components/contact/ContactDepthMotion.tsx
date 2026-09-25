'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

export function ContactDepthMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.querySelector<HTMLElement>('[data-contact-depth]');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = root.querySelector<HTMLElement>('[data-depth-hero]');
    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      const addHeroDepthPass = (heroDepth: number) => {
        // HERO SCENE: Starts fully visible at focal state on load.
        // As user scrolls, smoothly recedes into depth matching Homepage opening.
        if (hero) {
          const heroSurface = hero.querySelector<HTMLElement>('[data-depth-surface]');
          const heroContent = hero.querySelector<HTMLElement>('[data-depth-content]');
          const heroTargets = [heroSurface, heroContent].filter(Boolean) as HTMLElement[];

          gsap.set(heroTargets, {
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            z: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            opacity: 1,
          });

          const heroTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top-=12%',
              scrub: 1.4,
            },
          });

          heroTimeline.to(heroTargets, {
            yPercent: -7,
            z: -heroDepth,
            scale: 0.94,
            opacity: 0.94,
            duration: 1,
          });
        }
      };

      // Desktop: 210 heroDepth
      media.add('(min-width: 1025px)', () => addHeroDepthPass(210));
      // Tablet: 147 heroDepth
      media.add('(min-width: 701px) and (max-width: 1024px)', () => addHeroDepthPass(147));
      // Mobile: 97 heroDepth
      media.add('(max-width: 700px)', () => addHeroDepthPass(97));
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const refreshFrame = window.requestAnimationFrame(refresh);
    window.addEventListener('resize', refresh);

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener('resize', refresh);
      context.revert();
      media.revert();
    };
  }, []);

  return null;
}
