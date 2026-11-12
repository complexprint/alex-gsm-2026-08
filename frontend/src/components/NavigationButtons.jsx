import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, User, GraduationCap, Briefcase, Award, Mail, TrendingUp } from 'lucide-react';
import useClickSound from '../hooks/useClickSound';

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const playClickSound = useClickSound();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const prefix = language === 'en' ? '/en' : '';
  const navItems = [
    { path: prefix || '/', label: 'Home', icon: Home, delay: 0 },
    { path: `${prefix}/about`, label: t('navAbout'), icon: User, delay: 100 },
    { path: `${prefix}/education`, label: t('navEducation'), icon: GraduationCap, delay: 200 },
    { path: `${prefix}/experience`, label: t('navExperience'), icon: Briefcase, delay: 300 },
    { path: `${prefix}/skills`, label: t('navSkills'), icon: Award, delay: 400 },
    { path: `${prefix}/trends`, label: t('navTrends'), icon: TrendingUp, delay: 500 },
    { path: `${prefix}/contact`, label: t('navContact'), icon: Mail, delay: 600 },
  ];

  return (
    <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col space-y-4">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => {
              playClickSound();
              navigate(item.path);
            }}
            className={`group relative bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-l-2xl px-6 py-4 transition-all duration-500 hover:border-fuchsia-500/40 hover:shadow-xl hover:shadow-fuchsia-500/20 ${
              isVisible 
                ? 'translate-x-[calc(100%-3.5rem)] opacity-100' 
                : 'translate-x-[200px] opacity-0'
            } hover:translate-x-0`}
            style={{ 
              transitionDelay: isVisible ? `${item.delay}ms` : '0ms',
            }}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-fuchsia-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-white font-medium whitespace-nowrap">
                {item.label}
              </span>
            </div>
            
            <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-r from-fuchsia-500/0 to-violet-500/0 group-hover:from-fuchsia-500/10 group-hover:to-violet-500/10 transition-all duration-300" />
          </button>
        );
      })}
    </div>
  );
};

export default NavigationButtons;