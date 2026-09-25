'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type TransformState = {
  x?: number;
  y?: number;
  z?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
};
type PercentState = { xPercent?: number; yPercent?: number };
type MotionTarget = HTMLElement | null;

export function ShopifyDepthMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.querySelector<HTMLElement>('[data-shopify-depth]');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const coversContainer = root.querySelector<HTMLElement>('[data-covers-container]');
    const covers = Array.from(root.querySelectorAll<HTMLElement>('[data-service-cover]'));
    if (!coversContainer || covers.length !== 4) return;

    const hero = root.querySelector<HTMLElement>('[data-depth-hero]');
    const transition = root.querySelector<HTMLElement>('[data-depth-transition]');
    const sellingSection = root.querySelector<HTMLElement>('[data-depth-selling]');
    const ctaSection = root.querySelector<HTMLElement>('[data-depth-cta]');

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          isDesktop: '(min-width: 1025px)',
          isTablet: '(min-width: 769px) and (max-width: 1024px)',
          isMobile: '(max-width: 768px)',
        },
        (mediaContext) => {
          const { isTablet, isMobile } = mediaContext.conditions as {
            isTablet: boolean;
            isMobile: boolean;
          };

          const zFactor = isMobile ? 0.48 : isTablet ? 0.72 : 1.0;
          const rotFactor = isMobile ? 0.45 : isTablet ? 0.75 : 1.0;
          const distFactor = isMobile ? 0.55 : isTablet ? 0.78 : 1.0;

          const scale = (values: TransformState): TransformState => ({
            x: values.x === undefined ? undefined : Math.round(values.x * distFactor),
            y: values.y === undefined ? undefined : Math.round(values.y * distFactor),
            z: values.z === undefined ? undefined : Math.round(values.z * zFactor),
            rotateX: values.rotateX === undefined ? undefined : +(values.rotateX * rotFactor).toFixed(2),
            rotateY: values.rotateY === undefined ? undefined : +(values.rotateY * rotFactor).toFixed(2),
            rotateZ: values.rotateZ === undefined ? undefined : +(values.rotateZ * rotFactor).toFixed(2),
          });

          // 1. HERO DEPTH TIMELINE
          if (hero) {
            const heroTl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.1,
              },
            });
            const identity = hero.querySelector<HTMLElement>('[data-hero-identity]');
            const line1 = hero.querySelector<HTMLElement>('[data-depth-hero-line="1"]');
            const line2 = hero.querySelector<HTMLElement>('[data-depth-hero-line="2"]');
            const eyebrow = hero.querySelector<HTMLElement>('[data-depth-hero-eyebrow]');
            const copy = hero.querySelector<HTMLElement>('[data-depth-hero-copy]');

            if (identity) heroTl.to(identity, { yPercent: isMobile ? -4 : -7, opacity: 0.9 }, 0);
            if (line1) heroTl.to(line1, { yPercent: isMobile ? -3 : -5 }, 0);
            if (line2) heroTl.to(line2, { yPercent: isMobile ? -5 : -8 }, 0);
            if (eyebrow) heroTl.to(eyebrow, { yPercent: -3, opacity: 0.45 }, 0);
            if (copy) heroTl.to(copy, { yPercent: -4, opacity: 0.65 }, 0);
          }

          // 2. TRANSITION SECTION DEPTH
          if (transition) {
            const content = transition.querySelector<HTMLElement>('[data-depth-content]');
            if (content) {
              gsap.fromTo(
                content,
                { yPercent: isMobile ? 5 : 8, opacity: 0.72 },
                {
                  yPercent: -5,
                  opacity: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: transition,
                    start: 'top 85%',
                    end: 'bottom top+=10%',
                    scrub: 1.1,
                  },
                }
              );
            }
          }

          // 3. SERVICE COVERS 3D CHOREOGRAPHY
          const [coverStorefront, coverProducts, coverCheckout, coverOperations] = covers;
          const find = (cover: HTMLElement, name: string) =>
            cover.querySelector<HTMLElement>(`[data-depth-elem="${name}"]`);

          // Scene 1 Elements
          const shopStorePlane = find(coverStorefront, 'shop-store-plane');
          const shopStoreSheet = find(coverStorefront, 'shop-store-sheet');
          const shopStoreCard = find(coverStorefront, 'shop-store-card');
          const shopStoreRail = find(coverStorefront, 'shop-store-rail');

          // Scene 2 Elements
          const shopProdPlinth = find(coverProducts, 'shop-prod-plinth');
          const shopProdBoxPri = find(coverProducts, 'shop-prod-box-pri');
          const shopProdBoxSec = find(coverProducts, 'shop-prod-box-sec');
          const shopProdTag = find(coverProducts, 'shop-prod-tag');
          const shopProdRail = find(coverProducts, 'shop-prod-rail');

          // Scene 3 Elements
          const shopCartBag = find(coverCheckout, 'shop-cart-bag');
          const shopCartSheet = find(coverCheckout, 'shop-cart-sheet');
          const shopCartCard = find(coverCheckout, 'shop-cart-card');
          const shopCartTag = find(coverCheckout, 'shop-cart-tag');
          const shopCartRail = find(coverCheckout, 'shop-cart-rail');

          // Scene 4 Elements
          const shopOpsBoard = find(coverOperations, 'shop-ops-board');
          const shopOpsInventory = find(coverOperations, 'shop-ops-inventory');
          const shopOpsSlip = find(coverOperations, 'shop-ops-slip');
          const shopOpsApp = find(coverOperations, 'shop-ops-app');
          const shopOpsRail = find(coverOperations, 'shop-ops-rail');

          const set = (target: MotionTarget, state: TransformState, percent: PercentState = {}) => {
            if (target) gsap.set(target, { ...percent, ...scale(state), force3D: true });
          };
          const move = (
            timeline: gsap.core.Timeline,
            target: MotionTarget,
            state: TransformState,
            duration: number,
            position: number
          ) => {
            if (target) timeline.to(target, { ...scale(state), duration }, position);
          };

          type Track = {
            target: MotionTarget;
            initial: TransformState;
            percent?: PercentState;
            steps: Array<[number, number, TransformState]>;
          };

          // Scene 1 Tracks (Arrival ~2.4, Focal ~5.0, Handoff ~3.6)
          const storefrontTracks: Track[] = [
            {
              target: shopStorePlane,
              percent: { xPercent: -50, yPercent: -50 },
              initial: { y: 50, z: -240, rotateY: 6 },
              steps: [
                [0, 2.4, { y: 22, z: -70, rotateY: 3 }],
                [2.4, 4.8, { y: 0, z: 45, rotateY: 0 }],
                [7.8, 3.6, { y: -30, z: 70, rotateY: -2 }],
              ],
            },
            {
              target: shopStoreSheet,
              initial: { x: -25, y: 40, z: -300, rotateY: -6 },
              steps: [
                [0, 2.4, { x: -16, y: 20, z: -210, rotateY: -4 }],
                [2.4, 4.8, { x: 0, y: 0, z: -140, rotateY: 0 }],
                [7.8, 3.6, { x: -15, y: -20, z: -160 }],
              ],
            },
            {
              target: shopStoreCard,
              initial: { x: 25, y: 65, z: -170, rotateX: 6, rotateY: -4 },
              steps: [
                [0, 2.4, { x: 14, y: 32, z: -20, rotateX: 3, rotateY: -2 }],
                [2.4, 4.8, { x: 0, y: 0, z: 125, rotateX: 0, rotateY: 0 }],
                [7.8, 3.6, { x: 15, y: -35, z: 140 }],
              ],
            },
            {
              target: shopStoreRail,
              initial: { y: 30, z: -100 },
              steps: [
                [0, 2.4, { y: 10, z: -30 }],
                [2.4, 4.8, { y: 0, z: 10 }],
              ],
            },
          ];

          // Scene 2 Tracks (Arrival ~2.4, Focal ~5.0, Handoff ~3.6)
          const productsTracks: Track[] = [
            {
              target: shopProdPlinth,
              percent: { xPercent: -50 },
              initial: { y: 45, z: -120 },
              steps: [
                [0, 2.4, { y: 18, z: -40 }],
                [2.4, 4.8, { y: 0, z: 10 }],
                [7.8, 3.6, { y: -20, z: 25 }],
              ],
            },
            {
              target: shopProdBoxPri,
              percent: { xPercent: -50, yPercent: -50 },
              initial: { y: 55, z: -250, rotateY: -8 },
              steps: [
                [0, 2.4, { y: 25, z: -80, rotateY: -4 }],
                [2.4, 4.8, { y: 0, z: 50, rotateY: 0 }],
                [7.8, 3.6, { y: -30, z: 75, rotateY: 2 }],
              ],
            },
            {
              target: shopProdBoxSec,
              initial: { x: -25, y: 45, z: -310, rotateY: -6 },
              steps: [
                [0, 2.4, { x: -15, y: 22, z: -220, rotateY: -3 }],
                [2.4, 4.8, { x: 0, y: 0, z: -140, rotateY: 0 }],
                [7.8, 3.6, { x: -15, y: -20, z: -160 }],
              ],
            },
            {
              target: shopProdTag,
              initial: { x: 30, y: 65, z: -180, rotateX: 5, rotateY: 5 },
              steps: [
                [0, 2.4, { x: 18, y: 32, z: -30, rotateX: 2, rotateY: 2 }],
                [2.4, 4.8, { x: 0, y: 0, z: 130, rotateX: 0, rotateY: 0 }],
                [7.8, 3.6, { x: 15, y: -35, z: 145 }],
              ],
            },
            {
              target: shopProdRail,
              initial: { y: 30, z: -100 },
              steps: [
                [0, 2.4, { y: 10, z: -30 }],
                [2.4, 4.8, { y: 0, z: 10 }],
              ],
            },
          ];

          // Scene 3 Tracks (Arrival ~2.4, Focal ~5.0, Handoff ~3.6)
          const checkoutTracks: Track[] = [
            {
              target: shopCartBag,
              percent: { xPercent: -50, yPercent: -50 },
              initial: { x: 25, y: 50, z: -210, rotateY: 7 },
              steps: [
                [0, 2.4, { x: 12, y: 22, z: -60, rotateY: 3 }],
                [2.4, 4.8, { x: 0, y: 0, z: 45, rotateY: 0 }],
                [7.8, 3.6, { x: -10, y: -30, z: 70 }],
              ],
            },
            {
              target: shopCartSheet,
              initial: { x: -25, y: 45, z: -290, rotateY: -6 },
              steps: [
                [0, 2.4, { x: -15, y: 20, z: -200, rotateY: -3 }],
                [2.4, 4.8, { x: 0, y: 0, z: -135, rotateY: 0 }],
                [7.8, 3.6, { x: -15, y: -20, z: -155 }],
              ],
            },
            {
              target: shopCartCard,
              initial: { x: 25, y: 70, z: -165, rotateX: 6, rotateY: -5 },
              steps: [
                [0, 2.4, { x: 14, y: 32, z: -20, rotateX: 3, rotateY: -2 }],
                [2.4, 4.8, { x: 0, y: 0, z: 135, rotateX: 0, rotateY: 0 }],
                [7.8, 3.6, { x: 15, y: -35, z: 145 }],
              ],
            },
            {
              target: shopCartTag,
              initial: { y: 35, z: -180 },
              steps: [
                [0, 2.4, { y: 15, z: -50 }],
                [2.4, 4.8, { y: 0, z: 85 }],
                [7.8, 3.6, { y: -20, z: 95 }],
              ],
            },
            {
              target: shopCartRail,
              initial: { y: 30, z: -100 },
              steps: [
                [0, 2.4, { y: 10, z: -30 }],
                [2.4, 4.8, { y: 0, z: 10 }],
              ],
            },
          ];

          // Scene 4 Tracks (Arrival ~2.4, Focal ~5.0, Handoff ~3.6)
          const operationsTracks: Track[] = [
            {
              target: shopOpsBoard,
              percent: { xPercent: -50, yPercent: -50 },
              initial: { y: 50, z: -230, rotateY: 6 },
              steps: [
                [0, 2.4, { y: 22, z: -65, rotateY: 3 }],
                [2.4, 4.8, { y: 0, z: 45, rotateY: 0 }],
                [7.8, 3.6, { y: -20, z: 65 }],
              ],
            },
            {
              target: shopOpsInventory,
              initial: { x: -25, y: 45, z: -300, rotateY: -6 },
              steps: [
                [0, 2.4, { x: -15, y: 20, z: -210, rotateY: -3 }],
                [2.4, 4.8, { x: 0, y: 0, z: -145, rotateY: 0 }],
                [7.8, 3.6, { x: -15, y: -20, z: -160 }],
              ],
            },
            {
              target: shopOpsSlip,
              initial: { x: 25, y: 65, z: -170, rotateX: 5, rotateY: -4 },
              steps: [
                [0, 2.4, { x: 14, y: 32, z: -20, rotateX: 2, rotateY: -2 }],
                [2.4, 4.8, { x: 0, y: 0, z: 135, rotateX: 0, rotateY: 0 }],
                [7.8, 3.6, { x: 15, y: -35, z: 145 }],
              ],
            },
            {
              target: shopOpsApp,
              initial: { y: 35, z: -180 },
              steps: [
                [0, 2.4, { y: 15, z: -50 }],
                [2.4, 4.8, { y: 0, z: 80 }],
                [7.8, 3.6, { y: -20, z: 90 }],
              ],
            },
            {
              target: shopOpsRail,
              initial: { y: 30, z: -100 },
              steps: [
                [0, 2.4, { y: 10, z: -30 }],
                [2.4, 4.8, { y: 0, z: 10 }],
              ],
            },
          ];

          // Stacking setup: Cover 0 at base, subsequent covers below
          covers.forEach((cover, index) => {
            gsap.set(cover, {
              yPercent: index === 0 ? 0 : 100,
              zIndex: 4 - index,
              force3D: true,
            });
          });

          const pinDistance = isMobile
            ? () => Math.round(window.innerHeight * 3.2)
            : isTablet
            ? () => Math.round(window.innerHeight * 4.5)
            : () => Math.round(window.innerHeight * 5.8);

          const sequence = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: coversContainer,
              start: 'top top',
              end: () => `+=${pinDistance()}`,
              pin: true,
              scrub: isMobile ? 0.45 : 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          const addScene = (start: number, tracks: Track[]) =>
            tracks.forEach((track) => {
              set(track.target, track.initial, track.percent);
              track.steps.forEach(([at, duration, state]) =>
                move(sequence, track.target, state, duration, start + at)
              );
            });

          const sceneDuration = 11.4;
          addScene(0, storefrontTracks);
          addScene(sceneDuration, productsTracks);
          addScene(sceneDuration * 2, checkoutTracks);
          addScene(sceneDuration * 3, operationsTracks);

          // Cover handoff transitions
          [coverStorefront, coverProducts, coverCheckout].forEach((cover, index) => {
            const handoffStart = index * sceneDuration + 7.8;
            sequence.to(
              cover,
              {
                yPercent: -105,
                z: scale({ z: 160 }).z,
                rotateX: scale({ rotateX: -2.0 }).rotateX,
                duration: 3.6,
              },
              handoffStart
            );
            sequence.fromTo(
              covers[index + 1],
              {
                yPercent: 100,
                z: scale({ z: -300 }).z,
                rotateX: scale({ rotateX: 3.0 }).rotateX,
              },
              {
                yPercent: 0,
                z: 0,
                rotateX: 0,
                duration: 3.6,
              },
              handoffStart
            );
          });

          // 4. BUILT FOR SELLING SECTION TRANSITION (Smooth unpin without gap)
          if (sellingSection) {
            const exitTl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: sellingSection,
                start: 'top bottom',
                end: 'top 10%',
                scrub: isMobile ? 0.45 : 0.65,
                invalidateOnRefresh: true,
              },
            });

            exitTl.to(coverOperations, { yPercent: -105, z: scale({ z: 140 }).z, duration: 1 }, 0);
            move(exitTl, shopOpsBoard, { y: -45, z: 85 }, 1, 0);
            move(exitTl, shopOpsSlip, { y: -50, z: 155 }, 1, 0);

            // Subtle parallax for Built For Selling title
            const sellTitle = sellingSection.querySelector<HTMLElement>('[data-depth-text]');
            if (sellTitle) {
              exitTl.fromTo(
                sellTitle,
                { yPercent: isMobile ? 8 : 12, opacity: 0.8 },
                { yPercent: 0, opacity: 1, duration: 1 },
                0
              );
            }
          }

          // 5. CTA SECTION SUBTLE DEPTH
          if (ctaSection) {
            const ctaHead = ctaSection.querySelector<HTMLElement>('[data-depth-text]');
            if (ctaHead) {
              gsap.fromTo(
                ctaHead,
                { yPercent: isMobile ? 8 : 12, opacity: 0.8 },
                {
                  yPercent: 0,
                  opacity: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: ctaSection,
                    start: 'top 85%',
                    end: 'bottom 85%',
                    scrub: 1.1,
                  },
                }
              );
            }
          }
        }
      );
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
