'use client';

import Link from 'next/link';
import { useEffect, type MouseEvent } from 'react';
import { EditorialDepthMotion } from './EditorialDepthMotion';
import { EditorialFloatingNav } from './EditorialFloatingNav';
import styles from './EditorialLanding.module.css';

const services = [
  { number: '01', title: ['WEBSITE', 'DEVELOPMENT'], detail: 'Distinct websites for businesses with somewhere to go.', href: '/websites', tone: 'website' },
  { number: '02', title: ['SHOPIFY STORE', 'DEVELOPMENT'], detail: 'Storefronts designed to make the product feel inevitable.', href: '/shopify', tone: 'shopify' },
] as const;

export function EditorialLanding() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const timer = window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('hamail:scroll-to', { detail: { target: hash, offset: -96 } }));
      }, 150);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('hamail:scroll-to', { detail: { target: `#${id}`, offset: -96 } }));
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <main className={styles.page} data-editorial-depth>
        <EditorialDepthMotion />
        <section
          className={styles.opening}
          data-depth-opening
          aria-label="Hamail"
        >
          <div className={styles.heroStage}>
            <div className={styles.heroIdentity} data-hero-identity>
              <p className={styles.heroEyebrow} data-hero-eyebrow>MY PORTFOLIO</p>
              <h1 className={styles.name} aria-label="HAMAIL">
                <span>H</span><span>A</span><span>M</span><span>A</span><span className={styles.nameI}>I</span><span>L</span>
              </h1>
              <p className={styles.heroTagline} data-hero-tagline>BUILDING DIGITAL EXPERIENCES THAT FEEL ALIVE.</p>

              {/* Three rounded options below Hero identity group */}
              <div className={styles.heroButtons} data-hero-buttons>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className={styles.heroButton}
                  data-hero-btn="services"
                >
                  SERVICES
                </button>
                <Link
                  href="/about"
                  className={styles.heroButton}
                  data-hero-btn="about"
                >
                  ABOUT ME
                </Link>
                <Link
                  href="/contact"
                  className={styles.heroButton}
                  data-hero-btn="contact"
                >
                  CONTACT ME
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.services} id="services" aria-label="Services">
          <div className={styles.divider} aria-hidden="true" />
          {services.map((service) => (
            <article key={service.number} data-depth-scene className={`${styles.scene} ${styles[service.tone]}`}>
              <Link href={service.href} className={styles.coverLink} aria-label={`Explore ${service.title.join(' ')}`} />
              <div className={styles.sceneGrid} aria-hidden="true" />
              <div className={styles.sceneTopline}><span>{service.number}</span></div>
              <div className={styles.sceneBody}>
                <h2>{service.title.map((line) => <span key={line}>{line}</span>)}</h2>
                <div className={styles.sceneFoot}>
                  <p>{service.detail}</p>
                  <span className={styles.explore}><span>Explore</span><i aria-hidden="true">↗</i></span>
                </div>
              </div>
              <div className={styles.sceneNumber} aria-hidden="true">{service.number}</div>
            </article>
          ))}
        </section>

        <section className={styles.contact} data-depth-contact id="contact">
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.contactBody}>
            <h2>LET&apos;S<br />MAKE IT<br />MATTER.</h2>
            <a className={styles.contactLink} href="https://wa.me/923053764646" target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
          </div>
          <div className={styles.creditLine} aria-hidden="true" />
        </section>
      </main>
      <EditorialFloatingNav />
    </>
  );
}
