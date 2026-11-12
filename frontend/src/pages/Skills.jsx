import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages, Laptop, Award, Play } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';
import useSEO from '../hooks/useSEO';

const Skills = () => {
  const { language, t } = useLanguage();

  useSEO({
    title:
      language === 'de'
        ? 'Kompetenzen | Aleksei Bespechnyi — Sprachen, Tools & Skills'
        : 'Skills | Aleksei Bespechnyi — Languages, Tools & Soft Skills',
    description:
      language === 'de'
        ? '5 Sprachen: Russisch, Deutsch C2, Englisch C1, Spanisch B2, Chinesisch HSK3. SAP MM/FI/SD, Excel fortgeschritten, Office 365, Rhetorik & Upselling.'
        : '5 languages: Russian, German C2, English C1, Spanish B2, Chinese HSK3. SAP MM/FI/SD, advanced Excel, Office 365, public speaking & B2B upselling.',
    basePath: '/skills',
    locale: language === 'de' ? 'de_AT' : 'en_US',
  });

  const skillCategories = [
    { title: t('skillsLanguages'), icon: Languages, skills: [t('langRussian'), t('langGerman'), t('langEnglish'), t('langSpanish'), t('langChinese')] },
    { title: t('skillsIT'), icon: Laptop, skills: [t('itSAP'), t('itExcel'), t('itAccess'), t('itOffice')] },
    { title: t('skillsSoft'), icon: Award, skills: [t('softUpselling'), t('softIntercultural'), t('softPresentation'), t('softEntrepreneurial'), t('softResilience')] },
  ];

  return (
    <PageLayout icon={Award} title={t('skillsTitle')} eyebrow={language === 'de' ? 'Kompetenzen' : 'Competencies'} maxWidth="max-w-6xl">
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={index}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 hover:border-fuchsia-500/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-white/10">
                  <Icon className="w-6 h-6 text-fuchsia-400" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-start gap-3 group">
                    <span className="text-fuchsia-400 mt-0.5 transition-transform group-hover:translate-x-1">→</span>
                    <span className="text-zinc-400 leading-relaxed group-hover:text-white transition-colors">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Video CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto bg-gradient-to-br from-zinc-900/60 to-[#0A0512]/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center gap-5"
      >
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 shadow-[0_0_30px_rgba(217,70,239,0.4)]">
          <Play className="w-7 h-7 text-white" />
        </span>
        <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white">
          {language === 'de' ? 'Sehen Sie meine Fähigkeiten in Aktion' : 'See My Skills in Action'}
        </h3>
        <p className="text-zinc-400">
          {language === 'de'
            ? 'Schauen Sie sich mein Video an, um mehr über meine Kompetenzen zu erfahren'
            : 'Watch my video to learn more about my competencies'}
        </p>
        <a
          href="https://www.youtube.com/watch?v=gk96RVJ0NsQ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white px-7 py-3.5 rounded-full font-semibold border border-white/20 shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_40px_rgba(192,38,211,0.6)] hover:scale-[1.02] transition-all duration-300"
          style={{ touchAction: 'manipulation' }}
        >
          <Play className="w-5 h-5" />
          {language === 'de' ? 'Video ansehen' : 'Watch Video'}
        </a>
      </motion.div>
    </PageLayout>
  );
};

export default Skills;