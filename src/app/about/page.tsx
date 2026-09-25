import type { Metadata } from 'next';
import { AboutLanding } from '@/components/about/AboutLanding';

export const metadata: Metadata = {
  title: 'About — Hamail',
  description: 'Student, developer and digital craftsman. Turning passion into real digital products with computer science, software development and AI-assisted workflows.',
};

export default function AboutPage() {
  return <AboutLanding />;
}
