'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function WebsitesDepthMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.querySelector<HTMLElement>('[data-websites-depth]');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const coversContainer = root.querySelector<HTMLElement>('[data-covers-container]');
    const covers = Array.from(root.querySelectorAll<HTMLElement>('[data-service-cover]'));
    const hero = root.querySelector<HTMLElement>('[data-depth-hero]');
    const transition = root.querySelector<HTMLElement>('[data-depth-transition]');
    const valueSection = root.querySelector<HTMLElement>('[data-depth-value]');
    const ctaSection = root.querySelector<HTMLElement>('[data-depth-cta]');

    if (!coversContainer || covers.length < 4) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          isDesktop: '(min-width: 1025px)',
          isTablet: '(min-width: 769px) and (max-width: 1024px)',
          isMobile: '(max-width: 768px)',
        },
        (context) => {
          const { isTablet, isMobile } = context.conditions as {
            isDesktop: boolean;
            isTablet: boolean;
            isMobile: boolean;
          };

          // ==================================================
          // 1. HERO SECTION DEPTH (Homepage style, restrained)
          // ==================================================
          if (hero) {
            const line1 = hero.querySelector<HTMLElement>('[data-depth-hero-line="1"]');
            const line2 = hero.querySelector<HTMLElement>('[data-depth-hero-line="2"]');
            const copy = hero.querySelector<HTMLElement>('[data-depth-hero-copy]');

            const heroTl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5,
              },
            });

            if (line1) {
              heroTl.to(line1, { yPercent: isMobile ? -5 : -9, z: isMobile ? -35 : -75, opacity: 0.65 }, 0);
            }
            if (line2) {
              heroTl.to(line2, { yPercent: isMobile ? -8 : -14, z: isMobile ? -50 : -115, opacity: 0.55 }, 0);
            }
            if (copy) {
              heroTl.to(copy, { yPercent: -6, opacity: 0.45 }, 0);
            }
          }

          // ==================================================
          // 2. "WHAT CAN I BUILD FOR YOU?" TRANSITION
          // ==================================================
          if (transition) {
            const transContent = transition.querySelector<HTMLElement>('[data-depth-content]');
            if (transContent) {
              gsap.fromTo(
                transContent,
                { yPercent: isMobile ? 8 : 10, opacity: 0.65, z: isMobile ? -25 : -65 },
                {
                  yPercent: 0,
                  opacity: 1,
                  z: 0,
                  ease: 'power1.out',
                  scrollTrigger: {
                    trigger: transition,
                    start: 'top 85%',
                    end: 'center center',
                    scrub: 0.5,
                  },
                }
              );
            }
          }

          // ==================================================
          // 3. OVERLAPPING PHYSICAL COVERS MOTION
          // One physical cover passes over another. No fade-based scene changes.
          // ==================================================
          const zOutgoing = isMobile ? 40 : isTablet ? 85 : 135;
          const zIncoming = isMobile ? -75 : isTablet ? -160 : -240;
          const yOutgoing = isMobile ? -105 : -108;
          const yIncoming = isMobile ? 8 : 10;
          const scaleOutgoing = isMobile ? 1.012 : 1.035;
          const scaleIncoming = isMobile ? 0.97 : 0.92;
          const rotOutgoing = isMobile ? -0.6 : -2.4;
          const rotIncoming = isMobile ? 0.9 : 2.5;

          const [cover0, cover1, cover2, cover3] = covers;

          // Set initial stacking & 3D placement:
          // Cover 0 (Restaurant): focal position
          gsap.set(cover0, {
            zIndex: 4,
            xPercent: -50,
            yPercent: 0,
            z: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            pointerEvents: 'auto',
          });

          // Cover 1 (Business): already visibly underneath/behind Cover 0
          gsap.set(cover1, {
            zIndex: 3,
            xPercent: -50,
            yPercent: yIncoming,
            z: zIncoming,
            scale: scaleIncoming,
            rotateX: rotIncoming,
            opacity: 0.85,
            pointerEvents: 'none',
          });

          // Cover 2 (E-Commerce): waiting deeper in space
          gsap.set(cover2, {
            zIndex: 2,
            xPercent: -50,
            yPercent: yIncoming * 1.6,
            z: zIncoming * 1.6,
            scale: scaleIncoming * 0.94,
            rotateX: rotIncoming * 1.3,
            opacity: 0.55,
            pointerEvents: 'none',
          });

          // Cover 3 (Booking): waiting deepest
          gsap.set(cover3, {
            zIndex: 1,
            xPercent: -50,
            yPercent: yIncoming * 2.2,
            z: zIncoming * 2.2,
            scale: scaleIncoming * 0.88,
            rotateX: rotIncoming * 1.6,
            opacity: 0.28,
            pointerEvents: 'none',
          });

          // Background cover headlines are softened so active headline is dominant
          const textCols = covers.map((c) => c.querySelector<HTMLElement>('[data-depth-text]'));
          if (textCols[1]) gsap.set(textCols[1], { opacity: 0.55 });
          if (textCols[2]) gsap.set(textCols[2], { opacity: 0.35 });
          if (textCols[3]) gsap.set(textCols[3], { opacity: 0.15 });

          // MAIN TIMELINE: scrubbed 1:1 with coversContainer scroll track
          const coversTl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: coversContainer,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.45,
            },
          });

          // ==================================================
          // --- STAGE 1: COVER 0 (Restaurant) -> COVER 1 (Business) ---
          // Progress: 0.00 to 0.30
          // Cover 0 physically glides UP and FORWARD over Cover 1
          // ==================================================
          coversTl.to(
            cover0,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              duration: 0.30,
              onComplete: () => {
                cover0.style.pointerEvents = 'none';
              },
            },
            0
          );

          // Cover 0 stays fully opaque through most of passing, then clears at top edge
          coversTl.to(
            cover0,
            {
              opacity: 0,
              duration: 0.08,
            },
            0.22
          );

          // Cover 1 rises simultaneously from behind into focal position
          coversTl.to(
            cover1,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              duration: 0.30,
              onStart: () => {
                cover1.style.pointerEvents = 'auto';
              },
            },
            0.02
          );

          if (textCols[1]) {
            coversTl.to(textCols[1], { opacity: 1, duration: 0.24 }, 0.08);
          }

          // Cover 2 advances from deep background to next-in-line
          coversTl.to(
            cover2,
            {
              yPercent: yIncoming,
              z: zIncoming,
              scale: scaleIncoming,
              rotateX: rotIncoming,
              opacity: 0.85,
              duration: 0.30,
            },
            0.04
          );

          // Cover 3 advances
          coversTl.to(
            cover3,
            {
              yPercent: yIncoming * 1.6,
              z: zIncoming * 1.6,
              scale: scaleIncoming * 0.94,
              opacity: 0.55,
              duration: 0.30,
            },
            0.06
          );

          // Focal dwell on Cover 1
          coversTl.to({}, { duration: 0.05 });

          // ==================================================
          // --- STAGE 2: COVER 1 (Business) -> COVER 2 (E-Commerce) ---
          // Progress: 0.35 to 0.65
          // Cover 1 physically glides UP and FORWARD over Cover 2
          // ==================================================
          coversTl.to(
            cover1,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              duration: 0.30,
              onComplete: () => {
                cover1.style.pointerEvents = 'none';
              },
            },
            0.35
          );

          coversTl.to(
            cover1,
            {
              opacity: 0,
              duration: 0.08,
            },
            0.57
          );

          // Cover 2 rises simultaneously from behind into focal position
          coversTl.to(
            cover2,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              duration: 0.30,
              onStart: () => {
                cover2.style.pointerEvents = 'auto';
              },
            },
            0.37
          );

          if (textCols[2]) {
            coversTl.to(textCols[2], { opacity: 1, duration: 0.24 }, 0.43);
          }

          // Cover 3 advances to next-in-line
          coversTl.to(
            cover3,
            {
              yPercent: yIncoming,
              z: zIncoming,
              scale: scaleIncoming,
              rotateX: rotIncoming,
              opacity: 0.85,
              duration: 0.30,
            },
            0.39
          );

          // Focal dwell on Cover 2
          coversTl.to({}, { duration: 0.05 });

          // ==================================================
          // --- STAGE 3: COVER 2 (E-Commerce) -> COVER 3 (Booking) ---
          // Progress: 0.70 to 0.94
          // Cover 2 physically glides UP and FORWARD over Cover 3
          // ==================================================
          coversTl.to(
            cover2,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              duration: 0.24,
              onComplete: () => {
                cover2.style.pointerEvents = 'none';
              },
            },
            0.70
          );

          coversTl.to(
            cover2,
            {
              opacity: 0,
              duration: 0.07,
            },
            0.87
          );

          // Cover 3 rises simultaneously into focal position
          coversTl.to(
            cover3,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              duration: 0.24,
              onStart: () => {
                cover3.style.pointerEvents = 'auto';
              },
            },
            0.72
          );

          if (textCols[3]) {
            coversTl.to(textCols[3], { opacity: 1, duration: 0.20 }, 0.76);
          }

          // ==================================================
          // --- STAGE 4: COVER 3 (Booking) EXITS INTO VALUE SECTION ---
          // Progress: 0.94 to 1.00
          // Cover 3 rises naturally, revealing portfolio background
          // ==================================================
          coversTl.to(
            cover3,
            {
              yPercent: isMobile ? -100 : -108,
              z: isMobile ? 30 : 90,
              scale: isMobile ? 1.01 : 1.025,
              rotateX: isMobile ? -0.5 : -2,
              duration: 0.06,
            },
            0.94
          );

          coversTl.to(
            cover3,
            {
              opacity: 0,
              duration: 0.03,
            },
            0.97
          );

          // ==================================================
          // 4. SUBTLE INTERNAL OBJECT PARALLAX (Desktop & Tablet)
          // Layered parallax inside covers while cover performs major motion
          // ==================================================
          if (!isMobile) {
            // Restaurant objects:
            // plate = main plane, fork/spoon = differential Z, chef/reservation = foreground
            const plate = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-plate"]');
            const fork = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-fork"]');
            const spoon = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-spoon"]');
            const chef = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-chef-special"]');

            if (plate) gsap.to(plate, { yPercent: -6, z: 20, ease: 'none', scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 } });
            if (fork) gsap.to(fork, { yPercent: 5, z: 40, rotateZ: -1.5, ease: 'none', scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 } });
            if (spoon) gsap.to(spoon, { yPercent: 5, z: 40, rotateZ: 1.5, ease: 'none', scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 } });
            if (chef) gsap.to(chef, { yPercent: -10, z: 55, ease: 'none', scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 } });

            // Business objects:
            // main board = primary plane, secondary slab = recessed, inquiry = foreground
            const bizMain = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-main"]');
            const bizSec = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-secondary"]');
            const bizInq = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-inquiry"]');

            if (bizMain) gsap.to(bizMain, { yPercent: -5, z: 20, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.4 } });
            if (bizSec) gsap.to(bizSec, { yPercent: -12, z: -15, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.4 } });
            if (bizInq) gsap.to(bizInq, { yPercent: 6, z: 50, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.4 } });

            // Commerce objects:
            // primary package = focus, secondary package = deeper, shopping bag = forward, checkout = foreground
            const shopPrimary = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-box-primary"]');
            const shopBag = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-bag"]');
            const shopSec = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-box-secondary"]');

            if (shopPrimary) gsap.to(shopPrimary, { yPercent: -6, z: 25, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.4 } });
            if (shopBag) gsap.to(shopBag, { yPercent: 5, z: 50, rotateZ: 1.2, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.4 } });
            if (shopSec) gsap.to(shopSec, { yPercent: -10, z: -25, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.4 } });

            // Booking objects:
            // calendar = main plane, clock = separate depth, selected time = foreground, confirmation = forward
            const bookClock = cover3.querySelector<HTMLElement>('[data-depth-elem="book-clock"]');
            const bookFocal = cover3.querySelector<HTMLElement>('[data-depth-elem="book-slot-focal"]');
            const bookCard = cover3.querySelector<HTMLElement>('[data-depth-elem="book-confirm-card"]');

            if (bookClock) gsap.to(bookClock, { yPercent: -6, z: 45, rotateZ: -2.5, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.4 } });
            if (bookFocal) gsap.to(bookFocal, { yPercent: 5, z: 55, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.4 } });
            if (bookCard) gsap.to(bookCard, { yPercent: -8, z: 50, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.4 } });
          }

          // ==================================================
          // 5. VALUE SECTION RETURN TO PORTFOLIO
          // ==================================================
          if (valueSection) {
            const valueContent = valueSection.querySelector<HTMLElement>('[data-depth-content]');
            if (valueContent) {
              gsap.fromTo(
                valueContent,
                { yPercent: isMobile ? 6 : 8, opacity: 0.5, z: isMobile ? -25 : -60 },
                {
                  yPercent: 0,
                  opacity: 1,
                  z: 0,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: valueSection,
                    start: 'top 85%',
                    end: 'center center',
                    scrub: 0.5,
                  },
                }
              );
            }
          }

          // ==================================================
          // 6. FINAL CTA
          // ==================================================
          if (ctaSection) {
            const ctaContent = ctaSection.querySelector<HTMLElement>('[data-depth-content]');
            if (ctaContent) {
              gsap.fromTo(
                ctaContent,
                { yPercent: isMobile ? 5 : 7, opacity: 0.55 },
                {
                  yPercent: 0,
                  opacity: 1,
                  ease: 'power1.out',
                  scrollTrigger: {
                    trigger: ctaSection,
                    start: 'top 90%',
                    end: 'top 40%',
                    scrub: 0.5,
                  },
                }
              );
            }
          }
        }
      );
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return null;
}
