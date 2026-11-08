#!/usr/bin/env node
/**
 * Пререндер SPA в статический HTML для SEO (alex-gsm.at).
 *
 * Запускается автоматически после `npm run build` (см. `postbuild` в package.json)
 * или вручную через `npm run prerender`.
 *
 * Что делает:
 *   1. Поднимает локальный HTTP-сервер на build/ со SPA-фолбэком (все неизвестные пути → index.html).
 *   2. Через Puppeteer открывает каждую страницу из списка ROUTES,
 *      ждёт полной отрисовки React (включая framer-motion, LazyLoad, IntersectionObserver, useSEO/Helmet).
 *   3. Скроллит страницу до конца, чтобы триггернуть все анимации и IntersectionObserver'ы.
 *   4. Сохраняет получившийся HTML как build/<route>/index.html.
 *
 * Результат: каждый маршрут отдаётся поисковикам (Google, Yandex и др.) как готовый HTML
 * с уникальным <title>, <meta description>, Open Graph, JSON-LD и полным текстом.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { ROUTES as ROUTES_CONFIG } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PORT = 45678;
const HOST = "127.0.0.1";

const ROUTES = ROUTES_CONFIG.filter((r) => !r.noPrerender).map((r) => r.path);

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function dedupSeoTags(html) {
  const rules = [
    { re: /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*>/gi, key: () => "description" },
    { re: /<meta\b[^>]*\bname\s*=\s*["']keywords["'][^>]*>/gi, key: () => "keywords" },
    { re: /<meta\b[^>]*\bname\s*=\s*["']robots["'][^>]*>/gi, key: () => "robots" },
    { re: /<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/gi, key: () => "canonical" },
    {
      re: /<meta\b[^>]*\bproperty\s*=\s*["']og:[^"']+["'][^>]*>/gi,
      key: (m) => {
        const p = m.match(/property\s*=\s*["']([^"']+)["']/i);
        return "og:" + (p ? p[1] : "");
      },
    },
    {
      re: /<meta\b[^>]*\bname\s*=\s*["']twitter:[^"']+["'][^>]*>/gi,
      key: (m) => {
        const n = m.match(/name\s*=\s*["']([^"']+)["']/i);
        return "tw:" + (n ? n[1] : "");
      },
    },
    {
      re: /<meta\b[^>]*http-equiv\s*=\s*["']content-language["'][^>]*>/gi,
      key: () => "content-language",
    },
    {
      re: /<link\b[^>]*\brel\s*=\s*["']alternate["'][^>]*\bhreflang\s*=\s*["'][^"']+["'][^>]*>/gi,
      key: (m) => {
        const h = m.match(/hreflang\s*=\s*["']([^"']+)["']/i);
        return "alt:" + (h ? h[1] : "");
      },
    },
  ];

  for (const rule of rules) {
    const matches = [];
    let m;
    rule.re.lastIndex = 0;
    while ((m = rule.re.exec(html)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, key: rule.key(m[0]) });
    }
    if (matches.length < 2) continue;
    const lastForKey = new Map();
    matches.forEach((mm, i) => lastForKey.set(mm.key, i));
    const toDelete = matches
      .map((mm, i) => (lastForKey.get(mm.key) !== i ? mm : null))
      .filter(Boolean)
      .sort((a, b) => b.start - a.start);
    for (const del of toDelete) {
      html = html.slice(0, del.start) + html.slice(del.end);
    }
  }
  return html;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "text/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

const ASSET_EXTS = new Set([
  ".js", ".mjs", ".css", ".map",
  ".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico",
  ".woff", ".woff2", ".ttf", ".otf",
  ".json", ".xml", ".txt",
]);

let INDEX_HTML_SNAPSHOT = null;

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      const ext = path.extname(urlPath).toLowerCase();
      if (ASSET_EXTS.has(ext)) {
        const filePath = path.join(BUILD_DIR, urlPath);
        if (!fs.existsSync(filePath)) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const mime = MIME[ext] || "application/octet-stream";
        try {
          res.writeHead(200, { "Content-Type": mime, "Cache-Control": "no-store" });
          res.end(fs.readFileSync(filePath));
        } catch (err) {
          res.writeHead(500);
          res.end(String(err));
        }
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(INDEX_HTML_SNAPSHOT);
    });
    server.listen(PORT, HOST, () => resolve(server));
    server.on("error", reject);
  });
}

async function prerenderRoute(browser, route, initialTitle) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent(
    "Mozilla/5.0 (compatible; AlexGsmPrerender/1.0; +https://alex-gsm.at)"
  );

  const url = `http://${HOST}:${PORT}${route}`;
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    // 1. Ждём, пока React смонтируется в #root
    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        return root && root.children.length > 0;
      },
      { timeout: 30000 }
    );

    // 1.1. Ждем появления контента или смены title
    await page
      .waitForFunction(
        (initTitle) => {
          const hasH1 = !!document.querySelector("h1");
          const titleChanged = document.title && document.title !== initTitle;
          return hasH1 || titleChanged;
        },
        { timeout: 15000 },
        initialTitle
      )
      .catch(() => {});

    // 2. Скроллим до низа, чтобы сработали все framer-motion анимации и IntersectionObserver
    await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const step = 400;
      let y = 0;
      const maxY = document.documentElement.scrollHeight;
      while (y < maxY) {
        window.scrollTo(0, y);
        y += step;
        await wait(50);
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await wait(250);
      window.scrollTo(0, 0);
      await wait(150);
    });

    try {
      await page.waitForNetworkIdle({ idleTime: 600, timeout: 10000 });
    } catch {}

    await new Promise((r) => setTimeout(r, 400));

    const finalTitle = await page.evaluate(() => document.title || "");

    let html = await page.evaluate(() => {
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });

    if (finalTitle) {
      const titleTag = `<title>${escapeHtml(finalTitle)}</title>`;
      const titleRe = /<title[^>]*>[\s\S]*?<\/title>/gi;
      html = html.replace(titleRe, "");
      html = html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}\n${titleTag}`);
    }

    html = dedupSeoTags(html);

    const outDir =
      route === "/" ? BUILD_DIR : path.join(BUILD_DIR, route.replace(/^\//, ""));
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, "index.html");
    fs.writeFileSync(outFile, html, "utf8");

    const rel = path.relative(BUILD_DIR, outFile);
    console.log(
      `  ✓ ${route.padEnd(35)} → build/${rel}  (${Math.round(html.length / 1024)} KB)`
    );
    if (errors.length) {
      console.log(`    ⚠ page errors: ${errors.length}`);
    }
  } catch (err) {
    console.error(`  ✗ ${route}  FAILED: ${err.message}`);
  } finally {
    await page.close();
  }
}

(async () => {
  const indexHtmlPath = path.join(BUILD_DIR, "index.html");
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`✗ Не найдено build/index.html. Сначала выполните: npm run build`);
    process.exit(1);
  }

  console.log(`\n🚀 Prerender: ${ROUTES.length} routes → build/\n`);

  INDEX_HTML_SNAPSHOT = fs.readFileSync(indexHtmlPath);

  const titleMatch = INDEX_HTML_SNAPSHOT.toString().match(/<title[^>]*>(.*?)<\/title>/i);
  const initialTitle = titleMatch ? titleMatch[1] : "";

  for (const route of ROUTES) {
    if (route === "/") continue;
    const dir = path.join(BUILD_DIR, route.replace(/^\//, ""));
    try {
      const stat = fs.statSync(dir);
      if (stat.isDirectory() && fs.existsSync(path.join(dir, "index.html"))) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    } catch {}
  }

  const server = await startServer();
  console.log(`   Local server: http://${HOST}:${PORT}\n`);

  const launchOpts = {
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  };

  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOpts.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const browser = await puppeteer.launch(launchOpts);
  const started = Date.now();

  for (const route of ROUTES) {
    // eslint-disable-next-line no-await-in-loop
    await prerenderRoute(browser, route, initialTitle);
  }

  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  await browser.close();
  await new Promise((r) => server.close(r));
  console.log(`\n✓ Готово за ${seconds}s. HTML для всех страниц успешно сохранён в build/.\n`);
})().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
