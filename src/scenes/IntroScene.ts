/**
 * Scene descriptor for 01 — Intro.
 * Encapsulates section-specific camera offsets, lighting tones, and focus parameters.
 */
export const INTRO_SCENE_CONFIG = {
  id: 'intro',
  name: 'Intro',
  cameraOffset: [0, 0, 0] as const,
  ambientIntensity: 0.8,
  accentColor: '#f8fafc',
} as const;
