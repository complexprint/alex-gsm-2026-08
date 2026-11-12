#!/usr/bin/env node
/**
 * Генерация sitemap.xml для двуязычного сайта (DE & EN) alex-gsm.at.
 *
 * Создает полные кластеры hreflang (de, en, x-default) для каждой страницы
 * по официальным стандартам Google Search Central.
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
  let isoDate = null;
  if (a.date && /^\d{2}\.\d{2}\.\d{4}$/.test(a.date)) {
    const [day, month, year] = a.date.split('.');
    isoDate = `${year}-${month}-${day}`;
  }
  articleDateMap.set(a.id, isoDate);
});

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

// Добавляем статические страницы (немецкие и английские URL с перекрестными hreflang)
for (const p of staticPages) {
  const lastmod = getGitLastmod(p.file) || today;
  const deLoc = `${BASE_URL}${p.path === '/' ? '/' : p.path}`;
  const enLoc = `${BASE_URL}/en${p.path === '/' ? '' : p.path}`;

  const alternates = [
    { lang: 'de', href: deLoc },
    { lang: 'en', href: enLoc },
    { lang: 'x-default', href: deLoc },
  ];

  // DE URL
  urls.push({
    loc: deLoc,
    lastmod,
    changefreq: p.changefreq,
    priority: p.priority,
    alternates,
  });

  // EN URL
  urls.push({
    loc: enLoc,
    lastmod,
    changefreq: p.changefreq,
    priority: p.priority,
    alternates,
  });
}

// Добавляем статьи (немецкие и английские URL)
const articlesLastmod = getGitLastmod('src/data/articles.js') || today;

for (const slug of articleSlugs) {
  const articleDate = articleDateMap.get(slug) || articlesLastmod;
  const deLoc = `${BASE_URL}/publications/${slug}`;
  const enLoc = `${BASE_URL}/en/publications/${slug}`;

  const alternates = [
    { lang: 'de', href: deLoc },
    { lang: 'en', href: enLoc },
    { lang: 'x-default', href: deLoc },
  ];

  // DE URL
  urls.push({
    loc: deLoc,
    lastmod: articleDate,
    changefreq: 'monthly',
    priority: '0.8',
    alternates,
  });

  // EN URL
  urls.push({
    loc: enLoc,
    lastmod: articleDate,
    changefreq: 'monthly',
    priority: '0.8',
    alternates,
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
  if (u.alternates) {
    for (const alt of u.alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />\n`;
    }
  }
  xml += `  </url>\n\n`;
}

xml = xml.trimEnd() + '\n</urlset>\n';

// Записываем в public/sitemap.xml
const publicSitemap = path.join(PUBLIC_DIR, 'sitemap.xml');
fs.writeFileSync(publicSitemap, xml, 'utf8');
console.log(`✓ sitemap.xml обновлён в public/sitemap.xml (${urls.length} URLs, двуязычный)`);

// Если существует build/, записываем и туда
if (fs.existsSync(BUILD_DIR)) {
  const buildSitemap = path.join(BUILD_DIR, 'sitemap.xml');
  fs.writeFileSync(buildSitemap, xml, 'utf8');
  console.log(`✓ sitemap.xml обновлён в build/sitemap.xml`);
}
