/**
 * Yoca — product media: authentic screenshots of the actual products under
 * /public/products/<key>/. Products without real media fall back to their
 * typographic/motif treatment — never fabricated screens.
 */
export interface ProductMedia {
  kind: 'phones' | 'browsers' | 'art';
  images: string[];
}

export const PRODUCT_MEDIA: Record<string, ProductMedia> = {
  // Register ONLY real captures of the actual products (YocaServe, WonKick,
  // Demo Hub browser screenshots of the real demo sites). No generated UI.
  // yocaserve: { kind: 'phones', images: ['/products/yocaserve/mobile-01.webp', ...] },
};

export function getProductMedia(key: string): ProductMedia | null {
  return PRODUCT_MEDIA[key] ?? null;
}
