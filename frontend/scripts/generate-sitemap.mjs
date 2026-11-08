#!/usr/bin/env node
/**
 * Генерация sitemap.xml на основе реального времени изменения файлов/статей.
 *
 * Запускается:
 *   - Вручную: `node scripts/generate-sitemap.mjs`
 *   - Автоматически в postbuild (до или после prerender)
 *
 * Что делает:
 *   1. Для каждой основной страницы (/about, /skills и т.д.) находит
 *      дату последнего коммита соответствующего JSX-файла через git log.
 *   2. Для каждой статьи (/publications/:slug) берёт дату из статьи
 *      или дату коммита/изменения.
 *   3. Записывает sitemap.xml в public/sitemap.xml (и в build/sitemap.xml, если build/ существует).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { articleSlugs } from './routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BUILD_DIR = path.join(ROOT, 'build');
const BASE_URL = 'https://alex-gsm.at';

let hasGit = false;
try {
  execSync('git rev-parse --is-inside-work-tree', {
    cwd: ROOT,
    stdio: 'ignore',
  });
  hasGit = true;
} catch {
  hasGit = false;
}

function getGitLastmod(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) return null;

  if (hasGit) {
    try {
      const out = execSync(`git log -1 --format=%cI -- "${fullPath}"`, {
        cwd: ROOT,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim();
      if (out) return out.split('T')[0];
    } catch {
      /* fallback to file mtime */
    }
  }

  try {
    const stat = fs.statSync(fullPath);
    return stat.mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

// Загружаем данные статей
const articlesFile = path.join(ROOT, 'src', 'data', 'articles.js');
let articles = [];
try {
  const content = fs.readFileSync(articlesFile, 'utf8');
  const jsonMatch = content.match(/export const articles = (\[[\s\S]*?\]);/);
  if (jsonMatch) {
    articles = JSON.parse(jsonMatch[1]);
  }
} catch (e) {
  console.warn('Could not parse articles.js:', e.message);
}

const articleDateMap = new Map();
articles.forEach((a) => {
  // a.date format: "11.07.2026" -> "2026-07-11"
  let isoDate = null;
  if (a.date && /^\d{2}\.\d{2}\.\d{4}$/.test(a.date)) {
    const [day, month, year] = a.date.split('.');
    isoDate = `${year}-${month}-${day}`;
  }
  articleDateMap.set(a.id, isoDate);
});

// Маппинг страниц на исходные файлы для получения точной даты изменения
const staticPages = [
  {
    path: '/',
    file: 'src/pages/Home.jsx',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/about',
    file: 'src/pages/About.jsx',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/education',
    file: 'src/pages/Education.jsx',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/experience',
    file: 'src/pages/Experience.jsx',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/skills',
    file: 'src/pages/Skills.jsx',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/publications',
    file: 'src/pages/Publications.jsx',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/trends',
    file: 'src/pages/Trends.jsx',
    priority: '0.7',
    changefreq: 'daily',
  },
  {
    path: '/contact',
    file: 'src/pages/Contact.jsx',
    priority: '0.9',
    changefreq: 'monthly',
  },
];

const today = new Date().toISOString().split('T')[0];

const urls = [];

// Добавляем статические страницы
for (const p of staticPages) {
  const lastmod = getGitLastmod(p.file) || today;
  urls.push({
    loc: `${BASE_URL}${p.path === '/' ? '/' : p.path}`,
    lastmod,
    changefreq: p.changefreq,
    priority: p.priority,
    hasAlternates: true,
  });
}

// Добавляем страницы статей
const articlesLastmod = getGitLastmod('src/data/articles.js') || today;

for (const slug of articleSlugs) {
  const articleDate = articleDateMap.get(slug) || articlesLastmod;
  urls.push({
    loc: `${BASE_URL}/publications/${slug}`,
    lastmod: articleDate,
    changefreq: 'monthly',
    priority: '0.8',
    hasAlternates: false,
  });
}

// Формируем XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

for (const u of urls) {
  xml += `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
`;
  if (u.hasAlternates) {
    xml += `    <xhtml:link rel="alternate" hreflang="de" href="${u.loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${u.loc}" />
`;
  }
  xml += `  </url>\n\n`;
}

xml = xml.trimEnd() + '\n</urlset>\n';

// Записываем в public/sitemap.xml
const publicSitemap = path.join(PUBLIC_DIR, 'sitemap.xml');
fs.writeFileSync(publicSitemap, xml, 'utf8');
console.log(`✓ sitemap.xml обновлён в public/sitemap.xml (${urls.length} URLs)`);

// Если существует build/, записываем и туда
if (fs.existsSync(BUILD_DIR)) {
  const buildSitemap = path.join(BUILD_DIR, 'sitemap.xml');
  fs.writeFileSync(buildSitemap, xml, 'utf8');
  console.log(`✓ sitemap.xml обновлён в build/sitemap.xml`);
}
