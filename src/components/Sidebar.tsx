import React, { useState, useEffect } from 'react';
import { 
  User, Layers, Swords, History, BookOpen, Hammer,
  FileText, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Screen } from '../types';

export default function Sidebar({ activeScreen, setScreen, isOpen, onClose, setActiveModal }: { 
  activeScreen: Screen, 
  setScreen: (s: Screen) => void, 
  isOpen: boolean, 
  onClose: () => void, 
  setActiveModal: (m: 'privacy' | 'terms' | null) => void 
}) {
  const [showDragon, setShowDragon] = useState(false);
  const { t, lang, setLanguage } = useLanguage();
  const profileImg = `${import.meta.env.BASE_URL}profile.png`;
  const dragonImg = `${import.meta.env.BASE_URL}dragon.png`;

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDragon(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'personaje', label: t('sidebar.nav.character'), icon: User },
    { id: 'habilidades', label: t('sidebar.nav.skills'), icon: Layers },
    { id: 'misiones', label: t('sidebar.nav.missions'), icon: Swords },
    { id: 'historia', label: t('sidebar.nav.story'), icon: History },
    { id: 'bestiario', label: t('sidebar.nav.bestiary'), icon: BookOpen },
    { id: 'proyectos', label: t('sidebar.nav.projects'), icon: Hammer },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant/15 flex flex-col pt-8 z-[70] transition-transform duration-300 lg:translate-x-0 lg:top-20 lg:h-[calc(100vh-5rem)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="lg:hidden absolute top-4 right-4">
          <button onClick={onClose} className="text-on-surface/60 hover:text-primary cursor-pointer" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="px-6 mb-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-primary-container shadow-lg mb-4 overflow-hidden relative bg-surface-container-highest">
            <motion.img 
              src={profileImg} 
              animate={{ opacity: showDragon ? 0 : 1 }}
              transition={{ duration: 0.8 }}
              alt="Profile" 
              className="w-full h-full object-cover absolute inset-0"
              referrerPolicy="no-referrer"
            />
            <motion.img 
              src={dragonImg} 
              animate={{ opacity: showDragon ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              alt="Dragon" 
              className="w-full h-full object-cover absolute inset-0"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-1">{t('sidebar.name')}</p>
          <h3 className="font-headline text-on-surface font-bold text-lg text-center">{t('sidebar.title')}</h3>
          <p className="font-label text-on-surface-variant text-xs uppercase tracking-widest">{t('sidebar.subtitle')}</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 font-label overflow-y-auto" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setScreen(item.id as Screen);
                onClose();
              }}
              aria-current={activeScreen === item.id ? 'page' : undefined}
              className={`w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 rounded-sm cursor-pointer ${
                activeScreen === item.id 
                  ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                  : 'text-on-surface/60 hover:bg-surface-container-highest hover:text-primary'
              }`}
            >
              <item.icon size={20} aria-hidden="true" />
              <span className="text-sm uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-outline-variant/10 space-y-3">
          <button 
            onClick={() => {
              setScreen('estadisticas');
              onClose();
            }}
            className="w-full py-3 border border-primary/40 text-primary font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <FileText size={16} />
            {t('sidebar.stats')}
          </button>
          <button 
            onClick={() => {
              setScreen('contacto');
              onClose();
            }}
            className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-xs tracking-widest uppercase rounded-sm hover:shadow-[0_0_15px_rgba(255,145,0,0.4)] transition-all cursor-pointer"
          >
            {t('sidebar.contact')}
          </button>
          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => {
                setActiveModal('privacy');
                onClose();
              }}
              className="text-[10px] uppercase tracking-tighter text-on-surface/40 hover:text-primary transition-colors cursor-pointer"
            >
              {t('sidebar.privacy')}
            </button>
            <button 
              onClick={() => {
                setActiveModal('terms');
                onClose();
              }}
              className="text-[10px] uppercase tracking-tighter text-on-surface/40 hover:text-primary transition-colors cursor-pointer"
            >
              {t('sidebar.terms')}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
