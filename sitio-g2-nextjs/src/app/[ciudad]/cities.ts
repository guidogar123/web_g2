export interface CityData {
  slug: string;
  name: string;
  department: string;
  region: string; // ISO 3166-2:CO
  lat: string;
  lon: string;
}

export const CITIES: CityData[] = [
  { slug: 'bogota',         name: 'Bogotá',          department: 'Cundinamarca',        region: 'CO-DC',  lat: '4.7110',  lon: '-74.0721' },
  { slug: 'medellin',       name: 'Medellín',         department: 'Antioquia',           region: 'CO-ANT', lat: '6.2518',  lon: '-75.5636' },
  { slug: 'cali',           name: 'Cali',             department: 'Valle del Cauca',     region: 'CO-VAC', lat: '3.4516',  lon: '-76.5320' },
  { slug: 'barranquilla',   name: 'Barranquilla',     department: 'Atlántico',           region: 'CO-ATL', lat: '10.9685', lon: '-74.7813' },
  { slug: 'cartagena',      name: 'Cartagena',        department: 'Bolívar',             region: 'CO-BOL', lat: '10.3910', lon: '-75.4794' },
  { slug: 'bucaramanga',    name: 'Bucaramanga',      department: 'Santander',           region: 'CO-SAN', lat: '7.1193',  lon: '-73.1227' },
  { slug: 'pereira',        name: 'Pereira',          department: 'Risaralda',           region: 'CO-RIS', lat: '4.8133',  lon: '-75.6961' },
  { slug: 'manizales',      name: 'Manizales',        department: 'Caldas',              region: 'CO-CAL', lat: '5.0689',  lon: '-75.5174' },
  { slug: 'ibague',         name: 'Ibagué',           department: 'Tolima',              region: 'CO-TOL', lat: '4.4389',  lon: '-75.2322' },
  { slug: 'santa-marta',    name: 'Santa Marta',      department: 'Magdalena',           region: 'CO-MAG', lat: '11.2408', lon: '-74.1990' },
  { slug: 'cucuta',         name: 'Cúcuta',           department: 'Norte de Santander',  region: 'CO-NSA', lat: '7.8939',  lon: '-72.5078' },
  { slug: 'villavicencio',  name: 'Villavicencio',    department: 'Meta',                region: 'CO-MET', lat: '4.1420',  lon: '-73.6266' },
  { slug: 'armenia',        name: 'Armenia',          department: 'Quindío',             region: 'CO-QUI', lat: '4.5339',  lon: '-75.6811' },
  { slug: 'pasto',          name: 'Pasto',            department: 'Nariño',              region: 'CO-NAR', lat: '1.2136',  lon: '-77.2811' },
  { slug: 'monteria',       name: 'Montería',         department: 'Córdoba',             region: 'CO-COR', lat: '8.7575',  lon: '-75.8814' },
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
