'use client';

import React, { useState } from 'react';
import styles from './ContactFaq.module.css';

interface FaqItemData {
  id: string;
  index: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItemData[] = [
  {
    id: 'faq-01',
    index: '01',
    question: 'DO I NEED TO KNOW EXACTLY WHAT I WANT?',
    answer:
      'No. If you already know what you need, you can request an estimate directly. If the idea still needs clarification, you can message me on WhatsApp or email me first. There is no commitment required just to discuss the project.',
  },
  {
    id: 'faq-02',
    index: '02',
    question: 'HOW DO I GET A PROJECT ESTIMATE?',
    answer:
      'Use the project estimate form and share the type of project, required features, preferred deadline, and budget range if you have one. I can then review the scope before you decide whether you want to proceed.',
  },
  {
    id: 'faq-03',
    index: '03',
    question: 'HOW MUCH DOES A PROJECT COST?',
    answer:
      'Pricing depends on the project scope, features, complexity, integrations, and timeline. A focused website and an extensive Shopify storefront have very different requirements, so I prefer reviewing the project first rather than showing a misleading fixed price.',
  },
  {
    id: 'faq-04',
    index: '04',
    question: 'HOW LONG DOES DEVELOPMENT TAKE?',
    answer:
      'It depends on the size and complexity of the project. A focused website may take significantly less time than a larger multi-page site or complex Shopify customization. The expected timeline can be discussed after the scope is clear.',
  },
  {
    id: 'faq-05',
    index: '05',
    question: 'CAN YOU WORK ON AN EXISTING WEBSITE OR STORE?',
    answer:
      'Yes. You can contact me about improvements, redesigns, new features, bug fixes, or extending an existing website or Shopify store. I will first need to review the current setup and understand what you want changed.',
  },
  {
    id: 'faq-06',
    index: '06',
    question: 'CAN I DISCUSS THE PROJECT BEFORE COMMITTING?',
    answer:
      'Yes. You can use WhatsApp or email to discuss the project first. Discussing the idea or requesting an estimate does not require you to proceed.',
  },
  {
    id: 'faq-07',
    index: '07',
    question: 'WHAT INFORMATION SHOULD I PROVIDE?',
    answer:
      'The most useful information is what you want built, the main features you need, any reference websites or stores you like, your preferred timeline, and any budget range you already have. If you are unsure about some of these, that is fine.',
  },
  {
    id: 'faq-08',
    index: '08',
    question: 'CAN YOU HELP WITH SHOPIFY?',
    answer:
      'Yes. Shopify work can include store setup, custom storefront work, theme customization, improvements to an existing store, and features required for the specific business.',
  },
  {
    id: 'faq-09',
    index: '09',
    question: 'WHAT HAPPENS AFTER I SEND AN ESTIMATE REQUEST?',
    answer:
      'The project details are reviewed first. If anything important is unclear, the next step is to discuss the requirements before finalizing the scope, timeline, and expected cost.',
  },
  {
    id: 'faq-10',
    index: '10',
    question: 'WHAT HAPPENS AFTER THE PROJECT IS COMPLETED?',
    answer:
      'The exact handover depends on the type of project. This can include the completed project, relevant source files or access, deployment or setup information, and any agreed final adjustments.',
  },
];

interface ContactFaqProps {
  introRef?: React.Ref<HTMLDivElement>;
}

export function ContactFaq({ introRef }: ContactFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div id="faq" className={styles.faqCol} aria-labelledby="faq-heading">
      {/* Editorial FAQ Intro Header */}
      <div ref={introRef} className={styles.faqIntro}>
        <p className={styles.faqSectionLabel}>FAQ</p>
        <h2 id="faq-heading" className={styles.faqMainHeading}>
          QUESTIONS<br />BEFORE WE<br />START?
        </h2>
        <p className={styles.faqSubcopy}>
          A few things clients usually want to know before starting a project.
        </p>
      </div>

      {/* Calm, Accessible Accordion */}
      <div
        className={styles.faqAccordion}
        role="region"
        aria-label="Frequently Asked Questions"
      >
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const triggerId = `faq-trigger-${item.index}`;
          const panelId = `faq-panel-${item.index}`;

          return (
            <div
              key={item.id}
              className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
            >
              <button
                type="button"
                id={triggerId}
                className={styles.faqTrigger}
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className={styles.faqIndex}>{item.index}</span>
                <span className={styles.faqQuestion}>{item.question}</span>
                <span className={styles.faqIcon} aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={`${styles.faqCollapse} ${isOpen ? styles.faqCollapseOpen : ''}`}
              >
                <div className={styles.faqAnswerInner}>
                  <p className={styles.faqAnswerText}>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
