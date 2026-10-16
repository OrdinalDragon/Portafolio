import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, MessageSquare, X } from 'lucide-react';
import { sfx } from '../utils/sfx';

const DRAGON_QUOTES = [
  '¡OrdinalDragon al servicio! Protegiendo la arquitectura contra bugs.',
  'Tip: ¡Equipa tus reliquias en el Inventario para subir tus atributos!',
  '¿Te animas a luchar contra la NullReferenceException en la Arena?',
  'Código limpio, tipado estricto y cero warnings en compilación.',
  '¡Usa el pergamino legendario para descargar el CV en PDF!',
  'Un buen café recarga 100 puntos de Maná al desarrollador.',
];

export default function DragonCompanion() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isRoaring, setIsRoaring] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [minimized, setMinimized] = useState(false);

  const handleClick = () => {
    sfx.playDragonRoar();
    setIsRoaring(true);
    setShowBubble(true);
    setQuoteIdx((prev) => (prev + 1) % DRAGON_QUOTES.length);
    setTimeout(() => setIsRoaring(false), 500);
  };

  if (minimized) {
    return (
      <button
        onClick={() => {
          setMinimized(false);
          sfx.playSelect();
        }}
        className="fixed bottom-20 right-4 z-40 w-10 h-10 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center hover:scale-110 shadow-lg cursor-pointer"
        title="Despertar Dragón"
      >
        <Flame size={18} className="animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-2 max-w-[240px] bg-surface-container-highest border-2 border-primary/40 rounded-xl p-3 shadow-xl pointer-events-auto relative"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                <Flame size={11} /> OrdinalDragon
              </span>
              <button
                type="button"
                onClick={() => setShowBubble(false)}
                className="text-on-surface-variant hover:text-primary cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
            <p className="font-body text-xs text-on-surface leading-snug">
              {DRAGON_QUOTES[quoteIdx]}
            </p>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-surface-container-highest border-r-2 border-b-2 border-primary/40 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dragon Avatar Mascot */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={() => setMinimized(true)}
          className="text-on-surface-variant/50 hover:text-on-surface text-[10px] cursor-pointer"
          title="Minimizar mascota"
        >
          <X size={14} />
        </button>

        <motion.button
          type="button"
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isRoaring ? { rotate: [-5, 5, -5, 5, 0], scale: 1.15 } : { y: [0, -4, 0] }}
          transition={isRoaring ? { duration: 0.4 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-surface-container-highest border-2 border-primary/60 p-1 shadow-[0_0_20px_rgba(255,145,0,0.4)] flex items-center justify-center cursor-pointer overflow-hidden group"
          title="Haz clic para interactuar con OrdinalDragon"
        >
          <img
            src={`${import.meta.env.BASE_URL}dragon.png`}
            alt="OrdinalDragon Companion"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              // fallback to flame icon if dragon.png missing
              const target = e.target as HTMLElement;
              target.style.display = 'none';
            }}
          />
          <Flame size={26} className="text-primary hidden group-has-[img:not([style*='display: none'])]:hidden" />

          {/* Ember glow burst */}
          {isRoaring && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-primary/40 rounded-full pointer-events-none"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}
