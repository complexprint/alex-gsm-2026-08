import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, User, GraduationCap, Briefcase, Award, Mail, TrendingUp } from 'lucide-react';
import useClickSound from '../hooks/useClickSound';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();
  const playClickSound = useClickSound();

  const prefix = language === 'en' ? '/en' : '';
  const navItems = [
    { path: prefix || '/', label: 'Home', icon: Home },
    { path: `${prefix}/about`, label: t('navAbout'), icon: User },
    { path: `${prefix}/education`, label: t('navEducation'), icon: GraduationCap },
    { path: `${prefix}/experience`, label: t('navExperience'), icon: Briefcase },
    { path: `${prefix}/skills`, label: t('navSkills'), icon: Award },
    { path: `${prefix}/trends`, label: t('navTrends'), icon: TrendingUp },
    { path: `${prefix}/contact`, label: t('navContact'), icon: Mail },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-md border-t border-white/10 safe-area-inset-bottom">
      <div className="grid grid-cols-7 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const normalize = (p) => (p || '/').replace(/\/+$/, '') || '/';
          const isActive = normalize(location.pathname) === normalize(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => {
                playClickSound();
                navigate(item.path);
              }}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-fuchsia-500/15 text-fuchsia-400' 
                  : 'text-zinc-500 hover:text-fuchsia-400 hover:bg-white/5'
              }`}
              style={{ touchAction: 'manipulation' }}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[8px] font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;