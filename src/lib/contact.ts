/** Contact form: validation and the email it produces. Shared by the Worker and the tests. */
export const motives = ['job', 'business', 'other'] as const;
export const businessKinds = ['restaurant', 'distributor', 'fleet', 'other'] as const;
export type Motive = (typeof motives)[number];
export type BusinessKind = (typeof businessKinds)[number];

export type ContactMessage = {
  motive: Motive;
  kind: BusinessKind | null;
  name: string;
  email: string;
  company: string;
  message: string;
  lang: 'es' | 'en';
};

export type ParseResult = { ok: true; value: ContactMessage } | { ok: false; reason: 'invalid' | 'spam' };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// One line, no control characters: these values end up in the subject.
const oneLine = (value: string) => value.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim();

/** Bots fill the hidden field or submit faster than a person can type. */
const MIN_FILL_MS = 3000;

export function parseContact(fields: Record<string, string>, now = Date.now()): ParseResult {
  if (fields.website) return { ok: false, reason: 'spam' };
  const started = Number(fields.started);
  if (fields.started && Number.isFinite(started) && now - started < MIN_FILL_MS) return { ok: false, reason: 'spam' };

  const motive = fields.motive as Motive;
  const name = oneLine(fields.name ?? '');
  const email = oneLine(fields.email ?? '');
  const company = oneLine(fields.company ?? '');
  const message = (fields.message ?? '').replace(/\r\n/g, '\n').trim();
  const kind = motive === 'business' && businessKinds.includes(fields.kind as BusinessKind) ? (fields.kind as BusinessKind) : null;

  const valid =
    motives.includes(motive) &&
    name.length >= 2 && name.length <= 80 &&
    email.length <= 200 && EMAIL.test(email) &&
    company.length <= 120 &&
    message.length >= 10 && message.length <= 4000;
  if (!valid) return { ok: false, reason: 'invalid' };
  return { ok: true, value: { motive, kind, name, email, company, message, lang: fields.lang === 'en' ? 'en' : 'es' } };
}

// The inbox is read in Spanish, whatever language the visitor used.
const motiveLabel: Record<Motive, string> = { job: 'Empleo', business: 'Negocio', other: 'Otro' };
const kindLabel: Record<BusinessKind, string> = { restaurant: 'Restaurante', distributor: 'Distribuidora', fleet: 'Flota', other: 'Otro negocio' };

export function describeMotive(m: ContactMessage) {
  return m.kind ? `${motiveLabel[m.motive]} · ${kindLabel[m.kind]}` : motiveLabel[m.motive];
}

/** e.g. "[Portafolio] Negocio · Restaurante · Ana Pérez (La Brasa)" — easy to filter in Gmail. */
export function buildSubject(m: ContactMessage) {
  return `[Portafolio] ${describeMotive(m)} · ${m.name}${m.company ? ` (${m.company})` : ''}`;
}

export function buildBody(m: ContactMessage) {
  return [
    `Motivo: ${describeMotive(m)}`,
    `Nombre: ${m.name}`,
    `Correo: ${m.email}`,
    !!m.company && `Empresa: ${m.company}`,
    `Página: ${m.lang === 'en' ? 'inglés' : 'español'}`,
    '',
    m.message,
    '',
    '— Enviado desde el formulario de wilintonascanio.com. Responde a este correo para escribirle directo.',
  ].filter((line) => line !== false).join('\n');
}
