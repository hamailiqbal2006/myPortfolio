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
          // 1. HERO SECTION (Optical Centering & Depth Continuity)
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
                scrub: 0.2,
              },
            });

            if (heroIdentity) {
              heroTl.to(
                heroIdentity,
                {
                  yPercent: isMobile ? -5 : -8,
                  z: isMobile ? -20 : -50,
                  opacity: 0.88,
                },
                0
              );
            }

            if (line1) {
              heroTl.to(line1, { yPercent: isMobile ? -4 : -7, opacity: 0.9 }, 0);
            }
            if (line2) {
              heroTl.to(line2, { yPercent: isMobile ? -6 : -10, opacity: 0.85 }, 0);
            }
            if (eyebrow) {
              heroTl.to(eyebrow, { yPercent: isMobile ? -2 : -4, opacity: 0.4 }, 0);
            }
            if (copy) {
              heroTl.to(copy, { yPercent: isMobile ? -3 : -5, opacity: 0.65 }, 0);
            }
          }

          // ==================================================
          // 2. "WHAT CAN I BUILD FOR YOU?" TRANSITION SCENE
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
                  scrub: 0.2,
                },
              });

              transTl.fromTo(
                transContent,
                { yPercent: isMobile ? 6 : 10, opacity: 0.7 },
                { yPercent: -8, opacity: 1, duration: 1 }
              );

              if (transLine1 && transLine2 && !isMobile) {
                transTl.fromTo(transLine1, { yPercent: 4 }, { yPercent: -4, duration: 1 }, 0);
                transTl.fromTo(transLine2, { yPercent: 7 }, { yPercent: -6, duration: 1 }, 0);
              }
            }
          }

          // ==================================================
          // 3. FULL-VIEWPORT COVER-OVER-COVER MOTION
          // Physical sheet movement: translateY, translateZ, rotateX.
          // ZERO scale during focal state to maintain razor-sharp text.
          // Tuned scrub: 0.2, ease: "none", no lagging catch-up.
          // ==================================================
          const zOutgoing = isMobile ? 35 : isTablet ? 75 : 120;
          const zIncoming = isMobile ? -60 : isTablet ? -120 : -180;
          const yOutgoing = isMobile ? -102 : -106;
          const yIncoming = isMobile ? 6 : isTablet ? 7 : 8;
          const rotOutgoing = isMobile ? -0.5 : isTablet ? -1.2 : -1.8;
          const rotIncoming = isMobile ? 0.5 : isTablet ? 1.2 : 1.8;

          const [cover0, cover1, cover2, cover3] = covers;

          // Responsive motion multiplier (scaled for viewport scale)
          const zFactor = isMobile ? 0.45 : isTablet ? 0.72 : 1.0;

          // Query internal artwork elements for all 4 covers
          // RESTAURANT
          const restPlate = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-plate"]');
          const restFork = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-fork"]');
          const restSpoon = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-spoon"]');
          const restChef = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-chef-special"]');
          const restRail = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-rail"]');

          // BUSINESS
          const bizMain = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-main"]');
          const bizSec = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-secondary"]');
          const bizInq = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-inquiry-card"]');

          // E-COMMERCE
          const shopPrimary = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-box-primary"]');
          const shopSec = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-box-secondary"]');
          const shopBag = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-bag"]');
          const shopPlinth = cover2.querySelector<HTMLElement>('[data-depth-elem="shop-plinth"]');

          // BOOKING
          const bookCal = cover3.querySelector<HTMLElement>('[data-depth-elem="book-cal"]');
          const bookClock = cover3.querySelector<HTMLElement>('[data-depth-elem="book-clock"]');
          const bookFocal = cover3.querySelector<HTMLElement>('[data-depth-elem="book-slot-focal"]');
          const bookCard = cover3.querySelector<HTMLElement>('[data-depth-elem="book-confirm-card"]');

          // Initial cover positions (Cover-over-Cover stack)
          gsap.set(cover0, {
            zIndex: 4,
            x: 0,
            yPercent: 0,
            z: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            boxShadow: 'none',
            pointerEvents: 'auto',
          });

          gsap.set(cover1, {
            zIndex: 3,
            x: 0,
            yPercent: yIncoming,
            z: zIncoming,
            scale: 1,
            rotateX: rotIncoming,
            opacity: 0.85,
            boxShadow: 'none',
            pointerEvents: 'none',
          });

          gsap.set(cover2, {
            zIndex: 2,
            x: 0,
            yPercent: yIncoming * 1.5,
            z: zIncoming * 1.5,
            scale: 1,
            rotateX: rotIncoming * 1.2,
            opacity: 0.55,
            boxShadow: 'none',
            pointerEvents: 'none',
          });

          gsap.set(cover3, {
            zIndex: 1,
            x: 0,
            yPercent: yIncoming * 2.0,
            z: zIncoming * 2.0,
            scale: 1,
            rotateX: rotIncoming * 1.4,
            opacity: 0.35,
            boxShadow: 'none',
            pointerEvents: 'none',
          });

          // Text content layer remains 100% crisp and 2D
          const textCols = covers.map((c) => c.querySelector<HTMLElement>('[data-depth-text]'));
          textCols.forEach((col, i) => {
            if (col) {
              gsap.set(col, { opacity: i === 0 ? 1 : 0.85, clearProps: 'transform' });
            }
          });

          // Initial artwork 3D states with visible spatial depth
          // RESTAURANT: Plate deep in Z, cutlery lower and deep, chef special foreground
          if (restPlate) gsap.set(restPlate, { xPercent: -50, yPercent: -47, z: Math.round(-90 * zFactor) });
          if (restFork) gsap.set(restFork, { yPercent: -50, z: Math.round(-55 * zFactor), y: 20 });
          if (restSpoon) gsap.set(restSpoon, { yPercent: -50, z: Math.round(-55 * zFactor), y: 20 });
          if (restChef) gsap.set(restChef, { z: Math.round(-35 * zFactor), y: 18 });
          if (restRail) gsap.set(restRail, { z: Math.round(-60 * zFactor) });

          // BUSINESS: Main board approaches, secondary slab deep in background, enquiry foreground
          if (bizMain) gsap.set(bizMain, { xPercent: -50, yPercent: -45, z: Math.round(-65 * zFactor) });
          if (bizSec) gsap.set(bizSec, { z: Math.round(-110 * zFactor), yPercent: 8, x: Math.round(-8 * zFactor) });
          if (bizInq) gsap.set(bizInq, { z: Math.round(-25 * zFactor), y: 18, x: 0 });

          // E-COMMERCE: Plinth anchor, secondary box deep behind, primary box hero, bag foreground
          if (shopPlinth) gsap.set(shopPlinth, { z: Math.round(-10 * zFactor) });
          if (shopPrimary) gsap.set(shopPrimary, { xPercent: -50, yPercent: -45, z: Math.round(-65 * zFactor) });
          if (shopSec) gsap.set(shopSec, { z: Math.round(-105 * zFactor), yPercent: 8 });
          if (shopBag) gsap.set(shopBag, { z: Math.round(-25 * zFactor), y: 18, rotateZ: 0, rotateY: 0 });

          // BOOKING: Calendar base depth, clock floats forward, focal time foreground, confirm foreground
          if (bookCal) gsap.set(bookCal, { z: Math.round(-70 * zFactor), yPercent: 6 });
          if (bookClock) gsap.set(bookClock, { z: Math.round(-35 * zFactor), y: 18, rotateZ: 0 });
          if (bookFocal) gsap.set(bookFocal, { z: Math.round(-15 * zFactor), y: 18 });
          if (bookCard) gsap.set(bookCard, { z: Math.round(-30 * zFactor), y: 16 });

          // Pinned distance: generous scroll room so each transition receives ~0.8-1.1 viewport heights of scroll
          const pinDistance = isMobile
            ? () => Math.round(window.innerHeight * 2.4)
            : isTablet
            ? () => Math.round(window.innerHeight * 3.0)
            : () => Math.round(window.innerHeight * 3.8);

          const coversTl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: coversContainer,
              start: 'top top',
              end: () => `+=${pinDistance()}`,
              pin: true,
              scrub: isMobile ? 0.35 : 0.45,
              anticipatePin: 1,
            },
          });

          // ==================================================
          // COVER 0 (RESTAURANT): THREE-PHASE SCROLL RHYTHM
          // Total segment: 0.0 to 3.0
          // PHASE B (Focal motion, 0.0 to 1.8):
          //   Cover 0 remains 100% stable while artwork travels through deep Z ranges:
          //   Plate: -90px -> +35px (delta 125px)
          //   Fork: -55px -> +62px, y: 20 -> -12, rotateZ: 0 -> 1.4
          //   Spoon: -55px -> +55px, y: 20 -> -10, rotateZ: 0 -> -1.4
          //   Chef Special: -35px -> +85px, y: 18 -> -16
          // PHASE C (Handoff to Business, 1.8 to 3.0):
          //   Cover 0 lifts up & over (-106% Y, +zOutgoing, rotOutgoing)
          //   Plate continues forward/upward (+55px Z)
          //   Cutlery separates slightly
          //   Chef card remains forward-most (+95px Z)
          //   Cover 1 emerges from underneath and settles into full focus at 3.0
          // ==================================================
          if (restPlate) {
            coversTl.to(restPlate, { z: Math.round(35 * zFactor), yPercent: -53, duration: 1.8 }, 0);
          }
          if (restFork) {
            coversTl.to(restFork, { z: Math.round(62 * zFactor), y: -12, rotateZ: 1.4, duration: 1.8 }, 0);
          }
          if (restSpoon) {
            coversTl.to(restSpoon, { z: Math.round(55 * zFactor), y: -10, rotateZ: -1.4, duration: 1.8 }, 0);
          }
          if (restChef) {
            coversTl.to(restChef, { z: Math.round(85 * zFactor), y: -16, duration: 1.8 }, 0);
          }
          if (restRail) {
            coversTl.to(restRail, { z: Math.round(20 * zFactor), duration: 1.8 }, 0);
          }

          // HANDOFF 1: Cover 0 lifts away, Cover 1 arrives (1.8 to 3.0)
          coversTl.to(
            cover0,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 1.2,
              onComplete: () => {
                cover0.style.pointerEvents = 'none';
              },
            },
            1.8
          );

          if (restPlate) {
            coversTl.to(restPlate, { z: Math.round(55 * zFactor), yPercent: -56, duration: 1.0 }, 1.8);
          }
          if (restFork) {
            coversTl.to(restFork, { z: Math.round(70 * zFactor), y: -16, rotateZ: 1.8, duration: 1.0 }, 1.8);
          }
          if (restSpoon) {
            coversTl.to(restSpoon, { z: Math.round(65 * zFactor), y: -14, rotateZ: -1.8, duration: 1.0 }, 1.8);
          }
          if (restChef) {
            coversTl.to(restChef, { z: Math.round(95 * zFactor), y: -22, duration: 1.0 }, 1.8);
          }

          coversTl.to(
            cover0,
            {
              opacity: 0,
              duration: 0.35,
            },
            2.65
          );

          // Cover 1 rises into focal position
          coversTl.to(
            cover1,
            {
              yPercent: 0,
              z: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              boxShadow: 'none',
              duration: 1.2,
              onStart: () => {
                cover1.style.pointerEvents = 'auto';
              },
            },
            1.8
          );

          // Business objects approach focal entry depth
          if (bizMain) {
            coversTl.to(bizMain, { z: Math.round(-15 * zFactor), yPercent: -49, duration: 1.2 }, 1.8);
          }
          if (bizSec) {
            coversTl.to(bizSec, { z: Math.round(-75 * zFactor), yPercent: 3, x: Math.round(-4 * zFactor), duration: 1.2 }, 1.8);
          }
          if (bizInq) {
            coversTl.to(bizInq, { z: Math.round(35 * zFactor), y: 4, x: Math.round(-2 * zFactor), duration: 1.2 }, 1.8);
          }

          if (textCols[1]) {
            coversTl.to(textCols[1], { opacity: 1, duration: 0.6 }, 2.2);
          }

          // Cover 2 & 3 advance in background stack
          coversTl.to(
            cover2,
            {
              yPercent: yIncoming,
              z: zIncoming,
              rotateX: rotIncoming,
              scale: 1,
              opacity: 0.85,
              duration: 1.2,
            },
            1.8
          );

          coversTl.to(
            cover3,
            {
              yPercent: yIncoming * 1.5,
              z: zIncoming * 1.5,
              rotateX: rotIncoming * 1.2,
              scale: 1,
              opacity: 0.55,
              duration: 1.2,
            },
            1.8
          );

          // ==================================================
          // COVER 1 (BUSINESS): THREE-PHASE SCROLL RHYTHM
          // Total segment: 3.0 to 6.0
          // PHASE B (Focal motion, 3.0 to 4.8):
          //   Cover 1 remains 100% stable while artwork moves through depth:
          //   Main board moves visibly toward viewer (-15px -> +45px) with small Y rise
          //   Secondary board slowly shifts in depth & X (-75px -> -30px, x drift)
          //   Inquiry detail moves farthest forward (+35px -> +90px, slight shift)
          //   Clear perception of 3 distinct physical layers!
          // PHASE C (Handoff to E-Commerce, 4.8 to 6.0):
          //   Cover 1 lifts up & over
          //   Secondary board visually lags behind at -70px
          //   Main board lifts at +60px
          //   Inquiry detail at +100px
          //   Cover 2 emerges and settles into focus at 6.0
          // ==================================================
          if (bizMain) {
            coversTl.to(bizMain, { z: Math.round(45 * zFactor), yPercent: -53, duration: 1.8 }, 3.0);
          }
          if (bizSec) {
            coversTl.to(bizSec, { z: Math.round(-30 * zFactor), yPercent: 0, x: Math.round(4 * zFactor), duration: 1.8 }, 3.0);
          }
          if (bizInq) {
            coversTl.to(bizInq, { z: Math.round(90 * zFactor), y: -14, x: Math.round(-6 * zFactor), duration: 1.8 }, 3.0);
          }

          // HANDOFF 2: Cover 1 lifts away, Cover 2 arrives (4.8 to 6.0)
          coversTl.to(
            cover1,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 1.2,
              onComplete: () => {
                cover1.style.pointerEvents = 'none';
              },
            },
            4.8
          );

          if (bizSec) {
            coversTl.to(bizSec, { z: Math.round(-70 * zFactor), yPercent: -8, duration: 1.0 }, 4.8);
          }
          if (bizMain) {
            coversTl.to(bizMain, { z: Math.round(60 * zFactor), yPercent: -56, duration: 1.0 }, 4.8);
          }
          if (bizInq) {
            coversTl.to(bizInq, { z: Math.round(100 * zFactor), y: -20, duration: 1.0 }, 4.8);
          }

          coversTl.to(
            cover1,
            {
              opacity: 0,
              duration: 0.35,
            },
            5.65
          );

          // Cover 2 rises into focal position
          coversTl.to(
            cover2,
            {
              yPercent: 0,
              z: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              boxShadow: 'none',
              duration: 1.2,
              onStart: () => {
                cover2.style.pointerEvents = 'auto';
              },
            },
            4.8
          );

          // E-Commerce internal motion approaches focal entry depth
          if (shopPrimary) {
            coversTl.to(shopPrimary, { z: Math.round(-10 * zFactor), yPercent: -49, duration: 1.2 }, 4.8);
          }
          if (shopSec) {
            coversTl.to(shopSec, { z: Math.round(-75 * zFactor), yPercent: 3, duration: 1.2 }, 4.8);
          }
          if (shopBag) {
            coversTl.to(shopBag, { z: Math.round(35 * zFactor), y: 4, rotateZ: -0.8, rotateY: 1, duration: 1.2 }, 4.8);
          }
          if (shopPlinth) {
            coversTl.to(shopPlinth, { z: Math.round(6 * zFactor), duration: 1.2 }, 4.8);
          }

          if (textCols[2]) {
            coversTl.to(textCols[2], { opacity: 1, duration: 0.6 }, 5.2);
          }

          // Cover 3 advances to next-in-line
          coversTl.to(
            cover3,
            {
              yPercent: yIncoming,
              z: zIncoming,
              rotateX: rotIncoming,
              scale: 1,
              opacity: 0.85,
              duration: 1.2,
            },
            4.8
          );

          // ==================================================
          // COVER 2 (E-COMMERCE): THREE-PHASE SCROLL RHYTHM
          // Total segment: 6.0 to 9.0
          // PHASE B (Focal motion, 6.0 to 7.8):
          //   Cover 2 remains 100% stable while product arrangement exhibits depth:
          //   Main package approaches visibly (-10px -> +48px)
          //   Shopping bag moves farther forward (+35px -> +86px) with subtle rotation
          //   Secondary package stays noticeably behind (-75px -> -25px)
          //   Plinth acts as stable anchor (+6px -> +12px)
          // PHASE C (Handoff to Booking, 7.8 to 9.0):
          //   Cover 2 lifts up & over
          //   Product arrangement maintains parallax separation
          //   Secondary lags behind (-60px), main lifts (+62px), bag forward (+96px)
          //   Cover 3 emerges and settles into focus at 9.0
          // ==================================================
          if (shopPrimary) {
            coversTl.to(shopPrimary, { z: Math.round(48 * zFactor), yPercent: -53, duration: 1.8 }, 6.0);
          }
          if (shopSec) {
            coversTl.to(shopSec, { z: Math.round(-25 * zFactor), yPercent: 0, duration: 1.8 }, 6.0);
          }
          if (shopBag) {
            coversTl.to(shopBag, { z: Math.round(86 * zFactor), y: -14, rotateZ: -1.6, rotateY: 2.2, duration: 1.8 }, 6.0);
          }
          if (shopPlinth) {
            coversTl.to(shopPlinth, { z: Math.round(12 * zFactor), duration: 1.8 }, 6.0);
          }

          // HANDOFF 3: Cover 2 lifts away, Cover 3 arrives (7.8 to 9.0)
          coversTl.to(
            cover2,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 1.2,
              onComplete: () => {
                cover2.style.pointerEvents = 'none';
              },
            },
            7.8
          );

          if (shopSec) {
            coversTl.to(shopSec, { z: Math.round(-60 * zFactor), yPercent: -8, duration: 1.0 }, 7.8);
          }
          if (shopPrimary) {
            coversTl.to(shopPrimary, { z: Math.round(62 * zFactor), yPercent: -56, duration: 1.0 }, 7.8);
          }
          if (shopBag) {
            coversTl.to(shopBag, { z: Math.round(96 * zFactor), y: -20, duration: 1.0 }, 7.8);
          }

          coversTl.to(
            cover2,
            {
              opacity: 0,
              duration: 0.35,
            },
            8.65
          );

          // Cover 3 rises into focal position
          coversTl.to(
            cover3,
            {
              yPercent: 0,
              z: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              boxShadow: 'none',
              duration: 1.2,
              onStart: () => {
                cover3.style.pointerEvents = 'auto';
              },
            },
            7.8
          );

          // Booking internal motion approaches focal entry depth
          if (bookCal) {
            coversTl.to(bookCal, { z: Math.round(-25 * zFactor), yPercent: 1, duration: 1.2 }, 7.8);
          }
          if (bookClock) {
            coversTl.to(bookClock, { z: Math.round(25 * zFactor), y: 2, rotateZ: -0.8, duration: 1.2 }, 7.8);
          }
          if (bookCard) {
            coversTl.to(bookCard, { z: Math.round(20 * zFactor), y: 2, duration: 1.2 }, 7.8);
          }
          if (bookFocal) {
            coversTl.to(bookFocal, { z: Math.round(40 * zFactor), y: 2, duration: 1.2 }, 7.8);
          }

          if (textCols[3]) {
            coversTl.to(textCols[3], { opacity: 1, duration: 0.6 }, 8.2);
          }

          // ==================================================
          // COVER 3 (BOOKING): THREE-PHASE SCROLL RHYTHM
          // Total segment: 9.0 to 12.0
          // PHASE B (Focal motion, 9.0 to 12.0):
          //   Cover 3 remains 100% stable while appointment elements move through depth:
          //   Calendar approaches slightly from base depth (-25px -> +20px)
          //   Clock moves visibly forward (+25px -> +75px) with settling rotation
          //   Selected time becomes the strongest foreground object (+40px -> +98px)
          //   Confirmation card moves forward (+20px -> +65px)
          //   Pinned track finishes with Cover 3 occupying 100% of viewport!
          // ==================================================
          if (bookCal) {
            coversTl.to(bookCal, { z: Math.round(20 * zFactor), yPercent: -2, duration: 3.0 }, 9.0);
          }
          if (bookClock) {
            coversTl.to(bookClock, { z: Math.round(75 * zFactor), y: -14, rotateZ: -2.0, duration: 3.0 }, 9.0);
          }
          if (bookFocal) {
            coversTl.to(bookFocal, { z: Math.round(98 * zFactor), y: -16, duration: 3.0 }, 9.0);
          }
          if (bookCard) {
            coversTl.to(bookCard, { z: Math.round(65 * zFactor), y: -12, duration: 3.0 }, 9.0);
          }

          // ==================================================
          // 4. CONTINUOUS BOOKING -> VALUE SECTION TRANSITION
          // NO PREMATURE COVER 3 HIDING INSIDE PIN.
          // When the pin releases at 1.00, Booking is full-screen in front of the viewer.
          // The very next pixel of scrolling brings Built Around Your Business into view.
          // As Built Around scrolls in, Booking lifts away in 3D with multi-rate object recession.
          // This eliminates the black void completely and creates seamless editorial continuity.
          // ==================================================
          if (valueSection) {
            const exitTl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: valueSection,
                start: 'top bottom',
                end: 'top 20%',
                scrub: isMobile ? 0.35 : 0.45,
              },
            });

            exitTl.to(
              cover3,
              {
                yPercent: isMobile ? -30 : -45,
                z: isMobile ? 30 : 70,
                rotateX: isMobile ? -0.5 : -1.8,
                opacity: 0,
                duration: 1,
              },
              0
            );

            // Booking objects recede at different rates as Built Around claims focus
            if (bookCal) {
              exitTl.to(bookCal, { z: Math.round(-15 * zFactor), duration: 1 }, 0);
            }
            if (bookClock) {
              exitTl.to(bookClock, { z: Math.round(25 * zFactor), rotateZ: -0.6, duration: 1 }, 0);
            }
            if (bookFocal) {
              exitTl.to(bookFocal, { z: Math.round(30 * zFactor), duration: 1 }, 0);
            }
            if (bookCard) {
              exitTl.to(bookCard, { z: Math.round(22 * zFactor), duration: 1 }, 0);
            }
          }

          // ==================================================
          // 5. VALUE SECTION (BUILT AROUND YOUR BUSINESS)
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
                scrub: 0.2,
              },
            });

            if (valLine1) {
              valTl.fromTo(valLine1, { yPercent: isMobile ? 6 : 8, opacity: 0.8 }, { yPercent: 0, opacity: 1 }, 0);
            }
            if (valLine2) {
              valTl.fromTo(valLine2, { yPercent: isMobile ? 8 : 12, opacity: 0.75 }, { yPercent: 0, opacity: 1 }, 0.05);
            }
            if (valCopy) {
              valTl.fromTo(valCopy, { yPercent: 6, opacity: 0.7 }, { yPercent: 0, opacity: 1 }, 0.1);
            }
          }

          // ==================================================
          // 6. FINAL CTA SECTION MOTION
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
                scrub: 0.2,
              },
            });

            if (ctaLine1) {
              ctaTl.fromTo(ctaLine1, { yPercent: isMobile ? 5 : 8, opacity: 0.8 }, { yPercent: 0, opacity: 1 }, 0);
            }
            if (ctaLine2) {
              ctaTl.fromTo(ctaLine2, { yPercent: isMobile ? 8 : 12, opacity: 0.75 }, { yPercent: 0, opacity: 1 }, 0.04);
            }
            if (ctaCopy) {
              ctaTl.fromTo(ctaCopy, { yPercent: 6, opacity: 0.7 }, { yPercent: 0, opacity: 1 }, 0.08);
            }
            if (ctaLink) {
              ctaTl.fromTo(ctaLink, { y: 6, opacity: 0.8 }, { y: 0, opacity: 1 }, 0.12);
            }
          }
        }
      );

      // Refresh ScrollTrigger metrics once initial setup is calculated
      ScrollTrigger.refresh();
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return null;
}
