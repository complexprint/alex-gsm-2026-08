import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import { PageLayout, fadeUp } from '../components/PageLayout';

const Contact = () => {
  const { language, t } = useLanguage();

  const contactInfo = [
    { icon: Phone, label: '+43 681 81411499', href: 'tel:+436818141149' },
    { icon: Mail, label: '7css77@gmail.com', href: 'mailto:7css77@gmail.com' },
    { icon: MapPin, label: 'Linz / Steyr / Wien / Salzburg', href: null },
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aleksei-bespechnyi-%E5%8C%85%E5%81%89%E7%BF%94-5a8496217', icon: Linkedin },
    { name: 'Instagram', url: 'https://www.instagram.com/sss1de?igsh=d3Byb2U2MWhzNWJmb', icon: Instagram },
  ];

  return (
    <PageLayout icon={Mail} title={t('contactTitle')} eyebrow={language === 'de' ? 'Kontakt' : 'Get in touch'} maxWidth="max-w-4xl">
      {/* Intro */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 space-y-3">
        <p className="font-heading text-2xl sm:text-3xl font-semibold text-white">{t('contactIntro')}</p>
        <p className="text-lg text-fuchsia-400">{t('contactInternship')}</p>
        <p className="text-zinc-400">{t('contactFlexible')}</p>
      </motion.div>

      {/* Contact cards */}
      <div className="space-y-4 mb-12">
        {contactInfo.map((item, index) => {
          const Icon = item.icon;
          const inner = (
            <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 hover:border-fuchsia-500/30 transition-colors group">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-white/10 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-fuchsia-400" />
                </span>
                <span className="text-lg text-white font-medium">{item.label}</span>
              </div>
            </div>
          );
          return (
            <motion.div key={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={index}>
              {item.href ? (
                <a href={item.href} className="block">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Social */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8"
      >
        <h3 className="font-heading text-xl font-semibold text-white mb-6 text-center">
          {language === 'de' ? 'Folgen Sie mir' : 'Follow me'}
        </h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-3 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30 transition-all duration-300 hover:scale-105"
              >
                <Icon className="w-5 h-5 text-fuchsia-400" />
                <span className="text-white font-medium">{link.name}</span>
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Photo */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 max-w-2xl mx-auto bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-fuchsia-500/30 transition-colors group"
      >
        <div className="overflow-hidden">
          <img src="/sagsmulti1.jpg" alt="SAG'S MULTI! Award" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="p-6 text-center">
          <p className="text-white font-medium text-lg mb-1">
            {language === 'de' ? 'Österreichischer Rhetorik-Meister 2020/21' : 'Austrian Public Speaking Champion 2020/21'}
          </p>
          <p className="text-zinc-500">SAG'S MULTI!</p>
        </div>
      </motion.div>

      {/* CTA */}
      <div className="text-center mt-12">
        <button
          data-testid="contact-make-offer-button"
          onClick={() => {
            const subject = language === 'de' ? 'Angebot machen' : 'Do an offer';
            window.location.href = `mailto:7css77@gmail.com?subject=${encodeURIComponent(subject)}`;
          }}
          className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold text-lg border border-white/20 shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_40px_rgba(192,38,211,0.6)] hover:scale-[1.02] transition-all duration-300"
        >
          <Mail className="w-5 h-5" />
          {t('makeOffer')}
        </button>
      </div>
    </PageLayout>
  );
};

export default Contact;
