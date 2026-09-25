import type { Metadata } from 'next';
import { EstimatePage } from '@/components/contact/EstimatePage';

export const metadata: Metadata = {
  title: 'Project Estimate — Hamail',
  description:
    'Request a project estimate from Hamail. Share your requirements for website or Shopify development.',
};

export default function EstimateRoute() {
  return <EstimatePage />;
}
