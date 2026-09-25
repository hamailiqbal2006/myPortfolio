'use client';

import React from 'react';
import { LightingEnvironment } from './LightingEnvironment';
import { CameraRig } from './CameraRig';
import { HeroSculpture } from './sculpture/HeroSculpture';

/**
 * Root Three.js scene container for the landing / hero experience.
 * Hosts the studio lighting environment, cinematic camera rig, and the bespoke abstract 3D sculpture.
 * Free from cartoon humans, mannequins, mockups, or HUD elements.
 */
export function SceneContainer() {
  return (
    <>
      <CameraRig />
      <LightingEnvironment />
      <HeroSculpture />
    </>
  );
}
