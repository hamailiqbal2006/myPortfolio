'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ContactDepthMotion } from './ContactDepthMotion';
import {
  EstimateIcon,
  WhatsAppIcon,
  EmailIcon,
} from './ContactIcons';
import { ContactFaq } from './ContactFaq';
import styles from './ContactLanding.module.css';

const WHATSAPP_PHONE = '923053764646';
const EMAIL_ADDRESS = 'hamail.web.dev@gmail.com';

export function ContactLanding() {
  // 3D Continuous Scroll Proximity Refs (3 Action Panels)
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const iconRefs = useRef<(HTMLElement | null)[]>([]);
  const arrowRefs = useRef<(HTMLElement | null)[]>([]);
  const progressRef = useRef<number[]>([0, 0, 0]);
  const hoveredIndexRef = useRef<number | null>(null);
  const focusedIndexRef = useRef<number | null>(null);

  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animId: number;
    let isAlive = true;

    const getDeviceParams = () => {
      const w = window.innerWidth;
      if (w <= 700) {
        return { maxZ: 35, maxArrow: 4 };
      } else if (w <= 1024) {
        return { maxZ: 55, maxArrow: 5 };
      } else {
        return { maxZ: 80, maxArrow: 6 };
      }
    };

    let params = getDeviceParams();
    const onResize = () => {
      params = getDeviceParams();
    };
    window.addEventListener('resize', onResize, { passive: true });

    const updateFrame = () => {
      if (!isAlive) return;

      const vh = window.innerHeight;
      const focusLine = vh * 0.52;
      const focusRadius = vh * 0.28;
      const isAtTop = window.scrollY < 30;

      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;

        let target = 0;

        if (hoveredIndexRef.current === i || focusedIndexRef.current === i) {
          target = 1;
        } else if (!isAtTop) {
          const rect = panel.getBoundingClientRect();
          const panelCenter = rect.top + rect.height / 2;
          const dist = Math.abs(panelCenter - focusLine);

          if (dist < focusRadius) {
            const norm = dist / focusRadius;
            target = Math.pow(Math.cos(norm * (Math.PI / 2)), 1.35);
          }
        }

        const current = progressRef.current[i] ?? 0;
        const next = current + (target - current) * 0.16;
        const p = Math.abs(next - target) < 0.001 ? target : next;
        progressRef.current[i] = p;

        const z = params.maxZ * p;
        const arrowX = params.maxArrow * p;

        // Move surface in 3D Z without scaling text to guarantee sharp, crisp typography
        panel.style.transform = `translate3d(0, 0, ${z.toFixed(1)}px)`;

        // Base styling with primary visual prominence on WhatsApp (index 0)
        const isPrimary = i === 0;
        const baseBorderAlpha = isPrimary ? 0.22 : 0.14;
        const boostBorderAlpha = isPrimary ? 0.38 : 0.36;
        panel.style.borderColor = `rgba(242, 240, 234, ${(baseBorderAlpha + boostBorderAlpha * p).toFixed(3)})`;

        const baseBgAlpha = isPrimary ? 0.045 : 0.02;
        panel.style.backgroundColor = `rgba(242, 240, 234, ${(baseBgAlpha + 0.06 * p).toFixed(3)})`;
        panel.style.boxShadow =
          p > 0.02
            ? `0 ${(14 * p).toFixed(1)}px ${(36 * p).toFixed(1)}px rgba(0, 0, 0, ${(0.45 * p).toFixed(3)})`
            : 'none';

        const icon = iconRefs.current[i];
        if (icon) {
          const baseIconOpacity = isPrimary ? 0.88 : 0.65;
          icon.style.opacity = `${(baseIconOpacity + (1 - baseIconOpacity) * p).toFixed(2)}`;
          icon.style.color =
            p > 0.5
              ? '#f2f0ea'
              : isPrimary
              ? 'rgba(242, 240, 234, 0.9)'
              : 'rgba(242, 240, 234, 0.75)';
        }

        const arrow = arrowRefs.current[i];
        if (arrow) {
          arrow.style.transform = `translateX(${arrowX.toFixed(1)}px)`;
          arrow.style.opacity = `${(0.7 + 0.3 * p).toFixed(2)}`;
        }
      });

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);

    return () => {
      isAlive = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Hi Hamail, I came through your portfolio and would like to discuss a project.'
  )}`;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    EMAIL_ADDRESS
  )}&su=${encodeURIComponent('Project Inquiry — Hamail Portfolio')}&body=${encodeURIComponent(
    'Hi Hamail,\n\nI came through your portfolio and would like to discuss a project.'
  )}`;

  return (
    <main ref={pageRef} className={styles.page} data-contact-depth>
      <ContactDepthMotion />

      {/* ==================================================
          SCENE 1: FIRST CONTACT COVER (HERO + 3 OPTIONS)
          ================================================== */}
      <section
        className={styles.heroSection}
        data-depth-hero
        id="contact-hero"
        aria-label="Contact and project intake"
      >
        <div className={styles.sceneSurface} data-depth-surface aria-hidden="true">
          <div className={styles.sceneGrid} />
        </div>
        <div className={styles.sceneContent} data-depth-content>
          <p className={styles.heroFrameLabel}>CONTACT</p>
          <div className={styles.depthWrapper}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroHeadline}>
                <span>LET&apos;S START</span>
                <span>WITH YOUR</span>
                <span>PROJECT.</span>
              </h1>
              <p className={styles.heroStatement}>
                Choose the fastest way to get started. Message directly on WhatsApp,
                send an email, or request a scoped project estimate.
              </p>

              {/* THREE CONTACT OPTIONS */}
              <div className={styles.actionStack} aria-label="Contact options">
                {/* 01: CHAT ON WHATSAPP */}
                <a
                  ref={(el) => {
                    panelRefs.current[0] = el;
                  }}
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionPanel} ${styles.actionPanelPrimary}`}
                  onMouseEnter={() => {
                    hoveredIndexRef.current = 0;
                  }}
                  onMouseLeave={() => {
                    hoveredIndexRef.current = null;
                  }}
                  onFocus={() => {
                    focusedIndexRef.current = 0;
                  }}
                  onBlur={() => {
                    focusedIndexRef.current = null;
                  }}
                  aria-label="Chat on WhatsApp: Tell me what you're trying to build and we can start from there. (opens in a new tab)"
                >
                  <div className={styles.actionPanelLeft}>
                    <span className={styles.actionIndex} aria-hidden="true">
                      01
                    </span>
                    <span
                      ref={(el) => {
                        iconRefs.current[0] = el;
                      }}
                      className={styles.actionIconWrap}
                      aria-hidden="true"
                    >
                      <WhatsAppIcon size={22} />
                    </span>
                    <div className={styles.actionTextBlock}>
                      <h2 className={styles.actionTitle}>CHAT ON WHATSAPP</h2>
                      <p className={styles.actionSubtitle}>
                        Tell me what you&apos;re trying to build and we can start from there.
                      </p>
                    </div>
                  </div>
                  <div className={styles.actionPanelRight}>
                    <span className={styles.actionCtaText}>START CHAT</span>
                    <span
                      ref={(el) => {
                        arrowRefs.current[0] = el;
                      }}
                      className={styles.actionArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </a>

                {/* 02: CHAT ON EMAIL */}
                <a
                  ref={(el) => {
                    panelRefs.current[1] = el;
                  }}
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionPanel}
                  onMouseEnter={() => {
                    hoveredIndexRef.current = 1;
                  }}
                  onMouseLeave={() => {
                    hoveredIndexRef.current = null;
                  }}
                  onFocus={() => {
                    focusedIndexRef.current = 1;
                  }}
                  onBlur={() => {
                    focusedIndexRef.current = null;
                  }}
                  aria-label="Chat on Email: Prefer email? Send your project idea or requirements directly. (opens in a new tab)"
                >
                  <div className={styles.actionPanelLeft}>
                    <span className={styles.actionIndex} aria-hidden="true">
                      02
                    </span>
                    <span
                      ref={(el) => {
                        iconRefs.current[1] = el;
                      }}
                      className={styles.actionIconWrap}
                      aria-hidden="true"
                    >
                      <EmailIcon size={22} />
                    </span>
                    <div className={styles.actionTextBlock}>
                      <h2 className={styles.actionTitle}>CHAT ON EMAIL</h2>
                      <p className={styles.actionSubtitle}>
                        Prefer email? Send your project idea or requirements directly.
                      </p>
                    </div>
                  </div>
                  <div className={styles.actionPanelRight}>
                    <span className={styles.actionCtaText}>OPEN EMAIL</span>
                    <span
                      ref={(el) => {
                        arrowRefs.current[1] = el;
                      }}
                      className={styles.actionArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </a>

                {/* 03: GET A PROJECT ESTIMATE */}
                <Link
                  ref={(el) => {
                    panelRefs.current[2] = el;
                  }}
                  href="/contact/estimate"
                  className={`${styles.actionPanel} ${styles.actionPanelEstimate}`}
                  onMouseEnter={() => {
                    hoveredIndexRef.current = 2;
                  }}
                  onMouseLeave={() => {
                    hoveredIndexRef.current = null;
                  }}
                  onFocus={() => {
                    focusedIndexRef.current = 2;
                  }}
                  onBlur={() => {
                    focusedIndexRef.current = null;
                  }}
                  aria-label="Get a project estimate: Already know what you need? Send the project details for a scoped estimate."
                >
                  <div className={styles.actionPanelLeft}>
                    <span className={styles.actionIndex} aria-hidden="true">
                      03
                    </span>
                    <span
                      ref={(el) => {
                        iconRefs.current[2] = el;
                      }}
                      className={styles.actionIconWrap}
                      aria-hidden="true"
                    >
                      <EstimateIcon size={22} />
                    </span>
                    <div className={styles.actionTextBlock}>
                      <h2 className={styles.actionTitle}>GET A PROJECT ESTIMATE</h2>
                      <p className={styles.actionSubtitle}>
                        Already know what you need? Send the project details for a scoped estimate.
                      </p>
                    </div>
                  </div>
                  <div className={styles.actionPanelRight}>
                    <span className={styles.actionCtaText}>REQUEST ESTIMATE</span>
                    <span
                      ref={(el) => {
                        arrowRefs.current[2] = el;
                      }}
                      className={styles.actionArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </div>

              {/* Subtle CONTINUE indicator visually relating first cover to FAQ */}
              <div className={styles.continueIndicator} aria-hidden="true">
                <span className={styles.continueText}>CONTINUE ↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SCENE 2: FREQUENTLY ASKED QUESTIONS
          ================================================== */}
      <section
        className={styles.faqSection}
        id="contact-faq"
        aria-label="Frequently asked questions"
      >
        <ContactFaq />
      </section>

      {/* ==================================================
          SCENE 3: ABOUT-STYLE ARCHITECTURAL FOOTER
          ================================================== */}
      <footer className={styles.siteFooter} aria-label="Footer">
        <div className={styles.footerInner}>
          <div className={styles.footerNavWrap}>
            <nav className={styles.footerNav} aria-label="Footer navigation">
              <Link href="/" className={styles.footerNavLink}>
                HOME
              </Link>
              <span className={styles.footerNavDivider} aria-hidden="true">
                /
              </span>
              <Link href="/#services" className={styles.footerNavLink}>
                SERVICES
              </Link>
              <span className={styles.footerNavDivider} aria-hidden="true">
                /
              </span>
              <Link href="/about" className={styles.footerNavLink}>
                ABOUT ME
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
