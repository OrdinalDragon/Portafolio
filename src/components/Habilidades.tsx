import React, { useState, useEffect } from 'react';
import { 
  Wand2, Layers, Globe, Shield, Cpu, Database, Terminal, 
  History, CheckCircle2, User, RotateCcw, Sparkles, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';
import { rpgState } from '../utils/rpgState';

export default function Habilidades() {
  const { t, lang } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [availablePoints, setAvailablePoints] = useState(rpgState.getAvailablePoints());
  const [skillLevels, setSkillLevels] = useState(rpgState.getSkillAllocations());

  useEffect(() => {
    return rpgState.subscribe(() => {
      setAvailablePoints(rpgState.getAvailablePoints());
      setSkillLevels(rpgState.getSkillAllocations());
    });
  }, []);

  const handleUpgradeSkill = (id: string, max: number) => {
    rpgState.upgradeSkill(id, max);
  };

  const handleResetPoints = () => {
    rpgState.resetSkills();
  };

  const paths = [
    {
      id: 'frontend',
      name: t('habilidades.path.frontend'),
      color: 'text-primary',
      borderColor: 'border-primary',
      lineGradient: 'from-amber-500/30 via-primary to-amber-500/20',
      glow: 'shadow-[0_0_20px_rgba(255,145,0,0.4)]',
      skills: [
        { id: 'react', name: 'React 19', icon: Layers, max: 5 },
        { id: 'next', name: 'Next.js', icon: Globe, max: 5 },
        { id: 'tailwind', name: 'Tailwind CSS', icon: Shield, max: 5 },
        { id: 'redux', name: 'State Management (Redux/Zustand)', icon: Wand2, max: 5 },
      ]
    },
    {
      id: 'backend',
      name: t('habilidades.path.backend'),
      color: 'text-secondary',
      borderColor: 'border-secondary',
      lineGradient: 'from-purple-500/30 via-secondary to-purple-500/20',
      glow: 'shadow-[0_0_20px_rgba(249,171,255,0.4)]',
      skills: [
        { id: 'csharp', name: 'C# 12 & POO', icon: Cpu, max: 5 },
        { id: 'dotnet', name: '.NET 8 / ASP.NET Core', icon: Cpu, max: 5 },
        { id: 'node', name: 'Node.js & Express', icon: Terminal, max: 5 },
        { id: 'sql', name: lang === 'en' ? 'Databases (SQL & Mongo)' : 'Bases de Datos (SQL & Mongo)', icon: Database, max: 5 },
      ]
    },
    {
      id: 'tools',
      name: t('habilidades.path.tools'),
      color: 'text-primary-container',
      borderColor: 'border-primary-container',
      lineGradient: 'from-amber-500/30 via-primary-container to-amber-500/20',
      glow: 'shadow-[0_0_20px_rgba(255,145,0,0.3)]',
      skills: [
        { id: 'git', name: lang === 'en' ? 'Git & Version Control' : 'Git & Control de Versiones', icon: History, max: 5 },
        { id: 'docker', name: lang === 'en' ? 'Docker & Containers' : 'Docker & Contenedores', icon: Layers, max: 5 },
        { id: 'linux', name: 'Linux / Bash Scripting', icon: Terminal, max: 5 },
        { id: 'testing', name: lang === 'en' ? 'Automated Testing (xUnit/Vitest)' : 'Testing Automatizado (xUnit/Vitest)', icon: CheckCircle2, max: 5 },
      ]
    }
  ];

  const dynamicAttrs = rpgState.getDynamicAttributes();

  return (
    <div className="dragon-texture min-h-full constellation-bg relative p-4 md:p-8">
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <span className="font-label text-[10px] sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.3em] text-primary block mb-1">{t('habilidades.subtitle')}</span>
          <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface break-words">{t('habilidades.title')}</h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            {lang === 'en' 
              ? "Click any node to allocate talent points and empower Nicolas's attributes."
              : 'Haz clic en cualquier nodo para asignar puntos de talento y potenciar los atributos de Nicolas.'}
          </p>
        </div>

        {/* Skill Points HUD */}
        <div className="bg-surface-container-high/90 backdrop-blur-md p-3 md:p-4 rounded-xl border-2 border-primary/40 flex items-center gap-6 shadow-xl">
          <div className="text-center">
            <p className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
              {lang === 'en' ? 'Available Points' : 'Puntos Disponibles'}
            </p>
            <p className="font-headline text-2xl font-bold text-primary flex items-center justify-center gap-1">
              <Sparkles size={16} className="text-primary animate-pulse" />
              {availablePoints}
            </p>
          </div>
          <div className="text-center border-l border-outline-variant/30 pl-6">
            <p className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">{t('habilidades.level')}</p>
            <p className="font-headline text-2xl font-bold text-secondary">30</p>
          </div>
          {availablePoints < 6 && (
            <button
              onClick={handleResetPoints}
              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors cursor-pointer border border-outline-variant/30"
              title={lang === 'en' ? 'Reset Points' : 'Reiniciar Puntos'}
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Dynamic Attributes Panel (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-surface-container-low/90 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-outline-variant/20 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
              <User size={60} />
            </div>
            <h3 className="font-headline text-base md:text-lg font-bold mb-4 uppercase tracking-wider border-b border-outline-variant/20 pb-2 text-center md:text-left">
              {t('habilidades.attributes')}
            </h3>
            <div className="space-y-4">
              {[
                { label: t('habilidades.attr.str'), val: dynamicAttrs.str, color: 'bg-red-500' },
                { label: t('habilidades.attr.agi'), val: dynamicAttrs.agi, color: 'bg-amber-500' },
                { label: t('habilidades.attr.int'), val: dynamicAttrs.int, color: 'bg-purple-500' },
                { label: t('habilidades.attr.cha'), val: dynamicAttrs.cha, color: 'bg-sky-500' },
                { label: t('habilidades.attr.dex'), val: dynamicAttrs.dex, color: 'bg-emerald-500' }
              ].map((attr) => (
                <div key={attr.label} className="space-y-1.5">
                  <div className="flex justify-between font-label text-[10px] uppercase">
                    <span>{attr.label}</span>
                    <span className="font-bold text-primary">{attr.val}</span>
                  </div>
                  <div className="h-2 bg-surface-container-lowest rounded-full overflow-hidden p-0.5 border border-outline-variant/15">
                    <motion.div
                      initial={false}
                      animate={{ width: `${attr.val}%` }}
                      className={`${attr.color} h-full rounded-full transition-all duration-300`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Sinergy Badge */}
          <section className="bg-primary/10 p-4 sm:p-5 rounded-xl border border-primary/30 shadow-md">
            <div className="flex items-center gap-2 mb-1.5">
              <Award className="text-primary" size={16} />
              <h4 className="font-headline text-xs font-bold text-primary uppercase tracking-wider">{t('habilidades.bonus.title')}</h4>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {t('habilidades.bonus.desc1')} <br/>
              {t('habilidades.bonus.desc2')}
            </p>
          </section>
        </div>

        {/* Tree Nodes Display with Constellation Lines (3 cols) */}
        <div className="lg:col-span-3 bg-surface-container-lowest/80 backdrop-blur-md p-6 md:p-10 border-2 border-outline-variant/20 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
            {paths.map((path, pathIndex) => (
              <div key={path.id} className="flex flex-col items-center gap-8 md:gap-10 relative">
                <h3 className={`font-headline text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${path.color} text-center`}>
                  {path.name}
                </h3>
                
                {/* Visual Constellation Line */}
                <div className="relative flex flex-col gap-8 md:gap-10 w-full items-center">
                  <div className={`absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b ${path.lineGradient} rounded-full -z-0 opacity-70`} />

                  {path.skills.map((skill, index) => {
                    const currentLvl = skillLevels[skill.id] || 1;
                    const isMax = currentLvl >= skill.max;
                    const isHovered = selectedSkill === skill.id;

                    return (
                      <motion.div
                        key={skill.id}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleUpgradeSkill(skill.id, skill.max)}
                        onMouseEnter={() => {
                          setSelectedSkill(skill.id);
                          sfx.playHover();
                        }}
                        onMouseLeave={() => setSelectedSkill(null)}
                        className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer transition-all duration-200 group ${
                          isHovered ? 'z-50' : 'z-10'
                        }`}
                      >
                        {/* Diamond base */}
                        <div
                          className={`absolute inset-0 bg-surface-container-high border-2 ${path.borderColor} rotate-45 transition-all duration-300 ${
                            isMax ? 'bg-primary/20 shadow-[0_0_20px_rgba(255,145,0,0.6)]' : path.glow
                          } group-hover:brightness-125`}
                        />

                        {/* Icon */}
                        <div className="relative z-10">
                          <skill.icon className={path.color} size={24} aria-hidden="true" />
                        </div>

                        {/* Level badge */}
                        <div className="absolute -bottom-1 -right-1 z-20 bg-surface-container-lowest border border-outline-variant/40 px-1.5 py-0.5 rounded font-mono text-[9px] md:text-[10px] font-bold text-on-surface shadow-sm">
                          {currentLvl}/{skill.max}
                        </div>

                        {/* Upgrade indicator if points available */}
                        {availablePoints > 0 && !isMax && (
                          <div className="absolute -top-1 -right-1 z-20 w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold animate-bounce shadow-md">
                            +
                          </div>
                        )}

                        {/* Tooltip */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute z-[120] w-52 sm:w-60 bg-surface-container-highest/95 backdrop-blur-md p-3.5 border border-primary/50 rounded-xl shadow-2xl text-left pointer-events-none ${
                                pathIndex === 2
                                  ? 'md:right-full md:mr-4 md:top-1/2 md:-translate-y-1/2'
                                  : 'md:left-full md:ml-4 md:top-1/2 md:-translate-y-1/2'
                              } max-md:left-1/2 max-md:-translate-x-1/2 ${
                                index > 1 ? 'max-md:bottom-full max-md:mb-3' : 'max-md:top-full max-md:mt-3'
                              }`}
                            >
                              <p className="font-headline font-bold text-xs text-primary mb-0.5 uppercase tracking-wider">{skill.name}</p>
                              <p className="text-[10px] font-mono text-on-surface-variant mb-2">
                                {lang === 'en' ? 'Level:' : 'Nivel:'} {currentLvl} / {skill.max} {isMax ? '★ MAX' : ''}
                              </p>
                              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                                {isMax
                                  ? (lang === 'en' ? 'Maximized skill. Synergistic effect activated across the branch.' : 'Habilidad maximizada. Efecto sinérgico activado en toda la rama.')
                                  : availablePoints > 0
                                  ? (lang === 'en' ? 'Click to allocate +1 talent point and boost attributes.' : 'Haz clic para asignar +1 punto de talento y potenciar atributos.')
                                  : (lang === 'en' ? 'No points remaining. Reset to reallocate talents.' : 'No tienes puntos restantes. Reinicia para reasignar talentos.')}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
