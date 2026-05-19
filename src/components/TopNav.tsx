import React from 'react';
import { LayoutDashboard, Globe, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Screen } from '../types';

export default function TopNav({ activeScreen, setScreen, onMenuClick }: { activeScreen: Screen, setScreen: (s: Screen) => void, onMenuClick: () => void }) {
  const { t, lang, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(lang === 'en' ? 'es' : 'en');
  };

  const getLabel = (s: string) => {
    switch (s) {
      case 'personaje': return t('topnav.home');
      case 'proyectos': return t('topnav.projects');
      default: return s.charAt(0).toUpperCase() + s.slice(1);
    }
  };

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-2 sm:px-4 md:px-8 h-16 sm:h-20 bg-surface-container-lowest z-50 border-b border-outline-variant/15 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-on-surface/60 hover:text-primary cursor-pointer p-1"
          aria-label="Open menu"
        >
          <LayoutDashboard size={20} />
        </button>
        <div className="font-headline font-black text-primary-container drop-shadow-[0_2px_4px_rgba(255,145,0,0.5)] text-[10px] sm:text-lg md:text-2xl tracking-tighter cursor-pointer leading-tight" onClick={() => setScreen('personaje')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setScreen('personaje')}>
          {t('topnav.brand')}
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 font-headline uppercase tracking-widest text-sm">
        {(['personaje', 'habilidades', 'misiones', 'historia', 'bestiario', 'proyectos'] as Screen[]).map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s)}
            aria-current={activeScreen === s ? 'page' : undefined}
            className={`transition-colors duration-300 pb-1 cursor-pointer ${
              activeScreen === s 
                ? 'text-primary border-b-2 border-primary-container' 
                : 'text-on-surface opacity-70 hover:text-primary'
            }`}
          >
            {getLabel(s)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <button
          onClick={toggleLanguage}
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-110 cursor-pointer flex items-center gap-1 font-label text-xs uppercase tracking-widest"
          aria-label={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
        >
          <Globe size={18} className="md:w-[22px] md:h-[22px]" aria-hidden="true" />
          <span className="hidden sm:inline">{lang === 'en' ? 'ES' : 'EN'}</span>
        </button>
        <a 
          href="https://www.linkedin.com/in/nicolas-schernetzki-518b28212/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-110"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={18} className="md:w-[22px] md:h-[22px]" />
        </a>
        <a 
          href="https://github.com/OrdinalDragon" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-110"
          aria-label="GitHub Profile"
        >
          <Github size={18} className="md:w-[22px] md:h-[22px]" />
        </a>
        <div className="w-7 h-7 md:w-10 md:h-10 rounded-sm border-2 border-outline-variant overflow-hidden ml-1 md:ml-2">
          <img 
            src={`${import.meta.env.BASE_URL}profile.png`} 
            alt="User" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </nav>
  );
}
