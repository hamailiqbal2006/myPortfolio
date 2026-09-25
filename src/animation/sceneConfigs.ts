import { TierScene3DConfig } from './types';

/**
 * Scene 01: Intro Experience
 * Desktop features an asymmetric luxury composition where the sculpture occupies
 * the right visual field (~50-60% area) and text balances on the left.
 * Mobile stacks vertically with the sculpture framed gracefully in the upper center,
 * leaving clear vertical room for the headline, copy, and swipe cues beneath it.
 */
export const INTRO_SCENE: TierScene3DConfig = {
  desktop: {
    camera: {
      position: [0, 0, 4.4],
      target: [0, 0, 0],
    },
    sculpture: {
      position: [1.35, 0.05, 0],
      rotation: [0.1, -0.35, 0.08],
      scale: 1.15,
    },
    lighting: {
      ambientIntensity: 0.85,
      keyIntensity: 2.6,
      rimIntensity: 1.8,
      bounceIntensity: 0.5,
    },
  },
  tablet: {
    camera: {
      position: [0, 0, 5.2],
      target: [0, 0, 0],
    },
    sculpture: {
      position: [0.8, 0.1, 0],
      rotation: [0.1, -0.3, 0.05],
      scale: 1.0,
    },
    lighting: {
      ambientIntensity: 0.85,
      keyIntensity: 2.4,
      rimIntensity: 1.6,
      bounceIntensity: 0.5,
    },
  },
  mobile: {
    camera: {
      position: [0, 0, 6.2],
      target: [0, 0, 0],
    },
    sculpture: {
      position: [0, 1.25, 0],
      rotation: [0.15, -0.2, 0.05],
      scale: 0.72,
    },
    lighting: {
      ambientIntensity: 0.9,
      keyIntensity: 2.5,
      rimIntensity: 1.6,
      bounceIntensity: 0.5,
    },
  },
};

/**
 * Scene 02: About Preview
 * Sculpture gracefully glides to the left visual anchor and scales down subtly,
 * rotating into a dramatic architectural angle while the temporary Section 02
 * identifier takes focus on the right.
 * On mobile, sculpture rests in upper-rear perspective without obscuring typography.
 */
export const ABOUT_SCENE: TierScene3DConfig = {
  desktop: {
    camera: {
      position: [0, 0, 4.8],
      target: [0, 0, 0],
    },
    sculpture: {
      position: [-1.45, -0.1, -0.6],
      rotation: [0.45, 0.7, -0.2],
      scale: 0.82,
    },
    lighting: {
      ambientIntensity: 0.7,
      keyIntensity: 2.0,
      rimIntensity: 2.2,
      bounceIntensity: 0.4,
    },
  },
  tablet: {
    camera: {
      position: [0, 0, 5.4],
      target: [0, 0, 0],
    },
    sculpture: {
      position: [-0.9, 0.0, -0.4],
      rotation: [0.4, 0.65, -0.15],
      scale: 0.78,
    },
    lighting: {
      ambientIntensity: 0.7,
      keyIntensity: 2.0,
      rimIntensity: 2.0,
      bounceIntensity: 0.4,
    },
  },
  mobile: {
    camera: {
      position: [0, 0, 6.4],
      target: [0, 0, 0],
    },
    sculpture: {
      position: [0, 1.35, -0.6],
      rotation: [0.45, 0.7, -0.15],
      scale: 0.6,
    },
    lighting: {
      ambientIntensity: 0.75,
      keyIntensity: 2.2,
      rimIntensity: 1.8,
      bounceIntensity: 0.4,
    },
  },
};

export const SCENE_CONFIGS_BY_INDEX: Record<number, TierScene3DConfig> = {
  0: INTRO_SCENE,
  1: ABOUT_SCENE,
};

export function getScene3DConfig(index: number, tier: 'desktop' | 'tablet' | 'mobile') {
  const config = SCENE_CONFIGS_BY_INDEX[index] ?? SCENE_CONFIGS_BY_INDEX[0];
  return config[tier];
}
