'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AboutDepthMotion } from './AboutDepthMotion';
import { AboutVectorThread } from './AboutVectorThread';
import styles from './AboutLanding.module.css';

const educationItems = [
  {
    number: '01',
    title: 'BS COMPUTER SCIENCE',
    detail: 'Islamia University of Bahawalpur',
  },
  {
    number: '02',
    title: 'CS50',
    detail: 'Harvard University · Online',
  },
  {
    number: '03',
    title: 'APTECH',
    detail: 'Software development & deeper technical study',
  },
  {
    number: '04',
    title: 'SIGMA',
    detail: 'Development coursework',
  },
  {
    number: '05',
    title: 'FRONTEND DEVELOPMENT',
    detail: 'Completed / actively practiced as part of my development journey',
  },
] as const;

const workPrinciples = [
  {
    title: 'UNDERSTAND FIRST',
    description: 'I start by understanding what the business or project actually needs before deciding what should be built.',
  },
  {
    title: 'CUSTOM TO THE PROJECT',
    description: 'I prefer solutions designed around the client, workflow and audience instead of forcing every project into the same template.',
  },
  {
    title: 'AI-ACCELERATED',
    description: 'Modern AI tools help me research, iterate and respond faster, allowing more time to focus on structure, decisions and refinement.',
  },
] as const;

const audiences = [
  'LOCAL BUSINESSES',
  'RESTAURANTS',
  'SHOPIFY BRANDS',
] as const;

export function AboutLanding() {
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <>
      <main className={styles.page} data-about-depth>
        <AboutVectorThread />
        <AboutDepthMotion />

        {/* 1. Opening / Hero Viewport - Website Development Scene Language */}
        <section className={styles.heroSection} data-depth-hero id="about-hero" aria-label="About Hamail">
          <div className={styles.sceneSurface} data-depth-surface aria-hidden="true">
            <div className={styles.sceneGrid} />
          </div>
          <div className={styles.sceneContent} data-depth-content>
            <p className={styles.heroFrameLabel}>ABOUT ME</p>
            <div className={styles.depthWrapper}>
              <div className={styles.heroBody}>
                <p className={styles.heroName}>HAMAIL IQBAL</p>
                <h1 className={styles.heroHeadline}>
                  <span>STUDENT.</span>
                  <span>DEVELOPER.</span>
                  <span>ALWAYS LEARNING.</span>
                </h1>
              </div>
              <div className={styles.heroFoot}>
                <p className={styles.heroStatement}>
                  I’ve been drawn to technology and development since childhood. Today, I’m turning that passion into real digital products while continuously going deeper into computer science, software development and modern AI-assisted workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHO I AM - Dark Graphite Editorial Cover Language */}
        <section className={styles.whoSection} data-depth-section id="who-i-am" aria-labelledby="who-title">
          <div className={styles.sceneSurface} data-depth-surface aria-hidden="true" />
          <div className={styles.sceneContent} data-depth-content>
            <h2 id="who-title" className={styles.frameLabel}>
              WHO I AM
            </h2>
            <div className={styles.depthWrapper} data-depth-wrapper>
              <div className={styles.whoBody}>
                <p className={styles.whoStatement}>
                  I’m a student and developer focused on building websites and Shopify stores that solve real business problems.
                </p>
              </div>
              <div className={styles.whoFoot}>
                <div className={styles.whoCopy}>
                  <p>
                    Development has been a passion of mine since childhood. What started as curiosity grew into something I now study, practice and work on every day.
                  </p>
                  <p>
                    I use modern AI tools to accelerate development, research and iteration, but the decisions, structure and final product are still built around the actual needs of the project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ALWAYS LEARNING - Warm Linen Stone Architectural Table */}
        <section className={styles.learningSection} data-depth-section id="always-learning" aria-labelledby="learning-title">
          <div className={styles.sceneSurface} data-depth-surface aria-hidden="true">
            <div className={styles.sceneGrid} />
          </div>
          <div className={styles.sceneContent} data-depth-content>
            <h2 id="learning-title" className={styles.frameLabel}>
              ALWAYS LEARNING.
            </h2>
            <div className={styles.depthWrapper} data-depth-wrapper>
              <div className={styles.learningBody}>
                <div className={styles.educationRows}>
                  {educationItems.map((item) => (
                    <div key={item.number} className={styles.educationRow}>
                      <span className={styles.educationIndex}>{item.number}</span>
                      <h3 className={styles.educationTitle}>{item.title}</h3>
                      <p className={styles.educationDetail}>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW I WORK - Dark Neutral Transition */}
        <section className={styles.howSection} data-depth-section id="how-i-work" aria-labelledby="how-title">
          <div className={styles.sceneSurface} data-depth-surface aria-hidden="true" />
          <div className={styles.sceneContent} data-depth-content>
            <h2 id="how-title" className={styles.frameLabel}>
              HOW I WORK
            </h2>
            <div className={styles.depthWrapper} data-depth-wrapper>
              <div className={styles.howBody}>
                <div className={styles.conceptsGrid}>
                  {workPrinciples.map((item) => (
                    <div key={item.title} className={styles.conceptCard}>
                      <h3 className={styles.conceptTitle}>{item.title}</h3>
                      <p className={styles.conceptText}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WEBSITE DEVELOPMENT EXPERIENCE - Homepage Website Stone Scene Language */}
        <section className={styles.websiteSection} data-depth-section id="website-experience" aria-labelledby="website-title">
          <div className={styles.sceneSurface} data-depth-surface aria-hidden="true">
            <div className={styles.sceneGrid} />
          </div>
          <div className={styles.sceneContent} data-depth-content>
            <h2 id="website-title" className={styles.frameLabel}>
              WEBSITE DEVELOPMENT
            </h2>
            <div className={styles.depthWrapper} data-depth-wrapper>
              <div className={styles.experienceBody}>
                <p className={styles.experienceStatement}>
                  3+ YEARS OF WEBSITE DEVELOPMENT EXPERIENCE.
                </p>
              </div>
              <div className={styles.experienceFoot}>
                <div className={styles.experienceCopy}>
                  <p>
                    With my development skills and AI-assisted workflow, I can build complete websites around the requirements of the project, including the functionality and features the business actually needs.
                  </p>
                  <p>
                    My focus is on understanding the business first and then building a custom website around its users, goals and workflow rather than forcing every project into the same template.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SHOPIFY EXPERIENCE - Homepage Shopify Sage Scene Language */}
        <section className={styles.shopifySection} data-depth-section id="shopify" aria-labelledby="shopify-title">
          <div className={styles.sceneSurface} data-depth-surface aria-hidden="true">
            <div className={styles.sceneGrid} />
          </div>
          <div className={styles.sceneContent} data-depth-content>
            <h2 id="shopify-title" className={styles.frameLabel}>
              <span>SHOPIFY</span>
            </h2>
            <div className={styles.depthWrapper} data-depth-wrapper>
              <div className={styles.shopifyBody}>
                <p className={styles.shopifyStatement}>
                  MORE THAN 6 YEARS WORKING WITH SHOPIFY.
                </p>
              </div>
              <div className={styles.shopifyFoot}>
                <div className={styles.shopifyCopy}>
                  <p>
                    My Shopify work goes beyond setting up a storefront. I can help manage the store, structure products and collections, refine the customer experience and design the storefront around the business and its brand.
                  </p>
                  <p>
                    Whether a business needs a new Shopify store or improvements to an existing one, the goal is to make the store easier to manage and better suited to the customers using it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. WHO I BUILD FOR & WORKING STYLE - Cool Stone Surface Language */}
        <section className={styles.buildForSection} data-depth-section id="who-i-build-for" aria-labelledby="build-for-title">
          <div className={styles.sceneSurface} data-depth-surface aria-hidden="true">
            <div className={styles.sceneGrid} />
          </div>
          <div className={styles.sceneContent} data-depth-content>
            <h2 id="build-for-title" className={styles.frameLabel}>
              WHO I BUILD FOR
            </h2>
            <div className={styles.depthWrapper} data-depth-wrapper>
              <div className={styles.buildForBody}>
                <div className={styles.audienceList}>
                  {audiences.map((audience) => (
                    <div key={audience} className={styles.audienceItem}>
                      <span>{audience}</span>
                      <span aria-hidden="true">↗</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.buildForFoot}>
                <p className={styles.buildForStatement}>
                  I’m interested in working with businesses that want digital products built around how they actually operate—not simply another template placed online.
                </p>

                <div className={styles.workingStyleBlock}>
                  <h3 className={styles.workingStyleHeadline}>
                    FAST COMMUNICATION.<br />
                    CLEAR ITERATION.
                  </h3>
                  <p className={styles.workingStyleCopy}>
                    AI-assisted workflows help me research, prototype and respond quickly while keeping the project aligned with the client’s requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FINAL ABOUT PAGE CTA / CONTACT ENDING - Single Line Divider */}
        <section className={styles.contactSection} data-depth-contact id="contact" aria-label="Contact">
          <div className={styles.sceneSurface} data-depth-surface aria-hidden="true" />
          <div className={styles.sceneContent} data-depth-content>
            <div className={styles.depthWrapper} data-depth-wrapper>
              <div className={styles.contactBody}>
                <div>
                  <h2 className={styles.contactHeading}>
                    LET&apos;S<br />
                    BUILD<br />
                    SOMETHING.
                  </h2>
                  <p className={styles.contactSupport}>
                    Have a project in mind? Let’s talk about what you need.
                  </p>
                </div>
                <div className={styles.contactFooter}>
                  <a
                    className={styles.contactLink}
                    href="https://wa.me/923053764646"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp <span>↗</span>
                  </a>
                  <div className={styles.footerNavWrap}>
                    <span className={styles.footerCopyright}>
                      © 2026 Hamail. All rights reserved.
                    </span>
                    <nav className={styles.footerNav} aria-label="Footer navigation" id="about-footer-nav">
                      <Link href="/" className={styles.footerNavLink}>
                        HOME
                      </Link>
                      <span className={styles.footerNavDivider} aria-hidden="true">/</span>
                      <Link href="/#services" className={styles.footerNavLink}>
                        SERVICES
                      </Link>
                      <span className={styles.footerNavDivider} aria-hidden="true">/</span>
                      <Link href="/contact" className={styles.footerNavLink}>
                        CONTACT ME
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
