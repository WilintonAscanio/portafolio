import type { Lang } from '../i18n/ui';

export type Track = 'work' | 'product' | 'study';
/** Months as 'YYYY-MM'; end null means ongoing. */
export type Entry = { track: Track; from: string; to: string | null; title: string; role: Record<Lang, string>; what: Record<Lang, string> };

// Source: the LinkedIn profile (work and study) and each repo's first commit (products).
export const timelineStart = '2021-05';
export const entries: Entry[] = [
  { track: 'work', from: '2025-03', to: null, title: 'Prolibu', role: { es: 'Desarrollador front-end', en: 'Front-end developer' }, what: { es: 'Centro de reportes con IA: el asistente arma tableros a partir de una frase. Editor de dashboards y documentos en Vue.', en: 'AI reporting center: the assistant builds dashboards from one sentence. Dashboard and document editors in Vue.' } },
  { track: 'work', from: '2023-11', to: '2025-03', title: 'Solucionsoft', role: { es: 'Desarrollador front-end', en: 'Front-end developer' }, what: { es: 'Desarrollo front-end de aplicaciones web para clientes en Bogotá.', en: 'Front-end development of web apps for clients in Bogotá.' } },
  { track: 'work', from: '2022-11', to: '2023-04', title: 'Makaia', role: { es: 'Desarrollador web front-end trainee', en: 'Front-end web developer trainee' }, what: { es: 'Mi primer trabajo en software: aplicaciones web con React, Bootstrap y Tailwind.', en: 'My first software job: web apps with React, Bootstrap and Tailwind.' } },
  { track: 'product', from: '2026-01', to: null, title: 'Caelum', role: { es: 'Front-end, software para restaurantes', en: 'Front-end, restaurant software' }, what: { es: 'Mesas, cocina, domicilios y caja en un solo lugar. Ya lo usan 5 restaurantes.', en: 'Tables, kitchen, delivery and till in one place. Used by 5 restaurants.' } },
  { track: 'product', from: '2026-10', to: null, title: 'Despachao y Yavi', role: { es: 'Productos propios', en: 'My own products' }, what: { es: 'Despachos y recaudo para distribuidoras, y mantenimientos y vencimientos de flotas.', en: 'Dispatch and cash collection for distributors, and fleet maintenance and renewals.' } },
  { track: 'study', from: '2025-08', to: null, title: 'UNAD', role: { es: 'Ingeniería de sistemas', en: 'Systems engineering degree' }, what: { es: 'Carrera a distancia, mientras trabajo.', en: 'Distance degree, alongside work.' } },
  { track: 'study', from: '2023-09', to: '2024-02', title: 'Google · Coursera', role: { es: 'Certificado de ciberseguridad', en: 'Cybersecurity certificate' }, what: { es: 'Seguridad informática y de sistemas.', en: 'IT and systems security.' } },
  { track: 'study', from: '2022-11', to: '2022-12', title: 'Correlation One', role: { es: 'Fundamentos de analítica de datos', en: 'Data analytics fundamentals' }, what: { es: 'Data Science for All: análisis de datos con Python.', en: 'Data Science for All: data analysis with Python.' } },
  { track: 'study', from: '2021-05', to: '2021-12', title: 'Universidad Nacional', role: { es: 'Programación de aplicaciones web', en: 'Web application development' }, what: { es: 'Programa de 800 horas con MinTIC: donde empecé a programar.', en: 'An 800-hour MinTIC program: where I started coding.' } },
];

/** Months since timelineStart; 'YYYY-MM' → integer. */
export function monthIndex(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  const [y0, m0] = timelineStart.split('-').map(Number);
  return (y - y0) * 12 + (m - m0);
}
