export const NAVIGATION_DEBOUNCE_MS = 750;
export const WHEEL_THRESHOLD = 35;
export const TOUCH_SWIPE_THRESHOLD = 45;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const;

export const THREE_DEFAULTS = {
  cameraFov: 45,
  cameraNear: 0.1,
  cameraFar: 100,
  mobileDpr: 1.5,
  desktopDpr: 2.0,
} as const;
