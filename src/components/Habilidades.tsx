import React, { useState } from 'react';
import { 
  Wand2, Layers, Globe, Shield, Cpu, Database, Terminal, 
  History, CheckCircle2, User, Plus, RotateCcw, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

export default function Habilidades() {
  const { t } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [availablePoints, setAvailablePoints] = useState(6);

  // Dynamic levels state
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>({
    js: 4, react: 4, next: 3, tailwind: 4,
    dotnet: 4, sql: 3, mongo: 3, python: 3,
    git: 4, docker: 3, githubactions: 2, linux: 3, cloud: 2, testing: 3,
  });

  const baseLevels = {
    js: 4, react: 4, next: 3, tailwind: 4,
    dotnet: 4, sql: 3, mongo: 3, python: 3,
    git: 4, docker: 3, githubactions: 2, linux: 3, cloud: 2, testing: 3,
  };

  const handleUpgradeSkill = (id: string, max: number) => {
    const current = skillLevels[id] || 1;
    if (availablePoints > 0 && current < max) {
      sfx.playLevelUp();
      setSkillLevels((prev) => ({ ...prev, [id]: current + 1 }));
      setAvailablePoints((pts) => pts - 1);
    } else {
      sfx.playHover();
    }
  };

  const handleResetPoints = () => {
    sfx.playSelect();
    setSkillLevels(baseLevels);
    setAvailablePoints(6);
  };

  const paths = [
    {
      name: t('habilidades.path.frontend'),
      color: 'text-primary',
      borderColor: 'border-primary',
      glow: 'shadow-[0_0_20px_rgba(255,145,0,0.4)]',
      skills: [
        { id: 'js', name: 'JavaScript', icon: Wand2, max: 5 },
        { id: 'react', name: 'React.js', icon: Layers, max: 5 },
        { id: 'next', name: 'Next.js', icon: Globe, max: 5 },
        { id: 'tailwind', name: 'Tailwind CSS', icon: Shield, max: 5 },
      ]
    },
    {
      name: t('habilidades.path.backend'),
      color: 'text-secondary',
      borderColor: 'border-secondary',
      glow: 'shadow-[0_0_20px_rgba(249,171,255,0.4)]',
      skills: [
        { id: 'dotnet', name: '.NET / C#', icon: Cpu, max: 5 },
        { id: 'sql', name: 'SQL Server', icon: Database, max: 5 },
        { id: 'mongo', name: 'MongoDB', icon: Database, max: 5 },
        { id: 'python', name: 'Python', icon: Terminal, max: 5 },
      ]
    },
    {
      name: t('habilidades.path.tools'),
      color: 'text-primary-container',
      borderColor: 'border-primary-container',
      glow: 'shadow-[0_0_20px_rgba(255,145,0,0.3)]',
      skills: [
        { id: 'git', name: 'Git / GitHub', icon: History, max: 5 },
        { id: 'docker', name: 'Docker', icon: Layers, max: 5 },
        { id: 'githubactions', name: 'GitHub Actions', icon: CheckCircle2, max: 5 },
        { id: 'linux', name: 'Linux / Bash', icon: Terminal, max: 5 },
        { id: 'cloud', name: 'Cloud (AWS)', icon: Globe, max: 5 },
        { id: 'testing', name: 'Unit Testing', icon: CheckCircle2, max: 5 },
      ]
    }
  ];

  // Calculate dynamic attributes based on allocated points
  const totalFrontPoints = (skillLevels['js'] || 0) + (skillLevels['react'] || 0) + (skillLevels['next'] || 0) + (skillLevels['tailwind'] || 0);
  const totalBackPoints = (skillLevels['dotnet'] || 0) + (skillLevels['sql'] || 0) + (skillLevels['mongo'] || 0) + (skillLevels['python'] || 0);
  const totalToolsPoints = (skillLevels['git'] || 0) + (skillLevels['docker'] || 0) + (skillLevels['githubactions'] || 0) + (skillLevels['linux'] || 0);

  const dynamicStr = Math.min(80 + totalBackPoints * 1.2, 100);
  const dynamicAgi = Math.min(75 + totalFrontPoints * 1.3, 100);
  const dynamicInt = Math.min(80 + (totalBackPoints + totalFrontPoints) * 0.7, 100);
  const dynamicDex = Math.min(75 + totalToolsPoints * 1.5, 100);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full constellation-bg relative p-4 md:p-8">
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <span className="font-label text-[10px] sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.3em] text-primary block mb-1">{t('habilidades.subtitle')}</span>
          <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface break-words">{t('habilidades.title')}</h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Haz clic en cualquier nodo para asignar puntos de talento y potenciar los atributos de Nicolás.
          </p>
        </div>

        {/* Skill Points HUD */}
        <div className="bg-surface-container-high p-3 md:p-4 rounded-xl border border-outline-variant/30 flex items-center gap-6 shadow-lg">
          <div className="text-center">
            <p className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">Puntos Disponibles</p>
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
              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Reiniciar Puntos"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Dynamic Attributes Panel (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-surface-container-low p-4 sm:p-6 rounded-xl border border-outline-variant/20 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <User size={60} />
            </div>
            <h3 className="font-headline text-base md:text-lg font-bold mb-4 uppercase tracking-wider border-b border-outline-variant/20 pb-2 text-center md:text-left">
              {t('habilidades.attributes')}
            </h3>
            <div className="space-y-4">
              {[
                { label: t('habilidades.attr.str'), val: Math.round(dynamicStr), color: 'bg-red-500' },
                { label: t('habilidades.attr.agi'), val: Math.round(dynamicAgi), color: 'bg-blue-500' },
                { label: t('habilidades.attr.int'), val: Math.round(dynamicInt), color: 'bg-purple-500' },
                { label: t('habilidades.attr.cha'), val: 92, color: 'bg-yellow-500' },
                { label: t('habilidades.attr.dex'), val: Math.round(dynamicDex), color: 'bg-green-500' }
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

          <section className="bg-primary/5 p-4 sm:p-5 rounded-xl border border-primary/20">
            <h4 className="font-headline text-xs font-bold text-primary mb-1 uppercase tracking-wider">{t('habilidades.bonus.title')}</h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {t('habilidades.bonus.desc1')} <br/>
              {t('habilidades.bonus.desc2')}
            </p>
          </section>
        </div>

        {/* Tree Nodes Display (3 cols) */}
        <div className="lg:col-span-3 bg-surface-container-lowest/60 p-6 md:p-10 border border-outline-variant/20 rounded-2xl relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
            {paths.map((path) => (
              <div key={path.name} className="flex flex-col items-center gap-8 md:gap-10">
                <h3 className={`font-headline text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${path.color} text-center`}>
                  {path.name}
                </h3>
                
                <div className="flex flex-col gap-8 md:gap-10 w-full items-center">
                  {path.skills.map((skill, index) => {
                    const currentLvl = skillLevels[skill.id] || 1;
                    const isMax = currentLvl >= skill.max;

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
                        className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer transition-all duration-200 group"
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
                          {selectedSkill === skill.id && (
                            <motion.div 
                              initial={{ opacity: 0, y: index > 1 ? 10 : -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={`absolute ${index > 1 ? 'bottom-full mb-3' : 'top-full mt-3'} left-1/2 -translate-x-1/2 w-44 md:w-52 bg-surface-container-highest p-3.5 z-[110] border border-primary/40 rounded-xl shadow-2xl text-left pointer-events-none`}
                            >
                              <p className="font-headline font-bold text-xs text-primary mb-0.5 uppercase tracking-wider">{skill.name}</p>
                              <p className="text-[10px] font-mono text-on-surface-variant mb-2">
                                Nivel: {currentLvl} / {skill.max} {isMax ? '★ MAX' : ''}
                              </p>
                              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                                {isMax
                                  ? 'Habilidad maximizada. Efecto sinérgico activado.'
                                  : availablePoints > 0
                                  ? 'Haz clic para asignar +1 punto de talento.'
                                  : 'No tienes puntos restantes. Reinicia para reasignar.'}
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
