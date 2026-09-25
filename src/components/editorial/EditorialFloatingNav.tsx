'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useLayoutEffect, useRef, type MouseEvent } from 'react';
import styles from './EditorialLanding.module.css';

const scrollSectionIds = ['services', 'contact'] as const;

export function EditorialFloatingNav() {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const nav = navRef.current;
    const opening = document.querySelector<HTMLElement>('[data-depth-opening]');
    const heroIdentity = document.querySelector<HTMLElement>('[data-hero-identity]');
    const heroEyebrow = document.querySelector<HTMLElement>('[data-hero-eyebrow]');
    const heroButtons = document.querySelector<HTMLElement>('[data-hero-buttons]');
    if (!nav || !opening || !heroIdentity) return;

    const navMeta = nav.querySelector<HTMLElement>('[data-nav-meta]');
    const navLinksContainer = nav.querySelector<HTMLElement>('[data-nav-links]');
    const navLinks = Array.from(nav.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // The markup is intentionally visible before this client-side enhancement
    // runs. If motion is unavailable, the homepage must remain usable.
    if (reducedMotion) return;

    let context: gsap.Context | undefined;
    try {
      context = gsap.context(() => {
      // 1. Initial State: At scroll = 0, ONLY Hero identity is visible.
      // Buttons below Hero are hidden and navbar is hidden.
      if (heroButtons) {
        gsap.set(heroButtons, {
          autoAlpha: 0,
          y: 26,
          scale: 0.96,
          pointerEvents: 'none',
        });
      }

      gsap.set(nav, {
        autoAlpha: 0,
        backgroundColor: 'rgba(8,9,9,0.04)',
        borderColor: 'rgba(242,240,234,0.03)',
        backdropFilter: 'blur(0px)',
        borderRadius: '1.25rem',
        scaleX: 0.92,
        scaleY: 0.84,
        transformOrigin: '50% 0%',
        xPercent: -50,
        y: -14,
        pointerEvents: 'none',
      });

      if (navMeta) {
        gsap.set(navMeta, { autoAlpha: 0, y: -4 });
      }

      if (navLinksContainer) {
        gsap.set(navLinksContainer, { autoAlpha: 0, y: 8, pointerEvents: 'none' });
      }

      // 2. Active Section Spy for Navbar
      const activate = (id: string) => {
        navLinks.forEach((link) => {
          const active = link.dataset.navLink === id;
          link.toggleAttribute('aria-current', active);
        });
      };

      scrollSectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => activate(id),
          onEnterBack: () => activate(id),
        });
      });

      let activeId = '';
      const syncActiveSection = () => {
        const marker = window.innerHeight * 0.55;
        const matchingId = scrollSectionIds.find((id) => {
          const section = document.getElementById(id);
          if (!section) return false;
          const bounds = section.getBoundingClientRect();
          return bounds.top <= marker && bounds.bottom >= marker;
        });

        if (matchingId && matchingId !== activeId) {
          activeId = matchingId;
          activate(activeId);
        } else if (!matchingId && activeId) {
          activeId = '';
          activate('');
        }
      };

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: syncActiveSection,
        onRefresh: syncActiveSection,
      });

      // 3. Coordinated GSAP Scroll-linked Timeline
      const morph = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: opening,
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.65,
        },
      });

      // Stage 1 (0.06 -> 0.22): As user begins scrolling, three buttons smoothly reveal below Hero identity
      if (heroButtons) {
        morph
          .to(heroButtons, { autoAlpha: 1, y: 0, scale: 1, duration: 0.16 }, 0.06)
          .set(heroButtons, { pointerEvents: 'auto' }, 0.20);
      }

      // Stage 2 (0.36 -> 0.52): Tagline reaches top region -> Hero identity fades out, wide glass navbar forms with ONLY MY PORTFOLIO on left
      if (heroEyebrow) {
        morph.to(heroEyebrow, { autoAlpha: 0, y: -10, duration: 0.16 }, 0.34);
      }

      morph
        .to(heroIdentity, { autoAlpha: 0, scale: 0.92, yPercent: -6, duration: 0.18 }, 0.36)
        .to(nav, {
          autoAlpha: 1,
          backgroundColor: 'rgba(8,9,9,0.58)',
          borderColor: 'rgba(242,240,234,0.18)',
          backdropFilter: 'blur(14px)',
          borderRadius: '1.75rem',
          scaleX: 1,
          scaleY: 1,
          y: 0,
          duration: 0.18,
        }, 0.38);

      if (navMeta) {
        morph.to(navMeta, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.40);
      }

      // Stage 3 (0.52 -> 0.68): In-page buttons approach top navbar area and transition into right side of navbar
      if (heroButtons) {
        morph
          .to(heroButtons, { autoAlpha: 0, y: -16, duration: 0.16 }, 0.52)
          .set(heroButtons, { pointerEvents: 'none' }, 0.62);
      }

      if (navLinksContainer) {
        morph
          .to(navLinksContainer, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.54)
          .set(navLinksContainer, { pointerEvents: 'auto' }, 0.66)
          .set(nav, { pointerEvents: 'auto' }, 0.66);
      }
      });
    } catch {
      // If a browser or extension prevents animation setup, clear every
      // partially-applied inline state and keep the server-rendered controls usable.
      context?.revert();
      gsap.set([heroIdentity, heroButtons, nav, navMeta, navLinksContainer].filter(Boolean), {
        clearProps: 'all',
      });
      return;
    }

    return () => context?.revert();
  }, []);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('hamail:scroll-to', { detail: { target: `#${id}`, offset: -96 } }));
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav ref={navRef} className={styles.floatingNav} aria-label="Primary navigation">
      {/* LEFT: MY PORTFOLIO */}
      <div className={styles.floatingNavIdentity}>
        <span className={styles.floatingNavMeta} data-nav-meta>
          MY PORTFOLIO
        </span>
      </div>

      {/* RIGHT: Three rounded buttons (SERVICES, ABOUT ME, CONTACT ME) */}
      <div className={styles.floatingNavLinks} data-nav-links aria-label="Page sections">
        <a
          href="#services"
          className={styles.floatingNavLink}
          data-nav-link="services"
          onClick={(event) => handleNavigation(event, 'services')}
        >
          <span className={styles.navDesktopLabel}>SERVICES</span>
          <span className={styles.navMobileLabel}>SERVICES</span>
        </a>
        <Link
          href="/about"
          className={styles.floatingNavLink}
          data-nav-link="about"
        >
          <span className={styles.navDesktopLabel}>ABOUT ME</span>
          <span className={styles.navMobileLabel}>ABOUT</span>
        </Link>
        <Link
          href="/contact"
          className={styles.floatingNavLink}
          data-nav-link="contact"
        >
          <span className={styles.navDesktopLabel}>CONTACT ME</span>
          <span className={styles.navMobileLabel}>CONTACT</span>
        </Link>
      </div>
    </nav>
  );
}
