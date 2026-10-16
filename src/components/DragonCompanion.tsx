import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, X } from 'lucide-react';
import { sfx } from '../utils/sfx';
import { rpgState } from '../utils/rpgState';
import type { Screen } from '../types';

const SCREEN_QUOTES: Record<string, string[]> = {
  personaje: [
    '¡Saludos, aventurero! Estás ante la ficha heroica de Nicolás Schernetzki.',
    'Nivel 30 con especialización dual en Stack MERN y .NET 8.',
    'Tip: ¡Comienza la aventura para explorar sus habilidades y proyectos!',
  ],
  habilidades: [
    '¡Tienes puntos de talento disponibles! Haz clic en los nodos con signo + para asignarlos.',
    'Cada punto que asignes potencia en tiempo real los atributos de Nicolás.',
    'Tip: ¡Puedes reiniciar los puntos cuando quieras para probar otra configuración!',
  ],
  inventario: [
    '¡Equipa la Espada de TypeScript y la Coraza de Docker para mejorar tus estadísticas!',
    'Las reliquias equipadas potencian tu ataque y defensa en la Arena de Combate.',
    '¡El Pergamino Sagrado te permite descargar el CV oficial en PDF!',
  ],
  arena: [
    '¡Cuidado con la NullReferenceException! Usa Try/Catch para reducir el daño.',
    'Si te quedas sin maná, ¡un Café Espresso te recargará al instante!',
    '¡Tus reliquias equipadas te otorgan bonificaciones de daño y defensa en batalla!',
  ],
  misiones: [
    '¡Admira la crónica completada de Fundación Pescar con 391 hs de formación intensiva!',
    '4 de 4 pergaminos forjados y verificados. ¡Haz clic para examinarlos!',
    'La campaña activa apunta a la conquista de la industria tech.',
  ],
  historia: [
    'Desde las ventas de materiales eléctricos y macros de Excel hasta el código full-stack moderno.',
    'El camino del autodidacta guiado por la pasión genuina de construir software.',
    'Un verdadero archimago nunca deja de aprender nuevas runas tecnológicas.',
  ],
  bestiario: [
    '27 entidades del código clasificadas y dominadas en producción.',
    'Usa los filtros por escuela de magia para encontrar rápidamente lo que buscas.',
    'TypeScript es el centinela sagrado que previene desastres en tiempo de diseño.',
  ],
  proyectos: [
    '¡La Forja de Artefactos! Tanto Mood App como EmotionShop tienen servidores y demos en vivo.',
    'Desplegados con Docker, Nginx, Cloudflare y bases de datos reales.',
  ],
  estadisticas: [
    'Los números no mienten: más de 638 horas de formación formal y 100+ clientes B2B.',
    '¡Puedes descargar el CV en PDF o DOCX en español e inglés!',
  ],
  contacto: [
    '¿Tienes un proyecto o vacante en tu gremio? ¡Envía un cuervo digital a Nicolás!',
    'Disponible para roles Full-Stack, Backend o Frontend.',
  ],
};

const GENERAL_QUOTES = [
  '¡OrdinalDragon al servicio! Protegiendo la arquitectura contra bugs.',
  'Código limpio, tipado estricto y cero warnings en compilación.',
  'Un buen café recarga 100 puntos de Maná al desarrollador.',
];

export default function DragonCompanion({ currentScreen }: { currentScreen?: Screen }) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isRoaring, setIsRoaring] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [minimized, setMinimized] = useState(false);

  // Pick quotes list based on active screen
  const quotes = (currentScreen && SCREEN_QUOTES[currentScreen]) || GENERAL_QUOTES;

  useEffect(() => {
    // When screen changes, reset quote index to first contextual quote and show bubble
    setQuoteIdx(0);
    setShowBubble(true);
  }, [currentScreen]);

  const handleClick = () => {
    sfx.playDragonRoar();
    setIsRoaring(true);
    setShowBubble(true);
    setQuoteIdx((prev) => (prev + 1) % quotes.length);
    rpgState.registerDragonClick();
    setTimeout(() => setIsRoaring(false), 500);
  };

  const currentQuote = quotes[quoteIdx % quotes.length];

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
            key={currentQuote}
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
              {currentQuote}
            </p>
            {/* Speech bubble pointer arrow */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-surface-container-highest border-r-2 border-b-2 border-primary/40 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dragon Avatar Button */}
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
          title="Haz clic para interactuar con OrdinalDragon"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          animate={isRoaring ? { scale: [1, 1.3, 0.9, 1.1, 1], rotate: [0, -10, 10, -5, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-surface-container-highest border-2 border-primary/60 p-1 shadow-[0_0_20px_rgba(255,145,0,0.4)] flex items-center justify-center cursor-pointer overflow-hidden group"
        >
          <img
            src={`${import.meta.env.BASE_URL}dragon.webp`}
            alt="OrdinalDragon Companion"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith('.webp')) {
                target.src = `${import.meta.env.BASE_URL}dragon.png`;
              } else {
                target.style.display = 'none';
              }
            }}
          />
          <Flame size={26} className="text-primary hidden group-has-[img:not([style*='display: none'])]:hidden" />

          {/* Ember particles on click */}
          {isRoaring && (
            <motion.div
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-primary/40 rounded-2xl pointer-events-none"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}
