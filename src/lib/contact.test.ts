import { describe, expect, it } from 'vitest';
import { buildBody, buildSubject, parseContact } from './contact';

const base = { motive: 'business', kind: 'restaurant', name: ' Ana  Pérez ', email: 'ana@labrasa.co', company: 'La Brasa', message: 'Tenemos dos sedes y anotamos todo en papel.', lang: 'es' };

describe('parseContact', () => {
  it('accepts a complete message and tidies names', () => {
    const r = parseContact(base);
    expect(r.ok && r.value.name).toBe('Ana Pérez');
  });
  it('drops the business kind for other motives', () => {
    const r = parseContact({ ...base, motive: 'job' });
    expect(r.ok && r.value.kind).toBe(null);
  });
  it('rejects bad emails, short messages and unknown motives', () => {
    expect(parseContact({ ...base, email: 'ana@' }).ok).toBe(false);
    expect(parseContact({ ...base, message: 'hola' }).ok).toBe(false);
    expect(parseContact({ ...base, motive: 'spam' }).ok).toBe(false);
  });
  it('flags the honeypot and too-fast submissions as spam', () => {
    expect(parseContact({ ...base, website: 'x' })).toEqual({ ok: false, reason: 'spam' });
    expect(parseContact({ ...base, started: '1000' }, 2000)).toEqual({ ok: false, reason: 'spam' });
    expect(parseContact({ ...base, started: '1000' }, 9000).ok).toBe(true);
  });
  it('keeps line breaks out of the subject', () => {
    const r = parseContact({ ...base, name: 'Ana\r\nBcc: x@y.z' });
    expect(r.ok && buildSubject(r.value)).toBe('[Portafolio] Negocio · Restaurante · Ana Bcc: x@y.z (La Brasa)');
  });
  it('builds a readable body', () => {
    const r = parseContact(base);
    expect(r.ok && buildBody(r.value)).toContain('Motivo: Negocio · Restaurante\nNombre: Ana Pérez\nCorreo: ana@labrasa.co\nEmpresa: La Brasa');
  });
});
