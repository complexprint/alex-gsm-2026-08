import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, Building, Award, Rocket } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';

const Experience = () => {
  const { language, t } = useLanguage();

  const experiences = [
    { title: t('exp0Title'), company: t('exp0Company'), description: t('exp0Desc'), date: t('exp0Date'), icon: Rocket, isNew: true },
    { title: t('exp1Title'), company: t('exp1Company'), description: t('exp1Desc'), date: '', icon: Briefcase },
    { title: t('exp2Title'), company: t('exp2Company'), description: t('exp2Desc'), date: t('exp2Date'), icon: Building },
    { title: t('exp3Title'), company: t('exp3Company'), description: t('exp3Desc'), date: t('exp3Date'), location: t('exp3Location'), icon: Briefcase },
    { title: t('exp4Title'), company: t('exp4Company'), description: t('exp4Desc'), date: '', icon: Award },
    { title: t('exp5Title'), company: t('exp5Company'), description: '', date: t('exp5Date'), icon: Award },
    { title: t('exp6Title'), company: '', description: t('exp6Desc'), date: '', icon: Award },
  ];

  const gallery = [
    {
      src: 'https://customer-assets.emergentagent.com/job_fd904bed-5879-4fab-b033-6534ac767df4/artifacts/3cugpbt3_schoolbus.jpeg',
      title: 'partyboss.at',
      caption: language === 'de' ? 'Vertrieb & Digital Marketing' : 'Sales & Digital Marketing',
      objectPosition: 'center 60%',
      isNew: true,
    },
    { src: '/nxrt.jpg', title: 'NXRT GmbH', caption: language === 'de' ? 'XR-Technologien & Nachhaltigkeit' : 'XR Technologies & Sustainability', objectPosition: 'center 35%' },
    { src: '/moonshot.jpg', title: 'Moonshot Bootcamp', caption: language === 'de' ? 'SDGs & Exponential Tech' : 'SDGs & Exponential Tech' },
    { src: '/sap.jpg', title: 'SAP', caption: 'MM, FI, SD' },
    { src: '/urkunde.jpg', title: language === 'de' ? 'Urkunde' : 'Certificate', caption: language === 'de' ? 'Auszeichnung' : 'Award' },
    { src: '/abschlusszertifikat.jpg', title: language === 'de' ? 'Abschlusszertifikat' : 'Graduation Certificate', caption: 'HAK Oberwart' },
  ];

  return (
    <PageLayout icon={Briefcase} title={t('experienceTitle')} eyebrow={language === 'de' ? 'Werdegang' : 'Career'} maxWidth="max-w-5xl">
      {/* Experience cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {experiences.map((exp, index) => {
          const Icon = exp.icon;
          return (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={index}
              className={`relative bg-zinc-900/40 border rounded-3xl p-7 transition-colors group ${
                exp.isNew ? 'border-fuchsia-500/40 shadow-[0_0_40px_-15px_rgba(217,70,239,0.4)]' : 'border-white/10 hover:border-fuchsia-500/30'
              }`}
            >
              {exp.isNew && (
                <span className="absolute -top-2 right-6 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-lg">
                  {language === 'de' ? 'AKTUELL' : 'CURRENT'}
                </span>
              )}
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-white/10 mb-5 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-fuchsia-400" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-white mb-1">{exp.title}</h3>
              {exp.company && <p className="text-fuchsia-400 text-sm font-medium mb-1">{exp.company}</p>}
              {exp.location && <p className="text-zinc-500 text-sm mb-1">{exp.location}</p>}
              {exp.date && <p className="text-zinc-600 text-xs mb-3">{exp.date}</p>}
              {exp.description && <p className="text-zinc-400 text-sm leading-relaxed mt-2">{exp.description}</p>}
            </motion.div>
          );
        })}
      </div>

      {/* Gallery */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight mt-16 mb-8"
      >
        {language === 'de' ? 'Projektgalerie' : 'Project Gallery'}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gallery.map((g, i) => (
          <motion.div
            key={g.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={i}
            className={`group bg-zinc-900/40 border rounded-3xl overflow-hidden transition-colors ${
              g.isNew ? 'border-fuchsia-500/40' : 'border-white/10 hover:border-fuchsia-500/30'
            }`}
          >
            <div className="overflow-hidden">
              <img
                src={g.src}
                alt={g.title}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                style={g.objectPosition ? { objectPosition: g.objectPosition } : undefined}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-white font-medium">{g.title}</p>
                {g.isNew && (
                  <span className="bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {language === 'de' ? 'AKTUELL' : 'CURRENT'}
                  </span>
                )}
              </div>
              <p className="text-zinc-500 text-sm mt-1">{g.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Experience;