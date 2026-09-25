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
          // 1. HERO SECTION DEPTH & CONTINUITY
          // Homepage-aligned 3D depth: centered identity retreats in z-space.
          // ==================================================
          if (hero) {
            const heroIdentity = hero.querySelector<HTMLElement>('[data-hero-identity]');
            const line1 = hero.querySelector<HTMLElement>('[data-depth-hero-line="1"]');
            const line2 = hero.querySelector<HTMLElement>('[data-depth-hero-line="2"]');
            const eyebrow = hero.querySelector<HTMLElement>('[data-depth-hero-eyebrow]');
            const copy = hero.querySelector<HTMLElement>('[data-depth-hero-copy]');

            gsap.set(hero, { transformOrigin: '50% 50%', transformStyle: 'preserve-3d' });
            if (heroIdentity) {
              gsap.set(heroIdentity, { transformOrigin: '50% 50%', transformStyle: 'preserve-3d' });
            }

            const heroTl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2,
              },
            });

            if (heroIdentity) {
              heroTl.to(
                heroIdentity,
                {
                  yPercent: isMobile ? -5 : -8,
                  z: isMobile ? -25 : -70,
                  scale: 0.95,
                  rotateX: isMobile ? 0 : -3,
                  opacity: 0.92,
                },
                0
              );
            }

            if (line1) {
              heroTl.to(line1, { yPercent: isMobile ? -4 : -8, z: isMobile ? -20 : -45, opacity: 0.9 }, 0);
            }
            if (line2) {
              heroTl.to(line2, { yPercent: isMobile ? -7 : -12, z: isMobile ? -35 : -70, opacity: 0.85 }, 0);
            }
            if (eyebrow) {
              heroTl.to(eyebrow, { yPercent: isMobile ? -3 : -5, opacity: 0.4 }, 0);
            }
            if (copy) {
              heroTl.to(copy, { yPercent: isMobile ? -3 : -6, z: isMobile ? -10 : -25, opacity: 0.65 }, 0);
            }
          }

          // ==================================================
          // 2. "WHAT CAN I BUILD FOR YOU?" TRANSITION
          // Bridges Hero into Covers with subtle continuous opposing depth.
          // ==================================================
          if (transition) {
            const transContent = transition.querySelector<HTMLElement>('[data-depth-content]');
            const transLine1 = transition.querySelector<HTMLElement>('[data-depth-trans-line="1"]');
            const transLine2 = transition.querySelector<HTMLElement>('[data-depth-trans-line="2"]');

            if (transContent) {
              const transTl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                  trigger: transition,
                  start: 'top 85%',
                  end: 'bottom top+=15%',
                  scrub: 1.2,
                },
              });

              transTl.fromTo(
                transContent,
                { yPercent: isMobile ? 8 : 14, opacity: 0.7, z: isMobile ? -25 : -60 },
                { yPercent: -12, opacity: 1, z: 20, duration: 1 }
              );

              if (transLine1 && transLine2 && !isMobile) {
                transTl.fromTo(transLine1, { z: -35 }, { z: 25, duration: 1 }, 0);
                transTl.fromTo(transLine2, { z: -55 }, { z: 5, duration: 1 }, 0);
              }
            }
          }

          // ==================================================
          // 3. OVERLAPPING PHYSICAL COVERS MOTION
          // Preserves approved cover-over-cover choreography
          // Adds ambient highlight & surface light responses.
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

          // Initial stacking & placement
          gsap.set(cover0, {
            zIndex: 4,
            xPercent: -50,
            yPercent: 0,
            z: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            borderColor: 'rgba(244, 243, 238, 0.14)',
            boxShadow: '0 35px 80px -15px rgba(0, 0, 0, 0.9)',
            pointerEvents: 'auto',
          });

          gsap.set(cover1, {
            zIndex: 3,
            xPercent: -50,
            yPercent: yIncoming,
            z: zIncoming,
            scale: scaleIncoming,
            rotateX: rotIncoming,
            opacity: 0.85,
            borderColor: 'rgba(244, 243, 238, 0.06)',
            pointerEvents: 'none',
          });

          gsap.set(cover2, {
            zIndex: 2,
            xPercent: -50,
            yPercent: yIncoming * 1.6,
            z: zIncoming * 1.6,
            scale: scaleIncoming * 0.94,
            rotateX: rotIncoming * 1.3,
            opacity: 0.55,
            borderColor: 'rgba(244, 243, 238, 0.04)',
            pointerEvents: 'none',
          });

          gsap.set(cover3, {
            zIndex: 1,
            xPercent: -50,
            yPercent: yIncoming * 2.2,
            z: zIncoming * 2.2,
            scale: scaleIncoming * 0.88,
            rotateX: rotIncoming * 1.6,
            opacity: 0.35,
            borderColor: 'rgba(244, 243, 238, 0.04)',
            pointerEvents: 'none',
          });

          // Text columns start at high opacity for immediate legibility
          const textCols = covers.map((c) => c.querySelector<HTMLElement>('[data-depth-text]'));
          textCols.forEach((col, i) => {
            if (col) gsap.set(col, { opacity: i === 0 ? 1 : 0.85 });
          });

          const coversTl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: coversContainer,
              start: 'top top',
              end: '+=2400',
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });

          // Focal dwell on Cover 0 (Restaurant)
          coversTl.to({}, { duration: 0.06 });

          // --------------------------------------------------
          // STAGE 1: COVER 0 (Restaurant) -> COVER 1 (Business)
          // Progress: 0.06 to 0.35
          // Cover 0 physically passes UP & OVER Cover 1
          // --------------------------------------------------
          coversTl.to(
            cover0,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              borderColor: 'rgba(244, 243, 238, 0.05)',
              boxShadow: '0 45px 95px -10px rgba(0, 0, 0, 0.95)',
              duration: 0.30,
              onComplete: () => {
                cover0.style.pointerEvents = 'none';
              },
            },
            0.06
          );

          coversTl.to(
            cover0,
            {
              opacity: 0,
              duration: 0.08,
            },
            0.28
          );

          // Cover 1 rises into focal position
          coversTl.to(
            cover1,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              borderColor: 'rgba(244, 243, 238, 0.14)',
              boxShadow: '0 35px 80px -15px rgba(0, 0, 0, 0.9)',
              duration: 0.30,
              onStart: () => {
                cover1.style.pointerEvents = 'auto';
              },
            },
            0.08
          );

          if (textCols[1]) {
            coversTl.to(textCols[1], { opacity: 1, duration: 0.20 }, 0.14);
          }

          // Cover 2 advances in depth
          coversTl.to(
            cover2,
            {
              yPercent: yIncoming,
              z: zIncoming,
              scale: scaleIncoming,
              rotateX: rotIncoming,
              opacity: 0.85,
              borderColor: 'rgba(244, 243, 238, 0.06)',
              duration: 0.30,
            },
            0.10
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
            0.12
          );

          // Focal dwell on Cover 1
          coversTl.to({}, { duration: 0.05 });

          // --------------------------------------------------
          // STAGE 2: COVER 1 (Business) -> COVER 2 (E-Commerce)
          // Progress: 0.40 to 0.68
          // Cover 1 physically passes UP & OVER Cover 2
          // --------------------------------------------------
          coversTl.to(
            cover1,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              borderColor: 'rgba(244, 243, 238, 0.05)',
              boxShadow: '0 45px 95px -10px rgba(0, 0, 0, 0.95)',
              duration: 0.28,
              onComplete: () => {
                cover1.style.pointerEvents = 'none';
              },
            },
            0.40
          );

          coversTl.to(
            cover1,
            {
              opacity: 0,
              duration: 0.08,
            },
            0.60
          );

          // Cover 2 rises into focal position
          coversTl.to(
            cover2,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              borderColor: 'rgba(244, 243, 238, 0.14)',
              boxShadow: '0 35px 80px -15px rgba(0, 0, 0, 0.9)',
              duration: 0.28,
              onStart: () => {
                cover2.style.pointerEvents = 'auto';
              },
            },
            0.42
          );

          if (textCols[2]) {
            coversTl.to(textCols[2], { opacity: 1, duration: 0.20 }, 0.48);
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
              borderColor: 'rgba(244, 243, 238, 0.06)',
              duration: 0.28,
            },
            0.44
          );

          // Focal dwell on Cover 2
          coversTl.to({}, { duration: 0.05 });

          // --------------------------------------------------
          // STAGE 3: COVER 2 (E-Commerce) -> COVER 3 (Booking)
          // Progress: 0.72 to 0.94
          // Cover 2 physically passes UP & OVER Cover 3
          // --------------------------------------------------
          coversTl.to(
            cover2,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              scale: scaleOutgoing,
              rotateX: rotOutgoing,
              borderColor: 'rgba(244, 243, 238, 0.05)',
              boxShadow: '0 45px 95px -10px rgba(0, 0, 0, 0.95)',
              duration: 0.24,
              onComplete: () => {
                cover2.style.pointerEvents = 'none';
              },
            },
            0.72
          );

          coversTl.to(
            cover2,
            {
              opacity: 0,
              duration: 0.07,
            },
            0.89
          );

          // Cover 3 rises into focal position
          coversTl.to(
            cover3,
            {
              yPercent: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              borderColor: 'rgba(244, 243, 238, 0.14)',
              boxShadow: '0 35px 80px -15px rgba(0, 0, 0, 0.9)',
              duration: 0.24,
              onStart: () => {
                cover3.style.pointerEvents = 'auto';
              },
            },
            0.74
          );

          if (textCols[3]) {
            coversTl.to(textCols[3], { opacity: 1, duration: 0.18 }, 0.78);
          }

          // --------------------------------------------------
          // STAGE 4: COVER 3 (Booking) EXITS INTO VALUE SECTION
          // Progress: 0.94 to 1.00
          // Smooth rise revealing the portfolio canvas
          // --------------------------------------------------
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
          // 4. REFINED INTERNAL 3D OBJECT PARALLAX (Desktop & Tablet)
          // Layered parallax creates depth and living motion.
          // ==================================================
          if (!isMobile) {
            // RESTAURANT: Plate = primary anchor, fork/spoon = symmetrical depth, chef = foreground
            const plate = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-plate"]');
            const fork = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-fork"]');
            const spoon = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-spoon"]');
            const chef = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-chef-special"]');
            const rail = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-rail"]');

            if (plate) {
              gsap.to(plate, {
                yPercent: -5,
                z: 24,
                boxShadow: '0 35px 75px rgba(0, 0, 0, 0.85)',
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 },
              });
            }
            if (fork) {
              gsap.to(fork, {
                y: -10,
                z: 42,
                rotateZ: 1.2,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 },
              });
            }
            if (spoon) {
              gsap.to(spoon, {
                y: -10,
                z: 42,
                rotateZ: -1.2,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 },
              });
            }
            if (chef) {
              gsap.to(chef, {
                yPercent: -8,
                z: 45,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 },
              });
            }
            if (rail) {
              gsap.to(rail, {
                z: 15,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: 'top top', end: '30% top', scrub: 0.4 },
              });
            }

            // BUSINESS: Smoked walnut board = midground hero, archive slab = background, inquiry = foreground
            const bizMain = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-main"]');
            const bizSec = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-secondary"]');
            const bizInq = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-inquiry"]');

            if (bizMain) {
              gsap.to(bizMain, {
                yPercent: -6,
                z: 28,
                boxShadow: '0 32px 70px rgba(0, 0, 0, 0.8)',
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.4 },
              });
            }
            if (bizSec) {
              gsap.to(bizSec, {
                yPercent: -12,
                z: -10,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.4 },
              });
            }
            if (bizInq) {
              gsap.to(bizInq, {
                y: 6,
                z: 48,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '25% top', end: '60% top', scrub: 0.4 },
              });
            }

            // E-COMMERCE: Primary box = focus, secondary box = background, shopping bag = foreground
            const shopPrimary = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-box-primary"]');
            const shopSec = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-box-secondary"]');
            const shopBag = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-bag"]');
            const shopPlinth = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-plinth"]');

            if (shopPrimary) {
              gsap.to(shopPrimary, {
                yPercent: -6,
                z: 32,
                boxShadow: '0 28px 60px rgba(0, 0, 0, 0.75)',
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.4 },
              });
            }
            if (shopSec) {
              gsap.to(shopSec, {
                yPercent: -10,
                z: -10,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.4 },
              });
            }
            if (shopBag) {
              gsap.to(shopBag, {
                y: 6,
                z: 46,
                rotateZ: 0.8,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.4 },
              });
            }
            if (shopPlinth) {
              gsap.to(shopPlinth, {
                z: 14,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '55% top', end: '85% top', scrub: 0.4 },
              });
            }

            // BOOKING: Calendar = base, clock = upper float, focal slot = foreground, confirmation = slip
            const bookCal = cover3.querySelector<HTMLElement>('[data-depth-elem="book-cal"]');
            const bookClock = cover3.querySelector<HTMLElement>('[data-depth-elem="book-clock"]');
            const bookFocal = cover3.querySelector<HTMLElement>('[data-depth-elem="book-slot-focal"]');
            const bookCard = cover3.querySelector<HTMLElement>('[data-depth-elem="book-confirm-card"]');

            if (bookCal) {
              gsap.to(bookCal, {
                yPercent: -5,
                z: 22,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.4 },
              });
            }
            if (bookClock) {
              gsap.to(bookClock, {
                yPercent: -6,
                z: 52,
                rotateZ: -2.2,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.4 },
              });
            }
            if (bookFocal) {
              gsap.to(bookFocal, {
                y: 5,
                z: 60,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.4 },
              });
            }
            if (bookCard) {
              gsap.to(bookCard, {
                y: -6,
                z: 55,
                ease: 'none',
                scrollTrigger: { trigger: coversContainer, start: '75% top', end: 'bottom bottom', scrub: 0.4 },
              });
            }
          }

          // ==================================================
          // 5. VALUE SECTION RETURN TO PORTFOLIO
          // Fluid depth motion on headlines and statement.
          // ==================================================
          if (valueSection) {
            const valLine1 = valueSection.querySelector<HTMLElement>('[data-depth-val-line="1"]');
            const valLine2 = valueSection.querySelector<HTMLElement>('[data-depth-val-line="2"]');
            const valCopy = valueSection.querySelector<HTMLElement>('[data-depth-val-copy]');

            const valTl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: valueSection,
                start: 'top 85%',
                end: 'center center',
                scrub: 0.5,
              },
            });

            if (valLine1) {
              valTl.fromTo(valLine1, { yPercent: isMobile ? 8 : 12, z: isMobile ? -25 : -50, opacity: 0.8 }, { yPercent: 0, z: 0, opacity: 1 }, 0);
            }
            if (valLine2) {
              valTl.fromTo(valLine2, { yPercent: isMobile ? 12 : 16, z: isMobile ? -35 : -75, opacity: 0.75 }, { yPercent: 0, z: 0, opacity: 1 }, 0.05);
            }
            if (valCopy) {
              valTl.fromTo(valCopy, { yPercent: 8, opacity: 0.65 }, { yPercent: 0, opacity: 1 }, 0.1);
            }
          }

          // ==================================================
          // 6. FINAL CTA SECTION MOTION
          // Editorial slide-in with subtle depth.
          // ==================================================
          if (ctaSection) {
            const ctaLine1 = ctaSection.querySelector<HTMLElement>('[data-depth-cta-line="1"]');
            const ctaLine2 = ctaSection.querySelector<HTMLElement>('[data-depth-cta-line="2"]');
            const ctaCopy = ctaSection.querySelector<HTMLElement>('[data-depth-cta-copy]');
            const ctaLink = ctaSection.querySelector<HTMLElement>('[data-depth-cta-link]');

            const ctaTl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: ctaSection,
                start: 'top 90%',
                end: 'top 40%',
                scrub: 0.5,
              },
            });

            if (ctaLine1) {
              ctaTl.fromTo(ctaLine1, { yPercent: isMobile ? 6 : 10, z: isMobile ? -20 : -40, opacity: 0.8 }, { yPercent: 0, z: 0, opacity: 1 }, 0);
            }
            if (ctaLine2) {
              ctaTl.fromTo(ctaLine2, { yPercent: isMobile ? 10 : 14, z: isMobile ? -30 : -60, opacity: 0.75 }, { yPercent: 0, z: 0, opacity: 1 }, 0.04);
            }
            if (ctaCopy) {
              ctaTl.fromTo(ctaCopy, { yPercent: 8, opacity: 0.7 }, { yPercent: 0, opacity: 1 }, 0.08);
            }
            if (ctaLink) {
              ctaTl.fromTo(ctaLink, { x: isMobile ? 0 : -14, y: 8, opacity: 0.8 }, { x: 0, y: 0, opacity: 1 }, 0.12);
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
