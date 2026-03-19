// Cloudflare Pages Function: /api/rss?url=<encoded_feed_url>
// Proxies RSS to avoid browser CORS issues on static deployments.

const ALLOWED = new Set([
  'https://www.hinduismtoday.com/feed/',
  'https://www.indica.today/feed/',
  'https://www.speakingtree.in/rss',
  'https://www.templepurohit.com/feed/',
  'https://isha.sadhguru.org/in/en/wisdom/rss.xml',
  'https://belurmath.org/feed/',
  'https://www.sringeri.net/feed/',
  'https://aanmeegam.in/feed/',
  'https://tamilandvedas.com/feed/',
  'https://www.tamilbrahmins.com/forums/-/index.rss',
  'https://english.mathrubhumi.com/rss/astrology.xml'
]);

export async function onRequestGet({ request }) {
  const reqUrl = new URL(request.url);
  const target = reqUrl.searchParams.get('url');

  if (!target || !ALLOWED.has(target)) {
    return new Response(JSON.stringify({ error: 'Invalid or non-whitelisted RSS url' }), {
      status: 400,
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        'access-control-allow-origin': '*'
      }
    });
  }

  try {
    const upstream = await fetch(target, {
      headers: {
        'user-agent': 'PanchangamCloudflarePages/1.0'
      }
    });

    if (!upstream.ok) {
      return new Response(JSON.stringify({ error: `Upstream returned ${upstream.status}` }), {
        status: 502,
        headers: {
          'content-type': 'application/json; charset=UTF-8',
          'access-control-allow-origin': '*'
        }
      });
    }

    const xml = await upstream.text();
    return new Response(xml, {
      status: 200,
      headers: {
        'content-type': 'application/xml; charset=UTF-8',
        'cache-control': 'public, max-age=900',
        'access-control-allow-origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        'access-control-allow-origin': '*'
      }
    });
  }
}
