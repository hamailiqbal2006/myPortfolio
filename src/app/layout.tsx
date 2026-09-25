import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/motion/SmoothScroll';

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: 'Hamail — Digital Designer & Developer',
  description: 'Websites and Shopify stores for businesses that want a stronger digital presence.',
  authors: [{ name: 'Hamail' }],
  creator: 'Hamail',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#0A0A0A] text-[#FAF7F3] selection:bg-white selection:text-black"
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
