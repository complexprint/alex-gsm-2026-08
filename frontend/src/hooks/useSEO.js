import { useEffect } from 'react';

/**
 * Lightweight SEO hook that updates document.title, meta description,
 * keywords, Open Graph / Twitter tags, canonical URL, and hreflang alternate links.
 * Also synchronizes <html lang="de|en"> for search engines and screen readers.
 * Restores previous values on unmount so index.html defaults are preserved.
 */
const upsertMeta = (attr, key, value) => {
  if (!value) return null;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  const prev = el ? el.getAttribute('content') : null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
  return { el, prev, created: prev === null, attr: 'content' };
};

const upsertLink = (rel, href, extraAttrs = {}) => {
  if (!href) return null;
  const selectorParts = [`link[rel="${rel}"]`];
  for (const [k, v] of Object.entries(extraAttrs)) {
    selectorParts.push(`[${k}="${v}"]`);
  }
  const selector = selectorParts.join('');
  let el = document.head.querySelector(selector);
  const prev = el ? el.getAttribute('href') : null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    for (const [k, v] of Object.entries(extraAttrs)) {
      el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return { el, prev, created: prev === null, attr: 'href' };
};

const upsertJsonLd = (id, data) => {
  if (!data) return null;
  let el = document.head.querySelector(`script[data-seo-id="${id}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('data-seo-id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
  return { el, created };
};

const useSEO = ({
  title,
  description,
  canonical,
  basePath,
  image,
  type = 'website',
  locale = 'de_AT',
  keywords,
  jsonLd,
  alternates,
} = {}) => {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    // Синхронизируем атрибут lang у <html>
    const prevHtmlLang = document.documentElement.getAttribute('lang') || 'de';
    const isEn = locale?.toLowerCase().startsWith('en');
    document.documentElement.setAttribute('lang', isEn ? 'en' : 'de');

    // Если указан basePath, автоматически формируем canonical и hreflang для DE и EN
    let finalCanonical = canonical;
    let finalAlternates = alternates;

    if (basePath !== undefined) {
      const cleanBase = basePath === '/' ? '' : basePath.replace(/^\/+/, '/');
      const deUrl = `https://alex-gsm.at${cleanBase || '/'}`;
      const enUrl = `https://alex-gsm.at/en${cleanBase}`;

      if (!finalCanonical) {
        finalCanonical = isEn ? enUrl : deUrl;
      }

      if (!finalAlternates) {
        finalAlternates = [
          { lang: 'de', href: deUrl },
          { lang: 'en', href: enUrl },
          { lang: 'x-default', href: deUrl },
        ];
      }
    }

    const url = finalCanonical || (typeof window !== 'undefined' ? window.location.href : undefined);
    const img = image || 'https://alex-gsm.at/main_page.jpg';

    const changes = [
      upsertMeta('name', 'title', title),
      upsertMeta('name', 'description', description),
      upsertMeta('name', 'keywords', keywords),
      upsertMeta('property', 'og:title', title),
      upsertMeta('property', 'og:description', description),
      upsertMeta('property', 'og:url', url),
      upsertMeta('property', 'og:type', type),
      upsertMeta('property', 'og:image', img),
      upsertMeta('property', 'og:locale', locale),
      upsertMeta('name', 'twitter:title', title),
      upsertMeta('name', 'twitter:description', description),
      upsertMeta('name', 'twitter:url', url),
      upsertMeta('name', 'twitter:image', img),
      upsertLink('canonical', url),
    ].filter(Boolean);

    if (Array.isArray(finalAlternates)) {
      finalAlternates.forEach((alt) => {
        const item = upsertLink('alternate', alt.href, { hreflang: alt.lang });
        if (item) changes.push(item);
      });
    }

    const jsonLdEl = jsonLd ? upsertJsonLd('page-jsonld', jsonLd) : null;

    return () => {
      document.title = previousTitle;
      document.documentElement.setAttribute('lang', prevHtmlLang);
      changes.forEach((c) => {
        if (!c) return;
        if (c.created) {
          c.el.remove();
        } else if (c.prev !== null && c.prev !== undefined) {
          c.el.setAttribute(c.attr, c.prev);
        }
      });
      if (jsonLdEl && jsonLdEl.created) jsonLdEl.el.remove();
    };
  }, [
    title,
    description,
    canonical,
    basePath,
    image,
    type,
    locale,
    keywords,
    JSON.stringify(jsonLd),
    JSON.stringify(alternates),
  ]);
};

export default useSEO;
