import { useEffect } from 'react';

/**
 * Lightweight SEO hook that updates document.title, meta description,
 * Open Graph / Twitter tags and canonical URL for each page.
 * Restores previous values on unmount so the base index.html metadata
 * is preserved for crawlers and social scrapers.
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
  return { el, prev, created: prev === null };
};

const upsertLink = (rel, href) => {
  if (!href) return null;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  const prev = el ? el.getAttribute('href') : null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return { el, prev, created: prev === null };
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
  image,
  type = 'website',
  locale = 'de_AT',
  jsonLd,
} = {}) => {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const url = canonical || (typeof window !== 'undefined' ? window.location.href : undefined);
    const img = image || 'https://alex-gsm.at/main_page.jpg';

    const changes = [
      upsertMeta('name', 'title', title),
      upsertMeta('name', 'description', description),
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

    const jsonLdEl = jsonLd ? upsertJsonLd('page-jsonld', jsonLd) : null;

    return () => {
      document.title = previousTitle;
      changes.forEach((c) => {
        if (!c) return;
        if (c.created) {
          c.el.remove();
        } else if (c.prev !== null && c.prev !== undefined) {
          const attr = c.el.tagName === 'LINK' ? 'href' : 'content';
          c.el.setAttribute(attr, c.prev);
        }
      });
      if (jsonLdEl && jsonLdEl.created) jsonLdEl.el.remove();
    };
  }, [title, description, canonical, image, type, locale, JSON.stringify(jsonLd)]);
};

export default useSEO;
