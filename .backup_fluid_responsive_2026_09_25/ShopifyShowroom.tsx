'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ShopifyDepthMotion } from './ShopifyDepthMotion';
import styles from './ShopifyShowroom.module.css';

export function ShopifyShowroom() {
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <main className={styles.page} data-shopify-depth aria-label="Shopify Development">
      <ShopifyDepthMotion />

      {/* 1. HERO SECTION (Homepage-Style Centered Opening) */}
      <section className={styles.heroSection} data-depth-hero id="shopify-hero" aria-label="Shopify Development">
        <div className={styles.heroStage}>
          <div className={styles.heroIdentity} data-hero-identity>
            <p className={styles.heroEyebrow} data-depth-hero-eyebrow>SHOPIFY DEVELOPMENT</p>
            <h1 className={styles.heroTitle} aria-label="Shopify Development">
              <span className={styles.heroTitleLine1} data-depth-hero-line="1">SHOPIFY</span>
              <span className={styles.heroTitleLine2} data-depth-hero-line="2">DEVELOPMENT</span>
            </h1>
            <p className={styles.heroCopy} data-depth-hero-copy>
              Shopify stores designed around your products, customers and sales flow.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SHORT TRANSITION SECTION (BUILT FOR COMMERCE) */}
      <section className={styles.transitionSection} data-depth-transition id="built-for-commerce" aria-label="Built for commerce">
        <div className={styles.transitionContent} data-depth-content>
          <div className={styles.transitionBody}>
            <h2 className={styles.transitionTitle}>
              <span className={styles.transitionLineOne} data-depth-trans-line="1">BUILT FOR</span>
              <span className={styles.transitionLineTwo} data-depth-trans-line="2">COMMERCE.</span>
            </h2>
            <p className={styles.transitionStatement} data-depth-trans-copy>
              From storefront presentation to checkout and day-to-day store operations.
            </p>
          </div>
          <div className={styles.transitionRule} aria-hidden="true" />
        </div>
      </section>

      {/* 3. FOUR FULL-SCREEN SERVICE COVERS SEQUENCE */}
      <div className={styles.coversContainer} id="shopify-sequence" data-covers-container>
        <div className={styles.coversStage} data-covers-stage>

          {/* SCENE 1: STOREFRONT & THEME */}
          <article
            className={`${styles.serviceCover} ${styles.storefrontCover}`}
            data-service-cover="0"
            id="storefront-theme"
            aria-label="Storefront and Theme"
          >
            <div className={styles.coverHeader}>
              <span className={styles.coverTag}>STOREFRONT &amp; BRANDING</span>
              <span className={styles.coverTagSub}>01 / 04</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text & Service Delivery Column (40%) */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>STOREFRONT</span>
                  <span className={styles.titleSecondary}>&amp; THEME</span>
                </h2>
                <p className={styles.coverStatement}>
                  A storefront shaped around your brand, products and customer journey.
                </p>

                {/* Service Details List */}
                <div className={styles.deliverablesList}>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>STORE DESIGN</span>
                    <span className={styles.deliverableDesc}>Clear branded storefront</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>THEME CUSTOMIZATION</span>
                    <span className={styles.deliverableDesc}>Layouts tailored to your store</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>MOBILE EXPERIENCE</span>
                    <span className={styles.deliverableDesc}>Designed for smaller screens</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>NAVIGATION</span>
                    <span className={styles.deliverableDesc}>Simple product discovery</span>
                  </div>
                </div>

                <div className={styles.coverActionWrap} data-depth-elem="shop-store-action">
                  <span className={styles.editorialActionLink}>
                    <span>EXPLORE STORE DESIGN →</span>
                  </span>
                </div>
              </div>

              {/* Physical Storefront Composition (60%) */}
              <div className={styles.coverVisualCol} data-depth-visual="storefront" aria-hidden="true">
                <div className={styles.storefrontVisualContainer}>
                  {/* Category Rail */}
                  <div className={styles.storeRail} data-depth-elem="shop-store-rail">
                    <span>LIQUID 2.0</span>
                    <span className={styles.railDot}>·</span>
                    <span>RESPONSIVE</span>
                    <span className={styles.railDot}>·</span>
                    <span>THEME</span>
                  </div>

                  {/* Secondary Collection Sheet (Background) */}
                  <div className={styles.storeSheetSecondary} data-depth-elem="shop-store-sheet">
                    <div className={styles.storeSheetHeader}>
                      <span className={styles.storeSheetSeason}>LOOKBOOK 2026</span>
                      <span className={styles.storeSheetIndex}>01</span>
                    </div>
                    <div className={styles.storeSheetMediaGrid}>
                      <div className={styles.storeSheetMediaBox} />
                      <div className={styles.storeSheetMediaBox} />
                    </div>
                  </div>

                  {/* Primary Storefront Presentation Plane (Center Anchor) */}
                  <div className={styles.storePlaneMain} data-depth-elem="shop-store-plane">
                    <div className={styles.storePlaneNavBar}>
                      <span className={styles.storePlaneBrand}>ATELIER</span>
                      <div className={styles.storePlaneNavLinks}>
                        <span>COLLECTIONS</span>
                        <span>ARCHIVE</span>
                      </div>
                      <span className={styles.storePlaneCartBadge}>CART (1)</span>
                    </div>

                    <div className={styles.storePlaneHeroBanner}>
                      <span className={styles.storePlaneBannerTag}>CURATED CAMPAIGN</span>
                      <h3 className={styles.storePlaneBannerTitle}>MODERN ESSENTIALS</h3>
                    </div>

                    <div className={styles.storePlaneGridTeaser}>
                      <div className={styles.storePlaneGridCard}>
                        <div className={styles.storePlaneCardLine} />
                        <div className={styles.storePlaneCardSub} />
                      </div>
                      <div className={styles.storePlaneGridCard}>
                        <div className={styles.storePlaneCardLine} />
                        <div className={styles.storePlaneCardSub} />
                      </div>
                    </div>
                  </div>

                  {/* Foreground Product Feature Card */}
                  <div className={styles.storeCardForeground} data-depth-elem="shop-store-card">
                    <div className={styles.storeCardTop}>
                      <span className={styles.storeCardTag}>FEATURED ITEM</span>
                      <span className={styles.storeCardDot} />
                    </div>
                    <div className={styles.storeCardTitle}>WOOL COAT</div>
                    <div className={styles.storeCardPrice}>EXPLORE ITEM →</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* SCENE 2: PRODUCTS & COLLECTIONS */}
          <article
            className={`${styles.serviceCover} ${styles.productsCover}`}
            data-service-cover="1"
            id="products-collections"
            aria-label="Products and Collections"
          >
            <div className={styles.coverHeader}>
              <span className={styles.coverTag}>MERCHANDISING &amp; CATALOGUE</span>
              <span className={styles.coverTagSub}>02 / 04</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text & Service Delivery Column (40%) */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>PRODUCTS &amp;</span>
                  <span className={styles.titleSecondary}>COLLECTIONS</span>
                </h2>
                <p className={styles.coverStatement}>
                  Organised product structure that makes browsing simple and products easy to understand.
                </p>

                {/* Service Details List */}
                <div className={styles.deliverablesList}>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>PRODUCT SETUP</span>
                    <span className={styles.deliverableDesc}>Structured product information</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>COLLECTIONS</span>
                    <span className={styles.deliverableDesc}>Organised product groups</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>VARIANTS</span>
                    <span className={styles.deliverableDesc}>Sizes, colours and options</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>PRODUCT MEDIA</span>
                    <span className={styles.deliverableDesc}>Clear visual presentation</span>
                  </div>
                </div>

                <div className={styles.coverActionWrap} data-depth-elem="shop-prod-action">
                  <span className={styles.editorialActionLink}>
                    <span>VIEW MERCHANDISING FLOW →</span>
                  </span>
                </div>
              </div>

              {/* Physical Product Merchandising Composition (60%) */}
              <div className={styles.coverVisualCol} data-depth-visual="products" aria-hidden="true">
                <div className={styles.productsVisualContainer}>
                  {/* Category Rail */}
                  <div className={styles.prodRail} data-depth-elem="shop-prod-rail">
                    <span>CATALOGUE</span>
                    <span className={styles.railDot}>·</span>
                    <span>VARIANTS</span>
                    <span className={styles.railDot}>·</span>
                    <span>MEDIA</span>
                  </div>

                  {/* Display Plinth Base */}
                  <div className={styles.prodPlinth} data-depth-elem="shop-prod-plinth" />

                  {/* Secondary Product Packaging Block */}
                  <div className={styles.prodBoxSecondary} data-depth-elem="shop-prod-box-sec">
                    <span className={styles.prodBoxSecTag}>ARCHIVE / 02</span>
                    <div className={styles.prodBoxSecLine} />
                  </div>

                  {/* Primary Product Package Hero Anchor */}
                  <div className={styles.prodBoxPrimary} data-depth-elem="shop-prod-box-pri">
                    <div className={styles.prodBoxPriHeader}>
                      <span className={styles.prodBoxPriTag}>PRODUCT 01</span>
                      <span className={styles.prodBoxPriStatus}>IN STOCK</span>
                    </div>

                    <div className={styles.prodBoxPriBody}>
                      <h3 className={styles.prodBoxPriTitle}>MINIMAL OBJECT</h3>
                      <p className={styles.prodBoxPriDesc}>Structured product presentation with clear variant attributes.</p>
                    </div>

                    <div className={styles.prodBoxPriFoot}>
                      <span className={styles.prodBoxPriSpec}>3 COLOURWAYS</span>
                      <span className={styles.prodBoxPriSpec}>SIZES S — XL</span>
                    </div>
                  </div>

                  {/* Foreground Variant Card */}
                  <div className={styles.prodVariantCard} data-depth-elem="shop-prod-tag">
                    <div className={styles.prodVariantTop}>
                      <span className={styles.prodVariantTag}>VARIANTS</span>
                      <span className={styles.prodVariantDot} />
                    </div>
                    <div className={styles.prodSwatchRow}>
                      <span className={styles.prodSwatch1} />
                      <span className={styles.prodSwatch2} />
                      <span className={styles.prodSwatch3} />
                    </div>
                    <div className={styles.prodSizeRow}>
                      <span>S</span>
                      <span>M</span>
                      <span>L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* SCENE 3: CART & CHECKOUT */}
          <article
            className={`${styles.serviceCover} ${styles.checkoutCover}`}
            data-service-cover="2"
            id="cart-checkout"
            aria-label="Cart and Checkout"
          >
            <div className={styles.coverHeader}>
              <span className={styles.coverTag}>CONVERSION &amp; CHECKOUT</span>
              <span className={styles.coverTagSub}>03 / 04</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text & Service Delivery Column (40%) */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>CART &amp;</span>
                  <span className={styles.titleSecondary}>CHECKOUT</span>
                </h2>
                <p className={styles.coverStatement}>
                  A straightforward path from product selection to completed order.
                </p>

                {/* Service Details List */}
                <div className={styles.deliverablesList}>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>CART</span>
                    <span className={styles.deliverableDesc}>Clear order summary</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>CHECKOUT FLOW</span>
                    <span className={styles.deliverableDesc}>Simple purchase journey</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>PAYMENT SETUP</span>
                    <span className={styles.deliverableDesc}>Supported payment configuration</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>SHIPPING</span>
                    <span className={styles.deliverableDesc}>Delivery options and rules</span>
                  </div>
                </div>

                <div className={styles.coverActionWrap} data-depth-elem="shop-cart-action">
                  <span className={styles.editorialActionLink}>
                    <span>OPTIMISE CHECKOUT FLOW →</span>
                  </span>
                </div>
              </div>

              {/* Physical Cart & Checkout Composition (60%) */}
              <div className={styles.coverVisualCol} data-depth-visual="checkout" aria-hidden="true">
                <div className={styles.checkoutVisualContainer}>
                  {/* Category Rail */}
                  <div className={styles.checkoutRail} data-depth-elem="shop-cart-rail">
                    <span>CHECKOUT</span>
                    <span className={styles.railDot}>·</span>
                    <span>PAYMENT</span>
                    <span className={styles.railDot}>·</span>
                    <span>SHIPPING</span>
                  </div>

                  {/* Secondary Order Summary Sheet */}
                  <div className={styles.cartSheetSecondary} data-depth-elem="shop-cart-sheet">
                    <div className={styles.cartSheetTitle}>ORDER SUMMARY</div>
                    <div className={styles.cartSheetRow}>
                      <span className={styles.cartSheetItemName}>Subtotal</span>
                      <span className={styles.cartSheetItemPrice}>Verified</span>
                    </div>
                    <div className={styles.cartSheetRow}>
                      <span className={styles.cartSheetItemName}>Shipping</span>
                      <span className={styles.cartSheetItemPrice}>Standard</span>
                    </div>
                    <div className={styles.cartSheetRow}>
                      <span className={styles.cartSheetItemName}>Taxes</span>
                      <span className={styles.cartSheetItemPrice}>Calculated</span>
                    </div>
                  </div>

                  {/* Primary Structured Shopping Bag Form */}
                  <div className={styles.cartBagPrimary} data-depth-elem="shop-cart-bag">
                    <div className={styles.cartBagHandle} />

                    <div className={styles.cartBagHeader}>
                      <span className={styles.cartBagTag}>SHOPPING BAG</span>
                      <span className={styles.cartBagCount}>2 ITEMS</span>
                    </div>

                    <div className={styles.cartBagBody}>
                      <h3 className={styles.cartBagTitle}>STORE BAG</h3>
                      <span className={styles.cartBagSub}>Ready for one-click checkout</span>
                    </div>

                    <div className={styles.cartBagFoot}>
                      <span className={styles.cartBagTotalLabel}>ORDER STATUS</span>
                      <span className={styles.cartBagTotalVal}>ACTIVE CART</span>
                    </div>
                  </div>

                  {/* Foreground Payment / Checkout Slab */}
                  <div className={styles.cartCheckoutCard} data-depth-elem="shop-cart-card">
                    <div className={styles.checkoutCardTop}>
                      <div className={styles.checkoutCardChip} />
                      <span className={styles.checkoutCardType}>SECURE</span>
                    </div>
                    <div className={styles.checkoutCardDigits}>•••• 4821</div>
                    <div className={styles.checkoutCardAction}>EXPRESS CHECKOUT →</div>
                  </div>

                  {/* Shipping Tag */}
                  <div className={styles.cartReceiptTag} data-depth-elem="shop-cart-tag">
                    <span className={styles.cartReceiptText}>DISPATCH READY</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* SCENE 4: STORE OPERATIONS */}
          <article
            className={`${styles.serviceCover} ${styles.operationsCover}`}
            data-service-cover="3"
            id="store-operations"
            aria-label="Store Operations"
          >
            <div className={styles.coverHeader}>
              <span className={styles.coverTag}>FULFILMENT &amp; AUTOMATION</span>
              <span className={styles.coverTagSub}>04 / 04</span>
            </div>

            <div className={styles.coverBody}>
              {/* Text & Service Delivery Column (40%) */}
              <div className={styles.coverTextCol} data-depth-text>
                <h2 className={styles.coverTitle}>
                  <span className={styles.titlePrimary}>STORE</span>
                  <span className={styles.titleSecondary}>OPERATIONS</span>
                </h2>
                <p className={styles.coverStatement}>
                  The tools behind the storefront configured around how the business operates.
                </p>

                {/* Service Details List */}
                <div className={styles.deliverablesList}>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>APPS</span>
                    <span className={styles.deliverableDesc}>Useful store integrations</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>ORDERS</span>
                    <span className={styles.deliverableDesc}>Clear order workflow</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>INVENTORY</span>
                    <span className={styles.deliverableDesc}>Product and stock structure</span>
                  </div>
                  <div className={styles.deliverableItem}>
                    <span className={styles.deliverableLabel}>SHIPPING</span>
                    <span className={styles.deliverableDesc}>Delivery configuration</span>
                  </div>
                </div>

                <div className={styles.coverActionWrap} data-depth-elem="shop-ops-action">
                  <span className={styles.editorialActionLink}>
                    <span>CONFIGURE OPERATIONS →</span>
                  </span>
                </div>
              </div>

              {/* Physical Store Operations Composition (60%) */}
              <div className={styles.coverVisualCol} data-depth-visual="operations" aria-hidden="true">
                <div className={styles.operationsVisualContainer}>
                  {/* Category Rail */}
                  <div className={styles.opsRail} data-depth-elem="shop-ops-rail">
                    <span>INVENTORY</span>
                    <span className={styles.railDot}>·</span>
                    <span>WORKFLOW</span>
                    <span className={styles.railDot}>·</span>
                    <span>APPS</span>
                  </div>

                  {/* Secondary Inventory Stack */}
                  <div className={styles.opsInventoryStack} data-depth-elem="shop-ops-inventory">
                    <div className={styles.opsInvTitle}>STOCK MATRIX</div>
                    <div className={styles.opsInvRow}>
                      <span className={styles.opsInvSku}>CORE COLLECTION</span>
                      <span className={styles.opsInvStock}>SYNCED</span>
                    </div>
                    <div className={styles.opsInvRow}>
                      <span className={styles.opsInvSku}>SEASONAL DROP</span>
                      <span className={styles.opsInvStock}>ACTIVE</span>
                    </div>
                    <div className={styles.opsInvRow}>
                      <span className={styles.opsInvSku}>FULFILMENT HUB</span>
                      <span className={styles.opsInvStock}>READY</span>
                    </div>
                  </div>

                  {/* Primary Smoked Graphite Order Ticket Board */}
                  <div className={styles.opsBoardPrimary} data-depth-elem="shop-ops-board">
                    <div className={styles.opsBoardHeader}>
                      <span className={styles.opsBoardTag}>FULFILMENT BOARD</span>
                      <span className={styles.opsBoardTime}>LIVE</span>
                    </div>

                    <div className={styles.opsBoardSteps}>
                      <div className={styles.opsStepItem}>
                        <span className={styles.opsStepIndex}>01</span>
                        <span className={styles.opsStepLabel}>ORDER RECEIVED</span>
                        <span className={styles.opsStepState}>AUTOMATED</span>
                      </div>
                      <div className={styles.opsStepItem}>
                        <span className={styles.opsStepIndex}>02</span>
                        <span className={styles.opsStepLabel}>INVENTORY SYNC</span>
                        <span className={styles.opsStepState}>UPDATED</span>
                      </div>
                      <div className={styles.opsStepItem}>
                        <span className={styles.opsStepIndex}>03</span>
                        <span className={styles.opsStepLabel}>DISPATCH NOTIFIED</span>
                        <span className={styles.opsStepState}>TRIGGERED</span>
                      </div>
                    </div>

                    <div className={styles.opsBoardFoot}>
                      <span className={styles.opsBoardSync}>OPERATIONS ACTIVE</span>
                      <span className={styles.opsBoardSync}>ZERO FRICTION</span>
                    </div>
                  </div>

                  {/* Foreground Fulfilment / Dispatch Slip */}
                  <div className={styles.opsShippingSlip} data-depth-elem="shop-ops-slip">
                    <div className={styles.opsSlipHeader}>
                      <span className={styles.opsSlipTag}>DISPATCH</span>
                      <span className={styles.opsSlipStatus}>READY</span>
                    </div>
                    <div className={styles.opsSlipBarcode} />
                    <div className={styles.opsSlipDetail}>ZONE 1 · NEXT-DAY ROUTE</div>
                  </div>

                  {/* Compact Integration Sync Block */}
                  <div className={styles.opsIntegrationWidget} data-depth-elem="shop-ops-app">
                    <span className={styles.opsWidgetText}>APP SYNC · LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>

      {/* 7. BUILT FOR SELLING SECTION */}
      <section className={styles.sellingSection} data-depth-selling id="built-for-selling" aria-label="Built for selling">
        <div className={styles.sellingContent} data-depth-content>
          <div className={styles.sellingBody} data-depth-text>
            <h2 className={styles.sellingTitle}>
              <span className={styles.sellingLineOne} data-depth-sell-line="1">BUILT FOR</span>
              <span className={styles.sellingLineTwo} data-depth-sell-line="2">SELLING.</span>
            </h2>
            <p className={styles.sellingStatement} data-depth-sell-copy>
              The storefront, products and purchase flow are shaped around how your business actually sells.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className={styles.ctaSection} data-depth-cta id="shopify-cta" aria-label="Start your Shopify store">
        <div className={styles.ctaContent} data-depth-content>
          <div className={styles.ctaHead} data-depth-text>
            <h2 className={styles.ctaTitle}>
              <span className={styles.ctaLineOne} data-depth-cta-line="1">READY TO BUILD</span>
              <span className={styles.ctaLineTwo} data-depth-cta-line="2">YOUR STORE?</span>
            </h2>
            <p className={styles.ctaCopy} data-depth-cta-copy>
              Tell me what you sell and what you need from your Shopify store.
            </p>
          </div>
          <div className={styles.ctaActionRow}>
            <Link href="/contact" className={styles.ctaEditorialLink} data-depth-cta-link>
              <span>TELL ME ABOUT IT</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. MINIMAL EDITORIAL FOOTER */}
      <footer className={styles.footer} aria-label="Portfolio footer">
        <div className={styles.footerInner}>
          <span className={styles.footerCopyright}>
            © 2026 Hamail. All rights reserved.
          </span>
          <nav className={styles.footerNav} aria-label="Portfolio links">
            <Link href="/" className={styles.footerNavLink}>
              HOME
            </Link>
            <Link href="/about" className={styles.footerNavLink}>
              ABOUT ME
            </Link>
            <Link href="/contact" className={styles.footerNavLink}>
              CONTACT ME
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
