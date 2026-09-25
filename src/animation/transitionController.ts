import gsap from 'gsap';
import { getScene3DConfig } from './sceneConfigs';
import { DeviceTier } from '@/types/device';

/**
 * Shared mutable 3D animation state.
 * Mutated directly by GSAP tweens; read in Three.js useFrame loops without triggering React re-renders.
 */
export const animation3DState = {
  camera: {
    x: 0,
    y: 0,
    z: 4.4,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
  },
  sculpture: {
    posX: 1.35,
    posY: 0.05,
    posZ: 0,
    rotX: 0.1,
    rotY: -0.35,
    rotZ: 0.08,
    scale: 1.15,
    opacity: 1,
  },
  lighting: {
    ambientIntensity: 0.85,
    keyIntensity: 2.6,
    rimIntensity: 1.8,
    bounceIntensity: 0.5,
  },
  introProgress: 0, // 0 to 1 as initial intro plays
  parallax: {
    cameraX: 0,
    cameraY: 0,
    sculptureRotX: 0,
    sculptureRotY: 0,
  },
};

let activeTransitionTimeline: gsap.core.Timeline | null = null;

/**
 * Initialize 3D transforms to a specific section and device tier.
 */
export function initialize3DState(sectionIndex: number, tier: DeviceTier) {
  const target = getScene3DConfig(sectionIndex, tier);

  animation3DState.camera.x = target.camera.position[0];
  animation3DState.camera.y = target.camera.position[1];
  animation3DState.camera.z = target.camera.position[2];

  animation3DState.camera.targetX = target.camera.target[0];
  animation3DState.camera.targetY = target.camera.target[1];
  animation3DState.camera.targetZ = target.camera.target[2];

  animation3DState.sculpture.posX = target.sculpture.position[0];
  animation3DState.sculpture.posY = target.sculpture.position[1];
  animation3DState.sculpture.posZ = target.sculpture.position[2];

  animation3DState.sculpture.rotX = target.sculpture.rotation[0];
  animation3DState.sculpture.rotY = target.sculpture.rotation[1];
  animation3DState.sculpture.rotZ = target.sculpture.rotation[2];

  animation3DState.sculpture.scale = target.sculpture.scale;

  animation3DState.lighting.ambientIntensity = target.lighting.ambientIntensity;
  animation3DState.lighting.keyIntensity = target.lighting.keyIntensity;
  animation3DState.lighting.rimIntensity = target.lighting.rimIntensity;
  animation3DState.lighting.bounceIntensity = target.lighting.bounceIntensity;
}

/**
 * Reusable cinematic transition between sections.
 * Animates camera, sculpture coordinates/rotation/scale, and lighting.
 */
export function transitionScene3D(
  targetIndex: number,
  tier: DeviceTier,
  reducedMotion: boolean,
  onComplete?: () => void
): gsap.core.Timeline {
  if (activeTransitionTimeline) {
    activeTransitionTimeline.kill();
    activeTransitionTimeline = null;
  }

  const target = getScene3DConfig(targetIndex, tier);
  const duration = reducedMotion ? 0.01 : 1.1;
  const ease = 'power2.inOut';

  const tl = gsap.timeline({
    onComplete: () => {
      activeTransitionTimeline = null;
      onComplete?.();
    },
  });

  tl.to(
    animation3DState.camera,
    {
      x: target.camera.position[0],
      y: target.camera.position[1],
      z: target.camera.position[2],
      targetX: target.camera.target[0],
      targetY: target.camera.target[1],
      targetZ: target.camera.target[2],
      duration,
      ease,
    },
    0
  );

  tl.to(
    animation3DState.sculpture,
    {
      posX: target.sculpture.position[0],
      posY: target.sculpture.position[1],
      posZ: target.sculpture.position[2],
      rotX: target.sculpture.rotation[0],
      rotY: target.sculpture.rotation[1],
      rotZ: target.sculpture.rotation[2],
      scale: target.sculpture.scale,
      duration,
      ease,
    },
    0
  );

  tl.to(
    animation3DState.lighting,
    {
      ambientIntensity: target.lighting.ambientIntensity,
      keyIntensity: target.lighting.keyIntensity,
      rimIntensity: target.lighting.rimIntensity,
      bounceIntensity: target.lighting.bounceIntensity,
      duration,
      ease,
    },
    0
  );

  activeTransitionTimeline = tl;
  return tl;
}
