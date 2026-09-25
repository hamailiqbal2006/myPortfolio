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

const tabletTrajectories = desktopTrajectories.map((trajectory) => scaleTrajectory(trajectory, 0.7));
const mobileTrajectories = desktopTrajectories.map((trajectory) => scaleTrajectory(trajectory, 0.46));

const sceneIdentity = {
  xPercent: 0,
  yPercent: 0,
  z: 0,
  scale: 1,
  rotateX: 0,
  rotateY: 0,
  opacity: 1,
};

export function EditorialDepthMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.querySelector<HTMLElement>('[data-editorial-depth]');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scenes = Array.from(root.querySelectorAll<HTMLElement>('[data-depth-scene]'));
    const opening = root.querySelector<HTMLElement>('[data-depth-opening]');
    const contact = root.querySelector<HTMLElement>('[data-depth-contact]');
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const addDepthPass = (
        trajectories: MotionValues[],
        heroDepth: number,
        contactDepth: number,
        contactScale: number,
      ) => {
        if (opening) {
          gsap.set(opening, { transformOrigin: '50% 50%', transformStyle: 'preserve-3d', zIndex: 1 });
          const openingTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: opening,
              start: 'top top',
              end: 'bottom top-=12%',
              scrub: 1.4,
            },
          });

          openingTimeline.to(opening, {
            yPercent: -7,
            z: -heroDepth,
            scale: 0.94,
            rotateX: -5,
            opacity: 0.94,
            duration: 1,
          });
        }

        scenes.forEach((scene, index) => {
          const trajectory = trajectories[index];
          if (!trajectory) return;

          gsap.set(scene, {
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            zIndex: trajectory.zIndex,
            xPercent: trajectory.enterX,
            yPercent: trajectory.enterY,
            z: trajectory.enterZ,
            scale: trajectory.enterScale,
            rotateX: trajectory.enterRotateX,
            rotateY: trajectory.enterRotateY,
            opacity: 0.68,
          });

          const sceneTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: scene,
              start: 'top bottom+=18%',
              end: 'bottom top-=16%',
              scrub: 1.45,
            },
          });

          sceneTimeline
            .to(scene, { ...sceneIdentity, duration: 0.2 })
            // Keeping the focal composition flat for part of the pass preserves the approved state.
            .to({}, { duration: 0.35 })
            .to(scene, {
            xPercent: trajectory.leaveX,
            yPercent: trajectory.leaveY,
            z: trajectory.leaveZ,
            scale: trajectory.leaveScale,
            rotateX: trajectory.leaveRotateX,
            rotateY: trajectory.leaveRotateY,
            opacity: 0.96,
            duration: 0.36,
            })
            .to({}, { duration: 0.09 });
        });

        if (contact) {
          gsap.set(contact, {
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            zIndex: 5,
            xPercent: -5,
            yPercent: -8,
            z: -contactDepth,
            scale: contactScale,
            rotateX: 6,
            rotateY: 4,
            opacity: 0.7,
          });
          const contactTimeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: contact,
              start: 'top bottom+=18%',
              end: 'top 40%',
              scrub: 1.45,
            },
          });

          contactTimeline.to(contact, { ...sceneIdentity, duration: 1 });
        }
      };

      media.add('(min-width: 1025px)', () => addDepthPass(desktopTrajectories, 210, 440, 0.86));
      media.add('(min-width: 701px) and (max-width: 1024px)', () => addDepthPass(tabletTrajectories, 147, 308, 0.902));
      media.add('(max-width: 700px)', () => addDepthPass(mobileTrajectories, 97, 202, 0.936));
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
