'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

type MotionValues = {
  enterX: number;
  enterY: number;
  enterZ: number;
  enterScale: number;
  enterRotateX: number;
  enterRotateY: number;
  leaveX: number;
  leaveY: number;
  leaveZ: number;
  leaveScale: number;
  leaveRotateX: number;
  leaveRotateY: number;
  zIndex: number;
};

const desktopTrajectories: MotionValues[] = [
  { enterX: 7, enterY: -8, enterZ: -450, enterScale: 0.86, enterRotateX: 7, enterRotateY: -5, leaveX: -5, leaveY: -9, leaveZ: 130, leaveScale: 1.055, leaveRotateX: -3.5, leaveRotateY: 2.6, zIndex: 2 },
  { enterX: -8, enterY: -10, enterZ: -500, enterScale: 0.84, enterRotateX: 6.5, enterRotateY: 5.8, leaveX: 5.5, leaveY: -9.5, leaveZ: 150, leaveScale: 1.06, leaveRotateX: -3, leaveRotateY: -2.8, zIndex: 3 },
];

const scaleTrajectory = (trajectory: MotionValues, depth: number): MotionValues => ({
  enterX: trajectory.enterX * depth,
  enterY: trajectory.enterY * depth,
  enterZ: trajectory.enterZ * depth,
  enterScale: 1 - (1 - trajectory.enterScale) * depth,
  enterRotateX: trajectory.enterRotateX * depth,
  enterRotateY: trajectory.enterRotateY * depth,
  leaveX: trajectory.leaveX * depth,
  leaveY: trajectory.leaveY * depth,
  leaveZ: trajectory.leaveZ * depth,
  leaveScale: 1 + (trajectory.leaveScale - 1) * depth,
  leaveRotateX: trajectory.leaveRotateX * depth,
  leaveRotateY: trajectory.leaveRotateY * depth,
  zIndex: trajectory.zIndex,
});

export function EditorialDepthMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const root = document.querySelector<HTMLElement>('[data-editorial-depth]');
    if (!root) return;

    const opening = root.querySelector<HTMLElement>('[data-depth-opening]');
    const headline = root.querySelector<HTMLElement>('[data-depth-headline]');
    const scenes = Array.from(root.querySelectorAll<HTMLElement>('[data-depth-scene]'));
    const contact = root.querySelector<HTMLElement>('[data-depth-contact]');

    const depthAmount = (width: number) => {
      if (width < 768) return 0.28;
      if (width < 1024) return 0.58;
      if (width < 1440) return 0.84;
      return 1;
    };

    let cleanupCurrent: (() => void) | null = null;

    const initAnimation = () => {
      cleanupCurrent?.();

      const width = window.innerWidth;
      const depth = depthAmount(width);
      const isMobile = width < 768;

      const ctx = gsap.context(() => {
        if (opening && headline) {
          gsap.fromTo(
            headline,
            { transformPerspective: 1100, xPercent: 0, yPercent: 0, z: 0, rotateX: 0, rotateY: 0, opacity: 1 },
            {
              xPercent: -4 * depth,
              yPercent: -14 * depth,
              z: 90 * depth,
              rotateX: -4 * depth,
              rotateY: 2.5 * depth,
              opacity: 0.42,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: opening,
                start: 'top top',
                end: 'bottom 40%',
                scrub: 0.4,
                invalidateOnRefresh: true,
              },
            }
          );

          gsap.fromTo(
            opening,
            { transformPerspective: 1100, z: 0, opacity: 1 },
            {
              z: -180 * depth,
              opacity: 0.72,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: opening,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.4,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        scenes.forEach((scene, index) => {
          const baseTrajectory = desktopTrajectories[index % desktopTrajectories.length];
          const t = scaleTrajectory(baseTrajectory, depth);

          gsap.set(scene, {
            position: 'relative',
            zIndex: t.zIndex,
            transformPerspective: 1200,
            transformOrigin: '50% 50%',
            backfaceVisibility: 'hidden',
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: scene,
              start: isMobile ? 'top 92%' : 'top 86%',
              end: isMobile ? 'bottom 16%' : 'bottom 20%',
              scrub: isMobile ? 0.35 : 0.55,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            scene,
            {
              xPercent: t.enterX,
              yPercent: t.enterY,
              z: t.enterZ,
              scale: t.enterScale,
              rotateX: t.enterRotateX,
              rotateY: t.enterRotateY,
              opacity: 0.28,
            },
            {
              xPercent: 0,
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
            }
          ).to(
            scene,
            {
              xPercent: t.leaveX,
              yPercent: t.leaveY,
              z: t.leaveZ,
              scale: t.leaveScale,
              rotateX: t.leaveRotateX,
              rotateY: t.leaveRotateY,
              opacity: 0.5,
              duration: 0.55,
              ease: 'power2.in',
            },
            '>-0.05'
          );
        });

        if (contact) {
          gsap.fromTo(
            contact,
            {
              transformPerspective: 1100,
              yPercent: isMobile ? 6 : 10,
              z: -260 * depth,
              rotateX: 4.5 * depth,
              opacity: 0.52,
            },
            {
              yPercent: 0,
              z: 0,
              rotateX: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contact,
                start: isMobile ? 'top 95%' : 'top 90%',
                end: 'top 32%',
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }, root);

      cleanupCurrent = () => ctx.revert();
    };

    initAnimation();

    let resizeTimer: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(initAnimation, 120);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupCurrent?.();
    };
  }, []);

  return null;
}
