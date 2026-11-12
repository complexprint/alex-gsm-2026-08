import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Newspaper,
  ExternalLink,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  Quote,
} from 'lucide-react';
import NavigationButtons from '../components/NavigationButtons';
import useSEO from '../hooks/useSEO';
import { articles, PROFILE_URL } from '../data/articles';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const articleIndex = articles.findIndex((a) => a.id === id);
  const article = articles[articleIndex];

  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle = articleIndex >= 0 && articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const seoTitle =
    article?.seoTitle ||
    (article
      ? `${article.kicker}: ${article.title} | Aleksei Bespechnyi`
      : 'Artikel | Aleksei Bespechnyi');
  const seoDescription =
    (language === 'de' && article?.seoDescription) ||
    (article
      ? (language === 'de' ? article.excerpt : article.excerptEn)
      : '');

  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: `${article.kicker} – ${article.title}`,
        image: article.coverImage ? `https://alex-gsm.at${article.coverImage}` : undefined,
        datePublished: article.date,
        author: {
          '@type': 'Person',
          name: 'Aleksei Bespechnyi',
          url: 'https://alex-gsm.at/#person',
        },
        publisher: {
          '@type': 'Organization',
          name: 'MeinBezirk.at',
          url: 'https://www.meinbezirk.at',
        },
        description: seoDescription,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://alex-gsm.at/publications/${article.id}`,
        },
      }
    : null;

  useSEO({
    title: seoTitle,
    description: seoDescription,
    basePath: article ? `/publications/${article.id}` : undefined,
    image: article?.coverImage ? `https://alex-gsm.at${article.coverImage}` : undefined,
    type: 'article',
    locale: language === 'de' ? 'de_AT' : 'en_US',
    jsonLd,
  });

  if (!article) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">
          {language === 'de' ? 'Artikel nicht gefunden' : 'Article not found'}
        </h1>
        <p className="text-zinc-400 mb-8 max-w-md">
          {language === 'de'
            ? 'Dieser Artikel existiert nicht oder wurde verschoben.'
            : 'This article does not exist or has been moved.'}
        </p>
        <Link
          to={language === 'en' ? '/en/publications' : '/publications'}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white px-6 py-3 rounded-full font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'de' ? 'Zurück zu Publikationen' : 'Back to publications'}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-body overflow-hidden">
      {/* Ambient lighting */}
      <div className="pointer-events-none fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-fuchsia-900/15 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-900/15 blur-[140px]" />

      <div className="relative z-10 mx-auto px-6 lg:px-8 py-20 lg:py-24 max-w-4xl">
        {/* Top bar with back and share */}
        <div className="flex items-center justify-between mb-10">
          <button
            data-testid="back-button"
            onClick={() => navigate(language === 'en' ? '/en/publications' : '/publications')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'de' ? 'Zurück zu Publikationen' : 'Back to publications'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
              title={language === 'de' ? 'Link kopieren' : 'Copy link'}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{language === 'de' ? 'Kopiert!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>{language === 'de' ? 'Teilen' : 'Share'}</span>
                </>
              )}
            </button>
            {article.href && (
              <a
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm text-zinc-300 hover:bg-fuchsia-500/15 hover:border-fuchsia-500/30 hover:text-white transition-all"
              >
                <Newspaper className="w-4 h-4 text-fuchsia-400" />
                <span>MeinBezirk.at</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Article Header */}
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-10"
        >
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-xs font-semibold text-fuchsia-300">
              <Newspaper className="w-3.5 h-3.5" />
              MeinBezirk.at Gastbeitrag
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400"
              >
                <MapPin className="w-3 h-3 text-zinc-500" />
                {tag}
              </span>
            ))}
          </div>

          {/* Kicker */}
          <p className="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.25em] text-fuchsia-400 mb-3">
            {article.kicker}
          </p>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-zinc-400 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">
                AB
              </div>
              <span className="text-zinc-200 font-medium">Aleksei Bespechnyi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <time>{article.date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-zinc-500" />
              <span>{article.readTime} Lesezeit</span>
            </div>
          </div>
        </motion.header>

        {/* Cover image if available */}
        {article.coverImage && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mb-12 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950/60 p-2 sm:p-4 flex items-center justify-center relative shadow-[0_0_50px_-15px_rgba(217,70,239,0.2)]"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              className="max-w-full h-auto max-h-[80vh] rounded-2xl object-contain mx-auto block"
            />
          </motion.div>
        )}

        {/* Article Body */}
        <motion.article
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-6"
        >
          {article.blocks &&
            article.blocks.map((block, idx) => {
              if (block.type === 'lead') {
                return (
                  <p
                    key={idx}
                    className="text-lg sm:text-xl text-zinc-100 font-medium leading-relaxed p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-sm"
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'h2') {
                return (
                  <h2
                    key={idx}
                    className="text-xl sm:text-2xl font-heading font-bold text-white mt-12 mb-4 pt-4 border-t border-white/10 flex items-center gap-3"
                  >
                    <span className="w-2 h-6 rounded-full bg-gradient-to-b from-fuchsia-500 to-violet-500" />
                    <span>{block.text}</span>
                  </h2>
                );
              }

              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="relative my-8 p-6 rounded-2xl bg-gradient-to-r from-fuchsia-950/30 via-violet-950/20 to-transparent border-l-4 border-fuchsia-400 text-zinc-200 italic text-lg sm:text-xl"
                  >
                    <Quote className="w-6 h-6 text-fuchsia-400/40 mb-2" />
                    <p className="leading-relaxed">„{block.text}“</p>
                  </blockquote>
                );
              }

              if (block.type === 'list') {
                return (
                  <ul key={idx} className="my-6 space-y-2.5 pl-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-2.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'image') {
                if (block.src === article.coverImage) {
                  return null;
                }
                return (
                  <figure key={idx} className="my-10 rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/60 p-2 sm:p-4 flex flex-col items-center">
                    <img
                      src={block.src}
                      alt={block.caption || article.title}
                      className="max-w-full h-auto max-h-[80vh] rounded-xl object-contain mx-auto block"
                      loading="lazy"
                    />
                    {block.caption && (
                      <figcaption className="mt-3 text-xs text-zinc-400 text-center italic w-full">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              return (
                <p key={idx} className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                  {block.text}
                </p>
              );
            })}
        </motion.article>

        {/* Author Bio Box */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-9"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 border border-white/10 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-fuchsia-300" />
            </div>
            <div className="flex-grow text-center sm:text-left">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-fuchsia-400 mb-1 block">
                {language === 'de' ? 'Über den Autor' : 'About the Author'}
              </span>
              <h3 className="text-xl font-heading font-bold text-white mb-2">Aleksei Bespechnyi</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {language === 'de'
                  ? 'Digital Marketing Manager, Absolvent Global Sales & Marketing (FH OÖ Steyr) und freier Autor bei MeinBezirk.at. Schreibt über Linz, oberösterreichische Wirtschaft, Digital Trends und studentisches Leben.'
                  : 'Digital Marketing Manager, Global Sales & Marketing graduate (FH Upper Austria Steyr) and freelance contributor at MeinBezirk.at. Writes about Linz, Upper Austrian business, digital trends and student life.'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <a
                  href={PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-300 hover:text-white bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full px-4 py-2 transition-all"
                >
                  <Newspaper className="w-3.5 h-3.5" />
                  {language === 'de' ? 'Profil auf MeinBezirk.at' : 'Profile on MeinBezirk.at'}
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="mailto:alekseibespechnyi@outlook.com?subject=Gastbeitrag%20Feedback"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 transition-all"
                >
                  {language === 'de' ? 'Feedback senden' : 'Send feedback'}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prev / Next navigation */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              to={`${language === 'en' ? '/en' : ''}/publications/${prevArticle.id}`}
              className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-fuchsia-500/30 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                <ChevronLeft className="w-4 h-4 text-fuchsia-400 group-hover:-translate-x-1 transition-transform" />
                <span>{language === 'de' ? 'Vorheriger Artikel' : 'Previous article'}</span>
              </div>
              <p className="text-sm font-heading font-semibold text-zinc-200 group-hover:text-fuchsia-300 transition-colors line-clamp-2">
                {prevArticle.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle ? (
            <Link
              to={`${language === 'en' ? '/en' : ''}/publications/${nextArticle.id}`}
              className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-fuchsia-500/30 hover:bg-white/[0.04] transition-all flex flex-col justify-between sm:text-right"
            >
              <div className="flex items-center justify-end gap-2 text-xs text-zinc-500 mb-2">
                <span>{language === 'de' ? 'Nächster Artikel' : 'Next article'}</span>
                <ChevronRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm font-heading font-semibold text-zinc-200 group-hover:text-fuchsia-300 transition-colors line-clamp-2">
                {nextArticle.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      <NavigationButtons />
    </div>
  );
};

export default ArticleDetail;
