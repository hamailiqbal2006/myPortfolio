export interface Vector3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface SculptureTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export interface CameraTransform {
  position: [number, number, number];
  target: [number, number, number];
}

export interface LightingConfig {
  ambientIntensity: number;
  keyIntensity: number;
  rimIntensity: number;
  bounceIntensity: number;
}

export interface Scene3DConfig {
  camera: CameraTransform;
  sculpture: SculptureTransform;
  lighting: LightingConfig;
}

export interface TierScene3DConfig {
  desktop: Scene3DConfig;
  tablet: Scene3DConfig;
  mobile: Scene3DConfig;
}

export interface TransitionPayload {
  fromIndex: number;
  toIndex: number;
  direction: 'next' | 'prev';
  duration: number;
}
