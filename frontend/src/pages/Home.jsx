import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Mail,
  ExternalLink,
  Briefcase,
  Heart,
  TrendingUp,
  Users,
  BarChart3,
  ArrowUpRight,
  Phone,
  MapPin,
  Globe,
  Target,
  Handshake,
} from 'lucide-react';
import NavigationButtons from '../components/NavigationButtons';

const portraitImage = 'Aleksei Bespechnyi.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Home = () => {
  const { language } = useLanguage();

  const handleMakeOffer = () => {
    const subject =
      language === 'de'
        ? 'Angebot für Aleksei Bespechnyi – International Sales / Business Development'
        : 'Opportunity for Aleksei Bespechnyi – International Sales / Business Development';
    const body =
      language === 'de'
        ? 'Hallo Aleksei,%0D%0A%0D%0Awir haben Ihr Profil gesehen und möchten Ihnen folgende Position / Projekt anbieten:%0D%0A%0D%0A'
        : 'Hi Aleksei,%0D%0A%0D%0AWe saw your profile and would like to offer you the following position / project:%0D%0A%0D%0A';
    window.location.href = `mailto:7css77@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const skills = [
    'International Sales',
    'Business Development',
    'CRM & Cold Outreach',
    'Market Research',
    'Marketing Automation',
    'SEO & Content',
    'Meta Ads',
    'Analytics',
  ];

  const lookingFor = [
    { icon: Globe, label: language === 'de' ? 'Internationaler Vertrieb' : 'International Sales' },
    { icon: TrendingUp, label: 'Business Development' },
    { icon: Handshake, label: language === 'de' ? 'Internationale Projekte' : 'International Projects' },
    { icon: Target, label: language === 'de' ? 'Kundenakquise' : 'Client Acquisition' },
  ];

  const metrics = [
    {
      label: 'Organic Social',
      sublabel: language === 'de' ? 'Reichweite' : 'Reach',
      growth: '+496%',
      before: '25',
      after: '149',
      width: '88%',
      engagement: '60.0% → 80.5%',
      bar: 'from-fuchsia-500 to-pink-500',
      icon: TrendingUp,
    },
    {
      label: 'Organic Search',
      sublabel: language === 'de' ? 'Traffic' : 'Traffic',
      growth: '+124%',
      before: '383',
      after: '858',
      width: '64%',
      engagement: '59.0% → 70.6%',
      bar: 'from-violet-500 to-indigo-500',
      icon: Users,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-body overflow-hidden">
      {/* Ambient lighting */}
      <div className="pointer-events-none fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-fuchsia-900/20 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-900/20 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* HERO CONTENT */}
          <motion.section
            data-testid="hero-section"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="lg:col-span-8 flex flex-col justify-center bg-zinc-900/30 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-px w-2/3 bg-gradient-to-r from-fuchsia-500/60 to-transparent" />
            <p className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-zinc-500 mb-5">
              {language === 'de' ? 'Linz · Steyr · Wien · Salzburg' : 'Linz · Steyr · Vienna · Salzburg'}
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
              Aleksei
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-300 to-violet-400">
                Bespechnyi
              </span>
            </h1>
            <h2 className="font-heading text-lg md:text-2xl font-medium text-fuchsia-400 mt-4">
              International Sales &amp; Business Development
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-zinc-400 mt-6 max-w-2xl">
              {language === 'de'
                ? 'Bewiesene Ergebnisse: +496% Organic Social Reichweite, +124% Organic Search Traffic. Marketing als Turbo – Vertrieb als Motor.'
                : 'Proven results: +496% Organic Social reach, +124% Organic Search traffic. Marketing as the turbo – sales as the engine.'}
            </p>
            <p className="text-sm text-zinc-500 mt-3">
              {language === 'de'
                ? 'Bachelor Global Sales & Marketing Student (letztes Semester, FH Steyr)'
                : 'Bachelor Global Sales & Marketing Student (final semester, FH Steyr)'}
            </p>

            {/* Contact row */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm">
              <a href="tel:+4368181411499" className="group inline-flex items-center gap-2 text-zinc-300 hover:text-fuchsia-400 transition-colors">
                <Phone className="w-4 h-4 text-zinc-500 group-hover:text-fuchsia-400 transition-colors" />
                +43 681 81411499
              </a>
              <a href="mailto:7css77@gmail.com?subject=International%20Sales%20Zusammenarbeit" className="group inline-flex items-center gap-2 text-zinc-300 hover:text-fuchsia-400 transition-colors">
                <Mail className="w-4 h-4 text-zinc-500 group-hover:text-fuchsia-400 transition-colors" />
                7css77@gmail.com
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Linz,Austria" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-zinc-300 hover:text-fuchsia-400 transition-colors">
                <MapPin className="w-4 h-4 text-zinc-500 group-hover:text-fuchsia-400 transition-colors" />
                Linz/Steyr/Wien/Salzburg
              </a>
            </div>

            {/* Skills */}
            <div data-testid="skills-list" className="flex flex-wrap gap-2 mt-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9">
              <button
                data-testid="cta-button-send-offer"
                onClick={handleMakeOffer}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold tracking-wide border border-white/20 shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_40px_rgba(192,38,211,0.6)] hover:scale-[1.02] transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-3" />
                {language === 'de' ? 'Jetzt Angebot senden' : 'Send an offer'}
              </button>
            </div>
          </motion.section>

          {/* PORTRAIT */}
          <motion.section
            data-testid="portrait-card"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="lg:col-span-4 min-h-[420px] lg:min-h-full relative rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_80px_-20px_rgba(217,70,239,0.25)]"
          >
            <img
              src={portraitImage}
              alt="Aleksei Bespechnyi – International Sales & Business Development, Linz, Österreich"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-xs text-zinc-200">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {language === 'de' ? 'Offen für Angebote' : 'Open for opportunities'}
              </span>
            </div>
          </motion.section>

          {/* MINDSET */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-12 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 lg:p-12 rounded-3xl"
          >
            <Heart className="w-8 h-8 text-fuchsia-400 mb-4" />
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
              {language === 'de' ? 'Meine Denkweise' : 'My Mindset'}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-zinc-400 leading-relaxed">
              <p>
                {language === 'de'
                  ? 'Marketing kann Aufmerksamkeit erregen. Aber echter Erfolg entsteht, wenn Aufmerksamkeit in Kunden und Kunden in Umsatz verwandelt werden. Während meines Praktikums habe ich den gesamten Funnel optimiert und die Conversion verbessert – das war der Turbo. Mein eigentlicher Fokus liegt jedoch auf dem Motor: internationalem Vertrieb und Geschäftsentwicklung.'
                  : 'Marketing can attract attention. But real success happens when attention turns into clients, and clients into revenue. During my internship I optimized the entire funnel and improved conversion – that was the turbo. But my core focus is on the engine: international sales and business development.'}
              </p>
              <p>
                {language === 'de'
                  ? 'Ich finde und eröffne neue Märkte, baue Gespräche mit internationalen Kunden auf, verstehe ihre Bedürfnisse und passe das Angebot so an, dass aus Interesse konkreter Umsatz wird. Marketing ist für mich dabei kein Selbstzweck, sondern ein strategisches Werkzeug zur Kundenakquise.'
                  : 'I find and open new markets, build conversations with international clients, understand their needs and adapt the offer so that interest turns into concrete revenue. For me, marketing is not an end in itself, but a strategic tool for client acquisition.'}
              </p>
            </div>
          </motion.section>

          {/* EXPERIENCE + METRICS */}
          <motion.section
            data-testid="experience-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-12 bg-zinc-900/40 border border-white/10 hover:border-fuchsia-500/30 transition-colors p-8 lg:p-12 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-8 h-8 text-fuchsia-400" />
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight">
                {language === 'de' ? 'Letzte Erfahrung' : 'Recent Experience'}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Metrics dashboard */}
              <div data-testid="metrics-dashboard" className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col gap-7 shadow-2xl order-2 lg:order-1">
                <div className="flex items-center gap-4">
                  <img
                    src="schoolbus.jpeg"
                    alt="Partybus von partyboss.at"
                    className="w-12 h-12 object-cover rounded-full border border-white/20"
                    style={{ objectPosition: 'center 60%' }}
                  />
                  <div>
                    <p className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      {language === 'de' ? 'Ergebnisse (Google Analytics)' : 'Results (Google Analytics)'}
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">
                      {language === 'de' ? 'Nov–Jan → Feb–Mai' : 'Nov–Jan → Feb–May'}
                    </p>
                  </div>
                </div>

                {metrics.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-2 text-white font-medium">
                          <Icon className="w-4 h-4 text-zinc-400" />
                          {m.label}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-green-500/15 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                          <ArrowUpRight className="w-4 h-4" />
                          {m.growth}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${m.bar} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: m.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <span className="text-zinc-500">
                          {m.before} <span className="text-zinc-600">→</span>{' '}
                          <span className="text-white font-semibold">{m.after}</span>
                        </span>
                        <span className="text-zinc-500">
                          {language === 'de' ? 'Engagement: ' : 'Engagement: '}
                          <span className="text-green-400">{m.engagement}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Text + testimonial */}
              <div className="space-y-5 order-1 lg:order-2">
                <p className="text-zinc-400 leading-relaxed">
                  {language === 'de'
                    ? 'Von Februar bis Mai 2026 verstärkte ich das Team der Roll Out Innovation GmbH – Betreiber der Plattform partyboss.at. Meine Aufgabe: den Vertrieb und die digitale Sichtbarkeit der neuen Marke aufbauen. Durch gezielte Social-Media-Strategien und SEO-Optimierung konnte ich die organische Reichweite signifikant steigern und die Engagement-Raten in allen Kanälen verbessern.'
                    : 'From February to May 2026 I strengthened the team of Roll Out Innovation GmbH - operator of the platform partyboss.at. My task: to build up the sales and digital visibility of the new brand. Through targeted social media strategies and SEO optimization, I significantly increased organic reach and improved engagement rates across all channels.'}
                </p>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                  <p className="text-zinc-300 text-sm italic leading-relaxed mb-3">
                    {language === 'de'
                      ? '„Aleksei hat in nur drei Monaten bewiesen, dass er digitales Marketing versteht. Die Zahlen sprechen für sich: fast 500% mehr organische Sichtbarkeit und deutlich höhere Interaktionsraten. Er arbeitet selbstständig, denkt strategisch und liefert Ergebnisse. Genau die Art von Mitarbeiter, die wir gesucht haben."'
                      : '„Aleksei proved in just three months that he understands digital marketing. The numbers speak for themselves: almost 500% more organic visibility and significantly higher interaction rates. He works independently, thinks strategically, and delivers results. Exactly the kind of employee we were looking for."'}
                  </p>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-white text-sm font-semibold">Sascha Reischl</p>
                    <p className="text-zinc-500 text-xs">Geschäftsführer, Roll Out Innovation GmbH</p>
                  </div>
                </div>

                <a
                  href="https://partyboss.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:scale-[1.02] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(192,38,211,0.25)]"
                >
                  <ExternalLink className="w-5 h-5" />
                  {language === 'de' ? 'Besuchen Sie partyboss.at' : 'Visit partyboss.at'}
                </a>
              </div>
            </div>
          </motion.section>

          {/* LOOKING FOR */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-12 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 lg:p-12 rounded-3xl"
          >
            <TrendingUp className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              {language === 'de' ? 'Wonach ich suche' : 'What I’m looking for'}
            </h3>
            <p className="text-zinc-400 leading-relaxed max-w-3xl mb-8">
              {language === 'de'
                ? 'Ich suche ein Unternehmen, das wirklich international wachsen will – und versteht, dass Vertrieb mehr ist als nur ein CRM zu befüllen. Ich biete eine Kombination aus analytischem Marketing-Denken und praktischer Vertriebserfahrung: jemanden, der aus Aufmerksamkeit Umsatz macht.'
                : 'I’m looking for a company that genuinely wants to grow internationally – and understands that sales is more than just filling a CRM. I offer a combination of analytical marketing thinking and hands‑on sales experience: someone who turns attention into revenue.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {lookingFor.map(({ icon: Icon, label }) => (
                <div key={label} className="bg-[#0A0A0A] p-7 hover:bg-[#111] transition-colors flex flex-col gap-4 group">
                  <Icon className="w-7 h-7 text-violet-400 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium text-sm">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-500 pt-6">
              {language === 'de'
                ? 'Derzeit offen für spannende Angebote und freue mich auf ein persönliches Gespräch.'
                : 'Currently open for exciting opportunities and looking forward to a personal conversation.'}
            </p>
          </motion.section>

          {/* SOCIAL PROJECTS */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-12 bg-gradient-to-br from-zinc-900/60 to-[#0A0512]/60 border border-white/10 p-8 lg:p-12 rounded-3xl"
          >
            <Heart className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
              {language === 'de' ? 'Digital Marketing für soziale Projekte' : 'Digital Marketing for Social Projects'}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-zinc-400 leading-relaxed">
              <p>
                {language === 'de'
                  ? 'Neben meiner Tätigkeit bei partyboss.at unterstütze ich die Roll Out Innovation GmbH bei der digitalen Sichtbarkeit ihrer sozialen Initiativen unter der Marke Zukunft Jugend.'
                  : 'In addition to my work at partyboss.at, I support Roll Out Innovation GmbH in building digital visibility for their social initiatives under the Zukunft Jugend brand.'}
              </p>
              <p>
                {language === 'de'
                  ? 'Meine Aufgabe ist es, die Reichweite der Plattformen zukunft-jugend.at und sascha-reischl.at/veranstaltungen zu erhöhen. Ich analysiere die Zielgruppen (Jugendliche, Gemeinden) und setze Maßnahmen im Bereich Content Marketing & SEO um, um die innovativen Jugendprojekte wie MobileJULEI und DriveJUZ bekannter zu machen.'
                  : 'My task is to increase the reach of the platforms zukunft-jugend.at and sascha-reischl.at/veranstaltungen. I analyze target audiences (youth, municipalities) and implement content marketing & SEO strategies to raise awareness for innovative youth projects like MobileJULEI and DriveJUZ.'}
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mt-6">
              <p className="text-violet-300 text-sm italic">
                {language === 'de'
                  ? 'Diese Arbeit gibt mir die einmalige Chance, meine Marketing-Kenntnisse in einem sinnstiftenden, sozialen Umfeld anzuwenden.'
                  : 'This work gives me a unique opportunity to apply my marketing skills in a meaningful, social environment.'}
              </p>
            </div>

            <div data-testid="social-projects-links" className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://zukunft-jugend.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/30 rounded-full px-6 py-3 text-sm flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-violet-400" />
                zukunft-jugend.at
              </a>
              <a
                href="https://sascha-reischl.at/veranstaltungen"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/30 rounded-full px-6 py-3 text-sm flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-violet-400" />
                sascha-reischl.at
              </a>
            </div>
          </motion.section>
        </div>
      </div>

      <NavigationButtons />
    </div>
  );
};

export default Home;
