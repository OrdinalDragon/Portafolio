import React from 'react';
import { Wand2, Hammer, Cpu, Globe, Github, Settings } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Proyectos() {
  const { t } = useLanguage();

  return (
    <div className="forge-bg relative min-h-screen w-full">
      <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-0">
      <header className="mb-10 md:mb-16 text-center px-4">
        <span className="font-label text-primary uppercase tracking-[0.1em] sm:tracking-[0.3em] mb-2 block text-[10px] sm:text-xs">{t('proyectos.subtitle')}</span>
        <h1 className="font-headline text-2xl sm:text-5xl md:text-6xl font-black text-on-surface italic uppercase tracking-normal sm:tracking-widest mb-4 break-words text-center">{t('proyectos.title')}</h1>
        <div className="h-1 w-16 md:w-32 bg-primary mx-auto mb-6"></div>
        <p className="font-body text-on-surface-variant max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
          {t('proyectos.description')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mood App */}
        <div className="bg-surface-container-high p-6 md:p-8 border border-outline-variant/10 hover:border-primary/30 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe size={80} />
          </div>
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Wand2 className="text-primary" size={24} />
            </div>
            <span className="font-label text-[9px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1">COMPLETED</span>
          </div>
          <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{t('proyectos.moodapp.name')}</h3>
          <p className="font-label text-xs text-primary uppercase tracking-widest mb-4">{t('proyectos.moodapp.tech')}</p>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
            {t('proyectos.moodapp.desc')}
          </p>
          <div className="flex gap-4">
            <a
              href="https://prototipomood.jesrepresentaciones.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-[10px] uppercase tracking-widest font-label hover:bg-primary/20 transition-all"
            >
              <Globe size={12} /> {t('proyectos.moodapp.live')}
            </a>
            <a
              href="https://github.com/OrdinalDragon/Mood"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant text-[10px] uppercase tracking-widest font-label hover:text-primary hover:border-primary/30 transition-all"
            >
              <Github size={12} /> {t('proyectos.moodapp.repo')}
            </a>
          </div>
        </div>

        {/* Bank Simulation (.NET) */}
        <div className="bg-surface-container-high p-6 md:p-8 border border-outline-variant/10 hover:border-primary/30 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Cpu size={80} />
          </div>
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Cpu className="text-primary" size={24} />
            </div>
            <span className="font-label text-[9px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1">COMPLETED</span>
          </div>
          <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{t('proyectos.bank.name')}</h3>
          <p className="font-label text-xs text-primary uppercase tracking-widest mb-4">{t('proyectos.bank.tech')}</p>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
            {t('proyectos.bank.desc')}
          </p>
        </div>

        {/* Portfolio */}
        <div className="bg-surface-container-high p-6 md:p-8 border border-outline-variant/10 hover:border-primary/30 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Hammer size={80} />
          </div>
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Hammer className="text-primary" size={24} />
            </div>
            <span className="font-label text-[9px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1">COMPLETED</span>
          </div>
          <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{t('proyectos.portfolio.name')}</h3>
          <p className="font-label text-xs text-primary uppercase tracking-widest mb-4">{t('proyectos.portfolio.tech')}</p>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
            {t('proyectos.portfolio.desc')}
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/OrdinalDragon/Portafolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant text-[10px] uppercase tracking-widest font-label hover:text-primary hover:border-primary/30 transition-all"
            >
              <Github size={12} /> {t('proyectos.moodapp.repo')}
            </a>
          </div>
        </div>
      </div>

      {/* In Progress Project */}
      <div className="mt-8 bg-surface-container-lowest border border-dashed border-secondary/40 p-6 md:p-8 relative overflow-hidden group hover:bg-surface-container-low/80 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Settings size={80} />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <span className="font-label text-[9px] uppercase tracking-widest text-secondary">{t('proyectos.pricelist.status')}</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{t('proyectos.pricelist.name')}</h3>
            <p className="font-label text-xs text-secondary uppercase tracking-widest mb-3">{t('proyectos.pricelist.tech')}</p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t('proyectos.pricelist.desc')}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 px-4 py-3 border border-secondary/40 text-secondary text-[10px] uppercase tracking-widest font-label">
              <Settings size={14} className="animate-spin" />
              {t('proyectos.pricelist.status')}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
