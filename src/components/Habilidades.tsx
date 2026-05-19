import React, { useState } from 'react';
import { 
  Wand2, Layers, Globe, Shield, Cpu, Database, Terminal, 
  History, CheckCircle2, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Habilidades() {
  const { t } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const paths = [
    {
      name: t('habilidades.path.frontend'),
      color: 'text-primary',
      borderColor: 'border-primary',
      glow: 'shadow-[0_0_20px_rgba(255,145,0,0.4)]',
      skills: [
        { id: 'js', name: 'JavaScript', icon: Wand2, level: 5, max: 5, status: 'mastered' },
        { id: 'react', name: 'React.js', icon: Layers, level: 4, max: 5, status: 'active' },
        { id: 'next', name: 'Next.js', icon: Globe, level: 3, max: 5, status: 'active' },
        { id: 'tailwind', name: 'Tailwind CSS', icon: Shield, level: 5, max: 5, status: 'mastered' },
      ]
    },
    {
      name: t('habilidades.path.backend'),
      color: 'text-secondary',
      borderColor: 'border-secondary',
      glow: 'shadow-[0_0_20px_rgba(249,171,255,0.4)]',
      skills: [
        { id: 'dotnet', name: '.NET / C#', icon: Cpu, level: 4, max: 5, status: 'active' },
        { id: 'sql', name: 'SQL Server', icon: Database, level: 3, max: 5, status: 'active' },
        { id: 'mongo', name: 'MongoDB', icon: Database, level: 2, max: 5, status: 'active' },
        { id: 'python', name: 'Python', icon: Terminal, level: 3, max: 5, status: 'active' },
      ]
    },
    {
      name: t('habilidades.path.tools'),
      color: 'text-primary-container',
      borderColor: 'border-primary-container',
      glow: 'shadow-[0_0_20px_rgba(255,145,0,0.3)]',
      skills: [
        { id: 'git', name: 'Git / GitHub', icon: History, level: 4, max: 5, status: 'active' },
        { id: 'docker', name: 'Docker', icon: Layers, level: 1, max: 5, status: 'locked' },
        { id: 'cloud', name: 'Cloud Ops', icon: Globe, level: 0, max: 5, status: 'locked' },
        { id: 'testing', name: 'Unit Testing', icon: CheckCircle2, level: 2, max: 5, status: 'active' },
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-screen constellation-bg relative">
      <header className="mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8 px-4">
        <div className="text-center md:text-left">
          <span className="font-label text-[10px] sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.3em] text-primary block mb-2">{t('habilidades.subtitle')}</span>
          <h1 className="font-headline text-xl sm:text-4xl md:text-6xl font-bold tracking-tight text-on-surface break-words">{t('habilidades.title')}</h1>
        </div>
        <div className="bg-surface-container-high p-3 md:p-4 border border-outline-variant/20 flex gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-start">
          <div className="text-center">
            <p className="font-label text-[9px] md:text-[10px] uppercase text-on-surface-variant">{t('habilidades.points')}</p>
            <p className="font-headline text-xl md:text-2xl text-primary">∞</p>
          </div>
          <div className="text-center">
            <p className="font-label text-[9px] md:text-[10px] uppercase text-on-surface-variant">{t('habilidades.level')}</p>
            <p className="font-headline text-xl md:text-2xl text-secondary">30</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
        <div className="lg:col-span-1 space-y-6 md:space-y-8">
          <section className="bg-surface-container-low p-4 sm:p-6 border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <User size={60} />
            </div>
            <h3 className="font-headline text-base md:text-xl font-bold mb-4 md:mb-6 uppercase tracking-widest border-b border-outline-variant/20 pb-2 text-center md:text-left">{t('habilidades.attributes')}</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { label: t('habilidades.attr.str'), val: 88, color: 'bg-red-500' },
                { label: t('habilidades.attr.agi'), val: 82, color: 'bg-blue-500' },
                { label: t('habilidades.attr.int'), val: 85, color: 'bg-purple-500' },
                { label: t('habilidades.attr.cha'), val: 92, color: 'bg-yellow-500' },
                { label: t('habilidades.attr.dex'), val: 80, color: 'bg-green-500' }
              ].map((attr) => (
                <div key={attr.label} className="space-y-2">
                  <div className="flex justify-between font-label text-[9px] md:text-[10px] uppercase tracking-tighter">
                    <span>{attr.label}</span>
                    <span>{attr.val}</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className={`${attr.color} h-full`} style={{ width: `${attr.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary/5 p-5 md:p-6 border border-primary/20">
            <h4 className="font-headline text-xs md:text-sm font-bold text-primary mb-2 uppercase">{t('habilidades.bonus.title')}</h4>
            <p className="text-[10px] md:text-xs text-on-surface-variant leading-relaxed">
              {t('habilidades.bonus.desc1')} <br/>
              {t('habilidades.bonus.desc2')}
            </p>
          </section>
        </div>

        <div className="lg:col-span-3 bg-surface-container-lowest/50 p-6 md:p-12 border border-outline-variant/10 relative overflow-hidden rounded-xl">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="grad-p" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-primary-container)" />
              </linearGradient>
            </defs>
            <path d="M 150 150 L 150 550" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
            <path d="M 450 150 L 450 550" stroke="currentColor" strokeWidth="2" fill="none" className="text-secondary" />
            <path d="M 750 150 L 750 550" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary-container" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative z-10">
            {paths.map((path) => (
              <div key={path.name} className="flex flex-col items-center gap-10 md:gap-16">
                <h3 className={`font-headline text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${path.color} text-center`}>
                  {path.name}
                </h3>
                
                <div className="flex flex-col gap-10 md:gap-12 w-full items-center">
                  {path.skills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.05 }}
                      onMouseEnter={() => setSelectedSkill(skill.id)}
                      onMouseLeave={() => setSelectedSkill(null)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        skill.status === 'locked' ? 'opacity-30 grayscale' : 'opacity-100'
                      } ${selectedSkill === skill.id ? 'z-[100]' : 'z-10'}`}
                    >
                      <div className={`absolute inset-0 bg-surface-container-high border-2 ${path.borderColor} rotate-45 ${skill.status !== 'locked' ? path.glow : ''}`}></div>
                      <div className="relative z-10">
                        <skill.icon className={path.color} size={24} aria-hidden="true" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 z-20 bg-surface-container-lowest border border-outline-variant px-1.5 py-0.5 font-mono text-[8px] md:text-[10px] font-bold">
                        {skill.level}/{skill.max}
                      </div>

                      <AnimatePresence>
                        {selectedSkill === skill.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: index > 1 ? 10 : -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`absolute ${index > 1 ? 'bottom-full mb-4 md:mb-6' : 'top-full mt-4 md:mt-6'} left-1/2 -translate-x-1/2 w-40 md:w-48 bg-surface-container-highest p-3 md:p-4 z-[110] border border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-left backdrop-blur-md pointer-events-none`}
                          >
                            <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-surface-container-highest border-l border-t border-primary/30 rotate-45 ${index > 1 ? 'top-full -mt-1 md:-mt-1.5' : 'bottom-full -mb-1 md:-mb-1.5 rotate-[225deg]'}`}></div>
                            <p className="font-bold text-[10px] md:text-xs text-primary mb-1 uppercase tracking-wider">{skill.name}</p>
                            <p className="text-[8px] md:text-[10px] text-on-surface-variant leading-relaxed">
                              {skill.status === 'mastered' ? t('habilidades.tooltip.mastered') : 
                               skill.status === 'locked' ? t('habilidades.tooltip.locked') : 
                               t('habilidades.tooltip.active')}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-12 flex justify-center gap-8 font-label text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rotate-45"></div>
          <span>{t('habilidades.legend.mastered')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-primary rotate-45"></div>
          <span>{t('habilidades.legend.progress')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-surface-container-highest rotate-45 opacity-30"></div>
          <span>{t('habilidades.legend.locked')}</span>
        </div>
      </footer>
    </div>
  );
}
