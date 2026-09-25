import type { Metadata } from 'next';
import { ContactLanding } from '@/components/contact/ContactLanding';

export const metadata: Metadata = {
  title: 'Contact — Hamail',
  description:
    'Start your project with Hamail. Chat directly on WhatsApp, send an email, or request a scoped project estimate.',
};

export default function ContactPage() {
  return <ContactLanding />;
}
