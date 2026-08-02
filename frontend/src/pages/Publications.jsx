import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Newspaper, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';
import useSEO from '../hooks/useSEO';

const PROFILE_URL =
  'https://www.meinbezirk.at/linz/profile-772419/aleksei-bespechnyi?type=article&filter=published';

const publications = [
  {
    id: 'wm-linz-gastro',
    date: '11.07.2026',
    tags: ['OÖ', 'Linz', 'Gastronomie'],
    kicker: 'Fernseher allein bringt nix',
    title: 'Wie Linzer Gastronomen WM-Umsatz liegen lassen',
    excerpt:
      'Die WM 2026 läuft auf Hochtouren – doch während die einen Lokale wie ein aufgeladener Porsche starten, verhalten sich andere wie ein rostiges Fahrrad am Hauptbahnhof.',
    excerptEn:
      'The 2026 World Cup is in full swing – while some Linz venues fire like a supercharged Porsche, others behave like a rusty bike at the main station.',
    image: 'https://media04.meinbezirk.at/article/2026/07/11/1/51657771_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/wie-linzer-gastronomen-wm-umsatz-liegen-lassen_a8793372',
    accent: 'from-orange-500/30 to-red-500/30',
  },
  {
    id: 'larin-catenaccio',
    date: '13.06.2026',
    tags: ['OÖ', 'Sport', 'WM 2026'],
    kicker: 'Larin vs Catenaccio: Duell der Spielkulturen',
    title: 'Sichtbarkeit entscheidet – Umgebung formt Erfolg',
    excerpt:
      'Die Konfrontation zweier Fußballwelten bei der WM 2026 zwischen Kanada und Bosnien‑Herzegowina. Ein Unentschieden, das mehr sagt als das Ergebnis.',
    excerptEn:
      'Two football worlds collide at the 2026 World Cup between Canada and Bosnia. A draw that says more than the result.',
    image: 'https://media04.meinbezirk.at/article/2026/06/13/9/51176789_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/sichtbarkeit-entscheidet-umgebung-formt-erfolg_a8689877',
    accent: 'from-emerald-500/30 to-cyan-500/30',
  },
  {
    id: 'partybus',
    date: '06.04.2026',
    tags: ['OÖ', 'Linz', 'Lifestyle'],
    kicker: 'Vergiss Putzerei und Nachbarn!',
    title: 'Warum Österreicher jetzt im Bus fetzen',
    excerpt:
      'Der neue heiße Scheiß in Österreich heißt Partybus mieten – eine fahrende Location ohne depperte Nachbarn und teure Restaurants.',
    excerptEn:
      'Austria’s new favourite party is on wheels – a moving venue with no annoying neighbours and no overpriced restaurants.',
    image: 'https://media04.meinbezirk.at/article/2026/04/06/6/50159146_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/warum-oesterreicher-jetzt-im-bus-fetzen_a8570905',
    accent: 'from-fuchsia-500/30 to-pink-500/30',
  },
  {
    id: 'drogen-razzia',
    date: '25.03.2026',
    tags: ['OÖ', 'Linz', 'Reportage'],
    kicker: '85 Festnahmen: Der Kevin managte Drogen',
    title: 'Linz hat ein Drogenproblem, und ich habe ein Kaffeeproblem',
    excerpt:
      'Eine satirische Reportage über die Razzia in Oberösterreich und den Alltag am Linzer Hauptbahnhof.',
    excerptEn:
      'A satirical report on the police raid in Upper Austria and everyday life at Linz main station.',
    image: 'https://media04.meinbezirk.at/article/2026/03/25/7/50023417_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/linz-hat-ein-drogenproblem-und-ich-habe-einen-kaffeeproblem-wo-bleibt-meine-razzia_a8552632',
    accent: 'from-amber-500/30 to-red-500/30',
  },
  {
    id: 'jku-spartipps',
    date: '01.02.2026',
    tags: ['OÖ', 'Linz', 'Studentenleben'],
    kicker: 'Essen in Linz ohne Schnickschnack',
    title: 'Die besten Spartipps für JKU-Studenten',
    excerpt:
      'Von der Uni-Mensa bis zu günstigen Alternativen – ein ehrlicher Guide, wie man in der Stahlstadt nicht verhungert, ohne die Seele zu verkaufen.',
    excerptEn:
      'From the university cafeteria to cheap alternatives – an honest guide on how to survive in Linz without selling your soul.',
    image: 'https://media04.meinbezirk.at/article/2026/02/01/7/49263907_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/die-besten-spartipps-fuer-jku-studenten_a8020231',
    accent: 'from-yellow-500/30 to-orange-500/30',
  },
  {
    id: 'gruener-stahl',
    date: '25.01.2026',
    tags: ['OÖ', 'Wirtschaft', 'voestalpine'],
    kicker: 'Grüner Stahl: Verrückt oder unsere Rettung?',
    title: 'Ein Oberösterreicher über Voestalpines riskanten Weg',
    excerpt:
      'Während Autohersteller weniger Blech kaufen und billiger Stahl aus Fernost schwappt, pumpen europäische Stahlwerke 1,5 Milliarden in grünen Wasserstoff.',
    excerptEn:
      'While carmakers buy less steel and cheap imports flood Europe, European steelworks are pouring €1.5 billion into green hydrogen.',
    image: 'https://media04.meinbezirk.at/article/2026/01/25/0/49161490_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/ein-oberoesterreicher-ueber-voestalpines-riskanten-weg_a7993003',
    accent: 'from-lime-500/30 to-emerald-500/30',
  },
  {
    id: 'jobportal-chaos',
    date: '16.01.2026',
    tags: ['OÖ', 'Linz', 'Karriere'],
    kicker: 'Jobportal-Chaos: Bewerbung wie Schneesturm',
    title: 'Ein Student klagt an: Von Formular-Hölle bis One-Click-Lösung',
    excerpt:
      'Arbeit suchen ist wie mit dem Rad bei Schneesturm durch Linz fahren — theoretisch machbar, praktisch fragst du dich alle fünf Minuten, warum du dir das antust.',
    excerptEn:
      'Job hunting is like cycling through Linz in a blizzard — technically possible, practically exhausting.',
    image: 'https://media04.meinbezirk.at/article/2026/01/16/3/49044213_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/ein-student-klagt-an-von-formular-hoelle-bis-one-click-loesung_a7969380',
    accent: 'from-sky-500/30 to-indigo-500/30',
  },
  {
    id: 'winterradeln',
    date: '10.01.2026',
    tags: ['OÖ', 'Linz', 'Outdoor'],
    kicker: 'Winterradeln in Linz',
    title: 'Schneechaos in Linz: Fahrrad-Abenteuer trotz Arktis-Wetter',
    excerpt:
      'Ein glorreicher Tag in der winterlichen Landschaft von Linz, wo die Natur einen rekordverdächtigen Schneeschauer herabschüttet.',
    excerptEn:
      'A glorious day in wintry Linz, where nature dumps a record-breaking snow shower on our heads.',
    image: 'https://media04.meinbezirk.at/article/2026/01/10/0/48971190_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/schneechaos-in-linz-fahrrad-abenteuer-trotz-arktiswetter_a7949124',
    accent: 'from-cyan-500/30 to-blue-500/30',
  },
  {
    id: 'linz-steyr-pendeln',
    date: '08.01.2026',
    tags: ['OÖ', 'Linz', 'Steyr', 'FH'],
    kicker: 'Studentenleben zwischen Linz und Steyr',
    title: 'Alltag eines FH-Studenten im Pendelmodus',
    excerpt:
      'Zwei völlig unterschiedliche Welten — Linz mit schnellem Rhythmus und Steyr mit historischem, ruhigerem Charme.',
    excerptEn:
      'Two very different worlds — the fast-paced rhythm of Linz and the historic, quieter charm of Steyr.',
    image: 'https://media04.meinbezirk.at/article/2026/01/08/1/48958101_L.webp',
    href: 'https://www.meinbezirk.at/linz/c-regionauten-community/zwischen-linz-und-steyr-alltag-eines-fhstudenten-im-pendelmodus_a7944117',
    accent: 'from-violet-500/30 to-purple-500/30',
  },
];

const Publications = () => {
  const { language } = useLanguage();

  const title =
    language === 'de'
      ? 'Publikationen | Aleksei Bespechnyi — MeinBezirk.at Autor'
      : 'Publications | Aleksei Bespechnyi — MeinBezirk.at Contributor';
  const description =
    language === 'de'
      ? 'Alle Gastbeiträge von Aleksei Bespechnyi auf MeinBezirk.at zu Linz, Steyr, Oberösterreich, Studentenleben, Digital Marketing, Gastronomie und Kultur.'
      : 'All guest articles by Aleksei Bespechnyi published on MeinBezirk.at covering Linz, Steyr, Upper Austria, student life, digital marketing, hospitality and culture.';

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
      numberOfItems: publications.length,
      itemListElement: publications.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'NewsArticle',
          headline: `${p.kicker} – ${p.title}`,
          image: p.image,
          url: p.href,
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
    image: publications[0].image,
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
              Bereits <strong className="text-white">{publications.length} veröffentlichte Artikel</strong> mit
              über <strong className="text-white">17.000 erreichten Lesern</strong>.
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
              <strong className="text-white">{publications.length} published articles</strong> with more than{' '}
              <strong className="text-white">17,000 readers reached</strong>.
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
        {publications.map((p, i) => (
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
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block h-48 overflow-hidden"
              aria-label={`${p.kicker} – ${p.title}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                itemProp="image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-white">
                <Newspaper className="w-3 h-3 text-fuchsia-300" />
                MeinBezirk.at
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[11px] text-zinc-200">
                <Calendar className="w-3 h-3" />
                <time itemProp="datePublished">{p.date}</time>
              </span>
            </a>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map((tag) => (
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
                {p.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-3 flex-grow" itemProp="description">
                {language === 'de' ? p.excerpt : p.excerptEn}
              </p>

              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                itemProp="url"
                className="inline-flex items-center gap-2 mt-auto self-start text-sm font-semibold text-fuchsia-300 hover:text-white bg-white/5 hover:bg-fuchsia-500/15 border border-white/10 hover:border-fuchsia-500/40 rounded-full px-4 py-2 transition-all duration-300"
              >
                {language === 'de' ? 'Artikel lesen' : 'Read article'}
                <ExternalLink className="w-4 h-4" />
              </a>
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
            ? 'Alle Artikel direkt auf MeinBezirk.at'
            : 'All articles directly on MeinBezirk.at'}
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
            href="mailto:7css77@gmail.com?subject=Gastbeitrag%20/%20Content%20Cooperation"
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
