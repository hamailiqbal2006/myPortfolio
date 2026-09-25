'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

type MotionValues = {
  enterX: number;
  enterY: number;
  enterZ: number;
  enterScale: number;
  leaveX: number;
  leaveY: number;
  leaveZ: number;
  leaveScale: number;
};

// Depth trajectories replicating the Homepage physical frame motion model (EditorialDepthMotion).
// Rotation is kept strictly at 0 to guarantee flat, razor-sharp typography without warping or blur.
// X is kept strictly at 0 to eliminate lateral sway, focusing motion entirely on smooth Y/Z depth travel.
// Middle scenes 3, 4 correspond directly to Homepage Website and Shopify scenes.
const desktopTrajectories: MotionValues[] = [
  // 0. Who I Am
  { enterX: 0, enterY: -8, enterZ: -450, enterScale: 0.86, leaveX: 0, leaveY: -9, leaveZ: 130, leaveScale: 1.055 },
  // 1. Always Learning
  { enterX: 0, enterY: -10, enterZ: -500, enterScale: 0.84, leaveX: 0, leaveY: -9.5, leaveZ: 140, leaveScale: 1.055 },
  // 2. How I Work
  { enterX: 0, enterY: -8, enterZ: -470, enterScale: 0.85, leaveX: 0, leaveY: -8.5, leaveZ: 125, leaveScale: 1.05 },
  // 3. Website Development Experience (Exact Homepage Website values)
  { enterX: 0, enterY: -8, enterZ: -450, enterScale: 0.86, leaveX: 0, leaveY: -9, leaveZ: 130, leaveScale: 1.055 },
  // 4. Shopify Experience (Exact Homepage Shopify values)
  { enterX: 0, enterY: -10, enterZ: -500, enterScale: 0.84, leaveX: 0, leaveY: -9.5, leaveZ: 150, leaveScale: 1.06 },
  // 5. Who I Build For
  { enterX: 0, enterY: -8.5, enterZ: -460, enterScale: 0.855, leaveX: 0, leaveY: -8.5, leaveZ: 125, leaveScale: 1.05 },
];

const scaleTrajectory = (trajectory: MotionValues, depth: number): MotionValues => ({
  enterX: trajectory.enterX * depth,
  enterY: trajectory.enterY * depth,
  enterZ: trajectory.enterZ * depth,
  enterScale: +(1 - (1 - trajectory.enterScale) * depth).toFixed(3),
  leaveX: trajectory.leaveX * depth,
  leaveY: trajectory.leaveY * depth,
  leaveZ: trajectory.leaveZ * depth,
  leaveScale: +(1 + (trajectory.leaveScale - 1) * depth).toFixed(3),
});

// Tablet: 70% depth (matching EditorialDepthMotion)
// Mobile: 46% depth (matching EditorialDepthMotion)
const tabletTrajectories = desktopTrajectories.map((trajectory) => scaleTrajectory(trajectory, 0.7));
const mobileTrajectories = desktopTrajectories.map((trajectory) => scaleTrajectory(trajectory, 0.46));

const sceneIdentity = {
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
};

export function AboutDepthMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.querySelector<HTMLElement>('[data-about-depth]');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = root.querySelector<HTMLElement>('[data-depth-hero]');
    const scenes = Array.from(root.querySelectorAll<HTMLElement>('[data-depth-section]'));
    const contact = root.querySelector<HTMLElement>('[data-depth-contact]');
    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      const addDepthPass = (
        trajectories: MotionValues[],
        heroDepth: number,
        contactDepth: number,
        contactScale: number,
      ) => {
        // 1. HERO SCENE: Starts fully visible at focal state on load.
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

        // 2. MIDDLE SCENES: One unified motion state per scene.
        // Surface and content are bolted together and receive identical transforms on the exact same tick.
        // Matches Homepage timeline: 0.2 enter -> 0.35 focal hold -> 0.36 leave -> 0.09 rest.
        scenes.forEach((scene, index) => {
          const trajectory = trajectories[index];
          if (!trajectory) return;

          const surface = scene.querySelector<HTMLElement>('[data-depth-surface]');
          const content = scene.querySelector<HTMLElement>('[data-depth-content]');
          const sceneTargets = [surface, content].filter(Boolean) as HTMLElement[];

          gsap.set(sceneTargets, {
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            x: 0,
            y: 0,
            xPercent: trajectory.enterX,
            yPercent: trajectory.enterY,
            z: trajectory.enterZ,
            scale: trajectory.enterScale,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
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
            .to(sceneTargets, { ...sceneIdentity, duration: 0.2 })
            // Keeping the focal composition flat for part of the pass preserves the approved state.
            .to({}, { duration: 0.35 })
            .to(sceneTargets, {
              xPercent: trajectory.leaveX,
              yPercent: trajectory.leaveY,
              z: trajectory.leaveZ,
              scale: trajectory.leaveScale,
              opacity: 0.96,
              duration: 0.36,
            })
            .to({}, { duration: 0.09 });
        });

        // 3. CONTACT SCENE: Enters smoothly from depth, settles into focal plane.
        // Does not animate away, preserving the final destination, footer nav, and vector endpoint.
        if (contact) {
          const contactSurface = contact.querySelector<HTMLElement>('[data-depth-surface]');
          const contactContent = contact.querySelector<HTMLElement>('[data-depth-content]');
          const contactTargets = [contactSurface, contactContent].filter(Boolean) as HTMLElement[];

          gsap.set(contactTargets, {
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: -8,
            z: -contactDepth,
            scale: contactScale,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
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

          contactTimeline.to(contactTargets, { ...sceneIdentity, duration: 1 });
        }
      };

      // Desktop: 210 heroDepth, 440 contactDepth, 0.86 contactScale (exact Homepage values)
      media.add('(min-width: 1025px)', () => addDepthPass(desktopTrajectories, 210, 440, 0.86));
      // Tablet: 147 heroDepth, 308 contactDepth, 0.902 contactScale (exact Homepage values)
      media.add('(min-width: 701px) and (max-width: 1024px)', () => addDepthPass(tabletTrajectories, 147, 308, 0.902));
      // Mobile: 97 heroDepth, 202 contactDepth, 0.936 contactScale (exact Homepage values)
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
