import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';
import useSEO from '../hooks/useSEO';

const Education = () => {
  const { language, t } = useLanguage();

  useSEO({
    title:
      language === 'de'
        ? 'Ausbildung | Aleksei Bespechnyi — Bachelor GSM, FH Steyr'
        : 'Education | Aleksei Bespechnyi — Bachelor Global Sales & Marketing, FH Steyr',
    description:
      language === 'de'
        ? 'Bachelor Global Sales & Marketing an der FH OÖ Campus Steyr (Englisch), Auslandssemester Providence University Taiwan, HAK Oberwart mit Auszeichnung.'
        : 'Bachelor Global Sales & Marketing (fully English-taught) at FH Upper Austria, Steyr Campus. Exchange semester Providence University Taiwan. HAK Oberwart with distinction. Company projects with voestalpine and Nimbuscloud.',
    canonical: 'https://alex-gsm.at/education',
    locale: language === 'de' ? 'de_AT' : 'en_US',
  });

  const educationItems = [
    {
      title: t('edu1Title'),
      location: t('edu1Location'),
      date: t('edu1Date'),
      description:
        language === 'de'
          ? 'Studium vollständig auf Englisch, mit Schwerpunkt auf Business-Kommunikation und Präsentationsfähigkeiten. Ausgeprägte Up- und Cross-Selling-Fähigkeiten, die ich durch mehrere praxisnahe Unternehmensprojekte mit Partnern wie voestalpine und Nimbuscloud vertiefen konnte.\n\nIm Rahmen eines Unternehmensprojekts habe ich ein dynamisches Pricing-Modell für voestalpine mitentwickelt, das mittlerweile erfolgreich implementiert wurde. Für das Linzer Startup Nimbuscloud habe ich zudem ein neues Pricing-Modell sowie Gamification-Mechaniken mitentwickelt und analysiert.\n\nAbgerundet wird dies durch meine Diplomarbeit „How AI can boost qualitative and quantitative research methodologies in B2B: The case of Voestalpine in the Railway Sector" — eine Untersuchung, wie Künstliche Intelligenz qualitative und quantitative Forschungsmethoden im B2B-Bereich verbessern kann, am konkreten Beispiel von voestalpine im Schienenverkehrssektor.'
          : 'Fully English-taught programme with a focus on business communication and presentation skills. Strong up- and cross-selling capabilities, deepened through several hands-on company projects with partners such as voestalpine and Nimbuscloud.\n\nWithin one company project I co-developed a dynamic pricing model for voestalpine that has since been successfully implemented. For the Linz-based startup Nimbuscloud I also co-designed and analysed a new pricing model as well as gamification mechanics.\n\nThis is rounded out by my bachelor thesis "How AI can boost qualitative and quantitative research methodologies in B2B: The case of Voestalpine in the Railway Sector" — an investigation into how Artificial Intelligence can improve qualitative and quantitative research methodologies in B2B, using the concrete example of voestalpine in the railway sector.',
    },
    { title: t('edu2Title'), location: t('edu2Location'), date: t('edu2Date') },
    { title: t('edu3Title'), location: t('edu3Location'), date: t('edu3Date') },
  ];

  return (
    <PageLayout icon={GraduationCap} title={t('educationTitle')} eyebrow={language === 'de' ? 'Ausbildung' : 'Education'} maxWidth="max-w-4xl">
      <div className="relative pl-8 sm:pl-12">
        {/* Vertical line */}
        <div className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-fuchsia-500 via-violet-500 to-transparent" />

        <div className="space-y-8">
          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              className="relative"
            >
              {/* Dot */}
              <span className="absolute -left-8 sm:-left-12 top-7 w-4 h-4 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-500 ring-4 ring-[#050505]" />

              <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-7 hover:border-fuchsia-500/30 transition-colors">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <span className="inline-flex items-center gap-2 text-zinc-400">
                    <MapPin className="w-4 h-4 text-fuchsia-400" />
                    {item.location}
                  </span>
                  <span className="inline-flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-4 h-4 text-violet-400" />
                    {item.date}
                  </span>
                </div>
                {item.description && (
                  <p className="mt-5 pt-5 border-t border-white/10 text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Education;