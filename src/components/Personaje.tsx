import React from 'react';
import { Flame, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Personaje({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 dragon-texture min-h-full flex flex-col items-center justify-center text-center py-2 overflow-hidden w-full map-bg relative">
      <div className="max-w-4xl w-full px-4 flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
        <span className="font-label text-primary uppercase tracking-[0.1em] sm:tracking-[0.4em] block text-[10px] sm:text-xs">{t('personaje.subtitle')}</span>
        <h1 className="font-headline text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-on-background drop-shadow-2xl leading-tight uppercase break-words px-2 max-w-full">
          {t('personaje.title.line1')} <br className="sm:hidden" /> {t('personaje.title.of')} <br className="hidden sm:block" /> <span className="text-primary-container">{t('personaje.title.programmer')}</span>
        </h1>
        
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-surface-container-lowest border-l-4 border-primary p-3 sm:p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left relative overflow-hidden mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-start mb-2 sm:mb-3 text-center sm:text-left">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-surface-container-highest flex-shrink-0 relative border border-outline-variant/20">
              <img 
                src={`${import.meta.env.BASE_URL}profile.png`} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary px-1 py-0.5 font-mono text-[7px] sm:text-[9px] md:text-xs font-bold">{t('personaje.level')}</div>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <h3 className="font-headline text-xs sm:text-base md:text-xl text-on-surface mb-0.5 uppercase tracking-wider break-words">{t('personaje.name')}</h3>
              <p className="font-label text-primary text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.05em] sm:tracking-widest mb-1 sm:mb-2">{t('personaje.role')}</p>
              <div className="space-y-0.5 max-w-[140px] sm:max-w-[160px] mx-auto sm:mx-0">
                <div className="flex justify-between font-mono text-[7px] sm:text-[8px] md:text-[9px] text-on-surface-variant">
                  <span>{t('personaje.exp')}</span>
                  <span>89%</span>
                </div>
                <div className="h-1 bg-surface-container-high w-full rounded-full overflow-hidden">
                  <div className="h-full bg-secondary shadow-[0_0_10px_#f9abff]" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <div className="flex justify-between items-end">
                <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-on-surface-variant uppercase flex items-center gap-1">
                  <Flame size={10} className="text-primary" /> {t('personaje.hp')}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] md:text-sm text-primary">1000 / 1000</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-surface-container-highest border border-outline-variant/15 p-px">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="flex justify-between items-end">
                <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-on-surface-variant uppercase flex items-center gap-1">
                  <Zap size={10} className="text-secondary" /> {t('personaje.mp')}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] md:text-sm text-secondary">420 / 500</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-surface-container-highest border border-outline-variant/15 p-px">
                <div className="h-full bg-gradient-to-r from-secondary to-secondary-container" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
            <div className="text-center p-1 sm:p-2 bg-surface-container-low border border-outline-variant/10">
              <p className="font-label text-[7px] sm:text-[8px] md:text-[10px] text-on-surface-variant uppercase">{t('personaje.str')}</p>
              <p className="font-headline text-[10px] sm:text-xs md:text-sm text-primary">22</p>
            </div>
            <div className="text-center p-1 sm:p-2 bg-surface-container-low border border-outline-variant/10">
              <p className="font-label text-[7px] sm:text-[8px] md:text-[10px] text-on-surface-variant uppercase">{t('personaje.agi')}</p>
              <p className="font-headline text-[10px] sm:text-xs md:text-sm text-primary">20</p>
            </div>
            <div className="text-center p-1 sm:p-2 bg-surface-container-low border border-outline-variant/10">
              <p className="font-label text-[7px] sm:text-[8px] md:text-[10px] text-on-surface-variant uppercase">{t('personaje.int')}</p>
              <p className="font-headline text-[10px] sm:text-xs md:text-sm text-primary">32</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline text-sm sm:text-base md:text-lg font-bold tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,145,0,0.4)] cursor-pointer relative overflow-hidden group"
        >
          <span className="relative z-10 uppercase">{t('personaje.start')}</span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
        </button>
      </div>
    </div>
  );
}
