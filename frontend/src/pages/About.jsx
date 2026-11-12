import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles, Languages, ExternalLink, MapPin, Mail, Award, BookOpen, MessageSquare, Briefcase } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';
import useSEO from '../hooks/useSEO';

const About = () => {
  const { language, t } = useLanguage();

  const isDe = language === 'de';

  const tutorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': isDe ? 'Private Sprachnachhilfe: Deutsch, Englisch & Russisch' : 'Private Language Tutoring: German, English & Russian',
    'serviceType': isDe ? 'Individuelle Sprach-Nachhilfe und Sprachtraining' : 'Individual language tutoring and coaching',
    'description': isDe
      ? 'Individuelle Sprachnachhilfe und Prüfungsvorbereitung in Deutsch (C2), Englisch und Russisch in Linz und online.'
      : 'Private language tutoring and exam preparation in German (C2), English and Russian in Linz and online.',
    'areaServed': [
      { '@type': 'City', 'name': 'Linz' },
      { '@type': 'VirtualLocation', 'url': 'https://nachhilfen24.at/de/providers/6192277' },
    ],
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': 'https://nachhilfen24.at/de/providers/6192277',
      'serviceLocation': {
        '@type': 'Place',
        'name': isDe ? 'Linz, Österreich oder online' : 'Linz, Austria or online',
      },
    },
    'provider': {
      '@type': 'Person',
      'name': 'Aleksei Bespechnyi',
      'url': 'https://alex-gsm.at/about',
      'email': 'alekseibespechnyi@outlook.com',
      'knowsLanguage': ['Russian', 'German', 'English', 'Spanish', 'Chinese', 'Swedish'],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Linz',
        'addressCountry': 'AT',
      },
      'sameAs': [
        'https://nachhilfen24.at/de/providers/6192277',
        'https://www.linkedin.com/in/aleksei-bespechnyi-%E5%8C%85%E5%81%89%E7%BF%94-5a8496217',
      ],
    },
  };

  useSEO({
    title:
      isDe
        ? 'Über mich & Sprachnachhilfe | Aleksei Bespechnyi'
        : 'About & Language Tutoring | Aleksei Bespechnyi',
    description:
      isDe
        ? 'Seit 14 in Österreich. Master GSM (FH Steyr), SAG\'S MULTI! Sieger. Private Sprachnachhilfe in Deutsch (C2), Englisch & Russisch in Linz und online.'
        : 'Living in Austria since 14. Master GSM (FH Steyr), SAG\'S MULTI! winner. Private language tutoring in German (C2), English & Russian in Linz and online.',
    basePath: '/about',
    type: 'profile',
    locale: isDe ? 'de_AT' : 'en_US',
    keywords: isDe
      ? 'Sprachnachhilfe Linz, Deutsch Nachhilfe C2, Englisch Nachhilfe, Russisch Nachhilfe, Sprachunterricht Linz, online Sprachtraining'
      : 'language tutoring Linz, German tutor C2, English tutoring, Russian tutor, language lessons Linz, online language coaching',
    jsonLd: tutorJsonLd,
  });

  const paragraphs = [t('aboutText1'), t('aboutText2'), t('aboutText3')];

  const gallery = [
    {
      src: '/sagsmulti3.jpg',
      title: "SAG'S MULTI! 2020/21",
      caption: isDe ? 'Österreichischer Rhetorik-Meister' : 'Austrian Public Speaking Champion',
    },
    {
      src: '/orf_sagsmulti.jpg',
      title: 'ORF Interview',
      caption: isDe ? 'Medienauftritt' : 'Media Appearance',
    },
    {
      src: '/tv_show.jpg',
      title: 'TV Show',
      caption: isDe ? 'Fernsehauftritt' : 'Television Appearance',
      objectPosition: 'center 30%',
    },
    {
      src: '/sagsmulti2.jpg',
      title: isDe ? 'Selbstständig seit 14' : 'Independent Since 14',
      caption: isDe ? 'Leben und Studieren in Österreich' : 'Living and Studying in Austria',
    },
  ];

  const focusPoints = [
    {
      icon: MessageSquare,
      title: t('tutorFocus1Title'),
      desc: t('tutorFocus1Desc'),
    },
    {
      icon: Briefcase,
      title: t('tutorFocus2Title'),
      desc: t('tutorFocus2Desc'),
    },
    {
      icon: BookOpen,
      title: t('tutorFocus3Title'),
      desc: t('tutorFocus3Desc'),
    },
  ];

  return (
    <PageLayout icon={Sparkles} title={t('aboutTitle')} eyebrow={isDe ? 'Über mich' : 'About me'} maxWidth="max-w-4xl">
      {/* Intro paragraphs */}
      <div className="space-y-5">
        {paragraphs.map((text, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 hover:border-fuchsia-500/30 transition-colors"
          >
            <p className="text-base sm:text-lg leading-relaxed text-zinc-400">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* Gallery */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight mt-16 mb-8"
      >
        {isDe ? 'Galerie' : 'Gallery'}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((g, i) => (
          <motion.div
            key={g.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            custom={i}
            className="group bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-fuchsia-500/30 transition-colors"
          >
            <div className="overflow-hidden">
              <img
                src={g.src}
                alt={g.title}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                style={g.objectPosition ? { objectPosition: g.objectPosition } : undefined}
              />
            </div>
            <div className="p-5">
              <p className="text-white font-medium">{g.title}</p>
              <p className="text-zinc-500 text-sm mt-1">{g.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 border border-fuchsia-500/20 rounded-3xl px-8 py-10 text-center"
      >
        <p className="font-heading text-2xl sm:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-violet-300 italic">
          “{isDe ? 'Unabhängig, belastbar, interkulturell' : 'Independent, resilient, intercultural'}”
        </p>
      </motion.div>

      {/* Sprachnachhilfe / Language Tutoring Section */}
      <motion.section
        id="sprachnachhilfe"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-950/90 to-purple-950/20 border border-fuchsia-500/30 p-8 sm:p-10 shadow-2xl backdrop-blur-xl"
        aria-label={t('tutorEyebrow')}
      >
        {/* Glow decoration */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        {/* Eyebrow & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs sm:text-sm font-medium">
            <Languages className="w-4 h-4 text-fuchsia-400" />
            <span>{t('tutorEyebrow')}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('tutorBadgeLevel')}</span>
          </div>
        </div>

        {/* Heading & Subhead */}
        <div className="relative mb-6">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
            {t('tutorTitle')}
          </h2>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <MapPin className="w-4 h-4 text-fuchsia-400 shrink-0" />
            <span>{t('tutorLocation')}</span>
          </div>
        </div>

        {/* Story / About teacher text */}
        <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed relative">
          <p className="text-zinc-200 font-medium">{t('tutorIntro1')}</p>
          <p className="text-zinc-400">{t('tutorIntro2')}</p>
          <p className="text-zinc-400">{t('tutorIntro3')}</p>
        </div>

        {/* Focus areas grid */}
        <div className="mt-8 pt-8 border-t border-white/10 relative">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fuchsia-300 mb-4">
            {t('tutorFocusTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {focusPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-4 hover:border-fuchsia-500/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Methodology & Personal approach */}
        <div className="mt-6 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5 relative">
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            {t('tutorOutro')}
          </p>
        </div>

        {/* Call to action */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative">
          <a
            href="https://nachhilfen24.at/de/providers/6192277"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white font-semibold text-sm transition-all shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t('tutorCtaButton')}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="mailto:alekseibespechnyi@outlook.com?subject=Sprachnachhilfe%20Anfrage"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-fuchsia-400" />
            <span>{t('tutorCtaSubtext')}</span>
          </a>
        </div>
      </motion.section>
    </PageLayout>
  );
};

export default About;
