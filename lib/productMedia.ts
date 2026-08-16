/**
 * Yoca — product presentation media (real product presentation imagery under
 * /public/products/<key>/). Products without media (e.g. YocaStudio until its
 * identity/assets exist) fall back to their motif — never fabricated screens.
 */
export interface ProductMedia {
  kind: 'phones' | 'browsers' | 'art';
  images: string[];
}

export const PRODUCT_MEDIA: Record<string, ProductMedia> = {
  yocaserve: { kind: 'phones', images: ['/products/yocaserve/mobile-01.webp', '/products/yocaserve/mobile-02.webp', '/products/yocaserve/mobile-03.webp'] },
  wonkick: { kind: 'phones', images: ['/products/wonkick/mobile-01.webp', '/products/wonkick/mobile-02.webp', '/products/wonkick/mobile-03.webp'] },
  'demo-hub': { kind: 'browsers', images: ['/products/demo-hub/demo-01.webp', '/products/demo-hub/demo-02.webp', '/products/demo-hub/demo-03.webp', '/products/demo-hub/demo-04.webp'] },
  labs: { kind: 'art', images: ['/products/labs/labs-01.webp', '/products/labs/labs-02.webp'] },
};

export function getProductMedia(key: string): ProductMedia | null {
  return PRODUCT_MEDIA[key] ?? null;
}
