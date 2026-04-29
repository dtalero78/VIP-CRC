export const site = {
  name: 'VIP Salud Ocupacional',
  brand: 'VIP CRC',
  legalName: 'VIP SALUD OCUPACIONAL S.A.S.',
  nit: '901434471-7',
  domain: 'examenesparapase.com',
  url: 'https://examenesparapase.com',
  description:
    'Centro de Reconocimiento de Conductores (CRC) en Bogotá. Examen médico para licencia de conducción: visual, auditivo, psicológico y medicina general. Resultados en línea, certificación RUNT.',
  shortDescription:
    'Examen médico para licencia de conducción en Bogotá — rápido, certificado y avalado por el RUNT.',
  keywords: [
    'examen médico para licencia de conducción',
    'examen para pase Bogotá',
    'CRC Bogotá',
    'centro de reconocimiento de conductores',
    'examen visual licencia',
    'examen psicológico conducción',
    'audiometría licencia conducción',
    'renovación licencia conducción Bogotá',
    'recategorización licencia',
    'VIP Salud Ocupacional',
  ],
  phone: {
    landline: '6015782492',
    landlineDisplay: '(601) 578 2492',
    mobile: '3134010901',
    mobileDisplay: '313 401 0901',
    whatsapp: '573134010901',
    whatsappDisplay: '+57 313 401 0901',
  },
  email: 'contacto@examenesparapase.com',
  address: {
    street: 'Carrera 28A No. 51-70',
    city: 'Bogotá D.C.',
    region: 'Cundinamarca',
    country: 'CO',
    zip: '111321',
    full: 'Carrera 28A No. 51-70, Bogotá D.C., Colombia',
    mapsQuery: 'Carrera 28A %23 51-70, Bogotá',
    geo: { lat: 4.6394, lng: -74.0826 },
  },
  hours: {
    weekdays: 'Lunes a Viernes · 7:00 a.m. – 5:00 p.m.',
    saturday: 'Sábados · 7:00 a.m. – 1:00 p.m.',
    schemaWeekdays: 'Mo,Tu,We,Th,Fr 07:00-17:00',
    schemaSaturday: 'Sa 07:00-13:00',
  },
  social: {
    whatsapp: 'https://wa.me/573134010901?text=Hola%2C%20quiero%20agendar%20mi%20examen%20m%C3%A9dico%20para%20licencia%20de%20conducci%C3%B3n.',
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
  prices: [
    { categories: '1 categoría', online: 180000, regular: 250000 },
    { categories: '2 categorías', online: 300000, regular: 380000 },
  ],
};

export type SiteConfig = typeof site;
