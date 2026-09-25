'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { WebsitesDepthMotion } from './WebsitesDepthMotion';
import styles from './WebsitesShowroom.module.css';

export function WebsitesShowroom() {
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <main className={styles.page} data-websites-depth aria-label="Website Development">
      <WebsitesDepthMotion />

      {/* Top Header Navigation */}
      <header className={styles.header}>
        <Link href="/" className={styles.backLink} aria-label="Return to portfolio home">
          <span className={styles.backArrow} aria-hidden="true">←</span>
          <span>BACK TO PORTFOLIO</span>
        </Link>
        <span className={styles.brand}>HAMAIL</span>
      </header>

      {/* 1. HERO SECTION */}
      <section className={styles.heroSection} data-depth-hero id="websites-hero" aria-label="Website Development">
        <div className={styles.heroContent} data-depth-content>
          <div className={styles.heroBody}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine1} data-depth-hero-line="1">WEBSITE</span>
              <span className={styles.heroTitleLine2} data-depth-hero-line="2">DEVELOPMENT</span>
            </h1>
          </div>
          <div className={styles.heroFoot}>
            <p className={styles.heroCopy} data-depth-hero-copy>Websites built around real business needs.</p>
          </div>
        </div>
      </section>

      {/* 2. WHAT CAN I BUILD FOR YOU? */}
      <section className={styles.transitionSection} data-depth-transition id="what-can-i-build" aria-label="What can I build for you?">
        <div className={styles.transitionContent} data-depth-content>
          <div className={styles.transitionBody}>
            <h2 className={styles.transitionTitle}>
              <span className={styles.transitionLineOne}>WHAT CAN I</span>
              <span className={styles.transitionLineTwo}>BUILD FOR YOU?</span>
            </h2>
          </div>
          <div className={styles.transitionRule} aria-hidden="true" />
        </div>
      </section>

      {/* OVERLAPPING PHYSICAL COVERS SEQUENCE */}
      <div className={styles.coversContainer} id="services-sequence" data-covers-container>
        <div className={styles.coversStage} data-covers-stage>

          {/* 3. RESTAURANT WEBSITE COVER */}
          <article
            className={`${styles.serviceCover} ${styles.restaurantCover}`}
            data-service-cover="0"
            id="restaurant-website"
            aria-label="Restaurant Website"
          >
            <div className={styles.coverHeader}>
              <span className={styles.coverTag}>01 / DINING &amp; HOSPITALITY</span>
              <span className={styles.coverFormat}>EDITORIAL COVER</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text Column */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>RESTAURANT</span>
                  <span className={styles.titleAccentWarm}>WEBSITE</span>
                </h2>
                <p className={styles.coverDescriptor}>
                  Menus <span className={styles.dot} aria-hidden="true">·</span> Ordering <span className={styles.dot} aria-hidden="true">·</span> Reservations
                </p>
                <p className={styles.coverStatement}>
                  Atmospheric digital spaces that evoke taste, texture, and hospitality before the first course is served.
                </p>
              </div>

              {/* Physical Dining Composition */}
              <div className={styles.coverVisualCol} data-depth-visual="restaurant" aria-hidden="true">
                <div className={styles.restaurantVisualContainer}>
                  {/* Category Rail */}
                  <div className={styles.restCategoryRail} data-depth-elem="rest-rail">
                    <span>TASTING</span>
                    <span className={styles.railDot}>·</span>
                    <span>SEASONAL</span>
                    <span className={styles.railDot}>·</span>
                    <span>RESERVE</span>
                  </div>

                  {/* Fork on Left */}
                  <div className={styles.restFork} data-depth-elem="rest-fork">
                    <div className={styles.forkHead}>
                      <span className={styles.forkTine} />
                      <span className={styles.forkTine} />
                      <span className={styles.forkTine} />
                    </div>
                    <span className={styles.cutleryStem} />
                  </div>

                  {/* Dark Ceramic Plate */}
                  <div className={styles.restPlate} data-depth-elem="rest-plate">
                    <div className={styles.restPlateRim}>
                      <div className={styles.restPlateWell}>
                        <span className={styles.restPlateRing} />
                      </div>
                    </div>
                  </div>

                  {/* Spoon on Right */}
                  <div className={styles.restSpoon} data-depth-elem="rest-spoon">
                    <div className={styles.spoonBowl} />
                    <span className={styles.cutleryStem} />
                  </div>

                  {/* Floating Menu Strip */}
                  <div className={styles.restStripPrimary} data-depth-elem="rest-strip-1">
                    <div className={styles.restStripHeader}>
                      <span className={styles.restStripTag}>MENU SELECTION</span>
                      <span className={styles.restStripStatus}>ACTIVE</span>
                    </div>
                    <div className={styles.restStripLines}>
                      <span />
                      <span />
                    </div>
                  </div>

                  {/* Chef Special Floating Card */}
                  <div className={styles.restChefSpecial} data-depth-elem="rest-chef-special">
                    <div className={styles.chefSpecialHeader}>
                      <span className={styles.chefSpecialTag}>CHEF SPECIAL</span>
                      <span className={styles.chefSpecialDot} />
                    </div>
                    <span className={styles.chefSpecialDesc}>SEASONAL TASTING · 5 COURSES</span>
                  </div>

                  {/* Table Reservation Action Strip */}
                  <div className={styles.restActionStrip} data-depth-elem="rest-reserve">
                    <span className={styles.restActionLabel}>TABLE RESERVATION</span>
                    <span className={styles.restActionArrow}>→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.coverFoot}>
              <span className={styles.coverIndex}>SERVICE 01</span>
              <span className={styles.coverScrollHint}>SCROLL TO UNCOVER NEXT</span>
            </div>
          </article>

          {/* 4. BUSINESS WEBSITE COVER */}
          <article
            className={`${styles.serviceCover} ${styles.businessCover}`}
            data-service-cover="1"
            id="business-website"
            aria-label="Business Website"
          >
            <div className={styles.coverHeader}>
              <span className={styles.coverTag}>02 / CORPORATE &amp; STUDIO</span>
              <span className={styles.coverFormat}>EDITORIAL COVER</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text Column */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>BUSINESS</span>
                  <span className={styles.titleAccentSteel}>WEBSITE</span>
                </h2>
                <p className={styles.coverDescriptor}>
                  Services <span className={styles.dot} aria-hidden="true">·</span> Inquiries <span className={styles.dot} aria-hidden="true">·</span> Professional presence
                </p>
                <p className={styles.coverStatement}>
                  Smoked walnut surfaces and structural clarity designed to project authority and convert high-value inquiries.
                </p>
              </div>

              {/* Physical Architectural Composition */}
              <div className={styles.coverVisualCol} data-depth-visual="business" aria-hidden="true">
                <div className={styles.businessVisualContainer}>
                  {/* Primary Smoked Walnut Board */}
                  <div className={styles.bizBoardMain} data-depth-elem="biz-board-main">
                    <div className={styles.bizBoardHeader}>
                      <span className={styles.bizHeaderMark} />
                      <span className={styles.bizBoardTitle}>SERVICES &amp; ARCHITECTURE</span>
                      <div className={styles.bizHeaderNav}>
                        <span /><span /><span />
                      </div>
                    </div>
                    <div className={styles.bizBoardSections}>
                      <div className={styles.bizSectionItem}>
                        <div className={styles.bizSectionLabelRow}>
                          <span className={styles.bizSectionIndex}>01</span>
                          <span className={styles.bizSectionTitle}>SERVICES &amp; STRATEGY</span>
                        </div>
                        <div className={styles.bizSectionRule} />
                      </div>
                      <div className={styles.bizSectionItem}>
                        <div className={styles.bizSectionLabelRow}>
                          <span className={styles.bizSectionIndex}>02</span>
                          <span className={styles.bizSectionTitle}>SELECTED WORK</span>
                        </div>
                        <div className={styles.bizSectionRule} />
                      </div>
                      <div className={styles.bizSectionItem}>
                        <div className={styles.bizSectionLabelRow}>
                          <span className={styles.bizSectionIndex}>03</span>
                          <span className={styles.bizSectionTitle}>CORPORATE PRESENCE</span>
                        </div>
                        <div className={styles.bizSectionRule} />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Document Slab */}
                  <div className={styles.bizBoardSecondary} data-depth-elem="biz-board-secondary">
                    <div className={styles.bizSecHeader}>
                      <span className={styles.bizSecTag}>WORK ARCHIVE</span>
                      <span className={styles.bizSecYear}>2026</span>
                    </div>
                    <div className={styles.bizSecLines}>
                      <span />
                      <span />
                    </div>
                  </div>

                  {/* Direct Inquiry Action Strip */}
                  <div className={styles.bizActionStrip} data-depth-elem="biz-inquiry">
                    <span className={styles.bizActionLabel}>DIRECT INQUIRY</span>
                    <span className={styles.bizActionArrow}>→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.coverFoot}>
              <span className={styles.coverIndex}>SERVICE 02</span>
              <span className={styles.coverScrollHint}>SCROLL TO UNCOVER NEXT</span>
            </div>
          </article>

          {/* 5. E-COMMERCE WEBSITE COVER */}
          <article
            className={`${styles.serviceCover} ${styles.commerceCover}`}
            data-service-cover="2"
            id="ecommerce-website"
            aria-label="E-commerce Website"
          >
            <div className={styles.coverHeader}>
              <span className={styles.coverTag}>03 / COMMERCE &amp; RETAIL</span>
              <span className={styles.coverFormat}>EDITORIAL COVER</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text Column */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>E-COMMERCE</span>
                  <span className={styles.titleAccentWarm}>WEBSITE</span>
                </h2>
                <p className={styles.coverDescriptor}>
                  Products <span className={styles.dot} aria-hidden="true">·</span> Shopping <span className={styles.dot} aria-hidden="true">·</span> Checkout
                </p>
                <p className={styles.coverStatement}>
                  Tactile luxury storefronts where matte packaging and friction-free purchase flows make buying inevitable.
                </p>
              </div>

              {/* Physical Packaging Composition */}
              <div className={styles.coverVisualCol} data-depth-visual="commerce" aria-hidden="true">
                <div className={styles.commerceVisualContainer}>
                  {/* Display Plinth Base */}
                  <div className={styles.shopPlinth} data-depth-elem="shop-plinth" />

                  {/* Secondary Packaging Block */}
                  <div className={styles.shopBoxSecondary} data-depth-elem="shop-box-secondary">
                    <div className={styles.shopBoxTop} />
                    <div className={styles.shopBoxFace}>
                      <span className={styles.shopBoxTag}>PRODUCT 02</span>
                      <div className={styles.shopBoxLines}>
                        <span />
                      </div>
                    </div>
                  </div>

                  {/* Primary Product Box */}
                  <div className={styles.shopBoxPrimary} data-depth-elem="shop-box-primary">
                    <div className={styles.shopBoxTop} />
                    <div className={styles.shopBoxFace}>
                      <div className={styles.shopFocusHeader}>
                        <span className={styles.shopFocusTag}>NEW PRODUCT</span>
                        <span className={styles.shopFocusStatus}>IN STOCK</span>
                      </div>
                      <div className={styles.shopFocusSpec}>
                        <span className={styles.shopSpecLine1} />
                        <span className={styles.shopSpecLine2} />
                      </div>
                    </div>
                  </div>

                  {/* 3D Luxury Shopping Bag */}
                  <div className={styles.shopBag} data-depth-elem="shop-bag">
                    <div className={styles.shopBagHandle} />
                    <div className={styles.shopBagBody}>
                      <div className={styles.shopBagTagRow}>
                        <span className={styles.shopBagLabel}>BAG</span>
                        <span className={styles.shopBagCount}>1</span>
                      </div>
                      <span className={styles.shopBagBrandLine} />
                    </div>
                  </div>

                  {/* Cart Indicator */}
                  <div className={styles.shopCartPlane} data-depth-elem="shop-cart">
                    <span className={styles.shopCartLabel}>BAG</span>
                    <span className={styles.shopCartCount}>1</span>
                  </div>

                  {/* Checkout Action Strip */}
                  <div className={styles.shopActionStrip} data-depth-elem="shop-checkout">
                    <span className={styles.shopActionLabel}>PROCEED TO CHECKOUT</span>
                    <span className={styles.shopActionArrow}>→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.coverFoot}>
              <span className={styles.coverIndex}>SERVICE 03</span>
              <span className={styles.coverScrollHint}>SCROLL TO UNCOVER NEXT</span>
            </div>
          </article>

          {/* 6. BOOKING & SERVICE WEBSITE COVER */}
          <article
            className={`${styles.serviceCover} ${styles.bookingCover}`}
            data-service-cover="3"
            id="booking-website"
            aria-label="Booking and Service Website"
          >
            <div className={styles.coverHeader}>
              <span className={styles.coverTag}>04 / APPOINTMENTS &amp; SCHEDULING</span>
              <span className={styles.coverFormat}>EDITORIAL COVER</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text Column */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>BOOKING &amp;</span>
                  <span className={styles.titleAccentSteel}>SERVICE WEBSITE</span>
                </h2>
                <p className={styles.coverDescriptor}>
                  Appointments <span className={styles.dot} aria-hidden="true">·</span> Availability <span className={styles.dot} aria-hidden="true">·</span> Inquiries
                </p>
                <p className={styles.coverStatement}>
                  Restrained stone and metal scheduling flows that respect client time and streamline calendar reservations.
                </p>
              </div>

              {/* Physical Booking Visual Composition */}
              <div className={styles.coverVisualCol} data-depth-visual="booking" aria-hidden="true">
                <div className={styles.bookingVisualContainer}>
                  {/* Calendar Base Plane */}
                  <div className={styles.bookCalPlane} data-depth-elem="book-cal">
                    <div className={styles.bookCalHeader}>
                      <span className={styles.bookCalMonth}>SELECT DATE</span>
                      <span className={styles.bookCalStatus}>AVAILABLE</span>
                    </div>
                    <div className={styles.bookSlotsGrid}>
                      <div className={styles.bookSlotMuted} data-depth-elem="book-slot-1">
                        <span className={styles.bookSlotTime}>09:30</span>
                        <span className={styles.bookSlotState}>AVAILABLE</span>
                      </div>
                      <div className={styles.bookSlotMuted} data-depth-elem="book-slot-2">
                        <span className={styles.bookSlotTime}>11:00</span>
                        <span className={styles.bookSlotState}>AVAILABLE</span>
                      </div>
                      <div className={styles.bookSlotMuted} data-depth-elem="book-slot-3">
                        <span className={styles.bookSlotTime}>13:30</span>
                        <span className={styles.bookSlotState}>AVAILABLE</span>
                      </div>
                    </div>
                  </div>

                  {/* Circular Clock Dial */}
                  <div className={styles.bookClock} data-depth-elem="book-clock">
                    <div className={styles.clockBezel}>
                      <div className={styles.clockFace}>
                        <span className={styles.clockHourHand} />
                        <span className={styles.clockMinuteHand} />
                        <span className={styles.clockCenterPivot} />
                        <span className={styles.clockMarkTop} />
                        <span className={styles.clockMarkRight} />
                        <span className={styles.clockMarkBottom} />
                        <span className={styles.clockMarkLeft} />
                      </div>
                    </div>
                    <span className={styles.clockLabel}>SELECT TIME</span>
                  </div>

                  {/* Selected Focal Time Slot */}
                  <div className={styles.bookSlotFocal} data-depth-elem="book-slot-focal">
                    <div className={styles.bookFocalHeader}>
                      <span className={styles.bookFocalTag}>SELECTED TIME</span>
                      <span className={styles.bookFocalDot} />
                    </div>
                    <span className={styles.bookFocalTime}>15:00</span>
                    <span className={styles.bookFocalStatus}>CONFIRMED</span>
                  </div>

                  {/* Appointment Confirmation Card */}
                  <div className={styles.bookConfirmCard} data-depth-elem="book-confirm-card">
                    <div className={styles.bookConfirmHeader}>
                      <span className={styles.bookConfirmTag}>CONFIRMED</span>
                      <span className={styles.bookConfirmCheck}>✓</span>
                    </div>
                    <span className={styles.bookConfirmDetail}>FRI, OCT 24 · 15:00</span>
                  </div>

                  {/* Confirm Reservation Action Strip */}
                  <div className={styles.bookActionStrip} data-depth-elem="book-confirm">
                    <span className={styles.bookActionLabel}>CONFIRM RESERVATION</span>
                    <span className={styles.bookActionArrow}>→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.coverFoot}>
              <span className={styles.coverIndex}>SERVICE 04</span>
              <span className={styles.coverScrollHint}>SEQUENCE COMPLETE</span>
            </div>
          </article>

        </div>
      </div>

      {/* 7. BUILT AROUND YOUR BUSINESS (VALUE SECTION) */}
      <section className={styles.valueSection} data-depth-value id="built-around-business" aria-label="Built around your business">
        <div className={styles.valueContent} data-depth-content>
          <div className={styles.valueBody} data-depth-text>
            <h2 className={styles.valueTitle}>
              <span className={styles.valueLineOne}>BUILT AROUND</span>
              <span className={styles.valueLineTwo}>YOUR BUSINESS.</span>
            </h2>
            <p className={styles.valueStatement}>
              Mobile, ordering, booking, shopping and inquiries can be added when your business needs them.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className={styles.ctaSection} data-depth-cta id="websites-cta" aria-label="Start your website project">
        <div className={styles.ctaContent} data-depth-content>
          <div className={styles.ctaHead} data-depth-text>
            <h2 className={styles.ctaTitle}>
              <span className={styles.ctaLineOne}>HAVE SOMETHING</span>
              <span className={styles.ctaLineTwo}>IN MIND?</span>
            </h2>
            <p className={styles.ctaCopy}>Tell me what your business needs.</p>
          </div>
          <div className={styles.ctaActionRow}>
            <Link href="/contact" className={styles.ctaEditorialLink}>
              <span className={styles.ctaText}>TELL ME ABOUT IT</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. MINIMAL FOOTER */}
      <footer className={styles.footer} aria-label="Footer">
        <nav className={styles.footerNav} aria-label="Footer navigation">
          <Link href="/" className={styles.footerLink}>HOME</Link>
          <span className={styles.footerDivider} aria-hidden="true">/</span>
          <Link href="/about" className={styles.footerLink}>ABOUT ME</Link>
          <span className={styles.footerDivider} aria-hidden="true">/</span>
          <Link href="/contact" className={styles.footerLink}>CONTACT</Link>
        </nav>
      </footer>
    </main>
  );
}
