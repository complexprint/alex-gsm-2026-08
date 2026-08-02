import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Download, Globe } from 'lucide-react';
import MobileNavigation from './MobileNavigation';

const Layout = ({ children }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#050505] font-body">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-end">
            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30 hover:text-white transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                {language === 'de' ? 'EN' : 'DE'}
              </button>

              {/* CV Download */}
              <a
                href="ALEKSEI_BESPECHNYI.pdf"
                download="ALEKSEI_BESPECHNYI.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-sm font-semibold border border-white/20 shadow-[0_0_20px_rgba(192,38,211,0.25)] hover:shadow-[0_0_35px_rgba(192,38,211,0.5)] hover:scale-[1.02] transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                {t('downloadCV')}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-0 md:pb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-[#050505] border-t border-white/10 py-8 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-zinc-500 text-sm">
              {t('footerRights')}
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="https://www.linkedin.com/in/aleksei-bespechnyi-%E5%8C%85%E5%81%89%E7%BF%94-5a8496217" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-fuchsia-400 transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a 
                href="https://www.instagram.com/sss1de?igsh=d3Byb2U2MWhzNWJmb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-fuchsia-400 transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Layout;