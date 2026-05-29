import React from 'react';
import { 
  Layers, Globe, Wand2, Shield, Cpu, Terminal, Coffee, 
  Settings, Database, History, BookOpen, CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Bestiario() {
  const { t } = useLanguage();

  const skills = [
    { name: 'React', class: 'UI_WEAVER', icon: Layers, desc: t('bestiario.skill.react.desc'), mastery: 70, rank: 'VETERAN' },
    { name: 'Next.js', class: 'GATE_MASTER', icon: Globe, desc: t('bestiario.skill.nextjs.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'JavaScript', class: 'DOM_SORCERER', icon: Wand2, desc: t('bestiario.skill.javascript.desc'), mastery: 80, rank: 'EXPERT' },
    { name: 'TypeScript', class: 'TYPE_SENTINEL', icon: Shield, desc: t('bestiario.skill.typescript.desc'), mastery: 70, rank: 'VETERAN' },
    { name: 'C# / .NET', class: 'FORGE_ENG', icon: Cpu, desc: t('bestiario.skill.csharp.desc'), mastery: 75, rank: 'ELITE' },
    { name: 'Python', class: 'SERPENT_TAMER', icon: Terminal, desc: t('bestiario.skill.python.desc'), mastery: 55, rank: 'KNIGHT' },
    { name: 'Java', class: 'COFFEE_MAGE', icon: Coffee, desc: t('bestiario.skill.java.desc'), mastery: 50, rank: 'INITIATE' },
    { name: 'Tailwind CSS', class: 'STYLE_SMITH', icon: Wand2, desc: t('bestiario.skill.tailwind.desc'), mastery: 50, rank: 'INITIATE' },
    { name: 'C++', class: 'SYS_SMITH', icon: Settings, desc: t('bestiario.skill.cpp.desc'), mastery: 70, rank: 'VETERAN' },
    { name: 'VBA', class: 'MACRO_MAGE', icon: Settings, desc: t('bestiario.skill.vba.desc'), mastery: 75, rank: 'VETERAN' },
    { name: 'Express', class: 'PATH_WALKER', icon: Terminal, desc: t('bestiario.skill.express.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'MongoDB', class: 'DOC_GUARDIAN', icon: Database, desc: t('bestiario.skill.mongodb.desc'), mastery: 65, rank: 'VETERAN' },
    { name: 'MySQL', class: 'REL_LORD', icon: Database, desc: t('bestiario.skill.mysql.desc'), mastery: 65, rank: 'VETERAN' },
    { name: 'MariaDB', class: 'REL_SCOUT', icon: Database, desc: t('bestiario.skill.mariadb.desc'), mastery: 50, rank: 'INITIATE' },
    { name: 'Git / GitHub', class: 'TIME_WEAVER', icon: History, desc: t('bestiario.skill.git.desc'), mastery: 80, rank: 'EXPERT' },
    { name: 'Docker', class: 'CONTAINER_MAGE', icon: Layers, desc: t('bestiario.skill.docker.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'GitHub Actions', class: 'PIPELINE_ORACLE', icon: CheckCircle2, desc: t('bestiario.skill.githubactions.desc'), mastery: 40, rank: 'INITIATE' },
    { name: 'Linux / Bash', class: 'SHELL_WRITER', icon: Terminal, desc: t('bestiario.skill.linux.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'AWS Cloud', class: 'SKY_SENTINEL', icon: Globe, desc: t('bestiario.skill.cloud.desc'), mastery: 20, rank: 'NOVICE' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 rune-bg relative min-h-screen w-full">
      <header className="mb-10 md:mb-20 text-center lg:text-left relative px-4">
        <p className="font-label text-primary-container text-[10px] sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.3em] uppercase mb-2">{t('bestiario.subtitle')}</p>
        <h1 className="font-headline text-2xl sm:text-5xl md:text-7xl font-black text-on-surface leading-none mb-6 uppercase break-words text-center lg:text-left">{t('bestiario.title')}</h1>
        <div className="h-1 w-16 md:w-24 bg-primary-container mx-auto lg:mx-0"></div>
        <p className="max-w-2xl mt-6 text-on-surface-variant text-sm md:text-lg leading-relaxed font-light mx-auto lg:mx-0">
          {t('bestiario.description')}
        </p>

        {/* Tech Tags - scannable for recruiters */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6">
          {['React', 'TypeScript', 'C# / .NET', 'JavaScript', 'Node.js', 'Python', 'Java', 'Tailwind CSS', 'MongoDB', 'MySQL', 'Git', 'Docker', 'GitHub Actions', 'Linux', 'AWS'].map((tech) => (
            <span key={tech} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
              {tech}
            </span>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {skills.map((skill, i) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relic-card bg-surface-container-high p-6 md:p-8 flex flex-col gap-6 group hover:bg-surface-container-highest transition-colors duration-300"
          >
            <div className="flex justify-between items-start">
              <skill.icon className="text-secondary" size={40} />
              <span className="font-label text-[10px] text-outline tracking-tighter opacity-50 uppercase">{t('bestiario.class')}: {skill.class}</span>
            </div>
            <div>
              <h2 className="font-headline text-2xl font-bold text-primary mb-1">{skill.name}</h2>
              <p className="font-label text-xs uppercase text-on-surface-variant tracking-widest mb-4">{t('bestiario.specialist')}</p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 italic">
                {skill.desc}
              </p>
            </div>
            <div className="mt-auto">
              <div className="flex justify-between text-[10px] font-label uppercase tracking-widest mb-2 text-on-surface">
                <span>{t('bestiario.mastery')}: {skill.mastery}%</span>
                <span className="text-primary">{skill.rank}</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-lowest">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container shadow-[0_0_8px_rgba(255,145,0,0.5)]" style={{ width: `${skill.mastery}%` }}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
