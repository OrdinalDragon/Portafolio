import React, { useState } from 'react';
import { LayoutDashboard, Globe, Linkedin, Github, ArrowLeft, Sun, Moon, Volume2, VolumeX, Swords, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';
import { sfx } from '../utils/sfx';
import type { Screen } from '../types';

export default function TopNav({ activeScreen, setScreen, onMenuClick }: { activeScreen: Screen, setScreen: (s: Screen) => void, onMenuClick: () => void }) {
  const { t, lang, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [muted, setMuted] = useState(sfx.isMuted());
  const navigate = useNavigate();

  const toggleLanguage = () => {
    sfx.playSelect();
    setLanguage(lang === 'en' ? 'es' : 'en');
  };

  const toggleAudio = () => {
    const isNowMuted = sfx.toggleMute();
    setMuted(isNowMuted);
  };

  const getLabel = (s: string) => {
    switch (s) {
      case 'personaje': return t('topnav.home');
      case 'habilidades': return t('topnav.skills');
      case 'inventario': return lang === 'en' ? 'Inventory' : 'Inventario';
      case 'arena': return lang === 'en' ? 'Bug Arena' : 'Arena de Bugs';
      case 'misiones': return t('topnav.missions');
      case 'historia': return t('topnav.story');
      case 'bestiario': return t('topnav.bestiary');
      case 'proyectos': return t('topnav.projects');
      default: return s.charAt(0).toUpperCase() + s.slice(1);
    }
  };

  const navScreens: Screen[] = ['personaje', 'habilidades', 'inventario', 'arena', 'misiones', 'historia', 'bestiario', 'proyectos'];

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-2 sm:px-4 md:px-8 h-16 sm:h-20 bg-surface-container-lowest z-50 border-b border-outline-variant/15 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={() => {
            sfx.playSelect();
            onMenuClick();
          }}
          className="lg:hidden text-on-surface/60 hover:text-primary cursor-pointer p-1"
          aria-label="Open menu"
        >
          <LayoutDashboard size={20} />
        </button>
        <div
          className="font-headline font-black text-primary-container drop-shadow-[0_2px_4px_rgba(255,145,0,0.5)] text-[10px] sm:text-base md:text-xl tracking-tighter cursor-pointer leading-tight min-w-0 truncate"
          onClick={() => {
            sfx.playSelect();
            setScreen('personaje');
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setScreen('personaje')}
        >
          {t('topnav.brand')}
        </div>
      </div>
      
      <div className="hidden xl:flex items-center gap-6 font-headline uppercase tracking-widest text-xs">
        {navScreens.map((s) => (
          <button
            key={s}
            onClick={() => {
              sfx.playSelect();
              setScreen(s);
            }}
            onMouseEnter={() => sfx.playHover()}
            aria-current={activeScreen === s ? 'page' : undefined}
            className={`transition-colors duration-200 pb-1 cursor-pointer ${
              activeScreen === s 
                ? 'text-primary border-b-2 border-primary-container font-bold' 
                : 'text-on-surface opacity-70 hover:text-primary'
            }`}
          >
            {getLabel(s)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* SFX Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-110 cursor-pointer flex items-center gap-1 font-label text-xs uppercase tracking-widest p-1"
          title={muted ? 'Activar Sonidos 8-bit' : 'Silenciar Sonidos 8-bit'}
          aria-label="Toggle SFX Audio"
        >
          {muted ? (
            <VolumeX size={18} className="text-error/70 md:w-[20px] md:h-[20px]" />
          ) : (
            <Volume2 size={18} className="text-primary md:w-[20px] md:h-[20px] animate-pulse" />
          )}
        </button>

        <button
          onClick={() => {
            sfx.playHover();
            navigate('/');
          }}
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-105 cursor-pointer flex items-center gap-1 font-label text-xs uppercase tracking-widest"
          aria-label={t('topnav.back')}
        >
          <ArrowLeft size={18} className="md:w-[20px] md:h-[20px]" aria-hidden="true" />
          <span className="hidden md:inline">{t('topnav.back')}</span>
        </button>

        <button
          onClick={toggleLanguage}
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-110 cursor-pointer flex items-center gap-1 font-label text-xs uppercase tracking-widest"
          aria-label={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
        >
          <Globe size={18} className="md:w-[20px] md:h-[20px]" aria-hidden="true" />
          <span className="hidden sm:inline">{lang === 'en' ? 'ES' : 'EN'}</span>
        </button>

        <button
          onClick={() => {
            sfx.playHover();
            toggleTheme();
          }}
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-110 cursor-pointer flex items-center gap-1 font-label text-xs uppercase tracking-widest"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <Sun size={18} className="md:w-[20px] md:h-[20px]" aria-hidden="true" /> : <Moon size={18} className="md:w-[20px] md:h-[20px]" aria-hidden="true" />}
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
            src={`${import.meta.env.BASE_URL}profile.webp`} 
            alt="User" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}profile.png`;
            }}
          />
        </div>
      </div>
    </nav>
  );
}
