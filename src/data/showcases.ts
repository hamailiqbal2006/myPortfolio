export interface ShowcaseCategory {
  id: string;
  name: string;
  description: string;
}

export interface ShowcaseConfig {
  title: string;
  subtitle: string;
  categories: readonly ShowcaseCategory[];
}

export const WEBSITE_SHOWCASE: ShowcaseConfig = {
  title: 'WEBSITE DESIGNS',
  subtitle: 'Selected category architectures designed for modern business workflows.',
  categories: [
    { id: 'restaurant', name: 'Restaurant', description: 'Atmospheric dining, tasting menus & reservation flows.' },
    { id: 'corporate', name: 'Business / Corporate', description: 'Clean executive presence, client trust & service clearings.' },
    { id: 'ecommerce', name: 'E-commerce', description: 'Editorial product showcases & high-conversion checkout flows.' },
    { id: 'portfolio', name: 'Portfolio', description: 'Bespoke design, architecture & studio portfolios.' },
    { id: 'landing-page', name: 'Landing Page', description: 'Single-purpose product launches & marketing campaigns.' },
    { id: 'booking', name: 'Booking / Services', description: 'Consultation scheduling & interactive client booking.' },
  ],
};

export const SHOPIFY_SHOWCASE: ShowcaseConfig = {
  title: 'SHOPIFY STORE DESIGNS',
  subtitle: 'High-conversion e-commerce storefront architectures.',
  categories: [
    { id: 'fashion', name: 'Fashion', description: 'Luxury apparel, editorial lookbooks & collection grids.' },
    { id: 'perfume', name: 'Perfume', description: 'Sensory fragrance storytelling & bespoke bottle presentation.' },
    { id: 'jewelry', name: 'Jewelry', description: 'Precious metal details, gemstone clarity & refined cart.' },
    { id: 'beauty', name: 'Beauty', description: 'Skincare routines, shade finders & subscription flows.' },
    { id: 'electronics', name: 'Electronics', description: 'Technical specifications, comparisons & unboxing focus.' },
    { id: 'lifestyle', name: 'Lifestyle', description: 'Curated home goods, wellness & modern living accessories.' },
  ],
};

export const APPLICATION_SHOWCASE: ShowcaseConfig = {
  title: 'APPLICATION DESIGNS',
  subtitle: 'Custom digital software & bespoke business operations.',
  categories: [
    { id: 'mobile-app', name: 'Mobile App', description: 'Native-feel iOS & Android responsive experiences.' },
    { id: 'dashboard', name: 'Business Dashboard', description: 'Realtime telemetry, metrics & operational clarity.' },
    { id: 'desktop', name: 'Desktop Software', description: 'High-productivity client applications & tooling.' },
    { id: 'ordering', name: 'Ordering System', description: 'Table ordering, delivery dispatch & kitchen display.' },
    { id: 'management', name: 'Management System', description: 'Internal team workflows, staff rosters & inventory logs.' },
  ],
};
