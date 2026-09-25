'use client';

import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { WebsitesSection } from './WebsitesSection';
import { ShopifySection } from './ShopifySection';
import { AppsSection } from './AppsSection';
import { WhySection } from './WhySection';
import { PricingSection } from './PricingSection';
import { ContactSection } from './ContactSection';
import { ShowcaseModal } from './ShowcaseModal';
import {
  ShowcaseConfig,
  WEBSITE_SHOWCASE,
  SHOPIFY_SHOWCASE,
  APPLICATION_SHOWCASE,
} from '@/data/showcases';

/**
 * StorySections coordinates all 7 scrolling narrative sections:
 * 01 — HERO
 * 02 — WEBSITES
 * 03 — SHOPIFY
 * 04 — APPLICATIONS
 * 05 — WHY WORK WITH ME
 * 06 — PRICING
 * 07 — CONTACT
 * Also manages the active ShowcaseModal for exploring design categories.
 */
export function StorySections() {
  const [activeShowcase, setActiveShowcase] = useState<ShowcaseConfig | null>(null);

  return (
    <>
      <HeroSection />
      <WebsitesSection onOpenShowcase={() => setActiveShowcase(WEBSITE_SHOWCASE)} />
      <ShopifySection onOpenShowcase={() => setActiveShowcase(SHOPIFY_SHOWCASE)} />
      <AppsSection onOpenShowcase={() => setActiveShowcase(APPLICATION_SHOWCASE)} />
      <WhySection />
      <PricingSection />
      <ContactSection />

      {/* Category Architecture Showcase Modal */}
      <ShowcaseModal
        showcase={activeShowcase}
        onClose={() => setActiveShowcase(null)}
      />
    </>
  );
}
