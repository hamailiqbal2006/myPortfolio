'use client';

import React from 'react';

/**
 * Cinematic Studio Lighting calibrated for:
 * 1. Off-White Satin Ceramic: Soft diffuse falloff and gentle clearcoat specular catch.
 * 2. Dark Brushed Graphite Metal: High-contrast glancing rim highlights across beveled edges.
 * 3. Smoked Optical Glass: Translucent transmission depth and crisp refractive edges.
 * 
 * Zero neon illumination, zero glowing blues, zero colored spotlights.
 */
export function LightingEnvironment() {
  return (
    <>
      {/* Neutral ambient fill for shadow detail */}
      <ambientLight color="#ffffff" intensity={0.65} />

      {/* Soft warm primary key light from upper-right */}
      <directionalLight
        position={[6, 8, 6]}
        intensity={2.5}
        color="#fbfaf6"
      />

      {/* Cool architectural rim light from rear-left to silhouette dark metal & glass */}
      <directionalLight
        position={[-7, 5, -5]}
        intensity={2.1}
        color="#cbd5e1"
      />

      {/* High-elevation top accent to illuminate upper architectural curvature */}
      <pointLight
        position={[1, 5, 2]}
        intensity={1.2}
        distance={15}
        decay={2}
        color="#ffffff"
      />

      {/* Subtle lower bounce to soften undercuts without harsh black clipping */}
      <directionalLight
        position={[-2, -6, 3]}
        intensity={0.45}
        color="#1e293b"
      />
    </>
  );
}
