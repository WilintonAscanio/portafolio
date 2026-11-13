import type { Lang } from '../i18n/ui';

export type Track = 'work' | 'product' | 'study';
/** Months as 'YYYY-MM'; end null means ongoing. */
export type Entry = { track: Track; from: string; to: string | null; title: string; role: Record<Lang, string> };

// Source: the LinkedIn profile (work and study) and each repo's first commit (products).
export const timelineStart = '2021-05';
export const entries: Entry[] = [
  { track: 'work', from: '2025-03', to: null, title: 'Prolibu', role: { es: 'Desarrollador front-end', en: 'Front-end developer' } },
  { track: 'work', from: '2023-11', to: '2025-03', title: 'Solucionsoft', role: { es: 'Desarrollador front-end', en: 'Front-end developer' } },
  { track: 'work', from: '2022-11', to: '2023-04', title: 'Makaia', role: { es: 'Desarrollador web front-end trainee', en: 'Front-end web developer trainee' } },
  { track: 'product', from: '2026-01', to: null, title: 'Caelum', role: { es: 'Front-end, software para restaurantes', en: 'Front-end, restaurant software' } },
  { track: 'product', from: '2026-10', to: null, title: 'Despachao, Yavi y Calculadoras Colombia', role: { es: 'Productos propios', en: 'My own products' } },
  { track: 'study', from: '2025-08', to: null, title: 'UNAD', role: { es: 'Ingeniería de sistemas', en: 'Systems engineering degree' } },
  { track: 'study', from: '2023-09', to: '2024-02', title: 'Google · Coursera', role: { es: 'Certificado de ciberseguridad', en: 'Cybersecurity certificate' } },
  { track: 'study', from: '2022-11', to: '2022-12', title: 'Correlation One', role: { es: 'Fundamentos de analítica de datos', en: 'Data analytics fundamentals' } },
  { track: 'study', from: '2021-05', to: '2021-12', title: 'Universidad Nacional', role: { es: 'Programación de aplicaciones web', en: 'Web application development' } },
];

/** Months since timelineStart; 'YYYY-MM' → integer. */
export function monthIndex(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  const [y0, m0] = timelineStart.split('-').map(Number);
  return (y - y0) * 12 + (m - m0);
}
