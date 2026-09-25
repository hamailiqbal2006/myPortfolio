'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type TransformState = { x?: number; y?: number; z?: number; rotateX?: number; rotateY?: number; rotateZ?: number };
type PercentState = { xPercent?: number; yPercent?: number };
type MotionTarget = HTMLElement | null;

export function WebsitesDepthMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>('[data-websites-depth]');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const coversContainer = root.querySelector<HTMLElement>('[data-covers-container]');
    const covers = Array.from(root.querySelectorAll<HTMLElement>('[data-service-cover]'));
    if (!coversContainer || covers.length !== 4) return;

    const hero = root.querySelector<HTMLElement>('[data-depth-hero]');
    const transition = root.querySelector<HTMLElement>('[data-depth-transition]');
    const valueSection = root.querySelector<HTMLElement>('[data-depth-value]');
    const ctaSection = root.querySelector<HTMLElement>('[data-depth-cta]');
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        { isDesktop: '(min-width: 1025px)', isTablet: '(min-width: 769px) and (max-width: 1024px)', isMobile: '(max-width: 768px)' },
        (mediaContext) => {
          const { isTablet, isMobile } = mediaContext.conditions as { isTablet: boolean; isMobile: boolean };
          const depth = isMobile ? 0.52 : isTablet ? 0.76 : 1;
          const rotation = isMobile ? 0.5 : isTablet ? 0.75 : 1;
          const scale = (values: TransformState): TransformState => ({
            x: values.x === undefined ? undefined : Math.round(values.x * depth),
            y: values.y === undefined ? undefined : Math.round(values.y * depth),
            z: values.z === undefined ? undefined : Math.round(values.z * depth),
            rotateX: values.rotateX === undefined ? undefined : values.rotateX * rotation,
            rotateY: values.rotateY === undefined ? undefined : values.rotateY * rotation,
            rotateZ: values.rotateZ === undefined ? undefined : values.rotateZ * rotation,
          });

          if (hero) {
            const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.1 } });
            const identity = hero.querySelector<HTMLElement>('[data-hero-identity]');
            const line1 = hero.querySelector<HTMLElement>('[data-depth-hero-line="1"]');
            const line2 = hero.querySelector<HTMLElement>('[data-depth-hero-line="2"]');
            const eyebrow = hero.querySelector<HTMLElement>('[data-depth-hero-eyebrow]');
            const copy = hero.querySelector<HTMLElement>('[data-depth-hero-copy]');
            if (identity) timeline.to(identity, { yPercent: isMobile ? -4 : -7, opacity: 0.9 }, 0);
            if (line1) timeline.to(line1, { yPercent: isMobile ? -3 : -5 }, 0);
            if (line2) timeline.to(line2, { yPercent: isMobile ? -5 : -8 }, 0);
            if (eyebrow) timeline.to(eyebrow, { yPercent: -3, opacity: 0.45 }, 0);
            if (copy) timeline.to(copy, { yPercent: -4, opacity: 0.65 }, 0);
          }

          if (transition) {
            const content = transition.querySelector<HTMLElement>('[data-depth-content]');
            if (content) gsap.fromTo(content, { yPercent: isMobile ? 5 : 8, opacity: 0.72 }, { yPercent: -5, opacity: 1, ease: 'none', scrollTrigger: { trigger: transition, start: 'top 85%', end: 'bottom top+=10%', scrub: 1.1 } });
          }

          const [restaurant, business, commerce, booking] = covers;
          const find = (cover: HTMLElement, name: string) => cover.querySelector<HTMLElement>(`[data-depth-elem="${name}"]`);
          const restPlate = find(restaurant, 'rest-plate');
          const restFork = find(restaurant, 'rest-fork');
          const restSpoon = find(restaurant, 'rest-spoon');
          const restChef = find(restaurant, 'rest-chef-special');
          const restRail = find(restaurant, 'rest-rail');
          const bizMain = find(business, 'biz-board-main');
          const bizRear = find(business, 'biz-board-secondary');
          const bizInquiry = find(business, 'biz-inquiry-card');
          const shopPlinth = find(commerce, 'shop-plinth');
          const shopPrimary = find(commerce, 'shop-box-primary');
          const shopSecondary = find(commerce, 'shop-box-secondary');
          const shopBag = find(commerce, 'shop-bag');
          const bookCalendar = find(booking, 'book-cal');
          const bookClock = find(booking, 'book-clock');
          const bookSlot = find(booking, 'book-slot-focal');
          const bookConfirm = find(booking, 'book-confirm-card');
          const set = (target: MotionTarget, state: TransformState, percent: PercentState = {}) => {
            if (target) gsap.set(target, { ...percent, ...scale(state), force3D: true });
          };
          const move = (timeline: gsap.core.Timeline, target: MotionTarget, state: TransformState, duration: number, position: number) => {
            if (target) timeline.to(target, { ...scale(state), duration }, position);
          };
          type Track = { target: MotionTarget; initial: TransformState; percent?: PercentState; steps: Array<[number, number, TransformState]> };

          // These staging values are intentionally inside the artwork frame and in
          // front of the perspective plane. Nothing waits offscreen to "pop" in.
          const restaurantTracks: Track[] = [
            { target: restPlate, percent: { xPercent: -50, yPercent: -50 }, initial: { y: 70, z: -210, rotateX: 12, rotateY: -8 }, steps: [[0, 2.6, { y: 24, z: -64, rotateX: 6, rotateY: -4 }], [2.6, 2.3, { y: 0, z: 48, rotateX: 1, rotateY: 0 }], [5.55, 2.2, { y: 0, z: 62, rotateX: 0, rotateY: 0 }], [8.1, 3.9, { y: -36, z: 88, rotateX: -3 }]] },
            { target: restFork, percent: { yPercent: -50 }, initial: { x: -180, y: 142, z: -105, rotateY: -9, rotateZ: -28 }, steps: [[0, 2.6, { x: -142, y: 96, z: -28, rotateY: -5, rotateZ: -18 }], [2.75, 2.6, { x: 220, y: -92, z: 142, rotateY: 3, rotateZ: 26 }], [5.55, 2.55, { x: 0, y: 0, z: 108, rotateY: 0, rotateZ: -3 }], [8.1, 3.9, { x: -38, y: -58, z: 134, rotateZ: 4 }]] },
            { target: restSpoon, percent: { yPercent: -50 }, initial: { x: 110, y: 142, z: -95, rotateY: 9, rotateZ: 28 }, steps: [[0, 2.6, { x: 92, y: 96, z: -22, rotateY: 5, rotateZ: 18 }], [2.75, 2.6, { x: -190, y: -92, z: 152, rotateY: -3, rotateZ: -26 }], [5.55, 2.55, { x: 0, y: 0, z: 118, rotateY: 0, rotateZ: 3 }], [8.1, 3.9, { x: 38, y: -58, z: 142, rotateZ: -4 }]] },
            { target: restChef, initial: { x: -78, y: 86, z: -85, rotateX: 8, rotateY: -8 }, steps: [[0, 2.6, { x: -34, y: 34, z: 28, rotateX: 3, rotateY: -3 }], [2.95, 2.4, { x: -16, y: 6, z: 128, rotateX: 0, rotateY: 0 }], [5.7, 2.25, { x: 0, y: 0, z: 158, rotateX: 0, rotateY: 0 }], [8.1, 3.9, { y: -52, z: 184, rotateX: -2 }]] },
            { target: restRail, initial: { y: 42, z: -110 }, steps: [[0, 2.6, { y: 12, z: -24 }], [3.1, 2.1, { y: 0, z: 12 }]] },
          ];
          const businessTracks: Track[] = [
            { target: bizMain, percent: { xPercent: -50, yPercent: -50 }, initial: { y: 108, z: -205, rotateY: 14, rotateZ: -5 }, steps: [[0, 2.6, { y: 46, z: -72, rotateY: 7, rotateZ: -2 }], [2.6, 2.65, { x: 16, y: -8, z: 62, rotateY: -3, rotateZ: 1 }], [5.6, 2.45, { x: 0, y: 0, z: 72, rotateY: 0, rotateZ: 0 }], [8.1, 3.9, { y: -38, z: 96, rotateY: -2 }]] },
            { target: bizRear, initial: { x: -132, y: 88, z: -240, rotateY: -16, rotateZ: 3 }, steps: [[0, 2.6, { x: -86, y: 44, z: -164, rotateY: -9, rotateZ: 1 }], [2.85, 2.3, { x: -40, y: 14, z: -118, rotateY: -4, rotateZ: 0 }], [5.7, 2.2, { x: 0, y: 0, z: -104, rotateY: 0, rotateZ: 0 }], [8.1, 3.9, { x: -28, y: -24, z: -126 }]] },
            { target: bizInquiry, initial: { x: 156, y: 118, z: -118, rotateX: 9, rotateY: -7, rotateZ: -14 }, steps: [[0, 2.6, { x: 124, y: 78, z: -28, rotateX: 4, rotateY: -3, rotateZ: -9 }], [2.7, 2.75, { x: -72, y: -42, z: 136, rotateX: 0, rotateY: 2, rotateZ: -13 }], [5.6, 2.45, { x: 0, y: 0, z: 164, rotateX: 0, rotateY: 0, rotateZ: 0 }], [8.1, 3.9, { x: 36, y: -52, z: 186, rotateZ: 4 }]] },
          ];
          const commerceTracks: Track[] = [
            { target: shopPlinth, initial: { y: 52, z: -140, rotateX: 5 }, steps: [[0, 2.6, { y: 20, z: -46, rotateX: 2 }], [2.6, 2.25, { y: 0, z: 14, rotateX: 0 }], [8.1, 3.9, { y: -22, z: 20 }]] },
            { target: shopPrimary, percent: { xPercent: -50, yPercent: -50 }, initial: { y: 104, z: -215, rotateY: -14, rotateZ: 4 }, steps: [[0, 2.6, { y: 46, z: -74, rotateY: -7, rotateZ: 2 }], [2.6, 2.65, { x: 14, y: -6, z: 72, rotateY: 3, rotateZ: -1 }], [5.6, 2.4, { x: 0, y: 0, z: 84, rotateY: 0, rotateZ: 0 }], [8.1, 3.9, { y: -38, z: 108, rotateY: 2 }]] },
            { target: shopSecondary, initial: { x: -128, y: 82, z: -245, rotateY: -14, rotateZ: -3 }, steps: [[0, 2.6, { x: -84, y: 40, z: -166, rotateY: -8, rotateZ: -1 }], [2.8, 2.3, { x: -36, y: 12, z: -112, rotateY: -3, rotateZ: 0 }], [5.7, 2.2, { x: 0, y: 0, z: -102, rotateY: 0, rotateZ: 0 }], [8.1, 3.9, { x: -28, y: -22, z: -120 }]] },
            { target: shopBag, initial: { x: 156, y: 112, z: -110, rotateY: 14, rotateZ: 12 }, steps: [[0, 2.6, { x: 122, y: 72, z: -26, rotateY: 7, rotateZ: 8 }], [2.7, 2.75, { x: -70, y: -42, z: 142, rotateY: -3, rotateZ: -12 }], [5.6, 2.45, { x: 0, y: 0, z: 174, rotateY: 0, rotateZ: 0 }], [8.1, 3.9, { x: 34, y: -50, z: 192, rotateZ: 4 }]] },
          ];
          const bookingTracks: Track[] = [
            { target: bookCalendar, initial: { x: -108, y: 92, z: -235, rotateY: -14, rotateZ: -3 }, steps: [[0, 2.6, { x: -70, y: 48, z: -154, rotateY: -8, rotateZ: -1 }], [2.6, 2.45, { x: -14, y: 4, z: -42, rotateY: -2, rotateZ: 0 }], [5.65, 2.25, { x: 0, y: 0, z: -28, rotateY: 0, rotateZ: 0 }]] },
            { target: bookClock, initial: { x: 142, y: 100, z: -128, rotateX: 11, rotateY: 12, rotateZ: 10 }, steps: [[0, 2.6, { x: 110, y: 66, z: -42, rotateX: 6, rotateY: 6, rotateZ: 6 }], [2.65, 2.75, { x: -24, y: -26, z: 124, rotateX: -2, rotateY: -3, rotateZ: -8 }], [5.6, 2.4, { x: 0, y: 0, z: 142, rotateX: 0, rotateY: 0, rotateZ: 0 }]] },
            { target: bookSlot, initial: { x: 148, y: 128, z: -108, rotateY: -8, rotateZ: -8 }, steps: [[0, 2.6, { x: 118, y: 82, z: -18, rotateY: -4, rotateZ: -4 }], [2.75, 2.7, { x: -62, y: -30, z: 172, rotateY: 2, rotateZ: -10 }], [5.6, 2.45, { x: 0, y: 0, z: 198, rotateY: 0, rotateZ: 0 }]] },
            { target: bookConfirm, initial: { x: -116, y: 118, z: -128, rotateX: -8, rotateY: 7, rotateZ: 8 }, steps: [[0, 2.6, { x: -78, y: 74, z: -34, rotateX: -4, rotateY: 3, rotateZ: 4 }], [2.85, 2.65, { x: 52, y: -22, z: 124, rotateX: 1, rotateY: -2, rotateZ: 7 }], [5.65, 2.4, { x: 0, y: 0, z: 156, rotateX: 0, rotateY: 0, rotateZ: 0 }]] },
          ];

          covers.forEach((cover, index) => gsap.set(cover, { yPercent: index === 0 ? 0 : 100, zIndex: 4 - index, force3D: true }));
          const pinDistance = isMobile ? () => Math.round(window.innerHeight * 14.5) : isTablet ? () => Math.round(window.innerHeight * 16.5) : () => Math.round(window.innerHeight * 18);
          const sequence = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: coversContainer, start: 'top top', end: () => `+=${pinDistance()}`, pin: true, scrub: 0.72, anticipatePin: 1, invalidateOnRefresh: true } });
          const addScene = (start: number, tracks: Track[]) => tracks.forEach((track) => {
            set(track.target, track.initial, track.percent);
            track.steps.forEach(([at, duration, state]) => move(sequence, track.target, state, duration, start + at));
          });
          const scene = 12;
          addScene(0, restaurantTracks);
          addScene(scene, businessTracks);
          addScene(scene * 2, commerceTracks);
          addScene(scene * 3, bookingTracks);
          [restaurant, business, commerce].forEach((cover, index) => {
            const handoffStart = (index * scene) + 8.1;
            sequence.to(cover, { yPercent: -100, duration: 3.9 }, handoffStart);
            sequence.to(covers[index + 1], { yPercent: 0, duration: 3.9 }, handoffStart);
          });

          if (valueSection) {
            const exit = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { trigger: valueSection, start: 'top bottom', end: 'top 8%', scrub: 0.72, invalidateOnRefresh: true },
            });
            exit.to(booking, { yPercent: -100, duration: 1 }, 0);
            move(exit, bookCalendar, { y: -48, z: -82, rotateY: 3 }, 1, 0);
            move(exit, bookClock, { y: -60, z: 72, rotateZ: -4 }, 1, 0);
            move(exit, bookSlot, { y: -68, z: 118 }, 1, 0);
            move(exit, bookConfirm, { y: -74, z: 88, rotateZ: 3 }, 1, 0);
          }
          const textPass = (section: HTMLElement | null, start: string, end: string) => {
            const target = section?.querySelector<HTMLElement>('[data-depth-content]');
            if (target) gsap.fromTo(target, { yPercent: 8, opacity: 0.75 }, { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: section, start, end, scrub: 1.1 } });
          };
          textPass(valueSection, 'top 85%', 'center center');
          textPass(ctaSection, 'top 90%', 'top 40%');
        }
      );
      ScrollTrigger.refresh();
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    return () => { window.removeEventListener('resize', refresh); context.revert(); media.revert(); };
  }, []);

  return null;
}
