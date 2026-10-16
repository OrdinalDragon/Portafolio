import React, { useState, useMemo } from 'react';
import { 
  Layers, Globe, Wand2, Shield, Cpu, Terminal, Coffee, 
  Settings, Database, History, BookOpen, CheckCircle2, Search, X,
  Flame, Zap, Sparkles, Award, ShieldAlert, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

type TechCategory = 'todas' | 'frontend' | 'backend' | 'database' | 'devops' | 'testing';
type DragonElement = 'Fuego' | 'Rayo' | 'Obsidiana' | 'Cristal';

interface SkillEntry {
  name: string;
  category: TechCategory;
  class: string;
  icon: React.ElementType;
  desc: string;
  mastery: number;
  rank: 'NOVICE' | 'INITIATE' | 'KNIGHT' | 'VETERAN' | 'ELITE' | 'EXPERT';
  element: DragonElement;
  elementLabel: string;
  manaCost: number;
  castTime: string;
  neutralizes: string;
  dragonLore: string;
}

export default function Bestiario() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillEntry | null>(null);
  const [castSuccess, setCastSuccess] = useState(false);

  const CATEGORIES: { id: TechCategory; label: string }[] = [
    { id: 'todas', label: 'Todas las Artes' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Bases de Datos' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'testing', label: 'Testing & Logs' },
  ];

  const skills: SkillEntry[] = [
    { 
      name: 'React', category: 'frontend', class: 'UI_WEAVER', icon: Layers, 
      desc: t('bestiario.skill.react.desc'), mastery: 70, rank: 'VETERAN',
      element: 'Fuego', elementLabel: 'Aliento Ígneo (UI)', manaCost: 20, castTime: '16ms (60 FPS)',
      neutralizes: 'Desfase de estado visual y recargas lentas',
      dragonLore: 'El Dragón canaliza filamentos de fuego reactivo para regenerar el DOM en microsegundos sin perturbar el plano dimensional.'
    },
    { 
      name: 'Next.js', category: 'frontend', class: 'GATE_MASTER', icon: Globe, 
      desc: t('bestiario.skill.nextjs.desc'), mastery: 60, rank: 'KNIGHT',
      element: 'Fuego', elementLabel: 'Aliento Ígneo (SSR)', manaCost: 25, castTime: 'Instantáneo (Edge)',
      neutralizes: 'Latencia de red y mala indexación SEO',
      dragonLore: 'Abre portales dimensionales ultrarrápidos donde el contenido ya viaja pre-forjado desde el nido de los servidores.'
    },
    { 
      name: 'JavaScript', category: 'frontend', class: 'DOM_SORCERER', icon: Wand2, 
      desc: t('bestiario.skill.javascript.desc'), mastery: 80, rank: 'EXPERT',
      element: 'Fuego', elementLabel: 'Fuego Primigenio', manaCost: 15, castTime: 'Event Loop',
      neutralizes: 'Interfaces estáticas y falta de reactividad',
      dragonLore: 'La lengua materna del dragón en la web. Gobierna la asincronía y da vida a artefactos inanimados con promesas inquebrantables.'
    },
    { 
      name: 'TypeScript', category: 'frontend', class: 'TYPE_SENTINEL', icon: Shield, 
      desc: t('bestiario.skill.typescript.desc'), mastery: 70, rank: 'VETERAN',
      element: 'Obsidiana', elementLabel: 'Escama Anti-Bugs', manaCost: 10, castTime: 'Tiempo de Compilación',
      neutralizes: 'Excepciones silenciosas de tipo undefined en runtime',
      dragonLore: 'Escamas impenetrables que repelen bugs antes de que toquen el suelo de producción mediante tipado estricto sagrado.'
    },
    { 
      name: 'C# / .NET', category: 'backend', class: 'FORGE_ENG', icon: Cpu, 
      desc: t('bestiario.skill.csharp.desc'), mastery: 75, rank: 'ELITE',
      element: 'Rayo', elementLabel: 'Rayo Industrial', manaCost: 35, castTime: 'JIT Optimizado',
      neutralizes: 'Fragilidad arquitectónica y pérdida de rendimiento en backend',
      dragonLore: 'El dragón descarga rayos de alta tensión lógica construyendo ciudadelas corporativas multicapa blindadas con POO.'
    },
    { 
      name: 'Python', category: 'backend', class: 'SERPENT_TAMER', icon: Terminal, 
      desc: t('bestiario.skill.python.desc'), mastery: 55, rank: 'KNIGHT',
      element: 'Rayo', elementLabel: 'Rayo de Datos & IA', manaCost: 20, castTime: '0.1s (FastAPI Async)',
      neutralizes: 'Procesamiento lento de datos y scrapers rígidos',
      dragonLore: 'Comunica directamente con bestias de Inteligencia Artificial (Gemini) y orquesta scrapers automatizados a la velocidad del rayo.'
    },
    { 
      name: 'Java', category: 'backend', class: 'COFFEE_MAGE', icon: Coffee, 
      desc: t('bestiario.skill.java.desc'), mastery: 50, rank: 'INITIATE',
      element: 'Rayo', elementLabel: 'Núcleo JVM', manaCost: 30, castTime: 'JVM Bytecode',
      neutralizes: 'Incompatibilidad entre plataformas operativas',
      dragonLore: 'Conjura máquinas virtuales eternas garantizando que el hechizo se ejecute idéntico en cualquier reino de la tierra.'
    },
    { 
      name: 'Tailwind CSS', category: 'frontend', class: 'STYLE_SMITH', icon: Wand2, 
      desc: t('bestiario.skill.tailwind.desc'), mastery: 50, rank: 'INITIATE',
      element: 'Fuego', elementLabel: 'Armadura Rápida', manaCost: 10, castTime: 'Zero Runtime',
      neutralizes: 'Hojas de estilo monolíticas y colisiones de clases',
      dragonLore: 'Forja estéticas obsidian y paletas de color a medida con hilos atómicos puros compilados al vuelo.'
    },
    { 
      name: 'C++', category: 'backend', class: 'SYS_SMITH', icon: Settings, 
      desc: t('bestiario.skill.cpp.desc'), mastery: 70, rank: 'VETERAN',
      element: 'Rayo', elementLabel: 'Trueno de Hardware', manaCost: 40, castTime: 'Cero Abstracción',
      neutralizes: 'Consumo excesivo de memoria en tareas críticas',
      dragonLore: 'Solo los dragones más valientes descienden al metal puro administrando punteros y el alma física de los registros.'
    },
    { 
      name: 'VBA', category: 'backend', class: 'MACRO_MAGE', icon: Settings, 
      desc: t('bestiario.skill.vba.desc'), mastery: 75, rank: 'VETERAN',
      element: 'Rayo', elementLabel: 'Rayo Comercial', manaCost: 15, castTime: 'Instantáneo Excel',
      neutralizes: 'Horas de trabajo manual repetitivo en hojas de cálculo',
      dragonLore: 'La chispa original que despertó al dragón en 2016: automatizó listas de precios, pedidos de 100+ clientes y flujos comerciales B2B.'
    },
    { 
      name: 'Express', category: 'backend', class: 'PATH_WALKER', icon: Terminal, 
      desc: t('bestiario.skill.express.desc'), mastery: 60, rank: 'KNIGHT',
      element: 'Rayo', elementLabel: 'Rayo de Enrutamiento', manaCost: 20, castTime: 'Node Asíncrono',
      neutralizes: 'Bloqueos de E/S y cuellos de botella en APIs',
      dragonLore: 'Enruta millones de paquetes HTTP con middlewares protectores a través de la naturaleza salvaje de Node.js.'
    },
    { 
      name: 'MongoDB', category: 'database', class: 'DOC_GUARDIAN', icon: Database, 
      desc: t('bestiario.skill.mongodb.desc'), mastery: 65, rank: 'VETERAN',
      element: 'Cristal', elementLabel: 'Bóveda NoSQL', manaCost: 25, castTime: 'BSON Indexado',
      neutralizes: 'Esquemas rígidos que impiden iterar rápido en producción',
      dragonLore: 'Custodia pergaminos polimórficos en colecciones elásticas capaces de escalar a miles de documentos por segundo.'
    },
    { 
      name: 'MySQL', category: 'database', class: 'REL_LORD', icon: Database, 
      desc: t('bestiario.skill.mysql.desc'), mastery: 65, rank: 'VETERAN',
      element: 'Cristal', elementLabel: 'Tablas Sagradas', manaCost: 25, castTime: 'Query ACID',
      neutralizes: 'Inconsistencias y anomalías de datos en operaciones financieras',
      dragonLore: 'Sella contratos inmutables mediante claves foráneas y restricciones que ninguna fuerza caótica puede romper.'
    },
    { 
      name: 'MariaDB', category: 'database', class: 'REL_SCOUT', icon: Database, 
      desc: t('bestiario.skill.mariadb.desc'), mastery: 50, rank: 'INITIATE',
      element: 'Cristal', elementLabel: 'Bóveda Open-Source', manaCost: 20, castTime: 'Query Optimizado',
      neutralizes: 'Costos de licencias cerradas y bloqueos de motor',
      dragonLore: 'El oráculo libre elegido para custodiar las arcas del Simulador Bancario en .NET con fiabilidad comprobada.'
    },
    { 
      name: 'Git / GitHub', category: 'devops', class: 'TIME_WEAVER', icon: History, 
      desc: t('bestiario.skill.git.desc'), mastery: 80, rank: 'EXPERT',
      element: 'Obsidiana', elementLabel: 'Control Temporal', manaCost: 10, castTime: 'Commit & Rebase',
      neutralizes: 'Pérdida de código y conflictos destructivos de merge',
      dragonLore: 'Permite al dragón volar a través de líneas temporales paralelas, revertir catástrofes y fusionar ramas con precisión quirúrgica.'
    },
    { 
      name: 'Docker', category: 'devops', class: 'CONTAINER_MAGE', icon: Layers, 
      desc: t('bestiario.skill.docker.desc'), mastery: 60, rank: 'KNIGHT',
      element: 'Obsidiana', elementLabel: 'Huevo Hermético', manaCost: 30, castTime: 'Aislamiento OCI',
      neutralizes: 'La mítica excusa "en mi máquina sí funcionaba"',
      dragonLore: 'Encapsula aplicaciones completas en huevos de obsidiana blindados que eclosionan idénticos en dev, testing o cloud.'
    },
    { 
      name: 'GitHub Actions', category: 'devops', class: 'PIPELINE_ORACLE', icon: CheckCircle2, 
      desc: t('bestiario.skill.githubactions.desc'), mastery: 40, rank: 'INITIATE',
      element: 'Obsidiana', elementLabel: 'Automatización CI/CD', manaCost: 15, castTime: 'Trigger en Push',
      neutralizes: 'Despliegues manuales propensos a error humano',
      dragonLore: 'Orquesta centinelas autónomos que compilan, ejecutan tests y despliegan cada versión sin intervención mortal.'
    },
    { 
      name: 'Linux / Bash', category: 'devops', class: 'SHELL_WRITER', icon: Terminal, 
      desc: t('bestiario.skill.linux.desc'), mastery: 60, rank: 'KNIGHT',
      element: 'Obsidiana', elementLabel: 'Consola del Dragón', manaCost: 15, castTime: 'CLI Nativo',
      neutralizes: 'Falta de control sobre procesos del sistema operativo',
      dragonLore: 'El lenguaje secreto de las cavernas de servidores. Domina permisos, sockets y demonios en segundo plano.'
    },
    { 
      name: 'AWS Cloud', category: 'devops', class: 'SKY_SENTINEL', icon: Globe, 
      desc: t('bestiario.skill.cloud.desc'), mastery: 35, rank: 'INITIATE',
      element: 'Obsidiana', elementLabel: 'Cielo Infinito', manaCost: 35, castTime: 'Cloud API',
      neutralizes: 'Límites de hardware físico local',
      dragonLore: 'El dragón eleva artefactos (como EmotionShop) a nubes elásticas de S3 y cómputo distribuido global.'
    },
    { 
      name: 'ASP.NET Core', category: 'backend', class: 'REST_FORGER', icon: Cpu, 
      desc: t('bestiario.skill.aspnet.desc'), mastery: 65, rank: 'KNIGHT',
      element: 'Rayo', elementLabel: 'Forja Web .NET', manaCost: 25, castTime: 'Kestrel Pipeline',
      neutralizes: 'Baja concurrencia y sobrecarga en backends empresariales',
      dragonLore: 'Forja endpoints ultrarrápidos sobre el servidor Kestrel con inyección de dependencias nativa y tipado estricto.'
    },
    { 
      name: 'Entity Framework', category: 'database', class: 'DATA_BINDER', icon: Database, 
      desc: t('bestiario.skill.efcore.desc'), mastery: 60, rank: 'KNIGHT',
      element: 'Cristal', elementLabel: 'Puente Mágico ORM', manaCost: 20, castTime: 'LINQ Traducido',
      neutralizes: 'Escribir consultas SQL manuales repetitivas y desalineadas',
      dragonLore: 'Traduce expresiones LINQ en fluidas sentencias SQL mientras mantiene sincronizadas las entidades de negocio.'
    },
    { 
      name: 'Windows Forms', category: 'frontend', class: 'DESKTOP_ARTISAN', icon: Layers, 
      desc: t('bestiario.skill.winforms.desc'), mastery: 55, rank: 'KNIGHT',
      element: 'Fuego', elementLabel: 'Escritorio Tangible', manaCost: 15, castTime: 'Win32 Nativo',
      neutralizes: 'Dependencia exclusiva de navegadores para software interno',
      dragonLore: 'Construye paneles tácticos de escritorio que operan a máxima velocidad de hardware sin latencia de red.'
    },
    { 
      name: 'BCrypt / Security', category: 'backend', class: 'SHADOW_WARD', icon: Shield, 
      desc: t('bestiario.skill.bcrypt.desc'), mastery: 50, rank: 'INITIATE',
      element: 'Obsidiana', elementLabel: 'Fuego Criptográfico', manaCost: 30, castTime: '12 Rondas Salt',
      neutralizes: 'Ataques de fuerza bruta y filtración de contraseñas planas',
      dragonLore: 'Quema contraseñas con sal y fuego unidireccional volviéndolas imposibles de descifrar por ojos enemigos.'
    },
    { 
      name: 'JWT Auth', category: 'backend', class: 'TOKEN_KEEPER', icon: Shield, 
      desc: t('bestiario.skill.jwt.desc'), mastery: 45, rank: 'INITIATE',
      element: 'Obsidiana', elementLabel: 'Sello Sin Estado', manaCost: 15, castTime: 'Criptofirma SHA-256',
      neutralizes: 'Sesiones pesadas en memoria del servidor',
      dragonLore: 'Graba sellos alfanuméricos inviolables que los usuarios portan como pasaportes a través de microservicios.'
    },
    { 
      name: 'xUnit', category: 'testing', class: 'TEST_ORACLE', icon: CheckCircle2, 
      desc: t('bestiario.skill.xunit.desc'), mastery: 50, rank: 'INITIATE',
      element: 'Obsidiana', elementLabel: 'Juicio del Oráculo', manaCost: 10, castTime: 'Test Suite',
      neutralizes: 'Regresiones inadvertidas en cambios de lógica',
      dragonLore: 'Somete el código a pruebas de fuego automáticas para garantizar que cada método cumpla su promesa sagrada.'
    },
    { 
      name: 'Moq', category: 'testing', class: 'ILLUSIONIST', icon: Wand2, 
      desc: t('bestiario.skill.moq.desc'), mastery: 45, rank: 'INITIATE',
      element: 'Obsidiana', elementLabel: 'Ilusión de Espejo', manaCost: 15, castTime: 'Mock Dinámico',
      neutralizes: 'Dependencias lentas o externas durante pruebas unitarias',
      dragonLore: 'Crea dobles astrales de bases de datos y servicios para probar la lógica aislada con absoluta rapidez.'
    },
    { 
      name: 'Serilog', category: 'testing', class: 'CHRONICLE_SCRIBE', icon: History, 
      desc: t('bestiario.skill.serilog.desc'), mastery: 50, rank: 'INITIATE',
      element: 'Obsidiana', elementLabel: 'Bitácora Imborrable', manaCost: 10, castTime: 'Sink Estructurado',
      neutralizes: 'Bugs misteriosos en producción sin registro forense',
      dragonLore: 'Inscribe en la roca de los logs cada evento, advertencia o error en formato JSON estructurado para diagnóstico veloz.'
    },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory = selectedCategory === 'todas' || skill.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.elementLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  const handleCastSpell = (skill: SkillEntry) => {
    sfx.playDragonFlame();
    setCastSuccess(true);
    setTimeout(() => setCastSuccess(false), 2200);
  };

  const getElementBadgeColor = (el: DragonElement) => {
    switch (el) {
      case 'Fuego':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Rayo':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Obsidiana':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Cristal':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    }
  };

  return (
    <div className="relative min-h-full w-full bg-transparent text-on-surface p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header with Dragon Lore Banner */}
        <header className="text-center px-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-mono uppercase tracking-widest">
            <Flame size={13} className="text-primary animate-pulse" />
            <span>// GRIMORIO DRACÓNICO & BESTIARIO TÉCNICO</span>
          </div>

          <h1 className="font-headline text-2xl sm:text-4xl md:text-6xl font-black text-on-surface uppercase italic tracking-normal sm:tracking-wider mb-3">
            {t('bestiario.title')}
          </h1>

          <p className="font-body text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {t('bestiario.description')}
          </p>

          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"></div>

          {/* Dragon Stats Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto mt-6 text-left font-mono">
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-3 rounded">
              <span className="text-[9px] text-on-surface-variant block uppercase tracking-wider">Conjuros Dominados</span>
              <span className="text-primary font-bold text-base">27 Entidades</span>
            </div>
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-3 rounded">
              <span className="text-[9px] text-on-surface-variant block uppercase tracking-wider">Alientos Elementales</span>
              <span className="text-amber-400 font-bold text-base">4 Afinidades</span>
            </div>
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-3 rounded">
              <span className="text-[9px] text-on-surface-variant block uppercase tracking-wider">Maestría Promedio</span>
              <span className="text-emerald-400 font-bold text-base">63% Nv. Global</span>
            </div>
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-3 rounded">
              <span className="text-[9px] text-on-surface-variant block uppercase tracking-wider">Afinidad Dracónica</span>
              <span className="text-purple-400 font-bold text-base">Full-Stack MERN / .NET</span>
            </div>
          </div>

          {/* Search Bar & Category Filters */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=">_ Buscar conjuro, afinidad o clase del dragón..."
                className="w-full bg-surface-container-high/80 border border-outline-variant/40 focus:border-primary text-on-surface font-mono text-xs pl-10 pr-10 py-2.5 rounded outline-none transition-colors"
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

            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      sfx.playSelect();
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                      active
                        ? 'bg-primary text-on-primary border-primary shadow-[0_0_12px_rgba(255,145,0,0.4)] font-bold scale-[1.03]'
                        : 'bg-surface-container-high/60 border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-primary/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
              <span className="font-mono text-xs text-on-surface-variant/70 ml-2">
                ({filteredSkills.length} conjuros)
              </span>
            </div>
          </div>
        </header>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="bg-surface-container-high/60 border border-outline-variant/30 rounded p-12 text-center max-w-lg mx-auto">
            <p className="font-headline text-lg font-bold text-on-surface mb-2">
              No se hallaron conjuros con &quot;{searchQuery}&quot;
            </p>
            <p className="font-body text-xs text-on-surface-variant mb-4">
              Prueba ajustando los términos de búsqueda o seleccionando otra escuela mágica del grimorio.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todas');
                sfx.playSelect();
              }}
              className="px-4 py-2 bg-primary text-on-primary font-mono text-xs rounded uppercase tracking-wider font-bold cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredSkills.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                onMouseEnter={() => sfx.playHover()}
                onClick={() => {
                  sfx.playSelect();
                  setSelectedSkill(skill);
                }}
                className="bg-surface-container-high/60 border border-outline-variant/30 p-5 rounded-sm flex flex-col justify-between group hover:border-primary/50 hover:bg-surface-container-high transition-all shadow-md cursor-pointer relative overflow-hidden"
              >
                {/* Background Watermark */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <skill.icon size={80} />
                </div>

                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-sm">
                      <skill.icon size={22} />
                    </div>
                    <div className="text-right">
                      <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${getElementBadgeColor(skill.element)} font-bold`}>
                        {skill.elementLabel}
                      </span>
                      <span className="font-mono text-[9px] text-on-surface-variant block mt-1">
                        CLASE: {skill.class}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                    {skill.name}
                  </h2>
                  <p className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold mb-2">
                    {skill.category} · {skill.castTime}
                  </p>
                  <p className="text-xs text-on-surface-variant font-body leading-relaxed line-clamp-3 mb-4 italic">
                    {skill.desc}
                  </p>
                </div>

                <div className="mt-auto pt-3 border-t border-outline-variant/20">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider mb-1.5">
                    <span className="text-on-surface-variant">{t('bestiario.mastery')}: <strong className="text-primary">{skill.mastery}%</strong></span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-container-lowest text-on-surface border border-outline-variant/20 font-bold">
                      {skill.rank}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary-container shadow-[0_0_8px_rgba(255,145,0,0.5)] transition-all duration-500" 
                      style={{ width: `${skill.mastery}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[9px] font-mono text-on-surface-variant">
                    <span>Gasto: {skill.manaCost} MP</span>
                    <span className="text-primary group-hover:underline">Examinar Conjuro ➔</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        )}

      </div>

      {/* Spell Inspection & Dragon Channeling Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sfx.playSelect();
                setSelectedSkill(null);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-surface-container-highest border border-primary/40 shadow-2xl overflow-hidden flex flex-col rounded-sm z-10 max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-outline-variant/30 bg-surface-container">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center text-primary shrink-0">
                    <selectedSkill.icon size={22} />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline text-lg sm:text-xl font-bold uppercase tracking-wider text-on-surface truncate">
                        {selectedSkill.name}
                      </h3>
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getElementBadgeColor(selectedSkill.element)}`}>
                        {selectedSkill.elementLabel}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-on-surface-variant truncate">
                      Clase: {selectedSkill.class} · Rango {selectedSkill.rank}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sfx.playSelect();
                    setSelectedSkill(null);
                  }}
                  className="p-1.5 hover:bg-surface-container-highest rounded transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-5 overflow-y-auto font-mono text-xs">
                {/* Philosophical Desc */}
                <div className="bg-surface-container-high/40 p-4 rounded border border-outline-variant/20 italic text-on-surface font-body text-sm leading-relaxed">
                  {selectedSkill.desc}
                </div>

                {/* Dragon Channeling Lore */}
                <div className="bg-gradient-to-r from-primary/10 via-surface-container-lowest to-surface-container-lowest p-4 rounded border border-primary/30 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-[11px]">
                    <Flame size={15} />
                    <span>Lore del Dragón Ordinal</span>
                  </div>
                  <p className="text-on-surface leading-relaxed font-body text-xs">
                    {selectedSkill.dragonLore}
                  </p>
                </div>

                {/* Technical Stats Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-[9px] text-on-surface-variant uppercase block">Maestría</span>
                    <span className="text-primary font-bold text-sm">{selectedSkill.mastery}%</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-[9px] text-on-surface-variant uppercase block">Gasto de Maná</span>
                    <span className="text-blue-400 font-bold text-sm">{selectedSkill.manaCost} MP</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-[9px] text-on-surface-variant uppercase block">Tiempo Invocación</span>
                    <span className="text-amber-400 font-bold text-sm">{selectedSkill.castTime}</span>
                  </div>
                  <div className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <span className="text-[9px] text-on-surface-variant uppercase block">Elemento</span>
                    <span className="text-emerald-400 font-bold text-sm">{selectedSkill.element}</span>
                  </div>
                </div>

                {/* Neutralizes Threat */}
                <div className="p-3.5 rounded bg-surface-container-lowest border border-outline-variant/30 flex items-start gap-2.5">
                  <ShieldAlert size={16} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-secondary block">Amenaza Neutralizada:</span>
                    <span className="text-on-surface text-xs font-body">{selectedSkill.neutralizes}</span>
                  </div>
                </div>

                {/* Feedback on Casting */}
                {castSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 rounded bg-primary/20 border border-primary text-primary font-bold text-center text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,145,0,0.4)]"
                  >
                    <Flame size={16} className="animate-bounce" />
                    <span>¡FURIA DEL DRAGÓN CANALIZADA! Conjuro {selectedSkill.name} activado con éxito.</span>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-4 border-t border-outline-variant/30 bg-surface-container">
                <button
                  onClick={() => {
                    sfx.playSelect();
                    setSelectedSkill(null);
                  }}
                  className="px-4 py-2 rounded bg-surface-container-highest border border-outline-variant/40 font-mono text-xs uppercase tracking-wider text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  Cerrar
                </button>

                <button
                  onClick={() => handleCastSpell(selectedSkill)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded bg-gradient-to-r from-primary to-primary-container text-on-primary font-mono text-xs uppercase tracking-wider font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  <Flame size={14} />
                  <span>Canalizar Aliento Dracónico</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
