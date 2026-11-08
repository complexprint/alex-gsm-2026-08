import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Newspaper, ArrowRight, MapPin, Calendar, Clock, ExternalLink } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';
import useSEO from '../hooks/useSEO';
import { articles, PROFILE_URL } from '../data/articles';

const Publications = () => {
  const { language } = useLanguage();

  const title =
    language === 'de'
      ? 'Publikationen | Aleksei Bespechnyi — MeinBezirk.at Autor'
      : 'Publications | Aleksei Bespechnyi — MeinBezirk.at Contributor';
  const description =
    language === 'de'
      ? 'Alle 11 Gastbeiträge von Aleksei Bespechnyi auf MeinBezirk.at zu Linz, Steyr, OÖ, Studentenleben, Digital Marketing, Gastronomie und Kultur. 27.000+ Leser.'
      : 'All 11 guest articles by Aleksei Bespechnyi published on MeinBezirk.at covering Linz, Steyr, Upper Austria, student life, digital marketing, hospitality and culture. Over 27,000 readers.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://alex-gsm.at/publications#collection',
    name: title,
    description,
    url: 'https://alex-gsm.at/publications',
    inLanguage: language === 'de' ? 'de-AT' : 'en',
    isPartOf: { '@id': 'https://alex-gsm.at/#website' },
    author: { '@id': 'https://alex-gsm.at/#person' },
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: articles.length,
      itemListElement: articles.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'NewsArticle',
          headline: `${p.kicker} – ${p.title}`,
          image: p.coverImage ? `https://alex-gsm.at${p.coverImage}` : undefined,
          url: `https://alex-gsm.at/publications/${p.id}`,
          author: { '@id': 'https://alex-gsm.at/#person' },
          publisher: {
            '@type': 'Organization',
            name: 'MeinBezirk.at',
            url: 'https://www.meinbezirk.at',
          },
        },
      })),
    },
  };

  useSEO({
    title,
    description,
    canonical: 'https://alex-gsm.at/publications',
    image: articles[0]?.coverImage ? `https://alex-gsm.at${articles[0].coverImage}` : undefined,
    type: 'website',
    locale: language === 'de' ? 'de_AT' : 'en_US',
    jsonLd,
  });

  const eyebrow = language === 'de' ? 'MeinBezirk.at · Autor' : 'MeinBezirk.at · Contributor';
  const heading = language === 'de' ? 'Publikationen & Gastbeiträge' : 'Publications & Guest Articles';

  return (
    <PageLayout icon={Newspaper} title={heading} eyebrow={eyebrow} maxWidth="max-w-7xl">
      {/* Intro */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="mb-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-9"
      >
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          {language === 'de' ? (
            <>
              Seit 2025 schreibe ich als freier Autor für{' '}
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fuchsia-400 hover:text-fuchsia-300 underline decoration-fuchsia-500/40 hover:decoration-fuchsia-400 transition-colors"
              >
                MeinBezirk.at
              </a>{' '}
              über das Leben in Linz, Studenten-Alltag, Wirtschaft, lokale Gastronomie und digitale Kultur.
              Bereits <strong className="text-white">{articles.length} veröffentlichte Artikel</strong> mit
              über <strong className="text-white">27.000 erreichten Lesern</strong>.
            </>
          ) : (
            <>
              Since 2025 I have been writing as a freelance contributor for{' '}
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fuchsia-400 hover:text-fuchsia-300 underline decoration-fuchsia-500/40 hover:decoration-fuchsia-400 transition-colors"
              >
                MeinBezirk.at
              </a>{' '}
              about life in Linz, student life, business, local hospitality and digital culture. Already{' '}
              <strong className="text-white">{articles.length} published articles</strong> with more than{' '}
              <strong className="text-white">27,000 readers reached</strong>.
            </>
          )}
        </p>
        <div className="flex flex-wrap gap-2 mt-6">
          {['Oberösterreich', 'Linz', 'Steyr', 'Content & Journalismus', 'Copywriting'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {articles.map((p, i) => (
          <motion.article
            key={p.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={i}
            className="group flex flex-col bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-fuchsia-500/30 hover:shadow-[0_0_40px_-10px_rgba(217,70,239,0.35)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/NewsArticle"
          >
            <Link
              to={`/publications/${p.id}`}
              className="relative block h-48 overflow-hidden"
              aria-label={`${p.kicker} – ${p.title}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
              {p.coverImage && (
                <img
                  src={p.coverImage}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  itemProp="image"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-white">
                <Newspaper className="w-3 h-3 text-fuchsia-300" />
                MeinBezirk.at
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[11px] text-zinc-200">
                <Calendar className="w-3 h-3" />
                <time itemProp="datePublished">{p.date}</time>
              </span>
              {p.readTime && (
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] text-zinc-300 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  {p.readTime}
                </span>
              )}
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
                    <MapPin className="w-3 h-3 text-fuchsia-400/70" />
                    {tag}
                  </span>
                ))}
              </div>

              <p
                className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-fuchsia-400/90 mb-2"
                itemProp="alternativeHeadline"
              >
                {p.kicker}
              </p>
              <h2
                className="font-heading text-lg sm:text-xl font-semibold text-white mb-3 leading-snug group-hover:text-fuchsia-200 transition-colors"
                itemProp="headline"
              >
                <Link to={`/publications/${p.id}`}>{p.title}</Link>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-3 flex-grow" itemProp="description">
                {language === 'de' ? p.excerpt : p.excerptEn}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                <Link
                  to={`/publications/${p.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-300 hover:text-white bg-white/5 hover:bg-fuchsia-500/15 border border-white/10 hover:border-fuchsia-500/40 rounded-full px-4 py-2 transition-all duration-300"
                >
                  {language === 'de' ? 'Artikel lesen' : 'Read article'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
                    title={language === 'de' ? 'Original auf MeinBezirk.at' : 'Original on MeinBezirk.at'}
                  >
                    <span>MeinBezirk</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <meta itemProp="author" content="Aleksei Bespechnyi" />
              <meta itemProp="publisher" content="MeinBezirk.at" />
            </div>
          </motion.article>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 bg-gradient-to-br from-fuchsia-600/10 to-violet-600/10 border border-white/10 rounded-3xl p-8 sm:p-10 text-center"
      >
        <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-3">
          {language === 'de'
            ? 'Alle Artikel auch auf MeinBezirk.at'
            : 'All articles also on MeinBezirk.at'}
        </h3>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
          {language === 'de'
            ? 'Du willst einen Gastbeitrag besprechen, ein Interview führen oder gemeinsam eine Content-Kampagne starten? Melde dich gerne.'
            : 'Want to discuss a guest post, run an interview or start a content campaign together? Feel free to reach out.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white px-6 py-3 rounded-full font-semibold border border-white/20 shadow-[0_0_20px_rgba(192,38,211,0.25)] hover:shadow-[0_0_35px_rgba(192,38,211,0.5)] hover:scale-[1.02] transition-all"
          >
            <Newspaper className="w-4 h-4" />
            {language === 'de' ? 'Autorenprofil öffnen' : 'Open author profile'}
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="mailto:alekseibespechnyi@outlook.com?subject=Gastbeitrag%20/%20Content%20Cooperation"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-fuchsia-500/30 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            {language === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}
          </a>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Publications;
