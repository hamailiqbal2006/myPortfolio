import type { Metadata } from 'next';
import { ShopifyShowroom } from '@/components/shopify/ShopifyShowroom';

export const metadata: Metadata = {
  title: 'Shopify Store Development | Hamail',
  description: 'Shopify stores designed around your products, customers and sales flow.',
};

export default function ShopifyPage() {
  return <ShopifyShowroom />;
}
