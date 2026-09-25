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

      {/* 1. HERO SECTION (Homepage-Style Centered Opening) */}
      <section className={styles.heroSection} data-depth-hero id="websites-hero" aria-label="Website Development">
        <div className={styles.heroStage}>
          <div className={styles.heroIdentity} data-hero-identity>
            <p className={styles.heroEyebrow} data-depth-hero-eyebrow>SERVICE OVERVIEW</p>
            <h1 className={styles.heroTitle} aria-label="Website Development">
              <span className={styles.heroTitleLine1} data-depth-hero-line="1">WEBSITE</span>
              <span className={styles.heroTitleLine2} data-depth-hero-line="2">DEVELOPMENT</span>
            </h1>
            <p className={styles.heroCopy} data-depth-hero-copy>Websites built around real business needs.</p>
          </div>
        </div>
      </section>

      {/* 2. WHAT CAN I BUILD FOR YOU? (TRANSITION SCENE) */}
      <section className={styles.transitionSection} data-depth-transition id="what-can-i-build" aria-label="What can I build for you?">
        <div className={styles.transitionContent} data-depth-content>
          <div className={styles.transitionBody}>
            <h2 className={styles.transitionTitle}>
              <span className={styles.transitionLineOne} data-depth-trans-line="1">WHAT CAN I</span>
              <span className={styles.transitionLineTwo} data-depth-trans-line="2">BUILD FOR YOU?</span>
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
              <span className={styles.coverTag}>DINING &amp; HOSPITALITY</span>
              <span className={styles.coverTagSub}>01 / 04</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text & Service Delivery Column (Columns 1–5) */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>RESTAURANT</span>
                  <span className={styles.titleSecondary}>WEBSITE</span>
                </h2>
                <p className={styles.coverDescriptor}>
                  Menus <span className={styles.dot} aria-hidden="true">·</span> Ordering <span className={styles.dot} aria-hidden="true">·</span> Reservations
                </p>
                <p className={styles.coverStatement}>
                  Atmospheric digital spaces that evoke taste, texture, and hospitality before the first course is served.
                </p>

                {/* What I Provide Minimal List */}
                <div className={styles.deliverablesList}>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>MENU</span>
                    <span className={styles.deliverableDesc}>Digital menu presentation</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>ONLINE ORDERS</span>
                    <span className={styles.deliverableDesc}>Simple ordering flow</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>RESERVATIONS</span>
                    <span className={styles.deliverableDesc}>Table booking experience</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>OFFERS &amp; CONTACT</span>
                    <span className={styles.deliverableDesc}>Promotions and direct contact</span>
                  </div>
                </div>

                <div className={styles.coverActionWrap} data-depth-elem="rest-reserve">
                  <span className={styles.editorialActionLink}>
                    <span>TABLE RESERVATION</span>
                    <span className={styles.actionArrow} aria-hidden="true">→</span>
                  </span>
                  <span className={styles.actionSubtext}>Choose date &amp; time</span>
                </div>
              </div>

              {/* Physical Dining Composition (Columns 6–12) */}
              <div className={styles.coverVisualCol} data-depth-visual="restaurant" aria-hidden="true">
                <div className={styles.restaurantVisualContainer}>
                  {/* Category Rail (Top Right) */}
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

                  {/* Dark Ceramic & Terracotta Plate (Central Anchor) */}
                  <div className={styles.restPlate} data-depth-elem="rest-plate">
                    <div className={styles.restPlateTerracottaRim}>
                      <div className={styles.restPlateRim}>
                        <div className={styles.restPlateWell}>
                          <span className={styles.restPlateRing} />
                          <div className={styles.restPlateCenterGarnish}>
                            <span className={styles.garnishDot1} />
                            <span className={styles.garnishDot2} />
                            <span className={styles.garnishDot3} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spoon on Right */}
                  <div className={styles.restSpoon} data-depth-elem="rest-spoon">
                    <div className={styles.spoonBowl} />
                    <span className={styles.cutleryStem} />
                  </div>

                  {/* Chef Special Detail Card (Positioned Above-Left, Zero Collision) */}
                  <div className={styles.restChefSpecial} data-depth-elem="rest-chef-special">
                    <div className={styles.chefSpecialHeader}>
                      <span className={styles.chefSpecialTag}>CHEF SPECIAL</span>
                      <span className={styles.chefSpecialDot} />
                    </div>
                    <span className={styles.chefSpecialDesc}>Seasonal tasting · 5 courses</span>
                  </div>
                </div>
              </div>
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
              <span className={styles.coverTag}>CORPORATE &amp; STUDIO</span>
              <span className={styles.coverTagSub}>02 / 04</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text & Service Delivery Column (Columns 1–5) */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>BUSINESS</span>
                  <span className={styles.titleSecondary}>WEBSITE</span>
                </h2>
                <p className={styles.coverDescriptor}>
                  Services <span className={styles.dot} aria-hidden="true">·</span> Inquiries <span className={styles.dot} aria-hidden="true">·</span> Professional presence
                </p>
                <p className={styles.coverStatement}>
                  Smoked walnut surfaces and structural clarity designed to project authority and convert high-value inquiries.
                </p>

                {/* What I Provide Minimal List */}
                <div className={styles.deliverablesList}>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>SERVICES</span>
                    <span className={styles.deliverableDesc}>Clear service presentation</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>WORK</span>
                    <span className={styles.deliverableDesc}>Showcase projects or work</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>INQUIRIES</span>
                    <span className={styles.deliverableDesc}>Turn visitors into leads</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>CONTACT</span>
                    <span className={styles.deliverableDesc}>Make reaching you simple</span>
                  </div>
                </div>

                <div className={styles.coverActionWrap} data-depth-elem="biz-inquiry">
                  <span className={styles.editorialActionLink}>
                    <span>DIRECT INQUIRY</span>
                    <span className={styles.actionArrow} aria-hidden="true">→</span>
                  </span>
                  <span className={styles.actionSubtext}>Start a conversation</span>
                </div>
              </div>

              {/* Physical Architectural Composition (Columns 6–12) */}
              <div className={styles.coverVisualCol} data-depth-visual="business" aria-hidden="true">
                <div className={styles.businessVisualContainer}>
                  {/* Primary Smoked Walnut Board (Hero Anchor) */}
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
                          <span className={styles.bizSectionTitle}>SERVICES</span>
                        </div>
                        <span className={styles.bizSectionDesc}>Clear service presentation</span>
                        <div className={styles.bizSectionRule} />
                      </div>
                      <div className={styles.bizSectionItem}>
                        <div className={styles.bizSectionLabelRow}>
                          <span className={styles.bizSectionIndex}>02</span>
                          <span className={styles.bizSectionTitle}>WORK</span>
                        </div>
                        <span className={styles.bizSectionDesc}>Showcase projects or work</span>
                        <div className={styles.bizSectionRule} />
                      </div>
                      <div className={styles.bizSectionItem}>
                        <div className={styles.bizSectionLabelRow}>
                          <span className={styles.bizSectionIndex}>03</span>
                          <span className={styles.bizSectionTitle}>CONTACT</span>
                        </div>
                        <span className={styles.bizSectionDesc}>Turn visits into inquiries</span>
                        <div className={styles.bizSectionRule} />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Document Slab (Recessed in Background) */}
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
                </div>
              </div>
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
              <span className={styles.coverTag}>COMMERCE &amp; RETAIL</span>
              <span className={styles.coverTagSub}>03 / 04</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text & Service Delivery Column (Columns 1–5) */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>E-COMMERCE</span>
                  <span className={styles.titleSecondary}>WEBSITE</span>
                </h2>
                <p className={styles.coverDescriptor}>
                  Products <span className={styles.dot} aria-hidden="true">·</span> Shopping <span className={styles.dot} aria-hidden="true">·</span> Checkout
                </p>
                <p className={styles.coverStatement}>
                  Tactile luxury storefronts where matte packaging and friction-free purchase flows make buying inevitable.
                </p>

                {/* What I Provide Minimal List */}
                <div className={styles.deliverablesList}>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>PRODUCTS</span>
                    <span className={styles.deliverableDesc}>Clear product browsing</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>CART</span>
                    <span className={styles.deliverableDesc}>Simple shopping flow</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>CHECKOUT</span>
                    <span className={styles.deliverableDesc}>Straightforward purchase path</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>PROMOTIONS</span>
                    <span className={styles.deliverableDesc}>Deals and featured products</span>
                  </div>
                </div>

                <div className={styles.coverActionWrap} data-depth-elem="shop-checkout">
                  <span className={styles.editorialActionLink}>
                    <span>CHECKOUT</span>
                    <span className={styles.actionArrow} aria-hidden="true">→</span>
                  </span>
                  <span className={styles.actionSubtext}>Simple path to purchase</span>
                </div>
              </div>

              {/* Physical Packaging Composition (Columns 6–12) */}
              <div className={styles.coverVisualCol} data-depth-visual="commerce" aria-hidden="true">
                <div className={styles.commerceVisualContainer}>
                  {/* Display Plinth Base */}
                  <div className={styles.shopPlinth} data-depth-elem="shop-plinth" />

                  {/* Secondary Packaging Block (Behind / Left) */}
                  <div className={styles.shopBoxSecondary} data-depth-elem="shop-box-secondary">
                    <div className={styles.shopBoxTop} />
                    <div className={styles.shopBoxFace}>
                      <span className={styles.shopBoxTag}>PRODUCT 02</span>
                      <div className={styles.shopBoxLines}>
                        <span />
                      </div>
                    </div>
                  </div>

                  {/* Primary Product Box (Hero Anchor, Centered) */}
                  <div className={styles.shopBoxPrimary} data-depth-elem="shop-box-primary">
                    <div className={styles.shopBoxTop} />
                    <div className={styles.shopBoxFace}>
                      <div className={styles.shopFocusHeader}>
                        <span className={styles.shopFocusTag}>NEW PRODUCT</span>
                        <span className={styles.shopFocusStatus}>IN STOCK</span>
                      </div>
                      <span className={styles.shopFocusContext}>Clear product presentation</span>
                      <div className={styles.shopFocusSpec}>
                        <span className={styles.shopSpecLine1} />
                        <span className={styles.shopSpecLine2} />
                      </div>
                    </div>
                  </div>

                  {/* 3D Luxury Shopping Bag (Behind / Right) */}
                  <div className={styles.shopBag} data-depth-elem="shop-bag">
                    <div className={styles.shopBagHandle} />
                    <div className={styles.shopBagBody}>
                      <div className={styles.shopBagTagRow}>
                        <span className={styles.shopBagLabel}>BAG</span>
                        <span className={styles.shopBagCount}>1 ITEM</span>
                      </div>
                      <span className={styles.shopBagContext}>Ready to checkout</span>
                      <span className={styles.shopBagBrandLine} />
                    </div>
                  </div>
                </div>
              </div>
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
              <span className={styles.coverTag}>APPOINTMENTS &amp; SCHEDULING</span>
              <span className={styles.coverTagSub}>04 / 04</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text & Service Delivery Column (Columns 1–5) */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>BOOKING &amp;</span>
                  <span className={styles.titleSecondary}>SERVICE WEBSITE</span>
                </h2>
                <p className={styles.coverDescriptor}>
                  Appointments <span className={styles.dot} aria-hidden="true">·</span> Availability <span className={styles.dot} aria-hidden="true">·</span> Inquiries
                </p>
                <p className={styles.coverStatement}>
                  Restrained stone and metal scheduling flows that respect client time and streamline calendar reservations.
                </p>

                {/* What I Provide Minimal List */}
                <div className={styles.deliverablesList}>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>SERVICES</span>
                    <span className={styles.deliverableDesc}>Show available services</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>AVAILABILITY</span>
                    <span className={styles.deliverableDesc}>Display open times</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>BOOKINGS</span>
                    <span className={styles.deliverableDesc}>Let customers schedule</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>CONFIRMATION</span>
                    <span className={styles.deliverableDesc}>Clear appointment details</span>
                  </div>
                </div>

                <div className={styles.coverActionWrap} data-depth-elem="book-confirm">
                  <span className={styles.editorialActionLink}>
                    <span>CONFIRM RESERVATION</span>
                    <span className={styles.actionArrow} aria-hidden="true">→</span>
                  </span>
                  <span className={styles.actionSubtext}>Lock in your schedule</span>
                </div>
              </div>

              {/* Physical Booking Visual Composition (Columns 6–12) */}
              <div className={styles.coverVisualCol} data-depth-visual="booking" aria-hidden="true">
                <div className={styles.bookingVisualContainer}>
                  {/* Calendar Base Plane (Hero Anchor, Left-Center) */}
                  <div className={styles.bookCalPlane} data-depth-elem="book-cal">
                    <div className={styles.bookCalHeader}>
                      <span className={styles.bookCalMonth}>SELECT DATE</span>
                      <span className={styles.bookCalStatus}>AVAILABLE</span>
                    </div>
                    <span className={styles.bookCalContext}>Choose availability</span>
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

                  {/* Circular Clock Dial (Upper-Right Overlapping) */}
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
                    <div className={styles.clockInfo}>
                      <span className={styles.clockLabel}>SELECT TIME</span>
                      <span className={styles.clockContext}>Available appointments</span>
                    </div>
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

                  {/* Appointment Confirmation Slip */}
                  <div className={styles.bookConfirmCard} data-depth-elem="book-confirm-card">
                    <div className={styles.bookConfirmHeader}>
                      <span className={styles.bookConfirmTag}>CONFIRMED</span>
                      <span className={styles.bookConfirmCheck}>✓</span>
                    </div>
                    <span className={styles.bookConfirmContext}>Appointment reserved</span>
                    <span className={styles.bookConfirmDetail}>FRI, OCT 24 · 15:00</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>

      {/* 7. BUILT AROUND YOUR BUSINESS (VALUE SECTION) */}
      <section className={styles.valueSection} data-depth-value id="built-around-business" aria-label="Built around your business">
        <div className={styles.valueContent} data-depth-content>
          <div className={styles.valueBody} data-depth-text>
            <h2 className={styles.valueTitle}>
              <span className={styles.valueLineOne} data-depth-val-line="1">BUILT AROUND</span>
              <span className={styles.valueLineTwo} data-depth-val-line="2">YOUR BUSINESS.</span>
            </h2>
            <p className={styles.valueStatement} data-depth-val-copy>
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
              <span className={styles.ctaLineOne} data-depth-cta-line="1">HAVE SOMETHING</span>
              <span className={styles.ctaLineTwo} data-depth-cta-line="2">IN MIND?</span>
            </h2>
            <p className={styles.ctaCopy} data-depth-cta-copy>Tell me what your business needs.</p>
          </div>
          <div className={styles.ctaActionRow}>
            <Link href="/contact" className={styles.ctaEditorialLink} data-depth-cta-link>
              <span>TELL ME ABOUT IT</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. MINIMAL EDITORIAL FOOTER (HOME / ABOUT ME / CONTACT ME) */}
      <footer className={styles.footer} aria-label="Portfolio navigation footer">
        <div className={styles.footerInner}>
          <nav className={styles.footerNav} aria-label="Portfolio links">
            <Link href="/" className={styles.footerNavLink}>
              <span className={styles.footerNavText}>HOME</span>
              <span className={styles.footerNavLine} aria-hidden="true" />
            </Link>
            <Link href="/about" className={styles.footerNavLink}>
              <span className={styles.footerNavText}>ABOUT ME</span>
              <span className={styles.footerNavLine} aria-hidden="true" />
            </Link>
            <Link href="/contact" className={styles.footerNavLink}>
              <span className={styles.footerNavText}>CONTACT ME</span>
              <span className={styles.footerNavLine} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
