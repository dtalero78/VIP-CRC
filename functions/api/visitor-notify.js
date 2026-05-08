export async function onRequestPost(context) {
  const { request, env } = context;

  const WHAPI_TOKEN = env.WHAPI_TOKEN;
  if (!WHAPI_TOKEN) return new Response(JSON.stringify({ ok: true }), { status: 200 });

  const userAgent = request.headers.get('user-agent') || '';
  if (/bot|crawl|spider|slurp|google|bing|yandex/i.test(userAgent)) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const { page = '/', referrer = '' } = await request.json().catch(() => ({}));
  const fecha = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  const msg =
    `🟢 *Nueva visita a examenesparapase.com*\n\n` +
    `📄 Página: ${page}\n` +
    `🔗 Referido: ${referrer || 'directo'}\n` +
    `🕐 ${fecha}`;

  await fetch('https://gate.whapi.cloud/messages/text', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${WHAPI_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ typing_time: 0, to: '573102210461@s.whatsapp.net', body: msg }),
  }).catch((err) => console.error('WhatsApp notify error:', err.message));

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
