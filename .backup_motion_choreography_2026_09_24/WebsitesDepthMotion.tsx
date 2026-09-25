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
          // RESTAURANT: Plate deeper in Z, cutlery deeper, chef special foreground
          if (restPlate) gsap.set(restPlate, { xPercent: -50, yPercent: -48, z: Math.round(-55 * zFactor) });
          if (restFork) gsap.set(restFork, { yPercent: -50, z: Math.round(-30 * zFactor), y: 16 });
          if (restSpoon) gsap.set(restSpoon, { yPercent: -50, z: Math.round(-30 * zFactor), y: 16 });
          if (restChef) gsap.set(restChef, { z: Math.round(-15 * zFactor), y: 12 });
          if (restRail) gsap.set(restRail, { z: Math.round(-45 * zFactor) });

          // BUSINESS: Main board approaches, secondary slab deep in background, enquiry foreground
          if (bizMain) gsap.set(bizMain, { xPercent: -50, yPercent: -46, z: Math.round(-65 * zFactor) });
          if (bizSec) gsap.set(bizSec, { z: Math.round(-105 * zFactor), yPercent: 6 });
          if (bizInq) gsap.set(bizInq, { z: Math.round(-20 * zFactor), y: 14 });

          // E-COMMERCE: Plinth anchor, secondary box deep behind, primary box hero, bag foreground
          if (shopPlinth) gsap.set(shopPlinth, { z: Math.round(-10 * zFactor) });
          if (shopPrimary) gsap.set(shopPrimary, { xPercent: -50, yPercent: -46, z: Math.round(-60 * zFactor) });
          if (shopSec) gsap.set(shopSec, { z: Math.round(-100 * zFactor), yPercent: 6 });
          if (shopBag) gsap.set(shopBag, { z: Math.round(-20 * zFactor), y: 14, rotateZ: 0 });

          // BOOKING: Calendar base depth, clock floats forward, focal time foreground, confirm foreground
          if (bookCal) gsap.set(bookCal, { z: Math.round(-65 * zFactor), yPercent: 5 });
          if (bookClock) gsap.set(bookClock, { z: Math.round(-30 * zFactor), y: 14, rotateZ: 0 });
          if (bookFocal) gsap.set(bookFocal, { z: Math.round(-15 * zFactor), y: 14 });
          if (bookCard) gsap.set(bookCard, { z: Math.round(-25 * zFactor), y: 12 });

          // Pinned distance: tuned to give generous scroll room for all 4 covers
          const pinDistance = isMobile
            ? () => Math.round(window.innerHeight * 1.8)
            : isTablet
            ? () => Math.round(window.innerHeight * 2.2)
            : () => Math.round(window.innerHeight * 2.6);

          const coversTl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: coversContainer,
              start: 'top top',
              end: () => `+=${pinDistance()}`,
              pin: true,
              scrub: 0.25,
              anticipatePin: 1,
            },
          });

          // ==================================================
          // COVER 0 (RESTAURANT): FOCAL SCROLL & 3D MOTION
          // Time: 0.0 to 0.70
          // Plate visibly moves from deep (-55px) toward viewer (+40px, delta 95px)
          // Fork rises and moves forward (delta 95px)
          // Spoon moves forward at separate rate (delta 90px)
          // Chef Special moves into prominent foreground (+85px, delta 100px)
          // ==================================================
          if (restPlate) {
            coversTl.to(restPlate, { z: Math.round(40 * zFactor), yPercent: -53, duration: 0.70 }, 0);
          }
          if (restFork) {
            coversTl.to(restFork, { z: Math.round(65 * zFactor), y: -14, rotateZ: 1.4, duration: 0.70 }, 0);
          }
          if (restSpoon) {
            coversTl.to(restSpoon, { z: Math.round(60 * zFactor), y: -12, rotateZ: -1.4, duration: 0.70 }, 0);
          }
          if (restChef) {
            coversTl.to(restChef, { z: Math.round(85 * zFactor), y: -16, duration: 0.70 }, 0);
          }
          if (restRail) {
            coversTl.to(restRail, { z: Math.round(20 * zFactor), duration: 0.70 }, 0);
          }

          // --------------------------------------------------
          // STAGE 1: COVER 0 (Restaurant) -> COVER 1 (Business)
          // Time: 0.70 to 1.15
          // Cover 0 physically lifts up & over Cover 1
          // Restaurant objects maintain multi-rate depth separation as Cover 0 departs
          // Cover 1 rises into focal position
          // Business objects approach focal depth
          // --------------------------------------------------
          coversTl.to(
            cover0,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 0.40,
              onComplete: () => {
                cover0.style.pointerEvents = 'none';
              },
            },
            0.70
          );

          if (restPlate) {
            coversTl.to(restPlate, { z: Math.round(55 * zFactor), yPercent: -56, duration: 0.35 }, 0.70);
          }
          if (restChef) {
            coversTl.to(restChef, { z: Math.round(95 * zFactor), y: -22, duration: 0.35 }, 0.70);
          }

          coversTl.to(
            cover0,
            {
              opacity: 0,
              duration: 0.12,
            },
            0.98
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
              duration: 0.40,
              onStart: () => {
                cover1.style.pointerEvents = 'auto';
              },
            },
            0.72
          );

          // Business internal motion approaches focal presence
          if (bizMain) {
            coversTl.to(bizMain, { z: Math.round(35 * zFactor), yPercent: -50, duration: 0.40 }, 0.72);
          }
          if (bizSec) {
            coversTl.to(bizSec, { z: Math.round(-35 * zFactor), yPercent: 2, duration: 0.40 }, 0.72);
          }
          if (bizInq) {
            coversTl.to(bizInq, { z: Math.round(75 * zFactor), y: -10, duration: 0.40 }, 0.72);
          }

          if (textCols[1]) {
            coversTl.to(textCols[1], { opacity: 1, duration: 0.20 }, 0.82);
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
              duration: 0.40,
            },
            0.74
          );

          coversTl.to(
            cover3,
            {
              yPercent: yIncoming * 1.5,
              z: zIncoming * 1.5,
              rotateX: rotIncoming * 1.2,
              scale: 1,
              opacity: 0.55,
              duration: 0.40,
            },
            0.76
          );

          // ==================================================
          // COVER 1 (BUSINESS): FOCAL SCROLL & 3D MOTION
          // Time: 1.15 to 1.70
          // Main board approaches toward viewer
          // Secondary slab shifts slower in deep background
          // Enquiry detail sits crisp in foreground
          // ==================================================
          if (bizMain) {
            coversTl.to(bizMain, { z: Math.round(45 * zFactor), yPercent: -52, duration: 0.55 }, 1.15);
          }
          if (bizSec) {
            coversTl.to(bizSec, { z: Math.round(-25 * zFactor), yPercent: 0, duration: 0.55 }, 1.15);
          }
          if (bizInq) {
            coversTl.to(bizInq, { z: Math.round(85 * zFactor), y: -14, duration: 0.55 }, 1.15);
          }

          // --------------------------------------------------
          // STAGE 2: COVER 1 (Business) -> COVER 2 (E-Commerce)
          // Time: 1.70 to 2.15
          // Cover 1 physically lifts up & over Cover 2
          // Business objects separate in depth during exit:
          // Rear slab visually lags deeper behind, main board moves with stronger depth, inquiry recedes
          // Cover 2 rises into focal position
          // E-commerce objects approach focal depth
          // --------------------------------------------------
          coversTl.to(
            cover1,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 0.40,
              onComplete: () => {
                cover1.style.pointerEvents = 'none';
              },
            },
            1.70
          );

          // Business exit separation
          if (bizSec) {
            coversTl.to(bizSec, { z: Math.round(-70 * zFactor), yPercent: -10, duration: 0.35 }, 1.70);
          }
          if (bizMain) {
            coversTl.to(bizMain, { z: Math.round(60 * zFactor), yPercent: -56, duration: 0.35 }, 1.70);
          }
          if (bizInq) {
            coversTl.to(bizInq, { z: Math.round(90 * zFactor), y: -20, duration: 0.35 }, 1.70);
          }

          coversTl.to(
            cover1,
            {
              opacity: 0,
              duration: 0.12,
            },
            1.98
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
              duration: 0.40,
              onStart: () => {
                cover2.style.pointerEvents = 'auto';
              },
            },
            1.72
          );

          // E-Commerce internal motion approaches focal depth
          if (shopPrimary) {
            coversTl.to(shopPrimary, { z: Math.round(38 * zFactor), yPercent: -50, duration: 0.40 }, 1.72);
          }
          if (shopSec) {
            coversTl.to(shopSec, { z: Math.round(-32 * zFactor), yPercent: 2, duration: 0.40 }, 1.72);
          }
          if (shopBag) {
            coversTl.to(shopBag, { z: Math.round(72 * zFactor), y: -10, rotateZ: -1.2, rotateY: 2, duration: 0.40 }, 1.72);
          }
          if (shopPlinth) {
            coversTl.to(shopPlinth, { z: Math.round(10 * zFactor), duration: 0.40 }, 1.72);
          }

          if (textCols[2]) {
            coversTl.to(textCols[2], { opacity: 1, duration: 0.20 }, 1.82);
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
              duration: 0.40,
            },
            1.74
          );

          // ==================================================
          // COVER 2 (E-COMMERCE): FOCAL SCROLL & 3D MOTION
          // Time: 2.15 to 2.70
          // Main product box advances clearly forward
          // Secondary package moves slower and stays behind
          // Shopping bag moves forward with subtle rotation
          // Plinth acts as stable anchor
          // ==================================================
          if (shopPrimary) {
            coversTl.to(shopPrimary, { z: Math.round(48 * zFactor), yPercent: -52, duration: 0.55 }, 2.15);
          }
          if (shopSec) {
            coversTl.to(shopSec, { z: Math.round(-20 * zFactor), yPercent: 0, duration: 0.55 }, 2.15);
          }
          if (shopBag) {
            coversTl.to(shopBag, { z: Math.round(82 * zFactor), y: -14, rotateZ: -1.5, duration: 0.55 }, 2.15);
          }
          if (shopPlinth) {
            coversTl.to(shopPlinth, { z: Math.round(12 * zFactor), duration: 0.55 }, 2.15);
          }

          // --------------------------------------------------
          // STAGE 3: COVER 2 (E-Commerce) -> COVER 3 (Booking)
          // Time: 2.70 to 3.15
          // Cover 2 physically lifts up & over Cover 3
          // Product arrangement maintains parallax separation during exit
          // Cover 3 rises into focal position
          // Booking objects approach focal depth
          // --------------------------------------------------
          coversTl.to(
            cover2,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 0.40,
              onComplete: () => {
                cover2.style.pointerEvents = 'none';
              },
            },
            2.70
          );

          // E-commerce exit separation
          if (shopSec) {
            coversTl.to(shopSec, { z: Math.round(-60 * zFactor), yPercent: -10, duration: 0.35 }, 2.70);
          }
          if (shopPrimary) {
            coversTl.to(shopPrimary, { z: Math.round(60 * zFactor), yPercent: -56, duration: 0.35 }, 2.70);
          }
          if (shopBag) {
            coversTl.to(shopBag, { z: Math.round(90 * zFactor), y: -20, rotateZ: -0.6, duration: 0.35 }, 2.70);
          }

          coversTl.to(
            cover2,
            {
              opacity: 0,
              duration: 0.12,
            },
            2.98
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
              duration: 0.40,
              onStart: () => {
                cover3.style.pointerEvents = 'auto';
              },
            },
            2.72
          );

          // Booking internal motion approaches focal depth
          if (bookCal) {
            coversTl.to(bookCal, { z: Math.round(20 * zFactor), yPercent: -1, duration: 0.40 }, 2.72);
          }
          if (bookClock) {
            coversTl.to(bookClock, { z: Math.round(65 * zFactor), y: -10, rotateZ: -1.4, duration: 0.40 }, 2.72);
          }
          if (bookFocal) {
            coversTl.to(bookFocal, { z: Math.round(85 * zFactor), y: -12, duration: 0.40 }, 2.72);
          }
          if (bookCard) {
            coversTl.to(bookCard, { z: Math.round(55 * zFactor), y: -8, duration: 0.40 }, 2.72);
          }

          if (textCols[3]) {
            coversTl.to(textCols[3], { opacity: 1, duration: 0.20 }, 2.82);
          }

          // ==================================================
          // COVER 3 (BOOKING): FOCAL SCROLL & 3D MOTION
          // Time: 3.15 to 4.00
          // Calendar forms base depth
          // Clock floats forward with settling rotation
          // Selected time moves prominently into foreground
          // Confirmation card holds foreground layer
          // Pinned track completes with Cover 3 fully focal
          // ==================================================
          if (bookCal) {
            coversTl.to(bookCal, { z: Math.round(25 * zFactor), yPercent: -2, duration: 0.85 }, 3.15);
          }
          if (bookClock) {
            coversTl.to(bookClock, { z: Math.round(75 * zFactor), y: -14, rotateZ: -2.0, duration: 0.85 }, 3.15);
          }
          if (bookFocal) {
            coversTl.to(bookFocal, { z: Math.round(95 * zFactor), y: -16, duration: 0.85 }, 3.15);
          }
          if (bookCard) {
            coversTl.to(bookCard, { z: Math.round(65 * zFactor), y: -12, duration: 0.85 }, 3.15);
          }

          // ==================================================
          // 4. CONTINUOUS BOOKING -> VALUE SECTION TRANSITION
          // NO PREMATURE COVER 3 HIDING INSIDE PIN.
          // When the pin releases at 1.00, Booking is full-screen in front of the viewer.
          // The very next pixel of scrolling brings Built Around Your Business into view.
          // As Built Around scrolls in, Booking lifts away in 3D with multi-rate object recession.
          // This eliminates the 900px black void completely and creates seamless editorial continuity.
          // ==================================================
          if (valueSection) {
            const exitTl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: valueSection,
                start: 'top bottom',
                end: 'top 20%',
                scrub: 0.2,
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
