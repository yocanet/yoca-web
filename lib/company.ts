/** Yoca — company facts used across pages, footer and structured data. */
export const COMPANY = {
  name: 'Yoca',
  legalName: 'Yoca. Your Own Creative Agency',
  email: 'connect@yoca.net',
  instagram: 'https://instagram.com/thisisyoca',
  address: {
    street: 'Bağdat Caddesi, No: 131',
    district: 'Kadıköy',
    city: 'İstanbul',
    countryCode: 'TR',
    /** One-line display form (identical in every locale — it is a proper name). */
    line: 'Bağdat Caddesi, No: 131 Kadıköy / İstanbul',
  },
} as const;
