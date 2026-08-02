import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';

const About = () => {
  const { language, t } = useLanguage();

  const paragraphs = [t('aboutText1'), t('aboutText2'), t('aboutText3')];

  const gallery = [
    {
      src: '/sagsmulti3.jpg',
      title: "SAG'S MULTI! 2020/21",
      caption: language === 'de' ? 'Österreichischer Rhetorik-Meister' : 'Austrian Public Speaking Champion',
    },
    {
      src: '/orf_sagsmulti.jpg',
      title: 'ORF Interview',
      caption: language === 'de' ? 'Medienauftritt' : 'Media Appearance',
    },
    {
      src: '/tv_show.jpg',
      title: 'TV Show',
      caption: language === 'de' ? 'Fernsehauftritt' : 'Television Appearance',
      objectPosition: 'center 30%',
    },
    {
      src: '/sagsmulti2.jpg',
      title: language === 'de' ? 'Selbstständig seit 14' : 'Independent Since 14',
      caption: language === 'de' ? 'Leben und Studieren in Österreich' : 'Living and Studying in Austria',
    },
  ];

  return (
    <PageLayout icon={Sparkles} title={t('aboutTitle')} eyebrow={language === 'de' ? 'Über mich' : 'About me'} maxWidth="max-w-4xl">
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
        {language === 'de' ? 'Galerie' : 'Gallery'}
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
          “{language === 'de' ? 'Unabhängig, belastbar, interkulturell' : 'Independent, resilient, intercultural'}”
        </p>
      </motion.div>
    </PageLayout>
  );
};

export default About;
