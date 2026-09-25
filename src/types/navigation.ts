export type SectionId =
  | 'hero'
  | 'websites'
  | 'shopify'
  | 'applications'
  | 'why'
  | 'pricing'
  | 'contact';

export interface SectionConfig {
  readonly id: SectionId;
  readonly number: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly isVisual: boolean;
}

export type NavigationDirection = 'next' | 'prev' | null;

export interface NavigationState {
  readonly currentIndex: number;
  readonly currentId: SectionId;
  readonly targetIndex: number;
  readonly targetId: SectionId;
  readonly direction: NavigationDirection;
  readonly isTransitioning: boolean;
}
