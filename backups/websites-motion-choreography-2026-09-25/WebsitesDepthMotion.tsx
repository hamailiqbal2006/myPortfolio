'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Depth = { x?: number; y?: number; z: number; rotateX?: number; rotateY?: number; rotateZ?: number };
type Layer = { element: HTMLElement | null; initial: Depth; focal: Depth; exit?: Depth; xPercent?: number; yPercent?: number };

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
          const focalDuration = isMobile ? 2.2 : 2.6;
          const handoffDuration = isMobile ? 1.15 : 1.4;
          const scale = (values: Depth): Depth => ({
            x: values.x === undefined ? undefined : Math.round(values.x * depth),
            y: values.y === undefined ? undefined : Math.round(values.y * depth),
            z: Math.round(values.z * depth),
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
          const element = (cover: HTMLElement, name: string) => cover.querySelector<HTMLElement>(`[data-depth-elem="${name}"]`);
          const restaurantLayers: Layer[] = [
            { element: element(restaurant, 'rest-plate'), xPercent: -50, yPercent: -50, initial: { z: -430, y: 76, rotateX: 9, rotateY: -8 }, focal: { z: 70, y: 0 }, exit: { z: 155, y: -30, rotateX: -3 } },
            { element: element(restaurant, 'rest-fork'), yPercent: -50, initial: { z: -330, x: -52, y: 90, rotateY: -7, rotateZ: 4 }, focal: { z: 115, x: 0, y: 0 }, exit: { z: 165, x: -35, y: -30, rotateZ: 3 } },
            { element: element(restaurant, 'rest-spoon'), yPercent: -50, initial: { z: -315, x: 54, y: 94, rotateY: 7, rotateZ: -4 }, focal: { z: 105, x: 0, y: 0 }, exit: { z: 155, x: 35, y: -30, rotateZ: -3 } },
            { element: element(restaurant, 'rest-chef-special'), initial: { z: -240, x: -28, y: 68, rotateX: 7, rotateY: -6 }, focal: { z: 165, x: 0, y: 0 }, exit: { z: 205, y: -35, rotateX: -2 } },
            { element: element(restaurant, 'rest-rail'), initial: { z: -300, y: 36 }, focal: { z: 18, y: 0 } },
          ];
          const businessLayers: Layer[] = [
            { element: element(business, 'biz-board-main'), xPercent: -50, yPercent: -50, initial: { z: -400, y: 72, rotateY: 9 }, focal: { z: 70, y: 0 }, exit: { z: 145, y: -28, rotateY: -3 } },
            { element: element(business, 'biz-board-secondary'), initial: { z: -490, x: -60, y: 72, rotateY: -10 }, focal: { z: -115, x: 0, y: 0 }, exit: { z: -90, y: -20 } },
            { element: element(business, 'biz-inquiry-card'), initial: { z: -275, x: 46, y: 92, rotateX: 8, rotateY: -5 }, focal: { z: 175, x: 0, y: 0 }, exit: { z: 220, y: -34, rotateX: -2 } },
          ];
          const commerceLayers: Layer[] = [
            { element: element(commerce, 'shop-plinth'), initial: { z: -210, y: 44 }, focal: { z: 18, y: 0 } },
            { element: element(commerce, 'shop-box-primary'), xPercent: -50, yPercent: -50, initial: { z: -420, y: 78, rotateY: -10 }, focal: { z: 78, y: 0 }, exit: { z: 155, y: -30, rotateY: 3 } },
            { element: element(commerce, 'shop-box-secondary'), initial: { z: -500, x: -52, y: 72, rotateY: -9 }, focal: { z: -125, x: 0, y: 0 }, exit: { z: -100, y: -18 } },
            { element: element(commerce, 'shop-bag'), initial: { z: -280, x: 62, y: 94, rotateY: 9 }, focal: { z: 185, x: 0, y: 0 }, exit: { z: 225, y: -34, rotateY: -3 } },
          ];
          const bookingLayers: Layer[] = [
            { element: element(booking, 'book-cal'), initial: { z: -465, x: -42, y: 78, rotateY: -9 }, focal: { z: -32, x: 0, y: 0 } },
            { element: element(booking, 'book-clock'), initial: { z: -325, x: 50, y: 82, rotateX: 9, rotateY: 7 }, focal: { z: 135, x: 0, y: 0 } },
            { element: element(booking, 'book-slot-focal'), initial: { z: -255, x: 46, y: 96 }, focal: { z: 205, x: 0, y: 0 } },
            { element: element(booking, 'book-confirm-card'), initial: { z: -295, x: -40, y: 90, rotateX: -7 }, focal: { z: 155, x: 0, y: 0 } },
          ];
          const allLayers = [restaurantLayers, businessLayers, commerceLayers, bookingLayers];
          const setLayers = (layers: Layer[]) => layers.forEach(({ element: target, initial, xPercent = 0, yPercent = 0 }) => {
            if (target) gsap.set(target, { xPercent, yPercent, ...scale(initial), force3D: true });
          });
          const animate = (timeline: gsap.core.Timeline, layers: Layer[], position: number, state: 'focal' | 'exit', duration: number) => layers.forEach((layer) => {
            const values = layer[state];
            if (layer.element && values) timeline.to(layer.element, { ...scale(values), duration }, position);
          });
          allLayers.forEach(setLayers);

          // Covers are 2D handoff sheets; each artwork container alone owns a perspective.
          // This keeps the Z change visible relative to a stationary cover and never blurs text.
          covers.forEach((cover, index) => gsap.set(cover, { yPercent: index === 0 ? 0 : 100, zIndex: 4 - index, opacity: 1, rotateX: 0, z: 0, force3D: true }));

          const pinDistance = isMobile ? () => Math.round(window.innerHeight * 6.4) : isTablet ? () => Math.round(window.innerHeight * 7.6) : () => Math.round(window.innerHeight * 8.8);
          const sequence = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: coversContainer, start: 'top top', end: () => `+=${pinDistance()}`, pin: true, scrub: isMobile ? 0.8 : 1.25, anticipatePin: 1, invalidateOnRefresh: true },
          });
          const second = focalDuration + handoffDuration;
          const third = second + focalDuration + handoffDuration;
          const fourth = third + focalDuration + handoffDuration;
          animate(sequence, restaurantLayers, 0, 'focal', focalDuration);
          animate(sequence, restaurantLayers, focalDuration, 'exit', handoffDuration);
          sequence.to(restaurant, { yPercent: -100, duration: handoffDuration }, focalDuration).to(business, { yPercent: 0, duration: handoffDuration }, focalDuration);
          animate(sequence, businessLayers, second, 'focal', focalDuration);
          animate(sequence, businessLayers, second + focalDuration, 'exit', handoffDuration);
          sequence.to(business, { yPercent: -100, duration: handoffDuration }, second + focalDuration).to(commerce, { yPercent: 0, duration: handoffDuration }, second + focalDuration);
          animate(sequence, commerceLayers, third, 'focal', focalDuration);
          animate(sequence, commerceLayers, third + focalDuration, 'exit', handoffDuration);
          sequence.to(commerce, { yPercent: -100, duration: handoffDuration }, third + focalDuration).to(booking, { yPercent: 0, duration: handoffDuration }, third + focalDuration);
          animate(sequence, bookingLayers, fourth, 'focal', focalDuration);

          if (valueSection) {
            const exit = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: valueSection, start: 'top bottom', end: 'top 20%', scrub: isMobile ? 0.8 : 1.25 } });
            exit.to(booking, { yPercent: -70, duration: 1 }, 0);
            bookingLayers.forEach((layer) => { if (layer.element) exit.to(layer.element, { z: Math.round((layer.focal.z - 120) * depth), duration: 1 }, 0); });
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
