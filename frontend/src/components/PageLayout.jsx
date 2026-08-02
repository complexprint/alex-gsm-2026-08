import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import NavigationButtons from './NavigationButtons';

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const PageLayout = ({ icon: Icon, title, eyebrow, maxWidth = 'max-w-5xl', children }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-body overflow-hidden">
      {/* Ambient lighting */}
      <div className="pointer-events-none fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-fuchsia-900/20 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-900/20 blur-[140px]" />

      <div className={`relative z-10 mx-auto px-6 lg:px-8 py-20 lg:py-24 ${maxWidth}`}>
        {/* Back button */}
        <button
          data-testid="back-button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30 hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'de' ? 'Zurück' : 'Back'}
        </button>

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-14">
          {eyebrow && (
            <p className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-zinc-500 mb-4">
              {eyebrow}
            </p>
          )}
          <div className="flex items-center gap-4">
            {Icon && (
              <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-white/10">
                <Icon className="w-7 h-7 text-fuchsia-400" />
              </span>
            )}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-200 to-violet-300">
                {title}
              </span>
            </h1>
          </div>
          <div className="mt-6 h-px w-28 bg-gradient-to-r from-fuchsia-500 to-transparent" />
        </motion.div>

        {children}
      </div>

      <NavigationButtons />
    </div>
  );
};