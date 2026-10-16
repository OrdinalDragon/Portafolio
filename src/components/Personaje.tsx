import React, { useState, useEffect } from 'react';
import { 
  Flame, Zap, Sparkles, Swords, Shield, Award, ChevronRight,
  Cpu, Layers, Code, Briefcase, Terminal, ArrowUpRight, Compass,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';
import { rpgState } from '../utils/rpgState';
import type { Screen } from '../types';

interface PersonajeProps {
  onStart: () => void;
  onNavigate?: (screen: Screen) => void;
}

const PASSIVE_PERKS = [
  { title: 'Tipado Sagrado', desc: 'TypeScript estricto previene bugs antes de que lleguen a runtime.', icon: Shield },
  { title: 'Contenedores Herméticos', desc: 'Docker garantiza despliegues idénticos en dev y producción.', icon: Layers },
  { title: 'Automatización Pragmática', desc: 'Experiencia real automatizando procesos comerciales y planillas.', icon: Terminal },
];

export default function Personaje({ onStart, onNavigate }: PersonajeProps) {
  const { t, lang } = useLanguage();
  const [showDragonAvatar, setShowDragonAvatar] = useState(false);
  const [selectedAttr, setSelectedAttr] = useState<string | null>(null);
  const [dynAttrs, setDynAttrs] = useState(rpgState.getDynamicAttributes());

  // Listen to skill changes
  useEffect(() => {
    return rpgState.subscribe(() => {
      setDynAttrs(rpgState.getDynamicAttributes());
    });
  }, []);

  const attributesList = [
    { key: 'str', labelKey: 'personaje.str', sub: 'Backend & Lógica', val: dynAttrs.str, max: 100, icon: Cpu, color: 'text-red-400', barColor: 'from-red-500 to-rose-600', desc: '.NET 8, C#, Node.js, Express, FastAPI, APIs RESTful' },
    { key: 'agi', labelKey: 'personaje.agi', sub: 'Frontend & UI', val: dynAttrs.agi, max: 100, icon: Code, color: 'text-amber-400', barColor: 'from-amber-500 to-yellow-400', desc: 'React 19, TypeScript, Tailwind CSS, Vite, Redux' },
    { key: 'int', labelKey: 'personaje.int', sub: 'Arquitectura & POO', val: dynAttrs.int, max: 100, icon: Zap, color: 'text-purple-400', barColor: 'from-purple-500 to-indigo-500', desc: 'Clean Architecture, Patrones, Entity Framework, MongoDB, SQL' },
    { key: 'dex', label: 'Destreza', sub: 'DevOps & Entorno', val: dynAttrs.dex, max: 100, icon: Layers, color: 'text-emerald-400', barColor: 'from-emerald-500 to-teal-400', desc: 'Docker, Git, CI/CD, Linux, AWS, Cloudflare' },
    { key: 'cha', label: 'Carisma', sub: 'Negocio & Soft Skills', val: dynAttrs.cha, max: 100, icon: Briefcase, color: 'text-sky-400', barColor: 'from-sky-500 to-cyan-400', desc: '100+ Clientes B2B, Automatización VBA, Scrum, Comunicación' },
  ];

  // Avatar cycle effect
  useEffect(() => {
    const timer = setInterval(() => {
      setShowDragonAvatar((prev) => !prev);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    sfx.playLevelUp();
    rpgState.unlockAchievement('start_quest');
    onStart();
  };

  const handleTeleport = (screen: Screen) => {
    sfx.playSelect();
    if (onNavigate) {
      onNavigate(screen);
    } else {
      onStart();
    }
  };

  return (
    <div className="dragon-texture min-h-full w-full py-8 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Background Ambient Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.25, 0.1],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
        />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center gap-8 sm:gap-10">
        
        {/* Header Title Section with Entrance Animation */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] sm:text-xs uppercase tracking-widest">
            <Compass size={13} className="animate-spin" style={{ animationDuration: '10s' }} />
            <span>{t('personaje.subtitle')}</span>
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black tracking-wider uppercase text-on-surface drop-shadow-2xl">
            {t('personaje.title.line1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
              {t('personaje.title.of')} {t('personaje.title.programmer')}
            </span>
          </h1>

          <p className="font-body text-xs sm:text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Bienvenido al panel heroico interactivo de Nicolás Schernetzki. Explora sus estadísticas de batalla, fortalezas técnicas y dominios full-stack forjados en código real.
          </p>
        </motion.header>

        {/* Hero Character Card (Master Dashboard) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full bg-surface-container-lowest/90 backdrop-blur-md border-2 border-primary/40 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ff9100_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Avatar & Core Identity (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
              
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                {/* Legendary Avatar Frame */}
                <div className="relative group cursor-pointer" onClick={() => setShowDragonAvatar(prev => !prev)}>
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface-container-highest border-2 border-primary-container p-1 shadow-[0_0_25px_rgba(255,145,0,0.4)] overflow-hidden relative">
                    <motion.img 
                      src={`${import.meta.env.BASE_URL}profile.webp`} 
                      alt="Nicolás Schernetzki" 
                      animate={{ opacity: showDragonAvatar ? 0 : 1, scale: showDragonAvatar ? 0.95 : 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover rounded-xl absolute inset-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}profile.png`;
                      }}
                    />
                    <motion.img 
                      src={`${import.meta.env.BASE_URL}dragon.webp`} 
                      alt="Ordinal Dragon" 
                      animate={{ opacity: showDragonAvatar ? 1 : 0, scale: showDragonAvatar ? 1 : 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover rounded-xl absolute inset-0 p-1"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.endsWith('.webp')) {
                          target.src = `${import.meta.env.BASE_URL}dragon.png`;
                        } else {
                          target.style.display = 'none';
                        }
                      }}
                    />
                  </div>

                  {/* Level Badge */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-bold shadow-lg border border-on-primary/20 flex items-center gap-1"
                  >
                    <Sparkles size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
                    {t('personaje.level')}
                  </motion.div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <h2 className="font-headline text-lg sm:text-2xl font-bold text-on-surface tracking-wide">
                      {t('personaje.name')}
                    </h2>
                    <CheckCircle2 size={16} className="text-primary fill-primary/20" />
                  </div>
                  <p className="font-label text-primary text-xs uppercase tracking-widest font-semibold">
                    {t('personaje.role')}
                  </p>
                  <p className="font-mono text-[10px] text-on-surface-variant">
                    Clase: MERN & .NET 8 Architect (Tier 3)
                  </p>
                </div>
              </div>

              {/* Vitals HUD (HP / MP / EXP) */}
              <div className="w-full space-y-3 bg-surface-container-low/70 border border-outline-variant/20 p-4 rounded-xl">
                {/* HP */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="flex items-center gap-1 text-on-surface-variant uppercase font-semibold">
                      <Flame size={13} className="text-red-500 animate-pulse" /> {t('personaje.hp')}
                    </span>
                    <span className="text-red-400 font-bold">1000 / 1000</span>
                  </div>
                  <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden p-0.5 border border-outline-variant/20">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full"
                    />
                  </div>
                </div>

                {/* MP */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="flex items-center gap-1 text-on-surface-variant uppercase font-semibold">
                      <Zap size={13} className="text-secondary animate-pulse" /> {t('personaje.mp')}
                    </span>
                    <span className="text-secondary font-bold">500 / 500</span>
                  </div>
                  <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden p-0.5 border border-outline-variant/20">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-purple-500 to-secondary rounded-full"
                    />
                  </div>
                </div>

                {/* EXP */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-on-surface-variant uppercase font-semibold">
                      {t('personaje.exp')}
                    </span>
                    <span className="text-primary font-bold">89% (Hacia Nivel 31)</span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-full overflow-hidden p-0.5 border border-outline-variant/20">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '89%' }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_8px_#ff9100]"
                    />
                  </div>
                </div>
              </div>

              {/* Class Passives Perks */}
              <div className="w-full space-y-2">
                <h4 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                  Rasgos Pasivos Activos
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {PASSIVE_PERKS.map((perk, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-high/40 border border-outline-variant/15 text-left"
                    >
                      <perk.icon size={15} className="text-primary shrink-0" />
                      <div className="overflow-hidden">
                        <p className="font-headline text-xs font-bold text-on-surface">{perk.title}</p>
                        <p className="font-body text-[10px] text-on-surface-variant line-clamp-1">{perk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Detailed RPG Attributes (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-outline-variant/20 pb-2">
                  <div>
                    <h3 className="font-headline text-base sm:text-lg font-bold uppercase tracking-wider text-on-surface flex items-center gap-2">
                      <Award size={18} className="text-primary" />
                      Pilares de Poder & Atributos
                    </h3>
                    <p className="font-body text-xs text-on-surface-variant">
                      Pasa el cursor sobre un atributo para inspeccionar su maestría técnica en producción.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-primary font-bold">Tier: Legendario</span>
                </div>

                <div className="space-y-3">
                  {attributesList.map((attr) => {
                    const isSelected = selectedAttr === attr.key;
                    return (
                      <motion.div 
                        key={attr.key}
                        whileHover={{ scale: 1.01, x: 2 }}
                        onMouseEnter={() => {
                          setSelectedAttr(attr.key);
                          sfx.playHover();
                        }}
                        onMouseLeave={() => setSelectedAttr(null)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-surface-container-high border-primary shadow-md' 
                            : 'bg-surface-container-low/60 border-outline-variant/20 hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-1.5 rounded-lg bg-surface-container-highest border border-outline-variant/20 ${attr.color}`}>
                              <attr.icon size={16} />
                            </div>
                            <div>
                              <span className="font-headline text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide">
                                {attr.labelKey ? t(attr.labelKey) : attr.label}
                              </span>
                              <span className="font-mono text-[10px] text-on-surface-variant ml-2">
                                ({attr.sub})
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-xs sm:text-sm font-bold text-primary">
                            {attr.val} / {attr.max}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 bg-surface-container-lowest rounded-full overflow-hidden p-0.5 border border-outline-variant/15 mb-1.5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${attr.val}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r ${attr.barColor} rounded-full`}
                          />
                        </div>

                        <p className="font-body text-[11px] text-on-surface-variant leading-relaxed">
                          {attr.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Realm Teleporters Grid */}
              <div className="space-y-2 pt-2 border-t border-outline-variant/20">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-1">
                  Acceso Rápido a los Reinos
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button 
                    onClick={() => handleTeleport('habilidades')}
                    className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 hover:border-primary text-center transition-all cursor-pointer group"
                  >
                    <p className="font-headline text-xs font-bold text-on-surface group-hover:text-primary">Habilidades</p>
                    <p className="font-mono text-[9px] text-on-surface-variant">6 pts libres</p>
                  </button>
                  <button 
                    onClick={() => handleTeleport('inventario')}
                    className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 hover:border-primary text-center transition-all cursor-pointer group"
                  >
                    <p className="font-headline text-xs font-bold text-on-surface group-hover:text-primary">Inventario</p>
                    <p className="font-mono text-[9px] text-on-surface-variant">8 reliquias</p>
                  </button>
                  <button 
                    onClick={() => handleTeleport('arena')}
                    className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 hover:border-primary text-center transition-all cursor-pointer group"
                  >
                    <p className="font-headline text-xs font-bold text-on-surface group-hover:text-primary">Arena de Bugs</p>
                    <p className="font-mono text-[9px] text-on-surface-variant">3 Jefes</p>
                  </button>
                  <button 
                    onClick={() => handleTeleport('proyectos')}
                    className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 hover:border-primary text-center transition-all cursor-pointer group"
                  >
                    <p className="font-headline text-xs font-bold text-on-surface group-hover:text-primary">Forja</p>
                    <p className="font-mono text-[9px] text-on-surface-variant">Proyectos</p>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Epic Main Start Button */}
          <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-headline font-bold text-sm text-on-surface">¿Listo para comenzar la travesía?</p>
              <p className="font-body text-xs text-on-surface-variant">Inicia el recorrido guiado por las habilidades y proyectos de Nicolás.</p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              onMouseEnter={() => sfx.playHover()}
              className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-headline text-sm sm:text-base font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(255,145,0,0.5)] cursor-pointer relative overflow-hidden group rounded-xl flex items-center justify-center gap-3"
            >
              <Swords size={20} className="animate-pulse" />
              <span className="relative z-10">{t('personaje.start')}</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
            </motion.button>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
