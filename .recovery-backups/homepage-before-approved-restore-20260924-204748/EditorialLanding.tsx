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
          aria-label="Editorial Introduction"
          id="opening"
        >
          <div className={styles.ambientGlow} aria-hidden="true" />
          <div className={styles.openingHeader}>
            <span className={styles.editionMark}>Hamail &mdash; Studio Archive</span>
            <span className={styles.editionDate}>Vol. XXIV</span>
          </div>

          <div className={styles.openingBody}>
            <h1 className={styles.openingHeadline} data-depth-headline>
              <span>HAMAIL</span>
              <span className={styles.headlineSub}>DIGITAL CRAFTSMAN</span>
            </h1>

            <div className={styles.openingGrid}>
              <div className={styles.openingCol}>
                <span className={styles.colLabel}>DISCIPLINE</span>
                <p>Digital Experiences, Web Architecture, Bespoke Interfaces</p>
              </div>
              <div className={styles.openingCol}>
                <span className={styles.colLabel}>LOCATION</span>
                <p>Available Worldwide &mdash; Operating at the Intersection of Art &amp; Code</p>
              </div>
              <div className={styles.openingColAction}>
                <button
                  type="button"
                  className={styles.indexLink}
                  onClick={(event) => handleNavClick(event, 'services')}
                  aria-label="Scroll to services index"
                >
                  <span>EXPLORE INDEX</span>
                  <span className={styles.indexArrow} aria-hidden="true">&darr;</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.scenes} id="services" aria-label="Selected Works">
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
