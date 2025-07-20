export const IMAGES = {
  hero: {
    main: '/assets/images/hero-image.jpg',
  },
  about: {
    team: '/images/about-us.jpg',
  },
  services: {
    moving: '/assets/images/services/moving.jpg',
    packing: '/assets/images/services/packing.jpg',
    office: '/assets/images/services/office.jpg',
    furniture: '/assets/images/services/furniture.jpg',
  },
} as const;

// Typen für die Bilder
export type ImageKeys = keyof typeof IMAGES;
export type HeroImageKeys = keyof typeof IMAGES.hero;
export type AboutImageKeys = keyof typeof IMAGES.about;
export type ServicesImageKeys = keyof typeof IMAGES.services; 