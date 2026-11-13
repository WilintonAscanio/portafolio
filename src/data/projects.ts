import type { Lang } from '../i18n/ui';

type Text = Record<Lang, string>;

export type Project = {
  id: 'caelum' | 'yavi' | 'despachao' | 'prolibu' | 'calculators' | 'trading';
  name: Text;
  logo?: 'caelum' | 'yavi' | 'despachao';
  role: Text;
  status: Text;
  statusTone: 'yellow' | 'blue' | 'neutral';
  headline: Text;
  problem: Text;
  does: Record<Lang, string[]>;
  myPart: Text;
  decisions: Record<Lang, [string, string][]>;
  stack: string[];
  /** Smaller side projects: listed under the main cards, without a cover. */
  minor?: boolean;
  link?: { href: string; label: Text };
};

export const projects: Project[] = [
  {
    id: 'caelum',
    name: { es: 'Caelum', en: 'Caelum' },
    logo: 'caelum',
    role: { es: 'Front-end', en: 'Front end' },
    status: { es: '5 restaurantes', en: '5 restaurants' },
    statusTone: 'blue',
    headline: { es: 'Mesas, cocina y caja de un restaurante en una pantalla', en: 'A restaurant’s tables, kitchen and till on one screen' },
    problem: {
      es: 'Un restaurante maneja mesas, cocina, domicilios y caja en sistemas distintos o en papel, y lo que pasa en la cocina no llega a tiempo a la mesa.',
      en: 'A restaurant runs tables, kitchen, delivery and till on separate systems or on paper, and what happens in the kitchen does not reach the table in time.',
    },
    does: {
      es: ['Mapa de mesas con lo que debe cada una', 'Cocina y barra ven los pedidos en vivo', 'Carta en línea con la marca de cada restaurante'],
      en: ['Table map with what each table owes', 'Kitchen and bar see orders live', 'Online menu in each restaurant’s brand'],
    },
    myPart: { es: 'Hago el front con Vue 3 y su sistema de diseño. El back lo hace mi socio.', en: 'I build the Vue 3 front end and its design system. My partner builds the back end.' },
    decisions: {
      es: [
        ['Un sistema de diseño propio', 'Tokens claros y oscuros, y la compilación falla si un color no llega al contraste mínimo.'],
        ['El color del restaurante, donde lo ve su cliente', 'Manda en la carta, el seguimiento y los recibos; nunca en los estados del pedido.'],
      ],
      en: [
        ['Our own design system', 'Light and dark tokens, and the build fails if a colour misses minimum contrast.'],
        ['The restaurant’s colour where its guests see it', 'It leads on the menu, tracking and receipts, never on order states.'],
      ],
    },
    stack: ['Vue 3', 'PrimeVue', 'Laravel', 'MySQL', 'WebSockets'],
  },
  {
    id: 'yavi',
    name: { es: 'Yavi', en: 'Yavi' },
    logo: 'yavi',
    role: { es: 'Producto propio', en: 'My product' },
    status: { es: 'En construcción', en: 'In progress' },
    statusTone: 'yellow',
    headline: { es: 'Ningún vehículo con el SOAT vencido', en: 'No vehicle with expired insurance' },
    problem: {
      es: 'Las pymes con flota llevan SOAT, tecnomecánica y mantenimientos en Excel, y se enteran cuando ya vencieron.',
      en: 'Small companies with fleets track insurance, inspections and maintenance in spreadsheets, and find out once they have expired.',
    },
    does: {
      es: ['Vencimientos de cada vehículo y equipo', 'Kilometraje y costos por activo', 'Código QR en cada equipo'],
      en: ['Due dates for every vehicle and machine', 'Mileage and costs per asset', 'A QR code on every machine'],
    },
    myPart: { es: 'El producto completo: idea, diseño, web, API y base de datos.', en: 'The whole product: idea, design, web, API and database.' },
    decisions: {
      es: [
        ['Cada empresa con su color', 'Lo elige de un catálogo que garantiza contraste; Yavi queda solo como firma.'],
        ['Web instalable para el técnico', 'La app nativa llega solo si las empresas necesitan trabajar sin internet.'],
      ],
      en: [
        ['Each company in its own colour', 'Picked from a catalogue that guarantees contrast; Yavi stays as a signature.'],
        ['An installable web app for technicians', 'A native app only if companies need to work offline.'],
      ],
    },
    stack: ['Next.js', 'NestJS', 'Postgres', 'Playwright'],
  },
  {
    id: 'despachao',
    name: { es: 'Despachao', en: 'Despachao' },
    logo: 'despachao',
    role: { es: 'Producto propio', en: 'My product' },
    status: { es: 'En construcción', en: 'In progress' },
    statusTone: 'yellow',
    headline: { es: 'Del pedido a la entrega, sin WhatsApp ni papel', en: 'From order to delivery, without WhatsApp or paper' },
    problem: {
      es: 'En una distribuidora el pedido pasa por quien lo toma, quien lo alista, quien lo lleva y quien cobra, casi siempre por WhatsApp y papel.',
      en: 'At a distributor an order passes through whoever takes it, picks it, delivers it and collects payment, mostly over WhatsApp and paper.',
    },
    does: {
      es: ['Alistamiento marcado por la bodega', 'App del conductor que funciona sin señal', 'Evidencia y recaudo en cada entrega'],
      en: ['Picking marked by the warehouse', 'A driver app that works without signal', 'Proof and payment on every delivery'],
    },
    myPart: { es: 'El producto completo: web, API, app del conductor y base de datos.', en: 'The whole product: web, API, driver app and database.' },
    decisions: {
      es: [
        ['Cada empresa aislada en la base de datos', 'Seguridad por fila en Postgres: una consulta no puede ver datos de otra distribuidora aunque el código se equivoque.'],
        ['El conductor trabaja sin señal', 'La app guarda cada entrega en el teléfono y la envía cuando vuelve internet, sin duplicarla.'],
        ['Un monorepo para web, API y celular', 'Un cambio de regla de negocio llega a las tres apps en un solo commit.'],
      ],
      en: [
        ['Each company isolated in the database', 'Postgres row-level security: a query cannot see another distributor’s data even if the code is wrong.'],
        ['Drivers work without signal', 'The app stores each delivery on the phone and sends it once the connection is back, without duplicates.'],
        ['One monorepo for web, API and phone', 'A business-rule change reaches all three apps in one commit.'],
      ],
    },
    stack: ['Next.js', 'NestJS', 'Expo', 'Postgres + PostGIS', 'Redis'],
  },
  {
    id: 'prolibu',
    name: { es: 'Reportes con IA', en: 'AI reporting' },
    role: { es: 'en Prolibu', en: 'at Prolibu' },
    status: { es: 'Trabajo actual', en: 'Current job' },
    statusTone: 'blue',
    headline: { es: 'Tableros que se arman conversando', en: 'Dashboards you build by asking' },
    problem: { es: 'Armar un tablero en un CRM toma muchos clics y conocer bien los datos.', en: 'Building a CRM dashboard takes many clicks and a good knowledge of the data.' },
    does: {
      es: ['La IA hace todo lo que hace la interfaz', 'Columnas calculadas como ranking y porcentaje', 'Impresión fiel a la pantalla'],
      en: ['The AI can do everything the interface does', 'Calculated columns such as rank and share', 'Printing that matches the screen'],
    },
    myPart: { es: 'El front del centro de reportes y las herramientas que usa la IA en el back.', en: 'The reporting front end and the tools the AI uses on the back end.' },
    decisions: {
      es: [['Paridad entre la IA y la interfaz', 'Nada que la IA haga queda fuera del alcance de la persona, y al revés.']],
      en: [['Parity between the AI and the interface', 'Nothing the AI does is out of the person’s reach, and the other way round.']],
    },
    stack: ['Vue', 'Node', 'MCP'],
  },
  {
    id: 'calculators',
    minor: true,
    name: { es: 'Calculadoras Colombia', en: 'Colombia calculators' },
    role: { es: 'Sitio propio', en: 'My site' },
    status: { es: 'Publicado', en: 'Live' },
    statusTone: 'neutral',
    headline: { es: 'Cuentas laborales y tributarias sin fórmulas', en: 'Payroll and tax maths without formulas' },
    problem: {
      es: 'Calcular prima, liquidación o retención obliga a buscar fórmulas, topes y tablas que cambian cada año.',
      en: 'Working out bonuses, severance or withholding means hunting for formulas, caps and tables that change every year.',
    },
    does: {
      es: ['Prima, liquidación y retención', 'Todo se calcula en el navegador', 'Las normas citadas como notas'],
      en: ['Bonus, severance and withholding', 'Everything runs in the browser', 'Regulations cited as notes'],
    },
    myPart: { es: 'Todo: diseño, cálculos y pruebas.', en: 'Everything: design, calculations and tests.' },
    decisions: { es: [], en: [] },
    stack: ['Astro', 'Vitest'],
    link: { href: 'https://cuantomedeben.com.co', label: { es: 'Abrir calculadoras', en: 'Open calculators' } },
  },
  {
    id: 'trading',
    minor: true,
    name: { es: 'trading-lab', en: 'trading-lab' },
    role: { es: 'Aprendizaje', en: 'Learning' },
    status: { es: 'Aprendizaje', en: 'Learning' },
    statusTone: 'neutral',
    headline: { es: 'Probar estrategias antes de arriesgar', en: 'Testing strategies before risking money' },
    problem: {
      es: 'Quería entender si una estrategia sencilla le gana a comprar y mantener, con comisiones reales.',
      en: 'I wanted to know whether a simple strategy beats buy-and-hold once real fees are included.',
    },
    does: {
      es: ['Descarga velas diarias', 'Backtest con comisión y deslizamiento', 'Gráfica de capital y caídas'],
      en: ['Downloads daily candles', 'Backtests with fees and slippage', 'Charts equity and drawdown'],
    },
    myPart: { es: 'Proyecto personal de aprendizaje. Solo simulación.', en: 'A personal learning project. Simulation only.' },
    decisions: { es: [], en: [] },
    // The repository is private, so there is no link.
    stack: ['Python'],
  },
];
