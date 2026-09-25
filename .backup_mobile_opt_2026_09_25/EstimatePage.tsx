'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ThemedSelect } from './ThemedSelect';
import styles from './EstimatePage.module.css';

const WHATSAPP_PHONE = '923053764646';
const EMAIL_ADDRESS = 'hamail.web.dev@gmail.com';

const PROJECT_TYPES = [
  'Website Development',
  'Shopify Store',
  'Other',
] as const;

const BUDGET_RANGES = [
  'Not sure yet',
  'Under PKR 50,000',
  'PKR 50,000–100,000',
  'PKR 100,000–200,000',
  'PKR 200,000+',
  'Other',
] as const;

export function EstimatePage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    name: '',
    projectType: 'Website Development',
    description: '',
    features: '',
    deadline: '',
    budget: 'Not sure yet',
    contactMethod: 'WHATSAPP' as 'WHATSAPP' | 'EMAIL',
    contactValue: '',
    details: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = (): boolean => {
    const stepErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      stepErrors.name = 'Please enter your name.';
    }
    if (!formData.description.trim()) {
      stepErrors.description = 'Please describe what you need built.';
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const stepErrors: Record<string, string> = {};
    if (!formData.features.trim()) {
      stepErrors.features = 'Please mention key features or requirements.';
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const stepErrors: Record<string, string> = {};
    if (!formData.contactValue.trim()) {
      stepErrors.contactValue =
        formData.contactMethod === 'WHATSAPP'
          ? 'Please enter your WhatsApp number.'
          : 'Please enter your email address.';
    } else if (
      formData.contactMethod === 'EMAIL' &&
      !/^\S+@\S+\.\S+$/.test(formData.contactValue.trim())
    ) {
      stepErrors.contactValue = 'Please enter a valid email address.';
    } else if (
      formData.contactMethod === 'WHATSAPP' &&
      formData.contactValue.replace(/\D/g, '').length < 7
    ) {
      stepErrors.contactValue = 'Please enter a valid phone number (at least 7 digits).';
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => (prev - 1) as 1 | 2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (step: 1 | 2 | 3) => {
    // Allow clicking only on completed/previous steps to navigate back
    if (step < currentStep) {
      setErrors({});
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const constructEstimateSummary = (contactStr: string) => {
    return [
      'Hi Hamail,',
      '',
      "I'd like to request a project estimate.",
      '',
      `Name: ${formData.name.trim()}`,
      `Project Type: ${formData.projectType}`,
      '',
      'What I need:',
      formData.description.trim(),
      '',
      'Important Features:',
      formData.features.trim(),
      '',
      `Preferred Deadline: ${formData.deadline.trim() || 'Not specified'}`,
      `Budget: ${formData.budget || 'Not specified'}`,
      '',
      'Preferred Contact:',
      contactStr,
      '',
      'Additional Details:',
      formData.details.trim() || 'None',
      '',
      'I came through your portfolio.',
    ].join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    if (formData.contactMethod === 'WHATSAPP') {
      const contactStr = `WhatsApp (${formData.contactValue.trim()})`;
      const message = constructEstimateSummary(contactStr);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    } else {
      // EMAIL SELECTED
      const contactStr = `Email — ${formData.contactValue.trim()}`;
      const emailBody = constructEstimateSummary(contactStr);
      const subject = 'Project Estimate Request — Hamail Portfolio';
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        EMAIL_ADDRESS
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      // Open Gmail Web compose in a new tab
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Top Back Nav */}
        <div className={styles.backNav}>
          <Link href="/contact" className={styles.backLink}>
            ← BACK TO CONTACT
          </Link>
        </div>

        {/* Page Header */}
        <div className={styles.header}>
          <p className={styles.label}>PROJECT ESTIMATE</p>
          <h1 className={styles.headline}>
            <span>TELL ME</span>
            <span>WHAT YOU</span>
            <span>NEED.</span>
          </h1>
          <p className={styles.lead}>
            Give me enough detail to understand the project. I&apos;ll review it and reply with an
            estimated scope and cost.
          </p>

          {/* Editorial Trust Note */}
          <div className={styles.trustNote}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.trustIcon}
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div className={styles.trustText}>
              <span className={styles.trustTitle}>NO COMMITMENT REQUIRED</span>
              <span className={styles.trustSub}>
                Review the estimate before deciding whether you want to proceed.
              </span>
            </div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className={styles.stepBar} aria-label="Form progress">
          <button
            type="button"
            onClick={() => handleStepClick(1)}
            className={`${styles.stepIndicator} ${
              currentStep === 1
                ? styles.stepIndicatorActive
                : currentStep > 1
                ? styles.stepIndicatorCompleted
                : ''
            }`}
            aria-current={currentStep === 1 ? 'step' : undefined}
          >
            <span className={styles.stepDot} aria-hidden="true" />
            <span>01 / PROJECT</span>
          </button>
          <span className={styles.stepDivider} aria-hidden="true">
            /
          </span>
          <button
            type="button"
            onClick={() => handleStepClick(2)}
            className={`${styles.stepIndicator} ${
              currentStep === 2
                ? styles.stepIndicatorActive
                : currentStep > 2
                ? styles.stepIndicatorCompleted
                : ''
            }`}
            aria-current={currentStep === 2 ? 'step' : undefined}
          >
            <span className={styles.stepDot} aria-hidden="true" />
            <span>02 / REQUIREMENTS</span>
          </button>
          <span className={styles.stepDivider} aria-hidden="true">
            /
          </span>
          <div
            className={`${styles.stepIndicator} ${
              currentStep === 3 ? styles.stepIndicatorActive : ''
            }`}
            aria-current={currentStep === 3 ? 'step' : undefined}
          >
            <span className={styles.stepDot} aria-hidden="true" />
            <span>03 / CONTACT</span>
          </div>
        </div>

        {/* Step Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formCard}>
            {/* STEP 1: PROJECT */}
            {currentStep === 1 && (
              <>
                <div className={styles.stepHeader}>
                  <h2 className={styles.stepTitle}>STEP 1: PROJECT DETAILS</h2>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label htmlFor="estimate-name" className={styles.fieldLabel}>
                      Name *
                    </label>
                    <input
                      id="estimate-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className={styles.textInput}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="estimate-project-type" className={styles.fieldLabel}>
                      Project Type *
                    </label>
                    <ThemedSelect
                      id="estimate-project-type"
                      value={formData.projectType}
                      options={PROJECT_TYPES}
                      onChange={(val) =>
                        setFormData((prev) => ({ ...prev, projectType: val }))
                      }
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="estimate-desc" className={styles.fieldLabel}>
                    What do you need built? *
                  </label>
                  <textarea
                    id="estimate-desc"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className={styles.textareaInput}
                    placeholder="Tell me briefly about the business, goal, and what you'd like created."
                  />
                  {errors.description && (
                    <p className={styles.errorMessage}>{errors.description}</p>
                  )}
                </div>

                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={styles.primaryButton}
                  >
                    CONTINUE →
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: REQUIREMENTS */}
            {currentStep === 2 && (
              <>
                <div className={styles.stepHeader}>
                  <h2 className={styles.stepTitle}>STEP 2: REQUIREMENTS & SCOPE</h2>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="estimate-features" className={styles.fieldLabel}>
                    Important Features *
                  </label>
                  <textarea
                    id="estimate-features"
                    required
                    rows={3}
                    value={formData.features}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, features: e.target.value }))
                    }
                    className={styles.textareaInput}
                    placeholder="e.g. Booking system, custom checkout, multi-page layout, animations, user login, etc."
                  />
                  {errors.features && (
                    <p className={styles.errorMessage}>{errors.features}</p>
                  )}
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label htmlFor="estimate-deadline" className={styles.fieldLabel}>
                      Preferred Deadline <span className={styles.optionalTag}>(Optional)</span>
                    </label>
                    <input
                      id="estimate-deadline"
                      type="text"
                      value={formData.deadline}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, deadline: e.target.value }))
                      }
                      className={styles.textInput}
                      placeholder="e.g. 2–3 weeks, by end of month"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="estimate-budget" className={styles.fieldLabel}>
                      Budget Range <span className={styles.optionalTag}>(Optional)</span>
                    </label>
                    <ThemedSelect
                      id="estimate-budget"
                      value={formData.budget}
                      options={BUDGET_RANGES}
                      onChange={(val) =>
                        setFormData((prev) => ({ ...prev, budget: val }))
                      }
                    />
                  </div>
                </div>

                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className={styles.secondaryButton}
                  >
                    ← BACK
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={styles.primaryButton}
                  >
                    CONTINUE →
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: CONTACT */}
            {currentStep === 3 && (
              <>
                <div className={styles.stepHeader}>
                  <h2 className={styles.stepTitle}>STEP 3: CONTACT & SUBMISSION</h2>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>How should I contact you? *</label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="WHATSAPP"
                          checked={formData.contactMethod === 'WHATSAPP'}
                          onChange={() => {
                            setFormData((prev) => ({
                              ...prev,
                              contactMethod: 'WHATSAPP',
                              contactValue: '',
                            }));
                            setErrors({});
                          }}
                          className={styles.radioInput}
                        />
                        WhatsApp
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="EMAIL"
                          checked={formData.contactMethod === 'EMAIL'}
                          onChange={() => {
                            setFormData((prev) => ({
                              ...prev,
                              contactMethod: 'EMAIL',
                              contactValue: '',
                            }));
                            setErrors({});
                          }}
                          className={styles.radioInput}
                        />
                        Email
                      </label>
                    </div>
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="estimate-contact-val" className={styles.fieldLabel}>
                      {formData.contactMethod === 'WHATSAPP'
                        ? 'WhatsApp Number *'
                        : 'Email Address *'}
                    </label>
                    <input
                      id="estimate-contact-val"
                      type={formData.contactMethod === 'WHATSAPP' ? 'tel' : 'email'}
                      required
                      autoComplete={formData.contactMethod === 'WHATSAPP' ? 'tel' : 'email'}
                      value={formData.contactValue}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, contactValue: e.target.value }))
                      }
                      className={styles.textInput}
                      placeholder={
                        formData.contactMethod === 'WHATSAPP'
                          ? '+92 300 0000000'
                          : 'you@example.com'
                      }
                    />
                    {errors.contactValue && (
                      <p className={styles.errorMessage}>{errors.contactValue}</p>
                    )}
                  </div>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="estimate-details" className={styles.fieldLabel}>
                    Additional Details <span className={styles.optionalTag}>(Optional)</span>
                  </label>
                  <textarea
                    id="estimate-details"
                    rows={3}
                    value={formData.details}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, details: e.target.value }))
                    }
                    className={styles.textareaInput}
                    placeholder="Any reference links, competitor sites, design preferences, or specific notes."
                  />
                </div>

                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className={styles.secondaryButton}
                  >
                    ← BACK
                  </button>
                  <button type="submit" className={styles.primaryButton}>
                    {formData.contactMethod === 'WHATSAPP'
                      ? 'CONTINUE ON WHATSAPP →'
                      : 'CONTINUE WITH EMAIL →'}
                  </button>
                </div>
              </>
            )}
          </div>
        </form>

        {/* Assurance Footer Strip */}
        <div className={styles.footerStrip}>
          <span>No commitment required</span>
          <span>Response usually within 24 hours</span>
        </div>
      </div>
    </main>
  );
}
