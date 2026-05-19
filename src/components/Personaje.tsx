import React from 'react';
import { Flame, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Personaje({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 dragon-texture min-h-screen flex flex-col items-center justify-center text-center py-6 sm:py-10 overflow-x-hidden w-full">
      <div className="max-w-4xl w-full px-4 sm:px-6 flex flex-col items-center">
        <span className="font-label text-primary uppercase tracking-[0.1em] sm:tracking-[0.4em] mb-3 md:mb-6 block text-[10px] sm:text-sm">{t('personaje.subtitle')}</span>
        <h1 className="font-headline text-2xl sm:text-5xl md:text-8xl font-bold text-on-background mb-6 md:mb-12 drop-shadow-2xl leading-tight uppercase break-words px-2 max-w-full">
          {t('personaje.title.line1')} <br className="sm:hidden" /> {t('personaje.title.of')} <br className="hidden sm:block" /> <span className="text-primary-container">{t('personaje.title.programmer')}</span>
        </h1>
        
        <div className="w-full max-w-md bg-surface-container-lowest border-l-4 border-primary p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left relative overflow-hidden mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start mb-6 md:mb-8 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-surface-container-highest flex-shrink-0 relative border border-outline-variant/20">
              <img 
                src={`${import.meta.env.BASE_URL}profile.png`} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary px-1.5 py-0.5 font-mono text-[8px] sm:text-xs font-bold">{t('personaje.level')}</div>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <h3 className="font-headline text-base sm:text-2xl text-on-surface mb-1 uppercase tracking-wider break-words">{t('personaje.name')}</h3>
              <p className="font-label text-primary text-[8px] sm:text-xs uppercase tracking-[0.05em] sm:tracking-widest mb-3">{t('personaje.role')}</p>
              <div className="space-y-1.5 max-w-[180px] mx-auto sm:mx-0">
                <div className="flex justify-between font-mono text-[8px] sm:text-[9px] text-on-surface-variant">
                  <span>{t('personaje.exp')}</span>
                  <span>89%</span>
                </div>
                <div className="h-1 bg-surface-container-high w-full rounded-full overflow-hidden">
                  <div className="h-full bg-secondary shadow-[0_0_10px_#f9abff]" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-end">
                <span className="font-mono text-[10px] sm:text-xs text-on-surface-variant uppercase flex items-center gap-1.5">
                  <Flame size={12} className="text-primary" /> {t('personaje.hp')}
                </span>
                <span className="font-mono text-[10px] sm:text-sm text-primary">1000 / 1000</span>
              </div>
              <div className="h-3 sm:h-4 bg-surface-container-highest border border-outline-variant/15 p-0.5">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-end">
                <span className="font-mono text-[10px] sm:text-xs text-on-surface-variant uppercase flex items-center gap-1.5">
                  <Zap size={12} className="text-secondary" /> {t('personaje.mp')}
                </span>
                <span className="font-mono text-[10px] sm:text-sm text-secondary">420 / 500</span>
              </div>
              <div className="h-3 sm:h-4 bg-surface-container-highest border border-outline-variant/15 p-0.5">
                <div className="h-full bg-gradient-to-r from-secondary to-secondary-container" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-surface-container-low border border-outline-variant/10 flex sm:flex-col items-center sm:justify-center justify-between px-3 sm:px-2">
              <p className="font-label text-[8px] sm:text-[10px] text-on-surface-variant uppercase mb-0 sm:mb-1">{t('personaje.str')}</p>
              <p className="font-headline text-xs sm:text-lg text-primary">22</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-surface-container-low border border-outline-variant/10 flex sm:flex-col items-center sm:justify-center justify-between px-3 sm:px-2">
              <p className="font-label text-[8px] sm:text-[10px] text-on-surface-variant uppercase mb-0 sm:mb-1">{t('personaje.agi')}</p>
              <p className="font-headline text-xs sm:text-lg text-primary">20</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-surface-container-low border border-outline-variant/10 flex sm:flex-col items-center sm:justify-center justify-between px-3 sm:px-2">
              <p className="font-label text-[8px] sm:text-[10px] text-on-surface-variant uppercase mb-0 sm:mb-1">{t('personaje.int')}</p>
              <p className="font-headline text-xs sm:text-lg text-primary">32</p>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-16">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline text-lg sm:text-xl font-bold tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,145,0,0.4)] cursor-pointer relative overflow-hidden group"
          >
            <span className="relative z-10 uppercase">{t('personaje.start')}</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
