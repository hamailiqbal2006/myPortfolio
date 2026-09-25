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

          // Query internal artwork elements for all 4 covers
          // RESTAURANT
          const restPlate = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-plate"]');
          const restFork = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-fork"]');
          const restSpoon = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-spoon"]');
          const restChef = cover0.querySelector<HTMLElement>('[data-depth-elem="rest-chef-special"]');

          // BUSINESS
          const bizMain = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-main"]');
          const bizSec = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-board-secondary"]');
          const bizInq = cover1.querySelector<HTMLElement>('[data-depth-elem="biz-inquiry"]');

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

          // Initial positions
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

          // Initial artwork state
          if (bizMain) gsap.set(bizMain, { z: isMobile ? 6 : 10, yPercent: 4 });
          if (bizSec) gsap.set(bizSec, { z: isMobile ? -10 : -20, yPercent: 6 });
          if (bizInq) gsap.set(bizInq, { z: isMobile ? 8 : 16, y: 8 });

          if (shopPrimary) gsap.set(shopPrimary, { z: isMobile ? 6 : 10, yPercent: 4 });
          if (shopSec) gsap.set(shopSec, { z: isMobile ? -10 : -18, yPercent: 6 });
          if (shopBag) gsap.set(shopBag, { z: isMobile ? 8 : 14, y: 8, rotateZ: -0.4 });
          if (shopPlinth) gsap.set(shopPlinth, { z: 4 });

          if (bookCal) gsap.set(bookCal, { z: isMobile ? 4 : 8, yPercent: 4 });
          if (bookClock) gsap.set(bookClock, { z: isMobile ? 10 : 20, yPercent: 6, rotateZ: -0.4 });
          if (bookFocal) gsap.set(bookFocal, { z: isMobile ? 12 : 22, y: 8 });
          if (bookCard) gsap.set(bookCard, { z: isMobile ? 10 : 18, y: 6 });

          // Pin duration exactly tuned to 3 cover transitions:
          // Restaurant -> Business, Business -> E-commerce, E-commerce -> Booking
          // When Booking arrives at focus (progress 1.00), the pin ends cleanly.
          const pinDistance = isMobile
            ? () => Math.round(window.innerHeight * 1.5)
            : isTablet
            ? () => Math.round(window.innerHeight * 1.8)
            : () => Math.round(window.innerHeight * 2.0);

          const coversTl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: coversContainer,
              start: 'top top',
              end: () => `+=${pinDistance()}`,
              pin: true,
              scrub: 0.2,
              anticipatePin: 1,
            },
          });

          // Dwell on Cover 0 (Restaurant): internal life begins
          coversTl.to({}, { duration: 0.05 });

          // --------------------------------------------------
          // RESTAURANT INTERNAL DEPTH LIFE (0.0 to 0.35)
          // --------------------------------------------------
          if (restPlate) {
            coversTl.to(restPlate, { yPercent: -4, z: isMobile ? 12 : 24, duration: 0.35 }, 0);
          }
          if (restFork) {
            coversTl.to(restFork, { y: -8, z: isMobile ? 18 : 36, rotateZ: 0.8, duration: 0.35 }, 0);
          }
          if (restSpoon) {
            coversTl.to(restSpoon, { y: -8, z: isMobile ? 18 : 36, rotateZ: -0.8, duration: 0.35 }, 0);
          }
          if (restChef) {
            coversTl.to(restChef, { yPercent: -6, z: isMobile ? 20 : 42, duration: 0.35 }, 0);
          }

          // --------------------------------------------------
          // STAGE 1: COVER 0 (Restaurant) -> COVER 1 (Business)
          // Progress: 0.05 to 0.35
          // Cover 0 physically lifts up & over Cover 1
          // Cover 1 rises into focal position with multi-depth life
          // --------------------------------------------------
          coversTl.to(
            cover0,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 0.28,
              onComplete: () => {
                cover0.style.pointerEvents = 'none';
              },
            },
            0.05
          );

          coversTl.to(
            cover0,
            {
              opacity: 0,
              duration: 0.08,
            },
            0.25
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
              duration: 0.28,
              onStart: () => {
                cover1.style.pointerEvents = 'auto';
              },
            },
            0.06
          );

          // BUSINESS INTERNAL MOTION: Approaches toward viewer as it reaches focus
          if (bizMain) {
            coversTl.to(bizMain, { yPercent: -5, z: isMobile ? 16 : 32, duration: 0.28 }, 0.06);
          }
          if (bizSec) {
            coversTl.to(bizSec, { yPercent: -8, z: isMobile ? -8 : -10, duration: 0.28 }, 0.06);
          }
          if (bizInq) {
            coversTl.to(bizInq, { y: 0, z: isMobile ? 24 : 46, duration: 0.28 }, 0.06);
          }

          if (textCols[1]) {
            coversTl.to(textCols[1], { opacity: 1, duration: 0.15 }, 0.12);
          }

          // Cover 2 advances in depth
          coversTl.to(
            cover2,
            {
              yPercent: yIncoming,
              z: zIncoming,
              rotateX: rotIncoming,
              scale: 1,
              opacity: 0.85,
              duration: 0.28,
            },
            0.08
          );

          // Cover 3 advances
          coversTl.to(
            cover3,
            {
              yPercent: yIncoming * 1.5,
              z: zIncoming * 1.5,
              rotateX: rotIncoming * 1.2,
              scale: 1,
              opacity: 0.55,
              duration: 0.28,
            },
            0.10
          );

          // Dwell on Cover 1 (Business in focus)
          coversTl.to({}, { duration: 0.05 });

          // --------------------------------------------------
          // STAGE 2: COVER 1 (Business) -> COVER 2 (E-Commerce)
          // Progress: 0.39 to 0.69
          // Cover 1 physically lifts up & over Cover 2
          // Business objects separate in depth during exit:
          // Rear slab lags slightly behind, main board moves with stronger depth, inquiry recedes
          // --------------------------------------------------
          coversTl.to(
            cover1,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 0.28,
              onComplete: () => {
                cover1.style.pointerEvents = 'none';
              },
            },
            0.39
          );

          // Business exit separation
          if (bizSec) {
            coversTl.to(bizSec, { yPercent: -14, z: isMobile ? -14 : -22, duration: 0.26 }, 0.39);
          }
          if (bizMain) {
            coversTl.to(bizMain, { yPercent: -8, z: isMobile ? 26 : 54, duration: 0.26 }, 0.39);
          }
          if (bizInq) {
            coversTl.to(bizInq, { y: -6, z: isMobile ? 10 : 18, duration: 0.26 }, 0.39);
          }

          coversTl.to(
            cover1,
            {
              opacity: 0,
              duration: 0.08,
            },
            0.59
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
              duration: 0.28,
              onStart: () => {
                cover2.style.pointerEvents = 'auto';
              },
            },
            0.40
          );

          // E-COMMERCE INTERNAL MOTION: Advances as it reaches focus
          if (shopPrimary) {
            coversTl.to(shopPrimary, { yPercent: -5, z: isMobile ? 16 : 34, duration: 0.28 }, 0.40);
          }
          if (shopSec) {
            coversTl.to(shopSec, { yPercent: -8, z: isMobile ? -8 : -10, duration: 0.28 }, 0.40);
          }
          if (shopBag) {
            coversTl.to(shopBag, { y: 0, z: isMobile ? 22 : 46, rotateZ: 0.8, duration: 0.28 }, 0.40);
          }
          if (shopPlinth) {
            coversTl.to(shopPlinth, { z: isMobile ? 8 : 12, duration: 0.28 }, 0.40);
          }

          if (textCols[2]) {
            coversTl.to(textCols[2], { opacity: 1, duration: 0.15 }, 0.46);
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
              duration: 0.28,
            },
            0.42
          );

          // Dwell on Cover 2 (E-Commerce in focus)
          coversTl.to({}, { duration: 0.05 });

          // --------------------------------------------------
          // STAGE 3: COVER 2 (E-Commerce) -> COVER 3 (Booking)
          // Progress: 0.72 to 1.00
          // Cover 2 physically lifts up & over Cover 3
          // E-commerce objects retain parallax separation during exit:
          // Secondary lags, primary has stronger depth, bag recedes smoothly
          // --------------------------------------------------
          coversTl.to(
            cover2,
            {
              yPercent: yOutgoing,
              z: zOutgoing,
              rotateX: rotOutgoing,
              scale: 1,
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.85)',
              duration: 0.26,
              onComplete: () => {
                cover2.style.pointerEvents = 'none';
              },
            },
            0.72
          );

          // E-commerce exit separation
          if (shopSec) {
            coversTl.to(shopSec, { yPercent: -14, z: isMobile ? -14 : -18, duration: 0.24 }, 0.72);
          }
          if (shopPrimary) {
            coversTl.to(shopPrimary, { yPercent: -8, z: isMobile ? 26 : 52, duration: 0.24 }, 0.72);
          }
          if (shopBag) {
            coversTl.to(shopBag, { y: -6, z: isMobile ? 12 : 20, rotateZ: -0.3, duration: 0.24 }, 0.72);
          }

          coversTl.to(
            cover2,
            {
              opacity: 0,
              duration: 0.08,
            },
            0.90
          );

          // Cover 3 rises into full focal position
          coversTl.to(
            cover3,
            {
              yPercent: 0,
              z: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              boxShadow: 'none',
              duration: 0.26,
              onStart: () => {
                cover3.style.pointerEvents = 'auto';
              },
            },
            0.74
          );

          // BOOKING INTERNAL MOTION: Grouped scheduling composition with layered depth
          if (bookCal) {
            coversTl.to(bookCal, { yPercent: -4, z: isMobile ? 10 : 20, duration: 0.26 }, 0.74);
          }
          if (bookClock) {
            coversTl.to(bookClock, { yPercent: -5, z: isMobile ? 24 : 50, rotateZ: -1.8, duration: 0.26 }, 0.74);
          }
          if (bookFocal) {
            coversTl.to(bookFocal, { y: 0, z: isMobile ? 28 : 60, duration: 0.26 }, 0.74);
          }
          if (bookCard) {
            coversTl.to(bookCard, { y: 0, z: isMobile ? 24 : 50, duration: 0.26 }, 0.74);
          }

          if (textCols[3]) {
            coversTl.to(textCols[3], { opacity: 1, duration: 0.16 }, 0.78);
          }

          // Dwell on Cover 3 (Booking fully focal at end of pinned track)
          coversTl.to({}, { duration: 0.04 });

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
              exitTl.to(bookCal, { z: isMobile ? -8 : -14, duration: 1 }, 0);
            }
            if (bookClock) {
              exitTl.to(bookClock, { z: isMobile ? 12 : 22, rotateZ: -0.6, duration: 1 }, 0);
            }
            if (bookFocal) {
              exitTl.to(bookFocal, { z: isMobile ? 14 : 26, duration: 1 }, 0);
            }
            if (bookCard) {
              exitTl.to(bookCard, { z: isMobile ? 12 : 20, duration: 1 }, 0);
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
