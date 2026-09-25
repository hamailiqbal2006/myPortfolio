'use client';

import React from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { CONTACT_CONFIG, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/data/contact';

/**
 * Section 07 — CONTACT
 * Concluding story section.
 * Centered around progress = 6.0 (range 5.5 to 6.0).
 * Primary WhatsApp contact action; email button is conditionally hidden if email is empty.
 */
export function ContactSection() {
  const { progress } = useNavigation();

  // Opacity window around index 6 (progress ~ 6.0)
  const dist = Math.abs(progress - 6.0);
  const opacity = dist >= 0.5 ? 0 : Math.max(0, 1 - dist / 0.45);
  const translateY = (progress - 6.0) * -35;
  const isInteractive = dist < 0.35;

  return (
    <section
      aria-label="Contact section"
      className="fixed inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 md:px-14 pointer-events-none select-none"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: isInteractive ? 'auto' : 'none',
        visibility: opacity <= 0.001 ? 'hidden' : 'visible',
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center max-h-[88vh] overflow-y-auto pt-16 sm:pt-20 md:pt-0">
        <div className="w-full max-w-xl lg:max-w-2xl text-left">
          {/* Section Number & Eyebrow */}
          <div className="mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] text-white/45 uppercase">
              07 · Direct Contact
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-[-0.035em] text-[#f8fafc]">
            LET&apos;S BUILD <br />
            <span className="text-white/95">SOMETHING.</span>
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/65 font-light leading-relaxed max-w-md">
            Direct communication for project inquiries, custom scope discussions and quick turnarounds.
          </p>

          {/* Contact Action (WhatsApp) */}
          <div className="mt-6 sm:mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-[#070707] font-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] hover:bg-white/90 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-black/30"
            >
              <span>WhatsApp</span>
              <span className="text-black/50">·</span>
              <span>{WHATSAPP_DISPLAY}</span>
              <span className="text-xs">↗</span>
            </a>

            {/* Conditionally rendered Email button (only if configured) */}
            {CONTACT_CONFIG.email ? (
              <a
                href={`mailto:${CONTACT_CONFIG.email}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-mono text-[11px] sm:text-xs font-normal uppercase tracking-[0.2em] hover:border-white/50 hover:bg-white/[0.04] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Email</span>
                <span className="text-xs">↗</span>
              </a>
            ) : null}
          </div>

          {/* Availability note */}
          <div className="mt-8 pt-4 border-t border-white/[0.08]">
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-white/40 uppercase">
              Websites · Shopify Stores
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
