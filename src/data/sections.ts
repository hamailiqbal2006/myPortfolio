import { SectionConfig, SectionId } from '@/types/navigation';

export const SECTIONS: readonly SectionConfig[] = [
  {
    id: 'hero',
    number: '01',
    title: 'Hero',
    shortTitle: 'Hero',
    isVisual: true,
  },
  {
    id: 'websites',
    number: '02',
    title: 'Websites',
    shortTitle: 'Websites',
    isVisual: true,
  },
  {
    id: 'shopify',
    number: '03',
    title: 'Shopify Stores',
    shortTitle: 'Shopify',
    isVisual: true,
  },
  {
    id: 'applications',
    number: '04',
    title: 'Apps & Software',
    shortTitle: 'Apps',
    isVisual: true,
  },
  {
    id: 'why',
    number: '05',
    title: 'Why Work With Me',
    shortTitle: 'Why',
    isVisual: true,
  },
  {
    id: 'pricing',
    number: '06',
    title: 'Pricing',
    shortTitle: 'Pricing',
    isVisual: true,
  },
  {
    id: 'contact',
    number: '07',
    title: 'Contact',
    shortTitle: 'Contact',
    isVisual: true,
  },
] as const;

export const TOTAL_SECTIONS = SECTIONS.length;

export const getSectionByIndex = (index: number): SectionConfig => {
  const safeIndex = Math.max(0, Math.min(index, TOTAL_SECTIONS - 1));
  return SECTIONS[safeIndex];
};

export const getSectionById = (id: SectionId): SectionConfig => {
  const found = SECTIONS.find((s) => s.id === id);
  return found ?? SECTIONS[0];
};

export const getSectionIndexById = (id: SectionId): number => {
  const index = SECTIONS.findIndex((s) => s.id === id);
  return index !== -1 ? index : 0;
};
