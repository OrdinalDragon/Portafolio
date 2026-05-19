import React from 'react';
import { History, Wand2, Zap, Terminal } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Historia() {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center scroll-bg relative min-h-screen w-full">
      <header className="text-center mb-10 md:mb-16 max-w-2xl px-4">
        <span className="text-secondary font-label text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.3em] block mb-2">{t('historia.subtitle')}</span>
        <h1 className="text-2xl sm:text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tight leading-none mb-6 uppercase break-words text-center">{t('historia.title')}</h1>
        <div className="h-1 w-16 md:w-24 bg-primary mx-auto mb-6"></div>
        <p className="text-on-surface-variant font-body text-sm md:text-lg italic opacity-80">{t('historia.quote')}</p>
      </header>

      <div className="relative w-full max-w-6xl lg:aspect-[16/10] bg-surface-container-high rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col lg:flex-row border border-outline-variant/20">
        <div className="flex-1 bg-surface-container-low p-6 md:p-12 lg:p-20 relative overflow-y-auto scrollbar-hide book-spine border-b lg:border-b-0 lg:border-r border-black/40">
          <div className="absolute top-6 left-6 opacity-10 pointer-events-none">
            <History className="text-primary" size={80} />
          </div>
          <h2 className="font-headline text-2xl md:text-3xl text-primary mb-6 border-b border-outline-variant/20 pb-4 break-words">{t('historia.chapter1')}</h2>
          <div className="space-y-4 text-on-surface-variant leading-relaxed text-base md:text-lg font-body">
            <p><span className="text-4xl md:text-5xl font-headline text-primary-container mr-3 float-left">E</span>{t('historia.chapter1.p1')}</p>
            <p>{t('historia.chapter1.p2')}</p>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-error/20 blur-md rounded-full scale-125"></div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-error-container rounded-full flex items-center justify-center shadow-inner border border-error/30 relative">
                <Zap className="text-on-error" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-surface-container-low p-6 md:p-12 lg:p-20 relative overflow-y-auto scrollbar-hide">
          <div className="absolute bottom-6 right-6 opacity-10 pointer-events-none">
            <Wand2 className="text-secondary" size={80} />
          </div>
          <h2 className="font-headline text-2xl md:text-3xl text-secondary mb-6 border-b border-outline-variant/20 pb-4 break-words">{t('historia.chapter2')}</h2>
          <div className="space-y-4 text-on-surface-variant leading-relaxed text-base md:text-lg font-body">
            <p>{t('historia.chapter2.p1')}</p>
            <p>{t('historia.chapter2.p2')}</p>
            <p>{t('historia.chapter2.p3')}</p>
          </div>
          <div className="absolute bottom-6 right-6 rotate-12 opacity-40 hover:opacity-100 transition-opacity">
            <Terminal className="text-primary" size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
