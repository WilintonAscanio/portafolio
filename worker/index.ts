import { buildBody, buildSubject, parseContact } from '../src/lib/contact';

// Minimal shapes of the Cloudflare bindings this Worker uses.
type Env = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CONTACT_LIMIT?: { limit: (options: { key: string }) => Promise<{ success: boolean }> };
  RESEND_API_KEY?: string;
};

const INBOX = 'contacto@wilintonascanio.com';
const SENDER = 'Portafolio <formulario@wilintonascanio.com>';

const json = (body: unknown, status = 200) => Response.json(body, { status });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== '/api/contact') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return json({ error: 'method' }, 405);

    // Only pages of this same site may post (bare domain and www each match themselves).
    const origin = request.headers.get('Origin');
    let sameSite = false;
    try {
      sameSite = !!origin && new URL(origin).host === url.host;
    } catch {}
    if (!sameSite) return json({ error: 'origin' }, 403);

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (env.CONTACT_LIMIT && !(await env.CONTACT_LIMIT.limit({ key: ip })).success) return json({ error: 'rate' }, 429);

    let fields: Record<string, string>;
    try {
      const form = await request.formData();
      fields = Object.fromEntries([...form.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : '']));
    } catch {
      return json({ error: 'invalid' }, 400);
    }

    const parsed = parseContact(fields);
    // Spam gets a normal-looking answer so bots learn nothing.
    if (!parsed.ok) return parsed.reason === 'spam' ? json({ ok: true }) : json({ error: 'invalid' }, 400);

    if (!env.RESEND_API_KEY) {
      console.error('contact: RESEND_API_KEY is not set');
      return json({ error: 'send' }, 500);
    }
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: SENDER,
        to: [INBOX],
        reply_to: parsed.value.email,
        subject: buildSubject(parsed.value),
        text: buildBody(parsed.value),
      }),
    });
    if (!sent.ok) {
      console.error('contact: resend failed', sent.status, await sent.text());
      return json({ error: 'send' }, 502);
    }
    return json({ ok: true });
  },
};
