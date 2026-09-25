'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useResponsiveDevice } from '@/hooks/useResponsiveDevice';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { progressController } from '@/animation/progressController';

/**
 * Creates a smooth rounded rectangle shape for architectural ribbon extrusion.
 */
function createBeveledRibbonShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = Math.min(radius, w / 2, h / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

/**
 * Bespoke Abstract 3D Architectural Sculpture
 * 
 * Concept:
 * Three bespoke architectural forms interlocking into a singular, unified sculpture:
 * 1. Off-White Satin Ceramic: A sweeping curvilinear ribbon (subtly symbolizing Digital Architecture / Websites)
 * 2. Dark Brushed Graphite Metal: An interlocking precision beveled monolith (subtly symbolizing Commerce & Core Frameworks / Shopify)
 * 3. Smoked Optical Glass: A dark translucent curved aerodynamic shell (subtly symbolizing Software, Applications & Fluid Logic)
 * 
 * Zero text labels, zero generic primitives, zero particle clutter.
 * Sculptural, architectural, precise, premium.
 */
export function HeroSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const ceramicRef = useRef<THREE.Mesh>(null);
  const metalRef = useRef<THREE.Mesh>(null);
  const glassRef = useRef<THREE.Mesh>(null);

  const { isMobile, isTablet } = useResponsiveDevice();
  const prefersReducedMotion = useReducedMotion();

  // 1. Form 1: Off-White Satin Ceramic Ribbon (Sweeping Architectural Shell)
  const ceramicGeometry = useMemo(() => {
    // 3D curve with graceful vertical sweep, curvature, and open negative space aperture
    const curvePoints = [
      new THREE.Vector3(-0.35, -1.45, 0.25),
      new THREE.Vector3(0.75, -1.05, -0.40),
      new THREE.Vector3(1.25, -0.15, 0.10),
      new THREE.Vector3(0.85, 0.95, 0.45),
      new THREE.Vector3(-0.15, 1.40, -0.10),
      new THREE.Vector3(-0.95, 0.85, -0.45),
      new THREE.Vector3(-0.65, -0.20, 0.20),
      new THREE.Vector3(0.15, -0.80, 0.55),
      new THREE.Vector3(0.65, -1.30, 0.15),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.5);
    const shape = createBeveledRibbonShape(0.36, 0.08, 0.025);

    const geo = new THREE.ExtrudeGeometry(shape, {
      extrudePath: curve,
      steps: 160,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.012,
      bevelThickness: 0.012,
    });
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 2. Form 2: Dark Brushed Metal Core (Precision Interlocking Monolith)
  const metalGeometry = useMemo(() => {
    // Interlocking band threading through the interior negative-space void of the ceramic ribbon
    const curvePoints = [
      new THREE.Vector3(-1.15, -0.65, -0.30),
      new THREE.Vector3(-0.70, 0.25, 0.35),
      new THREE.Vector3(0.10, 1.10, 0.25),
      new THREE.Vector3(0.80, 0.65, -0.30),
      new THREE.Vector3(0.45, -0.45, -0.55),
      new THREE.Vector3(-0.35, -1.00, -0.10),
      new THREE.Vector3(-0.95, -0.55, 0.25),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.5);
    const shape = createBeveledRibbonShape(0.32, 0.11, 0.035);

    const geo = new THREE.ExtrudeGeometry(shape, {
      extrudePath: curve,
      steps: 140,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 3. Form 3: Smoked Optical Glass Wave (Translucent Aerodynamic Cowl)
  const glassGeometry = useMemo(() => {
    // Sweeping translucent optical cowl wrapping and refracting the junction
    const curvePoints = [
      new THREE.Vector3(-0.40, 1.35, 0.30),
      new THREE.Vector3(0.55, 0.95, -0.20),
      new THREE.Vector3(1.05, 0.05, 0.35),
      new THREE.Vector3(0.60, -0.90, 0.15),
      new THREE.Vector3(-0.30, -1.25, -0.35),
      new THREE.Vector3(-0.85, -0.35, -0.15),
      new THREE.Vector3(-0.25, 0.65, 0.45),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.5);
    const shape = createBeveledRibbonShape(0.40, 0.055, 0.02);

    const geo = new THREE.ExtrudeGeometry(shape, {
      extrudePath: curve,
      steps: 150,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    });
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Responsive spatial framing
  const basePosition = useMemo((): [number, number, number] => {
    if (isMobile) return [0.0, -0.06, 0.0];
    if (isTablet) return [0.0, -0.02, 0.0];
    // Desktop: center-right composition occupying ~45-50% of the viewport width with generous negative space
    return [1.38, 0.08, 0.0];
  }, [isMobile, isTablet]);

  const baseScale = useMemo((): number => {
    if (isMobile) return 0.66;
    if (isTablet) return 0.78;
    return 1.05;
  }, [isMobile, isTablet]);

  // Entrance animation progress (0.0 -> 1.0)
  const introFactor = useRef(0);

  // Per-frame physics, idle drift, breathing, and pointer parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth intro resolve (first ~0.8s)
    if (introFactor.current < 1) {
      introFactor.current = Math.min(1, introFactor.current + delta * 1.35);
    }

    const scrollProgress = progressController.current; // 0.0 -> 1.0
    const time = state.clock.getElapsedTime();

    if (prefersReducedMotion) {
      // Reduced motion: static, dignified placement
      groupRef.current.position.set(basePosition[0], basePosition[1], basePosition[2]);
      groupRef.current.rotation.set(-0.10, 0.35, 0.05);
      groupRef.current.scale.setScalar(baseScale);
      return;
    }

    // Heavy, damped pointer response (the sculpture feels substantial and heavy, not weightless)
    const targetPointerRotY = state.pointer.x * 0.12;
    const targetPointerRotX = -state.pointer.y * 0.09;
    const targetPointerX = state.pointer.x * 0.08;
    const targetPointerY = state.pointer.y * 0.05;

    // Subtly imperceptible idle movements (never spinning like a 3D demo)
    // Very slow drift: ~1-2.5 degrees of natural breathing rotation
    const idleRotY = Math.sin(time * 0.28) * 0.038;
    const idleRotX = Math.cos(time * 0.32) * 0.024;
    const idleRotZ = Math.sin(time * 0.22) * 0.018;
    const idlePosY = Math.sin(time * 0.42) * 0.032;
    const idlePosX = Math.cos(time * 0.35) * 0.020;

    // Subtle scroll reaction (preparing for future section transitions without creating Section 02)
    const scrollRotY = scrollProgress * -0.28;
    const scrollRotX = scrollProgress * 0.08;
    const scrollShiftX = scrollProgress * 0.15;
    const scrollShiftY = scrollProgress * -0.10;

    // Target rotations and positions
    const targetRotX = -0.12 + targetPointerRotX + idleRotX + scrollRotX;
    const targetRotY = 0.38 + targetPointerRotY + idleRotY + scrollRotY;
    const targetRotZ = 0.06 + idleRotZ;

    const targetPosX = basePosition[0] + targetPointerX + idlePosX + scrollShiftX;
    const targetPosY = basePosition[1] + targetPointerY + idlePosY + scrollShiftY;
    const targetPosZ = basePosition[2];

    // Smooth heavy interpolation (lerp factor tuned for weight)
    const lerpSpeed = Math.min(1, delta * 2.2);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, lerpSpeed);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, lerpSpeed);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, lerpSpeed);

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, lerpSpeed);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, lerpSpeed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, lerpSpeed);

    // Subtle scale entrance resolve
    const currentScale = baseScale * (0.94 + 0.06 * introFactor.current);
    groupRef.current.scale.setScalar(currentScale);

    // Micro-breathing between the three interlocking architectural forms
    // Subtly alters the relative tension between the forms so the sculpture feels organically unified
    const internalBreathing = Math.sin(time * 0.55) * 0.012;

    if (ceramicRef.current) {
      ceramicRef.current.position.y = internalBreathing * 0.6;
      ceramicRef.current.rotation.z = internalBreathing * 0.4;
    }
    if (metalRef.current) {
      metalRef.current.position.x = -internalBreathing * 0.5;
      metalRef.current.rotation.y = -internalBreathing * 0.3;
    }
    if (glassRef.current) {
      glassRef.current.position.z = internalBreathing * 0.8;
      glassRef.current.rotation.x = internalBreathing * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={basePosition} dispose={null}>
      {/* 1. Form 1: Off-White Satin Ceramic */}
      <mesh
        ref={ceramicRef}
        geometry={ceramicGeometry}
        castShadow={false}
        receiveShadow={false}
      >
        <meshPhysicalMaterial
          color="#f1f3f5"
          roughness={0.38}
          metalness={0.03}
          clearcoat={0.22}
          clearcoatRoughness={0.20}
          reflectivity={0.45}
        />
      </mesh>

      {/* 2. Form 2: Dark Brushed Graphite Metal Core */}
      <mesh
        ref={metalRef}
        geometry={metalGeometry}
        castShadow={false}
        receiveShadow={false}
      >
        <meshStandardMaterial
          color="#131418"
          roughness={0.34}
          metalness={0.92}
          envMapIntensity={1.3}
        />
      </mesh>

      {/* 3. Form 3: Smoked Optical Glass Translucent Shell */}
      <mesh
        ref={glassRef}
        geometry={glassGeometry}
        castShadow={false}
        receiveShadow={false}
      >
        <meshPhysicalMaterial
          color="#1a202c"
          transmission={0.85}
          opacity={1}
          transparent={true}
          roughness={0.14}
          ior={1.50}
          thickness={1.4}
          specularIntensity={1.0}
          specularColor="#ffffff"
          attenuationColor="#0a0e14"
          attenuationDistance={0.85}
        />
      </mesh>
    </group>
  );
}
