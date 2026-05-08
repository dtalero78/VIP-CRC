import type { APIRoute } from 'astro';

export const prerender = false;

const visitedIPs = new Map<string, number>();
const COOLDOWN_MS = 60 * 60 * 1000; // 1 hora por IP

export const POST: APIRoute = async ({ request }) => {
  const WHAPI_TOKEN = import.meta.env.WHAPI_TOKEN;
  if (!WHAPI_TOKEN) return new Response(JSON.stringify({ ok: true }), { status: 200 });

  const userAgent = request.headers.get('user-agent') || '';
  if (/bot|crawl|spider|slurp|google|bing|yandex/i.test(userAgent)) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';

  const now = Date.now();
  const lastVisit = visitedIPs.get(ip);
  if (lastVisit && now - lastVisit < COOLDOWN_MS) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }
  visitedIPs.set(ip, now);

  const { page = '/', referrer = '' } = await request.json().catch(() => ({}));
  const fecha = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  const NOTIFY_NUMBER = '573102210461@s.whatsapp.net';

  const msg =
    `🟢 *Nueva visita a examenesparapase.com*\n\n` +
    `📄 Página: ${page}\n` +
    `🔗 Referido: ${referrer || 'directo'}\n` +
    `🕐 ${fecha}`;

  fetch('https://gate.whapi.cloud/messages/text', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${WHAPI_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ typing_time: 0, to: NOTIFY_NUMBER, body: msg }),
  }).catch((err) => console.error('WhatsApp notify error:', err.message));

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
