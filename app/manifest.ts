import type { MetadataRoute } from 'next';

/** Yoca — web app manifest (PWA metadata + brand icons). */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yoca — Your Own Creative Agency',
    short_name: 'Yoca',
    description:
      'Yoca builds brands, digital experiences, growth systems and digital products through strategy, design, technology and performance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0E12',
    theme_color: '#000000',
    icons: [
      { src: '/favicons/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
