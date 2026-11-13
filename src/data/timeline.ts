import type { Lang } from '../i18n/ui';

export type Track = 'work' | 'product' | 'study';
/** Months as 'YYYY-MM'; end null means ongoing. */
export type Entry = { track: Track; from: string; to: string | null; title: string; role: Record<Lang, string>; what: Record<Lang, string> };

// Source: the LinkedIn profile (work and study) and each repo's first commit (products).
export const timelineStart = '2021-05';
export const entries: Entry[] = [
  { track: 'work', from: '2025-03', to: null, title: 'Prolibu', role: { es: 'Desarrollador front-end', en: 'Front-end developer' }, what: { es: 'CRM y plataforma comercial. Hice el centro de reportes con IA, donde el asistente arma tableros a partir de una frase con herramientas MCP en el back; el editor de dashboards; el editor de documentos con impresión a PDF fiel a la pantalla; y campos y formularios del motor de formularios. En el back (Node): herramientas para agentes de IA, notificaciones, correcciones en microservicios y un piloto con Salesforce Agentforce.', en: 'CRM and sales platform. I built the AI reporting center, where the assistant builds dashboards from one sentence through MCP tools on the back end; the dashboard editor; the document editor with screen-faithful PDF printing; and fields and forms in the form engine. On the back end (Node): tools for AI agents, notifications, microservice fixes and a Salesforce Agentforce pilot.' } },
  { track: 'work', from: '2023-11', to: '2025-03', title: 'Solucionsoft', role: { es: 'Desarrollador front-end', en: 'Front-end developer' }, what: { es: 'Apps en React Native y web en React: la app de una emisora para escucharla en vivo, y una plataforma de despachos a la medida de una empresa, donde la oficina asigna los pedidos y sigue cada entrega hasta el cliente. Después la convertí en la base de un producto que cualquier empresa con reparto pudiera contratar.', en: 'Mobile apps in React Native and web apps in React. I built a radio station app to listen live from the phone, and a dispatch platform made for one company: the office assigns orders and follows each delivery to the customer. Then I turned that custom solution into the base of a product any company with deliveries could subscribe to.' } },
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
