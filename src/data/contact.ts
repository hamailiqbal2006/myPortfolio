import { ContactConfig } from '@/types/contact';

/**
 * Central configuration for contact channels.
 * Real WhatsApp number: 0305 3764646 (+923053764646).
 * Professional email is deliberately empty until provided by user.
 */
export const CONTACT_CONFIG: ContactConfig = {
  // Direct communication channels
  whatsapp: '+923053764646',
  email: '', // Deliberately empty per specification

  // Professional social profiles
  instagram: '',
  linkedin: '',

  // Live production domain
  portfolioDomain: '',
} as const;

export const WHATSAPP_DISPLAY = '0305 3764646';
export const WHATSAPP_MESSAGE = 'Hi Hamail, I visited your portfolio and would like to discuss a project.';
export const WHATSAPP_URL = `https://wa.me/923053764646?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
