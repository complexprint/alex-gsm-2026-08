import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { GraduationCap, MapPin, Calendar, ExternalLink, Award, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';
import useSEO from '../hooks/useSEO';

const Education = () => {
  const { language, t } = useLanguage();

  useSEO({
    title:
      language === 'de'
        ? 'Ausbildung | Aleksei Bespechnyi — Master & Bachelor GSM'
        : 'Education | Aleksei Bespechnyi — Master & Bachelor GSM',
    description:
      language === 'de'
        ? 'Master & Bachelor Global Sales & Marketing an der FH OÖ Campus Steyr, Auslandssemester Providence University Taiwan, HAK Oberwart mit Auszeichnung.'
        : 'Master & Bachelor Global Sales & Marketing at FH Upper Austria (Steyr Campus), exchange semester Providence University Taiwan, HAK Oberwart with distinction.',
    basePath: '/education',
    locale: language === 'de' ? 'de_AT' : 'en_US',
  });

  const isDe = language === 'de';

  const educationItems = [
    {
      id: 'master',
      title: isDe ? 'Master of Arts (MA) – Global Sales and Marketing' : 'Master of Arts (MA) – Global Sales and Marketing',
      location: t('edu1Location'),
      date: isDe ? '2026 – 2028 (1. Studienjahr)' : '2026 – 2028 (1st academic year)',
      isCurrent: true,
      logo: '/FHoo_logo.png',
      logoAlt: 'FH Oberösterreich Logo',
      description: isDe
        ? 'Vertiefendes Masterstudium (100 % auf Englisch) mit Fokus auf internationales B2B-Sales-Management, globale Markterschließung, strategische Preisgestaltung, Verhandlungsführung und datengetriebene Go-to-Market-Strategien.'
        : 'In-depth Master’s degree programme (100% English-taught) focusing on international B2B sales management, global market expansion, strategic pricing, complex negotiation, and data-driven go-to-market strategies.',
    },
    {
      id: 'bachelor',
      title: isDe ? 'Bachelor of Arts (BA) – Global Sales & Marketing' : 'Bachelor of Arts (BA) – Global Sales & Marketing',
      location: t('edu1Location'),
      date: isDe ? '09.2023 – 06.2026 (Abschluss Juni 2026)' : 'Sep 2023 – Jun 2026 (Graduated June 2026)',
      logo: '/FHoo_logo.png',
      logoAlt: 'FH Oberösterreich Logo',
      intro: isDe
        ? 'Studium vollständig auf Englisch, mit Schwerpunkt auf Business-Kommunikation und Präsentationsfähigkeiten. Ausgeprägte Up- und Cross-Selling-Fähigkeiten, die ich durch mehrere praxisnahe Forschungs- und Unternehmensprojekte vertiefen konnte.'
        : 'Fully English-taught programme with a focus on business communication and presentation skills. Strong up- and cross-selling capabilities, deepened through several hands-on research and company projects.',
      hasProjects: true,
    },
    {
      id: 'exchange',
      title: t('edu2Title'),
      location: t('edu2Location'),
      date: t('edu2Date'),
      description: isDe
        ? 'Auslandssemester mit Schwerpunkt auf chinesischer Sprache (Mandarin), asiatischen Marktstrukturen, Verhandlungskultur und interkultureller Geschäftsentwicklung im pazifischen Wirtschaftsraum.'
        : 'Exchange semester with a focus on Chinese language (Mandarin), Asian market dynamics, negotiation etiquette, and intercultural business development in the Asia-Pacific region.',
    },
    {
      id: 'hak',
      title: t('edu3Title'),
      location: t('edu3Location'),
      date: t('edu3Date'),
      description: isDe
        ? 'Fundierte kaufmännische Ausbildung mit Fokus auf Unternehmensführung, Controlling, Rechnungswesen und internationales Marketing. Reife- und Diplomprüfung (Matura) mit ausgezeichnetem Erfolg bestanden.'
        : 'Comprehensive commercial education focusing on corporate management, controlling, accounting, and international marketing. Passed the Austrian Matura (graduation examination) with highest distinction.',
    },
  ];

  return (
    <PageLayout icon={GraduationCap} title={t('educationTitle')} eyebrow={isDe ? 'Ausbildung' : 'Education'} maxWidth="max-w-4xl">
      <div className="relative pl-8 sm:pl-12">
        {/* Vertical line */}
        <div className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-fuchsia-500 via-violet-500 to-transparent" />

        <div className="space-y-8">
          {educationItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={index}
              className="relative"
            >
              {/* Dot */}
              <span className={`absolute -left-8 sm:-left-12 top-7 w-4 h-4 rounded-full ring-4 ring-[#050505] ${
                item.isCurrent ? 'bg-gradient-to-br from-fuchsia-400 to-violet-500 shadow-[0_0_12px_rgba(217,70,239,0.8)]' : 'bg-gradient-to-br from-zinc-400 to-zinc-600'
              }`} />

              <div className={`bg-zinc-900/40 border rounded-3xl p-6 sm:p-8 transition-colors ${
                item.isCurrent ? 'border-fuchsia-500/40 shadow-[0_0_40px_-15px_rgba(217,70,239,0.3)]' : 'border-white/10 hover:border-fuchsia-500/30'
              }`}>
                {/* Header with optional Current badge and FH Logo */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    {item.isCurrent && (
                      <span className="inline-block bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-lg mb-3">
                        {isDe ? 'AKTUELL' : 'CURRENT'}
                      </span>
                    )}
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white">{item.title}</h3>
                  </div>

                  {item.logo && (
                    <div className="self-start bg-white/95 px-3 py-1.5 rounded-xl border border-white/20 shadow-sm shrink-0">
                      <img src={item.logo} alt={item.logoAlt} className="h-6 sm:h-7 w-auto object-contain" />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400 mb-4">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-fuchsia-400" />
                    {item.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-violet-400" />
                    {item.date}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-4 pt-4 border-t border-white/10 text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.intro && (
                  <p className="mt-4 pt-4 border-t border-white/10 text-zinc-400 text-sm leading-relaxed">
                    {item.intro}
                  </p>
                )}

                {/* Bachelor Projects section */}
                {item.hasProjects && (
                  <div className="mt-6 space-y-6">
                    {/* Nimbuscloud Project Card */}
                    <div className="bg-zinc-950/60 border border-fuchsia-500/20 rounded-2xl p-5 sm:p-6 hover:border-fuchsia-500/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white/95 p-1.5 border border-white/20 shadow-sm flex items-center justify-center shrink-0">
                            <img src="/Nimbuscloud_logo.png" alt="Nimbuscloud Logo" className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <span className="text-[11px] font-semibold tracking-wider uppercase text-fuchsia-400 block">
                              {isDe ? 'Forschungsprojekt • B2B-SaaS' : 'Research Project • B2B SaaS'}
                            </span>
                            <h4 className="font-heading text-base sm:text-lg font-semibold text-white">
                              {isDe
                                ? 'Unternehmensprojekt Nimbuscloud (B2B-SaaS, Linz) — Pricing- & Gamification-Strategie'
                                : 'Company Project Nimbuscloud (B2B SaaS, Linz) — Pricing & Gamification Strategy'}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="text-zinc-300 text-sm leading-relaxed space-y-3">
                        <p>
                          {isDe ? (
                            <>
                              Im Rahmen eines Forschungsprojekts mit dem Steyrer Startup Nimbuscloud (CRM- und Ticketing-Plattform für Tanzschulen im DACH-Raum) habe ich zwei Themenfelder bearbeitet. Die Projektthemen wurden von{' '}
                              <a
                                href="https://pure.fh-ooe.at/en/persons/christopher-korntner-kanitz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-fuchsia-400 hover:text-fuchsia-300 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                              >
                                FH-Prof. Dr. Christopher Korntner-Kanitz
                                <ExternalLink className="w-3 h-3 inline" />
                              </a>{' '}
                              vorgeschlagen; die Konzepte und die gesamte Datenanalyse habe ich eigenständig erarbeitet.
                            </>
                          ) : (
                            <>
                              As part of a research project with Steyr-based startup Nimbuscloud (CRM and ticketing platform for dance schools in the DACH region), I worked on two focus areas. The project topics were proposed by{' '}
                              <a
                                href="https://pure.fh-ooe.at/en/persons/christopher-korntner-kanitz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-fuchsia-400 hover:text-fuchsia-300 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
                              >
                                FH-Prof. Dr. Christopher Korntner-Kanitz
                                <ExternalLink className="w-3 h-3 inline" />
                              </a>
                              ; I independently developed the strategic concepts and performed the complete empirical data analysis.
                            </>
                          )}
                        </p>

                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-2">
                          <p className="font-medium text-white flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-fuchsia-400 shrink-0" />
                            {isDe ? 'Pricing-Analyse auf Basis realer Kundendaten:' : 'Pricing Analysis Based on Real Customer Data:'}
                          </p>
                          <p className="text-zinc-400 text-xs sm:text-sm pl-6">
                            {isDe
                              ? 'Analyse von 306 Tanzschulen (4 Tarifpakete) zur Ermittlung der Paket-Optimalität. Ergebnis: Nur 1 von 306 Kunden im optimalen Paket; identifiziertes Umsatzpotenzial von ca. €108.000/Monat. Darauf aufbauend ein 3-stufiges Tarifmodell (Low/Mid/High) entwickelt, das nach Modellrechnung einen Umsatzanstieg von +92 % ermöglicht hätte.'
                              : 'Empirical analysis of 306 dance schools across 4 pricing packages to evaluate plan optimality. Result: Only 1 out of 306 customers was on their optimal tier; identified monthly revenue potential of ~€108,000. Developed a 3-tier pricing model (Low/Mid/High) projected to enable a +92% revenue increase.'}
                          </p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-2">
                          <p className="font-medium text-white flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                            {isDe ? 'Gamification-Konzept für B2C & B2B:' : 'Gamification Concept for B2C & B2B:'}
                          </p>
                          <p className="text-zinc-400 text-xs sm:text-sm pl-6">
                            {isDe
                              ? 'Auf Basis von Forschungsliteratur (u. a. Hexad User Types, personalisierte Gamification) ein Belohnungssystem entworfen — Streaks, Achievement-Badges, Leaderboards, maskotengestütztes Engagement («Dance Buddy») sowie gamifizierte Onboarding-Mechaniken für B2B-Kunden.'
                              : 'Designed a comprehensive reward system based on research literature (including Hexad User Types, personalized gamification) featuring streaks, achievement badges, leaderboards, mascot-driven engagement ("Dance Buddy"), and gamified B2B onboarding mechanics.'}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-400 pt-1 italic">
                          <strong className="text-fuchsia-300 not-italic">{isDe ? 'Interessant dabei: ' : 'Key Takeaway: '}</strong>
                          {isDe
                            ? 'Elemente beider Konzepte — gestufte Tarife (Tiered Pricing) und API-basierte Abrechnung nach Nutzungsvolumen — finden sich inzwischen in der tatsächlichen Preisstrategie von Nimbuscloud wieder.'
                            : 'Elements of both strategic concepts — tiered pricing and usage-based API billing — are now reflected in Nimbuscloud’s actual live pricing strategy.'}
                        </p>
                      </div>
                    </div>

                    {/* voestalpine Project Card */}
                    <div className="bg-zinc-950/60 border border-violet-500/20 rounded-2xl p-5 sm:p-6 hover:border-violet-500/40 transition-colors">
                      <div className="mb-4">
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-violet-400 block">
                          {isDe ? 'Teamreport • B2B Dynamic Pricing' : 'Team Report • B2B Dynamic Pricing'}
                        </span>
                        <h4 className="font-heading text-base sm:text-lg font-semibold text-white">
                          {isDe
                            ? 'Unternehmensprojekt voestalpine Steel Division — B2B Dynamic Pricing'
                            : 'Company Project voestalpine Steel Division — B2B Dynamic Pricing'}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1">
                          {isDe
                            ? 'Teamreport von zwölf Studierenden der FH Oberösterreich (Betreuung: Dr. Andreas Zehetner, 2025)'
                            : 'Team report by twelve students at FH Upper Austria (supervised by Dr. Andreas Zehetner, 2025)'}
                        </p>
                      </div>

                      <div className="text-zinc-300 text-sm leading-relaxed space-y-3">
                        <p className="text-zinc-400">
                          {isDe
                            ? 'Das Projekt ist ein Teamreport von zwölf Studierenden der FH Oberösterreich (Betreuung: Dr. Andreas Zehetner, 2025) über Dynamic Pricing im B2B-Bereich, angewendet auf die Steel Division der voestalpine. Bisher haben wir:'
                            : 'A comprehensive team report by twelve FH Upper Austria students (supervised by Dr. Andreas Zehetner, 2025) on B2B dynamic pricing applied to the Steel Division of voestalpine. Core work packages accomplished:'}
                        </p>

                        <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                            <span>
                              <strong className="text-white">{isDe ? 'Grundlagen: ' : 'Fundamentals: '}</strong>
                              {isDe
                                ? 'Dynamic Pricing und Preiselastizität definiert und erklärt, warum die bekannten Beispiele (Amazon, Airlines, Uber) meist B2C sind und ihre Faktoren nicht direkt auf B2B übertragbar sind.'
                                : 'Defined dynamic pricing and price elasticity, detailing why well-known examples (Amazon, airlines, Uber) are predominantly B2C and their pricing drivers cannot be directly transferred to B2B.'}
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                            <span>
                              <strong className="text-white">{isDe ? 'Primärforschung: ' : 'Primary Research: '}</strong>
                              {isDe
                                ? 'Eine Umfrage auf der Bauma 2025 in München (111 vollständige Antworten von Entscheidungsträgern, Einkauf und Expert:innen) sowie vier Experteninterviews, darunter ein Interview mit dem CEO von RemAvtoSnab (Belarus).'
                                : 'Survey conducted at Bauma 2025 in Munich (111 verified responses from corporate decision-makers, procurement managers, and industry experts) plus four in-depth expert interviews, including with the CEO of RemAvtoSnab (Belarus).'}
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                            <span>
                              <strong className="text-white">{isDe ? 'Fallstudien: ' : 'Case Studies: '}</strong>
                              {isDe
                                ? 'RemAvtoSnab (Kundensegmentierung, eigene Preissoftware, manuelle Endpreisfestlegung, 35-%-Aufschlagsgrenze laut Resolution Nr. 713) und ArcelorMittal (indexgebundene Preise, Absicherung von Energie-, Fracht-, CO₂- und Währungsrisiken, Zuschläge).'
                                : 'RemAvtoSnab (customer segmentation, custom pricing software, manual price determination, 35% margin ceiling under Resolution No. 713) and ArcelorMittal (index-linked pricing, hedging of energy, freight, CO2, and currency risks, surcharges).'}
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                            <span>
                              <strong className="text-white">{isDe ? 'Umfrageergebnisse: ' : 'Survey Findings: '}</strong>
                              {isDe
                                ? 'Das Bewusstsein ist hoch, die Anwendung gering (19,4 % nutzen KI bei der Preisgestaltung, unter 10 % Echtzeit-Anpassungen). Transparenz ist am wichtigsten (6,7/7), und Vertrieb und Einkauf sehen Dynamic Pricing unterschiedlich.'
                                : 'High market awareness vs. low adoption (19.4% utilize AI in pricing, under 10% implement real-time adjustments). Transparency ranked as paramount (6.7/7), with sales and procurement holding divergent views on dynamic pricing.'}
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                            <span>
                              <strong className="text-white">{isDe ? 'Literaturrecherche: ' : 'Literature Review: '}</strong>
                              {isDe
                                ? 'Einflussfaktoren gegliedert in Markt/Wirtschaft, Kunden sowie Organisation/Technologie.'
                                : 'Systematic classification of pricing determinants into market/economy, customer, and organization/technology.'}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Thesis callout */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-start gap-3.5">
                      <BookOpen className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <strong className="text-white block mb-1">
                          {isDe ? 'Bachelorarbeit / Diplomarbeit:' : 'Bachelor Thesis:'}
                        </strong>
                        <p className="text-zinc-400">
                          {isDe
                            ? '„How AI can boost qualitative and quantitative research methodologies in B2B: The case of Voestalpine in the Railway Sector" — eine Untersuchung, wie Künstliche Intelligenz qualitative und quantitative Forschungsmethoden im B2B-Bereich optimiert, am konkreten Beispiel von voestalpine im Schienenverkehrssektor.'
                            : '"How AI can boost qualitative and quantitative research methodologies in B2B: The case of Voestalpine in the Railway Sector" — an empirical investigation into how Artificial Intelligence enhances qualitative and quantitative research methodologies in B2B, specifically evaluated on voestalpine in the railway sector.'}
                        </p>
                      </div>
                    </div>
                  </div>
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
