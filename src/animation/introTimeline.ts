import gsap from 'gsap';
import { animation3DState } from './transitionController';

export interface IntroElements {
  container: HTMLElement | null;
  brandMonogram: HTMLElement | null;
  brandRole: HTMLElement | null;
  headlineLines: HTMLElement[];
  supportingCopy: HTMLElement | null;
  capabilities: HTMLElement | null;
  scrollCue: HTMLElement | null;
}

/**
 * Executes the deliberate, cinematic intro sequence upon initial application load.
 * Total duration: ~1.8s to 2.1s.
 * Deliberate, architectural pacing without fake loading screens or distracting glitches.
 */
export function playIntroTimeline(
  elements: IntroElements,
  reducedMotion: boolean,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete,
  });

  if (reducedMotion) {
    // Instant reveal for accessibility
    animation3DState.introProgress = 1;
    if (elements.container) {
      gsap.set(
        [
          elements.brandMonogram,
          elements.brandRole,
          elements.headlineLines,
          elements.supportingCopy,
          elements.capabilities,
          elements.scrollCue,
        ],
        { opacity: 1, y: 0, clearProps: 'all' }
      );
    }
    onComplete?.();
    return tl;
  }

  // Initial states
  animation3DState.introProgress = 0;

  if (elements.brandMonogram) {
    gsap.set(elements.brandMonogram, { opacity: 0, y: -10 });
  }
  if (elements.brandRole) {
    gsap.set(elements.brandRole, { opacity: 0, y: -8 });
  }
  if (elements.headlineLines.length > 0) {
    gsap.set(elements.headlineLines, { y: '105%', opacity: 0 });
  }
  if (elements.supportingCopy) {
    gsap.set(elements.supportingCopy, { opacity: 0, y: 16 });
  }
  if (elements.capabilities) {
    gsap.set(elements.capabilities, { opacity: 0, y: 12 });
  }
  if (elements.scrollCue) {
    gsap.set(elements.scrollCue, { opacity: 0, y: 15 });
  }

  // 1. 3D Sculpture materialization & intro progress (0.0s -> 1.4s)
  tl.to(
    animation3DState,
    {
      introProgress: 1,
      duration: 1.4,
      ease: 'power2.out',
    },
    0
  );

  // 2. Brand Wordmark & Role Identifier (0.3s)
  if (elements.brandMonogram && elements.brandRole) {
    tl.to(
      elements.brandMonogram,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.25
    );
    tl.to(
      elements.brandRole,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.35
    );
  }

  // 3. Primary Headline reveal through masking (0.5s -> 1.3s)
  if (elements.headlineLines.length > 0) {
    tl.to(
      elements.headlineLines,
      {
        y: '0%',
        opacity: 1,
        duration: 0.95,
        stagger: 0.12,
        ease: 'power3.out',
      },
      0.45
    );
  }

  // 4. Supporting Copy reveal (0.9s -> 1.6s)
  if (elements.supportingCopy) {
    tl.to(
      elements.supportingCopy,
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
      },
      0.85
    );
  }

  // 5. Capability Line reveal (1.1s -> 1.8s)
  if (elements.capabilities) {
    tl.to(
      elements.capabilities,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      1.05
    );
  }

  // 6. Scroll / Swipe exploration cue appears last (1.4s -> 2.0s)
  if (elements.scrollCue) {
    tl.to(
      elements.scrollCue,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      1.35
    );
  }

  return tl;
}
