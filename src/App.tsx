import React, { useState } from 'react';
import { Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './i18n/LanguageContext';
import type { Screen } from './types';

import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Personaje from './components/Personaje';
import Habilidades from './components/Habilidades';
import Bestiario from './components/Bestiario';
import Misiones from './components/Misiones';
import Historia from './components/Historia';
import Contacto from './components/Contacto';
import Proyectos from './components/Proyectos';
import Estadisticas from './components/Estadisticas';

export default function App() {
  const { t, lang } = useLanguage();
  const [screen, setScreen] = useState<Screen>('personaje');
  const [questAlert, setQuestAlert] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const startAdventure = () => {
    setQuestAlert(t('common.start.quest'));
    setScreen('habilidades');
    setTimeout(() => setQuestAlert(null), 4000);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary-container selection:text-on-primary overflow-x-hidden">
      <TopNav activeScreen={screen} setScreen={setScreen} onMenuClick={() => setIsSidebarOpen(true)} />
      
      <AnimatePresence>
        {questAlert && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-primary text-on-primary px-6 py-3 font-headline font-bold tracking-[0.2em] shadow-[0_0_30px_rgba(255,145,0,0.6)] border-2 border-on-primary/20 flex items-center gap-3"
          >
            <Swords size={20} className="animate-pulse" />
            {questAlert}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex pt-20">
        <Sidebar 
          activeScreen={screen} 
          setScreen={setScreen} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          setActiveModal={() => {}} 
        />
        
        <main className="flex-1 lg:ml-64 p-3 sm:p-6 md:p-12 lg:p-20 mb-20 lg:mb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {screen === 'personaje' && <Personaje onStart={startAdventure} />}
              {screen === 'habilidades' && <Habilidades />}
              {screen === 'misiones' && <Misiones />}
              {screen === 'historia' && <Historia />}
              {screen === 'bestiario' && <Bestiario />}
              {screen === 'proyectos' && <Proyectos />}
              {screen === 'estadisticas' && <Estadisticas />}
              {screen === 'contacto' && <Contacto />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-surface-container-lowest border-t border-outline-variant/15 flex items-center justify-around z-50 backdrop-blur-md bg-opacity-90" aria-label="Mobile navigation">
        <button onClick={() => setScreen('personaje')} aria-current={screen === 'personaje' ? 'page' : undefined} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'personaje' ? 'text-primary' : 'text-on-surface/40'}`}>
          <span className="text-[10px] uppercase font-label">{t('mobilenav.home')}</span>
        </button>
        <button onClick={() => setScreen('habilidades')} aria-current={screen === 'habilidades' ? 'page' : undefined} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'habilidades' ? 'text-primary' : 'text-on-surface/40'}`}>
          <span className="text-[10px] uppercase font-label">{t('mobilenav.skills')}</span>
        </button>
        <button onClick={() => setScreen('misiones')} aria-current={screen === 'misiones' ? 'page' : undefined} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'misiones' ? 'text-primary' : 'text-on-surface/40'}`}>
          <span className="text-[10px] uppercase font-label">{t('mobilenav.logs')}</span>
        </button>
        <button onClick={() => setScreen('historia')} aria-current={screen === 'historia' ? 'page' : undefined} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'historia' ? 'text-primary' : 'text-on-surface/40'}`}>
          <span className="text-[10px] uppercase font-label">{t('mobilenav.map')}</span>
        </button>
        <button onClick={() => setScreen('bestiario')} aria-current={screen === 'bestiario' ? 'page' : undefined} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'bestiario' ? 'text-primary' : 'text-on-surface/40'}`}>
          <span className="text-[10px] uppercase font-label">{t('mobilenav.beasts')}</span>
        </button>
        <button onClick={() => setScreen('proyectos')} aria-current={screen === 'proyectos' ? 'page' : undefined} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'proyectos' ? 'text-primary' : 'text-on-surface/40'}`}>
          <span className="text-[10px] uppercase font-label">{t('mobilenav.forge')}</span>
        </button>
      </nav>

      <footer className="w-full py-8 px-4 sm:px-6 md:px-12 flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-outline-variant/15 font-body text-xs tracking-tighter mt-20 overflow-hidden min-w-0">
        <div className="text-primary-container font-bold mb-4 md:mb-0">
          {t('common.brand')}
        </div>
        <div className="text-on-surface/40 text-center mb-4 md:mb-0">
          {t('common.footer')}
        </div>
      </footer>
    </div>
  );
}
