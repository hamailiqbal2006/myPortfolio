'use client';

import React from 'react';

/**
 * Editorial Contact Section
 * 
 * Strict specifications:
 * - Large heading: LET'S TALK.
 * - Supporting text: Have a project in mind? Let's discuss it.
 * - Primary method: WHATSAPP
 * - Display: 0305 3764646
 * - Link: https://wa.me/923053764646 with prefilled message
 * - Zero emails, zero fake forms.
 */
export function ContactSection() {
  const whatsappUrl =
    'https://wa.me/923053764646?text=' +
    encodeURIComponent('Hi Hamail, I visited your portfolio and would like to discuss a project.');

  return (
    <section
      aria-label="Contact"
      className="relative w-full px-6 sm:px-10 md:px-14 lg:px-20 py-24 sm:py-36 md:py-48 bg-[#0A0A0A] text-[#FAF7F3] border-b border-[#FAF7F3]/10"
    >
      <div className="w-full max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-start">
          {/* Left Column: Monumental Headline */}
          <div className="lg:col-span-7">
            <h2 className="text-[clamp(52px,8vw,130px)] font-bold tracking-[-0.05em] leading-[0.92] text-[#FAF7F3]">
              LET&apos;S TALK.
            </h2>
            <p className="mt-6 sm:mt-8 text-[clamp(18px,2.2vw,28px)] text-[#FAF7F3]/60 font-normal leading-[1.4] max-w-xl">
              Have a project in mind? Let&apos;s discuss it.
            </p>
          </div>

          {/* Right Column: Direct WhatsApp Contact Action */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:pt-4">
            <div className="border border-[#FAF7F3]/15 hover:border-[#FAF7F3]/35 p-6 sm:p-8 md:p-10 transition-colors duration-300">
              <span className="font-mono text-xs sm:text-sm tracking-[0.24em] text-[#FAF7F3]/40 uppercase block mb-3">
                PRIMARY CONTACT / WHATSAPP
              </span>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 sm:gap-4 text-[clamp(24px,3vw,42px)] font-bold tracking-[-0.03em] text-[#FAF7F3] hover:text-[#FAF7F3]/80 transition-colors duration-200"
              >
                <span>0305 3764646</span>
                <span
                  aria-hidden="true"
                  className="text-2xl sm:text-3xl text-[#FAF7F3]/40 group-hover:text-[#FAF7F3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 font-light"
                >
                  ↗
                </span>
              </a>

              <p className="mt-4 text-xs sm:text-sm text-[#FAF7F3]/45 leading-relaxed font-normal">
                Direct WhatsApp consultation for custom websites, Shopify storefronts, and application workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
