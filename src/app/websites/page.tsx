import type { Metadata } from 'next';
import { WebsitesShowroom } from '@/components/websites/WebsitesShowroom';

export const metadata: Metadata = {
  title: 'Website Development — Hamail',
  description:
    'Websites built around what your business actually needs to accomplish. From custom business websites to ordering, catalogs, bookings, and e-commerce.',
};

export default function WebsitesPage() {
  return <WebsitesShowroom />;
}
