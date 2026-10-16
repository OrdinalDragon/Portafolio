import React, { useState, useMemo } from 'react';
import { 
  Layers, Globe, Wand2, Shield, Cpu, Terminal, Coffee, 
  Settings, Database, History, BookOpen, CheckCircle2, Search, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

type TechCategory = 'todas' | 'frontend' | 'backend' | 'database' | 'devops' | 'testing';

export default function Bestiario() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES: { id: TechCategory; label: string }[] = [
    { id: 'todas', label: 'Todas las Artes' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Bases de Datos' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'testing', label: 'Testing & Logs' },
  ];

  const skills = [
    { name: 'React', category: 'frontend', class: 'UI_WEAVER', icon: Layers, desc: t('bestiario.skill.react.desc'), mastery: 70, rank: 'VETERAN' },
    { name: 'Next.js', category: 'frontend', class: 'GATE_MASTER', icon: Globe, desc: t('bestiario.skill.nextjs.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'JavaScript', category: 'frontend', class: 'DOM_SORCERER', icon: Wand2, desc: t('bestiario.skill.javascript.desc'), mastery: 80, rank: 'EXPERT' },
    { name: 'TypeScript', category: 'frontend', class: 'TYPE_SENTINEL', icon: Shield, desc: t('bestiario.skill.typescript.desc'), mastery: 70, rank: 'VETERAN' },
    { name: 'C# / .NET', category: 'backend', class: 'FORGE_ENG', icon: Cpu, desc: t('bestiario.skill.csharp.desc'), mastery: 75, rank: 'ELITE' },
    { name: 'Python', category: 'backend', class: 'SERPENT_TAMER', icon: Terminal, desc: t('bestiario.skill.python.desc'), mastery: 55, rank: 'KNIGHT' },
    { name: 'Java', category: 'backend', class: 'COFFEE_MAGE', icon: Coffee, desc: t('bestiario.skill.java.desc'), mastery: 50, rank: 'INITIATE' },
    { name: 'Tailwind CSS', category: 'frontend', class: 'STYLE_SMITH', icon: Wand2, desc: t('bestiario.skill.tailwind.desc'), mastery: 50, rank: 'INITIATE' },
    { name: 'C++', category: 'backend', class: 'SYS_SMITH', icon: Settings, desc: t('bestiario.skill.cpp.desc'), mastery: 70, rank: 'VETERAN' },
    { name: 'VBA', category: 'backend', class: 'MACRO_MAGE', icon: Settings, desc: t('bestiario.skill.vba.desc'), mastery: 75, rank: 'VETERAN' },
    { name: 'Express', category: 'backend', class: 'PATH_WALKER', icon: Terminal, desc: t('bestiario.skill.express.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'MongoDB', category: 'database', class: 'DOC_GUARDIAN', icon: Database, desc: t('bestiario.skill.mongodb.desc'), mastery: 65, rank: 'VETERAN' },
    { name: 'MySQL', category: 'database', class: 'REL_LORD', icon: Database, desc: t('bestiario.skill.mysql.desc'), mastery: 65, rank: 'VETERAN' },
    { name: 'MariaDB', category: 'database', class: 'REL_SCOUT', icon: Database, desc: t('bestiario.skill.mariadb.desc'), mastery: 50, rank: 'INITIATE' },
    { name: 'Git / GitHub', category: 'devops', class: 'TIME_WEAVER', icon: History, desc: t('bestiario.skill.git.desc'), mastery: 80, rank: 'EXPERT' },
    { name: 'Docker', category: 'devops', class: 'CONTAINER_MAGE', icon: Layers, desc: t('bestiario.skill.docker.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'GitHub Actions', category: 'devops', class: 'PIPELINE_ORACLE', icon: CheckCircle2, desc: t('bestiario.skill.githubactions.desc'), mastery: 40, rank: 'INITIATE' },
    { name: 'Linux / Bash', category: 'devops', class: 'SHELL_WRITER', icon: Terminal, desc: t('bestiario.skill.linux.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'AWS Cloud', category: 'devops', class: 'SKY_SENTINEL', icon: Globe, desc: t('bestiario.skill.cloud.desc'), mastery: 20, rank: 'NOVICE' },
    { name: 'ASP.NET Core', category: 'backend', class: 'REST_FORGER', icon: Cpu, desc: t('bestiario.skill.aspnet.desc'), mastery: 65, rank: 'KNIGHT' },
    { name: 'Entity Framework', category: 'database', class: 'DATA_BINDER', icon: Database, desc: t('bestiario.skill.efcore.desc'), mastery: 60, rank: 'KNIGHT' },
    { name: 'Windows Forms', category: 'frontend', class: 'DESKTOP_ARTISAN', icon: Layers, desc: t('bestiario.skill.winforms.desc'), mastery: 55, rank: 'KNIGHT' },
    { name: 'BCrypt / Security', category: 'backend', class: 'SHADOW_WARD', icon: Shield, desc: t('bestiario.skill.bcrypt.desc'), mastery: 50, rank: 'INITIATE' },
    { name: 'JWT Auth', category: 'backend', class: 'TOKEN_KEEPER', icon: Shield, desc: t('bestiario.skill.jwt.desc'), mastery: 45, rank: 'INITIATE' },
    { name: 'xUnit', category: 'testing', class: 'TEST_ORACLE', icon: CheckCircle2, desc: t('bestiario.skill.xunit.desc'), mastery: 50, rank: 'INITIATE' },
    { name: 'Moq', category: 'testing', class: 'ILLUSIONIST', icon: Wand2, desc: t('bestiario.skill.moq.desc'), mastery: 45, rank: 'INITIATE' },
    { name: 'Serilog', category: 'testing', class: 'CHRONICLE_SCRIBE', icon: History, desc: t('bestiario.skill.serilog.desc'), mastery: 50, rank: 'INITIATE' },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory = selectedCategory === 'todas' || skill.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 rune-bg relative h-full w-full">
      <header className="mb-8 md:mb-12 text-center lg:text-left relative px-4">
        <p className="font-label text-primary-container text-[10px] sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.3em] uppercase mb-2">{t('bestiario.subtitle')}</p>
        <h1 className="font-headline text-2xl sm:text-5xl md:text-7xl font-black text-on-surface leading-none mb-6 uppercase break-words text-center lg:text-left">{t('bestiario.title')}</h1>
        <div className="h-1 w-16 md:w-24 bg-primary-container mx-auto lg:mx-0"></div>
        <p className="max-w-2xl mt-6 text-on-surface-variant text-sm md:text-lg leading-relaxed font-light mx-auto lg:mx-0">
          {t('bestiario.description')}
        </p>

        {/* Filter Toolbar: Search Bar & Category Pills */}
        <div className="mt-8 space-y-4">
          <div className="relative max-w-md mx-auto lg:mx-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=">_ Buscar conjuro, habilidad o clase..."
              className="w-full bg-surface-container-high border-2 border-outline-variant/30 focus:border-primary text-on-surface font-mono text-xs pl-10 pr-10 py-2.5 rounded-lg outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    sfx.playSelect();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-primary/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
            <span className="font-mono text-xs text-on-surface-variant/70 ml-2">
              ({filteredSkills.length} entradas)
            </span>
          </div>
        </div>
      </header>

      {filteredSkills.length === 0 ? (
        <div className="bg-surface-container-high border-2 border-outline-variant/30 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <p className="font-headline text-lg font-bold text-on-surface mb-2">
            No se hallaron conjuros con &quot;{searchQuery}&quot;
          </p>
          <p className="font-body text-xs text-on-surface-variant mb-4">
            Prueba ajustando los términos de búsqueda o seleccionando otra categoría del grimorio.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todas');
              sfx.playSelect();
            }}
            className="px-4 py-2 bg-primary text-on-primary font-mono text-xs rounded-lg uppercase tracking-wider font-bold cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredSkills.map((skill, i) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className="relic-card bg-surface-container-high p-6 md:p-8 flex flex-col gap-6 group hover:bg-surface-container-highest transition-colors duration-300"
            >
              <div className="flex justify-between items-start">
                <skill.icon className="text-secondary" size={40} />
                <div className="text-right">
                  <span className="font-label text-[10px] text-outline tracking-tighter opacity-50 uppercase block">{t('bestiario.class')}: {skill.class}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold">{skill.category}</span>
                </div>
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
      )}
    </div>
  );
}
