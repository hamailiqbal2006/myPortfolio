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
                scrub: 0.55,
              },
            });

            if (line1) {
              heroTl.to(line1, { yPercent: isMobile ? -6 : -10, z: isMobile ? -40 : -85, opacity: 0.55 }, 0);
            }
            if (line2) {
              heroTl.to(line2, { yPercent: isMobile ? -10 : -16, z: isMobile ? -60 : -130, opacity: 0.45 }, 0);
            }
            if (copy) {
              heroTl.to(copy, { yPercent: -8, opacity: 0.35 }, 0);
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
                { yPercent: isMobile ? 8 : 12, opacity: 0.6, z: isMobile ? -30 : -80 },
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
          // ==================================================
          const zOutgoing = isMobile ? 45 : isTablet ? 90 : 140;
          const zIncoming = isMobile ? -85 : isTablet ? -180 : -280;
          const yOutgoing = isMobile ? -75 : -85;
          const yIncoming = isMobile ? 12 : 16;
          const scaleOutgoing = isMobile ? 1.012 : 1.038;
          const scaleIncoming = isMobile ? 0.96 : 0.90;
          const rotOutgoing = isMobile ? -0.8 : -2.2;
          const rotIncoming = isMobile ? 1.2 : 3.2;

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

          // Cover 1 (Business): waiting in depth behind Cover 0
          gsap.set(cover1, {
            zIndex: 3,
            xPercent: -50,
            yPercent: yIncoming,
            z: zIncoming,
            scale: scaleIncoming,
            rotateX: rotIncoming,
            opacity: 0.38,
            pointerEvents: 'none',
          });

          // Cover 2 (E-Commerce): waiting deeper
          gsap.set(cover2, {
            zIndex: 2,
            xPercent: -50,
            yPercent: yIncoming * 1.5,
            z: zIncoming * 1.5,
            scale: scaleIncoming * 0.92,
            rotateX: rotIncoming * 1.2,
            opacity: 0.15,
            pointerEvents: 'none',
          });

          // Cover 3 (Booking): waiting deepest
          gsap.set(cover3, {
            zIndex: 1,
            xPercent: -50,
            yPercent: yIncoming * 2,
            z: zIncoming * 2,
            scale: scaleIncoming * 0.85,
            rotateX: rotIncoming * 1.4,
            opacity: 0,
            pointerEvents: 'none',
          });

          // Dim background headlines to prevent text collisions during overlap
          const textCols = covers.map((c) => c.querySelector<HTMLElement>('[data-depth-text]'));
          if (textCols[1]) gsap.set(textCols[1], { opacity: 0.4 });
          if (textCols[2]) gsap.set(textCols[2], { opacity: 0.2 });
          if (textCols[3]) gsap.set(textCols[3], { opacity: 0 });

          // MAIN TIMELINE: scrubbed 1:1 with coversContainer scroll track
          const coversTl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: coversContainer,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.65,
            },
          });

          // --- STEP 1: COVER 0 (Restaurant) -> COVER 1 (Business) ---
          // Progress: 0.00 to 0.28
          coversTl.to(
            cover0,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              opacity: 0,
              duration: 0.28,
              onComplete: () => {
                cover0.style.pointerEvents = 'none';
              },
            },
            0
          );

          coversTl.to(
            cover1,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              duration: 0.28,
              onStart: () => {
                cover1.style.pointerEvents = 'auto';
              },
            },
            0.02
          );

          if (textCols[1]) {
            coversTl.to(textCols[1], { opacity: 1, duration: 0.22 }, 0.08);
          }

          coversTl.to(
            cover2,
            {
              yPercent: yIncoming,
              z: zIncoming,
              scale: scaleIncoming,
              rotateX: rotIncoming,
              opacity: 0.38,
              duration: 0.28,
            },
            0.04
          );

          // Dwell on Cover 1
          coversTl.to({}, { duration: 0.06 });

          // --- STEP 2: COVER 1 (Business) -> COVER 2 (E-Commerce) ---
          // Progress: 0.34 to 0.62
          coversTl.to(
            cover1,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              opacity: 0,
              duration: 0.28,
              onComplete: () => {
                cover1.style.pointerEvents = 'none';
              },
            },
            0.34
          );

          coversTl.to(
            cover2,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              duration: 0.28,
              onStart: () => {
                cover2.style.pointerEvents = 'auto';
              },
            },
            0.36
          );

          if (textCols[2]) {
            coversTl.to(textCols[2], { opacity: 1, duration: 0.22 }, 0.42);
          }

          coversTl.to(
            cover3,
            {
              yPercent: yIncoming,
              z: zIncoming,
              scale: scaleIncoming,
              rotateX: rotIncoming,
              opacity: 0.38,
              duration: 0.28,
            },
            0.38
          );

          // Dwell on Cover 2
          coversTl.to({}, { duration: 0.06 });

          // --- STEP 3: COVER 2 (E-Commerce) -> COVER 3 (Booking) ---
          // Progress: 0.68 to 0.92
          coversTl.to(
            cover2,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              opacity: 0,
              duration: 0.26,
              onComplete: () => {
                cover2.style.pointerEvents = 'none';
              },
            },
            0.68
          );

          coversTl.to(
            cover3,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              duration: 0.26,
              onStart: () => {
                cover3.style.pointerEvents = 'auto';
              },
            },
            0.70
          );

          if (textCols[3]) {
            coversTl.to(textCols[3], { opacity: 1, duration: 0.22 }, 0.76);
          }

          // --- STEP 4: COVER 3 (Booking) EXITS INTO PORTFOLIO VALUE SECTION ---
          // Progress: 0.94 to 1.00
          coversTl.to(
            cover3,
            {
              yPercent: isMobile ? -35 : -45,
              z: isMobile ? 30 : 70,
              scale: isMobile ? 1.01 : 1.02,
              opacity: 0.2,
              duration: 0.08,
            },
            0.94
          );

          // ==================================================
          // 4. SUBTLE INTERNAL OBJECT PARALLAX (Desktop & Tablet)
          // ==================================================
          if (!isMobile) {
            // Restaurant objects
            const plate = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-plate"]');
            const fork = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-fork"]');
            const spoon = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-spoon"]');
            const chef = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-chef-special"]');

            if (plate) gsap.to(plate, { yPercent: -8, z: 25, ease: 'none', scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.5 } });
            if (fork) gsap.to(fork, { yPercent: 6, z: 45, rotateZ: -2, ease: 'none', scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.5 } });
            if (spoon) gsap.to(spoon, { yPercent: 6, z: 45, rotateZ: 2, ease: 'none', scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.5 } });
            if (chef) gsap.to(chef, { yPercent: -12, z: 55, ease: 'none', scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.5 } });

            // Business objects
            const bizMain = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-main"]');
            const bizSec = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-secondary"]');
            const bizInq = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-inquiry"]');

            if (bizMain) gsap.to(bizMain, { yPercent: -6, z: 20, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.5 } });
            if (bizSec) gsap.to(bizSec, { yPercent: -14, z: -15, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.5 } });
            if (bizInq) gsap.to(bizInq, { yPercent: 8, z: 50, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.5 } });

            // Commerce objects
            const shopPrimary = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-box-primary"]');
            const shopBag = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-bag"]');
            const shopSec = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-box-secondary"]');

            if (shopPrimary) gsap.to(shopPrimary, { yPercent: -8, z: 30, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.5 } });
            if (shopBag) gsap.to(shopBag, { yPercent: 6, z: 55, rotateZ: 1.5, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.5 } });
            if (shopSec) gsap.to(shopSec, { yPercent: -12, z: -25, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.5 } });

            // Booking objects
            const bookClock = cover3.querySelector<HTMLElement>('[data-depth-elem="book-clock"]');
            const bookFocal = cover3.querySelector<HTMLElement>('[data-depth-elem="book-slot-focal"]');
            const bookCard = cover3.querySelector<HTMLElement>('[data-depth-elem="book-confirm-card"]');

            if (bookClock) gsap.to(bookClock, { yPercent: -8, z: 45, rotateZ: -3, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.5 } });
            if (bookFocal) gsap.to(bookFocal, { yPercent: 6, z: 60, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.5 } });
            if (bookCard) gsap.to(bookCard, { yPercent: -10, z: 50, ease: 'none', scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.5 } });
          }

          // ==================================================
          // 5. VALUE SECTION RETURN TO PORTFOLIO
          // ==================================================
          if (valueSection) {
            const valueContent = valueSection.querySelector<HTMLElement>('[data-depth-content]');
            if (valueContent) {
              gsap.fromTo(
                valueContent,
                { yPercent: isMobile ? 6 : 10, opacity: 0.45, z: isMobile ? -30 : -80 },
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
                { yPercent: isMobile ? 6 : 8, opacity: 0.5 },
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
