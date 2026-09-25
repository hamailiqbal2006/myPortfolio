'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useResponsiveDevice } from '@/hooks/useResponsiveDevice';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CameraRig provides cinematic, product-photography perspective framing.
 * FOV is kept tight (~38 deg) to eliminate wide-angle edge distortion.
 * Camera position reacts subtly to desktop pointer movement with heavy damping.
 */
export function CameraRig() {
  const { camera } = useThree();
  const { isMobile, isTablet } = useResponsiveDevice();
  const prefersReducedMotion = useReducedMotion();

  // Target focal distance tuned for responsive device framing
  const baseZ = useMemo(() => {
    if (isMobile) return 6.6;
    if (isTablet) return 6.0;
    return 5.4; // 1440x900 & 1920x1080 desktop
  }, [isMobile, isTablet]);

  const targetPos = useRef(new THREE.Vector3(0, 0, baseZ));
  const currentPos = useRef(new THREE.Vector3(0, 0, baseZ));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (prefersReducedMotion) {
      camera.position.set(0, 0, baseZ);
      camera.lookAt(0, 0, 0);
      return;
    }

    // Very subtle, heavy camera parallax (product-photography feel)
    const parallaxX = state.pointer.x * 0.16;
    const parallaxY = state.pointer.y * 0.10;

    targetPos.current.set(parallaxX, parallaxY, baseZ);

    const lerpFactor = Math.min(1, delta * 1.8);
    currentPos.current.lerp(targetPos.current, lerpFactor);

    camera.position.copy(currentPos.current);

    // Subtle lookAt offset to maintain asymmetrical negative space
    lookAtTarget.current.set(parallaxX * 0.3, parallaxY * 0.3, 0);
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}
