'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneContainer } from './SceneContainer';
import { useResponsiveDevice } from '@/hooks/useResponsiveDevice';
import { THREE_DEFAULTS } from '@/lib/constants';

interface ExperienceCanvasProps {
  onCanvasReady?: () => void;
}

export function ExperienceCanvas({ onCanvasReady }: ExperienceCanvasProps) {
  const { dpr, cameraZ } = useResponsiveDevice();

  return (
    <div className="experience-canvas-container" aria-hidden="true">
      <Canvas
        camera={{
          fov: THREE_DEFAULTS.cameraFov,
          near: THREE_DEFAULTS.cameraNear,
          far: THREE_DEFAULTS.cameraFar,
          position: [0, 0, cameraZ],
        }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        onCreated={() => {
          onCanvasReady?.();
        }}
      >
        <Suspense fallback={null}>
          <SceneContainer />
        </Suspense>
      </Canvas>
    </div>
  );
}
