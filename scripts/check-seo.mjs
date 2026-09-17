import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Run after vite build. Checks the actual production artifact, not the dev server.
const root = resolve('dist');
const origin = 'https://www.colegiopassos.com.br';
const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert(urls.length > 0, 'Sitemap vazio');
assert.equal(new Set(urls).size, urls.length, 'URLs repetidas no sitemap');
for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin, `Domínio inconsistente: ${url}`);
  assert(!parsed.search && !parsed.hash, `Sitemap não deve conter parâmetros/fragmentos: ${url}`);
  const file = resolve(root, '.' + parsed.pathname + (parsed.pathname.endsWith('/') ? 'index.html' : ''));
  assert(existsSync(file), `Página ausente: ${url}`);
  const html = readFileSync(file, 'utf8');
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
  const canonicals = [...head.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
  assert.equal(canonicals.length, 1, `Canonical ausente/duplicada: ${url}`);
  assert.equal(canonicals[0][0].match(/\bhref=["']([^"']+)["']/i)?.[1], url, `Canonical diferente do sitemap: ${url}`);
  assert(!/https:\/\/colegiopassos\.com\.br/.test(html), `Referência ao domínio que redireciona: ${url}`);
  assert(!/<meta[^>]*content=["'][^"']*noindex/i.test(head), `Noindex: ${url}`);
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) JSON.parse(match[1]);
  console.log(`OK ${parsed.pathname}`);
}
assert(readFileSync(resolve(root, 'robots.txt'), 'utf8').includes(`Sitemap: ${origin}/sitemap.xml`), 'Sitemap inconsistente em robots.txt');
console.log(`${urls.length} páginas verificadas. HTTP e seleção canônica do Google exigem validação após publicação.`);
