export type DeviceTier = 'mobile' | 'tablet' | 'desktop';

export interface ResponsiveSettings {
  readonly tier: DeviceTier;
  readonly isMobile: boolean;
  readonly isTablet: boolean;
  readonly isDesktop: boolean;
  readonly width: number;
  readonly height: number;
  readonly dpr: number;
  readonly cameraZ: number;
  readonly sculptureScale: number;
}
