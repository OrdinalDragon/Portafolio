import React, { useState } from 'react';
import { 
  Wand2, Hammer, Cpu, Globe, Github, Settings, ShoppingCart, 
  ExternalLink, Sparkles, Flame, Shield, Layers, Eye, X, 
  CheckCircle2, Terminal, ArrowUpRight, Filter, Trophy, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

type ProjectFilter = 'all' | 'live' | 'fullstack' | 'backend' | 'forge';

interface ProjectArtifact {
  id: string;
  nameKey: string;
  descKey: string;
  techKey: string;
  rarity: 'LEGENDARIO' | 'MÍTICO' | 'ARCANO' | 'HEROICO' | 'EN TEMPLADO';
  rarityEn: string;
  stars: string;
  level: string;
  levelEn: string;
  element: string;
  elementEn: string;
  dragonSigil: string;
  dragonSigilEn: string;
  bossDefeated: string;
  bossDefeatedEn: string;
  category: ('live' | 'fullstack' | 'backend' | 'forge')[];
  icon: React.ElementType;
  colorClass: string;
  borderClass: string;
  badgeClass: string;
  liveUrl?: string;
  repoUrl?: string;
  isLive: boolean;
  isForge: boolean;
  architecture: string;
  highlights: string[];
  highlightsEn: string[];
  techTags: string[];
}

export default function Proyectos() {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [selectedArtifact, setSelectedArtifact] = useState<ProjectArtifact | null>(null);
  const [dragonFlameActive, setDragonFlameActive] = useState(false);

  const artifacts: ProjectArtifact[] = [
    {
      id: 'moodapp',
      nameKey: 'proyectos.moodapp.name',
      descKey: 'proyectos.moodapp.desc',
      techKey: 'proyectos.moodapp.tech',
      rarity: 'LEGENDARIO',
      rarityEn: 'LEGENDARY',
      stars: '★★★★★',
      level: 'Nv. 50 Archimago Full-Stack',
      levelEn: 'Lvl. 50 Full-Stack Archmage',
      element: 'Fuego & IA Generativa',
      elementEn: 'Fire & Generative AI',
      dragonSigil: 'Sello del Dragón de Fuego & IA',
      dragonSigilEn: 'Seal of the Fire & AI Dragon',
      bossDefeated: 'Leviatán de Latencia en IA (procesamiento asíncrono y streaming con Google Gemini)',
      bossDefeatedEn: 'AI Latency Leviathan (async processing & streaming with Google Gemini)',
      category: ['live', 'fullstack'],
      icon: Wand2,
      colorClass: 'text-primary',
      borderClass: 'border-primary/50 hover:border-primary',
      badgeClass: 'bg-primary/10 text-primary border-primary/30',
      liveUrl: 'https://prototipomood.jesrepresentaciones.com.ar/',
      repoUrl: 'https://github.com/OrdinalDragon/Mood',
      isLive: true,
      isForge: false,
      architecture: 'React 19 + Vite ➔ Python FastAPI ➔ MongoDB Atlas + Google Gemini 1.5 Pro ➔ Docker & Cloudflare',
      highlights: [
        'Chat con IA (Gemini) que comprende tu estado de ánimo y recomienda eventos afines.',
        'Scraper automatizado de eventos con ejecución periódica y normalización de datos.',
        'Mapa interactivo, geolocalización, reseñas con puntuación y notificaciones por email.',
        'Despliegue contenerizado en Docker con Nginx reverse proxy y protección Cloudflare.'
      ],
      highlightsEn: [
        'AI chat (Gemini) that detects mood and recommends matching events.',
        'Automated event scraper with periodic execution and data normalization.',
        'Interactive map, geolocation, scored reviews, and email alerts.',
        'Containerized Docker deployment with Nginx reverse proxy and Cloudflare defense.'
      ],
      techTags: ['React 19', 'FastAPI', 'Gemini AI', 'MongoDB', 'Docker', 'Tailwind', 'Cloudflare']
    },
    {
      id: 'emotionshop',
      nameKey: 'proyectos.emotionshop.name',
      descKey: 'proyectos.emotionshop.desc',
      techKey: 'proyectos.emotionshop.tech',
      rarity: 'MÍTICO',
      rarityEn: 'MYTHIC',
      stars: '★★★★★',
      level: 'Nv. 45 Maestro MERN',
      levelEn: 'Lvl. 45 MERN Master',
      element: 'Tierra & Nube AWS',
      elementEn: 'Earth & AWS Cloud',
      dragonSigil: 'Sello del Dragón de la Nube AWS',
      dragonSigilEn: 'Seal of the AWS Cloud Dragon',
      bossDefeated: 'Quimera de Almacenamiento S3 (subida multiparte directa con firmas seguras y CDN)',
      bossDefeatedEn: 'S3 Storage Chimera (direct multipart upload with secure signatures & CDN)',
      category: ['live', 'fullstack'],
      icon: ShoppingCart,
      colorClass: 'text-purple-400',
      borderClass: 'border-purple-500/50 hover:border-purple-400',
      badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      liveUrl: 'https://emotionshop.jesrepresentaciones.com.ar/',
      repoUrl: 'https://github.com/OrdinalDragon/E-commerce',
      isLive: true,
      isForge: false,
      architecture: 'React 18 + Redux Toolkit ➔ Node.js Express API ➔ MongoDB Atlas + AWS S3 Bucket ➔ Docker AWS',
      highlights: [
        'Autenticación JWT robusta con sistema de control de acceso por roles (Admin y Cliente).',
        'Carga y optimización de imágenes alojadas directamente en buckets AWS S3.',
        'Carrito de compras sincronizado con estado global mediante Redux Toolkit.',
        'Panel administrativo interactivo con métricas en vivo y analíticas comerciales de ventas.'
      ],
      highlightsEn: [
        'Robust JWT auth with role-based access control (Admin & Customer).',
        'Direct image upload and optimization hosted on AWS S3 buckets.',
        'Shopping cart synchronized with global state via Redux Toolkit.',
        'Interactive admin dashboard with live sales metrics and commercial analytics.'
      ],
      techTags: ['React 18', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'AWS S3', 'Docker']
    },
    {
      id: 'bank',
      nameKey: 'proyectos.bank.name',
      descKey: 'proyectos.bank.desc',
      techKey: 'proyectos.bank.tech',
      rarity: 'ARCANO',
      rarityEn: 'ARCANE',
      stars: '★★★★☆',
      level: 'Nv. 40 Caballero .NET',
      levelEn: 'Lvl. 40 .NET Knight',
      element: 'Metal & .NET 8 Core',
      elementEn: 'Metal & .NET 8 Core',
      dragonSigil: 'Sello del Dragón de Acero .NET 8',
      dragonSigilEn: 'Seal of the Steel .NET 8 Dragon',
      bossDefeated: 'Basilisco de Excepciones Transaccionales (Unit of Work y suites de testing xUnit)',
      bossDefeatedEn: 'Transactional Exception Basilisk (Unit of Work & xUnit test suites)',
      category: ['backend'],
      icon: Cpu,
      colorClass: 'text-cyan-400',
      borderClass: 'border-cyan-500/50 hover:border-cyan-400',
      badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      repoUrl: 'https://github.com/OrdinalDragon/Banco.net',
      isLive: false,
      isForge: false,
      architecture: 'WinForms Desktop / ASP.NET Core ➔ Capa de Negocio POO ➔ EF Core ➔ MariaDB Relacional',
      highlights: [
        'Gestión integral de cuentas, depósitos, transferencias y extractos bancarios.',
        'Seguridad criptográfica con hashing de contraseñas BCrypt y autenticación JWT.',
        'Arquitectura desacoplada en capas (Domain, Data, Business, Presentation).',
        'Suite de pruebas unitarias automatizadas con xUnit, Moq y Base de Datos InMemory.'
      ],
      highlightsEn: [
        'Comprehensive management of bank accounts, deposits, transfers, and statements.',
        'Cryptographic security with BCrypt password hashing and JWT authentication.',
        'Decoupled layered architecture (Domain, Data, Business, Presentation).',
        'Automated unit test suite with xUnit, Moq, and InMemory Database.'
      ],
      techTags: ['C# 12', '.NET 8', 'MariaDB', 'Entity Framework', 'WinForms', 'xUnit', 'Docker']
    },
    {
      id: 'portfolio',
      nameKey: 'proyectos.portfolio.name',
      descKey: 'proyectos.portfolio.desc',
      techKey: 'proyectos.portfolio.tech',
      rarity: 'HEROICO',
      rarityEn: 'HEROIC',
      stars: '★★★★☆',
      level: 'Nv. 42 Guardián del Dragón',
      levelEn: 'Lvl. 42 Dragon Guardian',
      element: 'Éter & Animación Motion',
      elementEn: 'Aether & Motion Animation',
      dragonSigil: 'Sello del Dragón Ordinal Primigenio',
      dragonSigilEn: 'Seal of the Primal Ordinal Dragon',
      bossDefeated: 'Espectro del Lag de Renderizado (Motion fluido a 60 FPS con Web Audio nativo)',
      bossDefeatedEn: 'Render Lag Specter (smooth 60 FPS Motion with native Web Audio)',
      category: ['live', 'fullstack'],
      icon: Hammer,
      colorClass: 'text-emerald-400',
      borderClass: 'border-emerald-500/50 hover:border-emerald-400',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      repoUrl: 'https://github.com/OrdinalDragon/Portafolio',
      isLive: true,
      isForge: false,
      architecture: 'React 19 + TypeScript + Motion ➔ Web Audio 8-bit Synth ➔ Vite & Tailwind CSS ➔ GitHub Pages',
      highlights: [
        'Experiencia gamificada completa: árbol de habilidades, bestiario, arena de combate e inventario.',
        'Sintetizador Web Audio nativo retro sin dependencias externas ni latencia.',
        'Sistema bilingüe en tiempo real (Español / Inglés) con almacenamiento de estado reactivo.',
        'Diseño responsivo optimizado para móviles y escritorio con animaciones Framer Motion.'
      ],
      highlightsEn: [
        'Full gamified experience: skill tree, bestiary, combat arena, and inventory.',
        'Retro native Web Audio synthesizer with zero external dependencies and zero latency.',
        'Real-time bilingual system (Spanish / English) with reactive state storage.',
        'Responsive design optimized for mobile and desktop with Framer Motion animations.'
      ],
      techTags: ['React 19', 'TypeScript', 'Motion', 'Tailwind v4', 'Web Audio', 'Vite', 'Express']
    },
    {
      id: 'pricelist',
      nameKey: 'proyectos.pricelist.name',
      descKey: 'proyectos.pricelist.desc',
      techKey: 'proyectos.pricelist.tech',
      rarity: 'EN TEMPLADO',
      rarityEn: 'IN TEMPERING',
      stars: '⚒️⚒️⚒️',
      level: 'En Templado Activo',
      levelEn: 'Active In Tempering',
      element: 'Fuego de la Forja',
      elementEn: 'Forge Fire',
      dragonSigil: 'Sello del Dragón de la Forja B2B',
      dragonSigilEn: 'Seal of the B2B Forge Dragon',
      bossDefeated: 'Gólem de la Burocracia Comercial (automatización de presupuestos y remitos instantáneos)',
      bossDefeatedEn: 'Commercial Bureaucracy Golem (instant quotes & dispatch notes automation)',
      category: ['forge', 'fullstack'],
      icon: Settings,
      colorClass: 'text-amber-400',
      borderClass: 'border-amber-500/50 hover:border-amber-400',
      badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      isLive: false,
      isForge: true,
      architecture: 'React SPA ➔ Node.js Express REST API ➔ MongoDB Atlas ➔ Motor de Cotizaciones y Exportación',
      highlights: [
        'Gestión de listas de precios mayoristas con actualización masiva porcentual.',
        'Generador automatizado de cotizaciones en PDF y presupuestos comerciales.',
        'Seguimiento de cuentas de clientes B2B con historial de pedidos.',
        'Basado en la experiencia real automatizando flujos comerciales en el rubro eléctrico.'
      ],
      highlightsEn: [
        'Wholesale price list management with bulk percentage updates.',
        'Automated PDF quote generator and commercial dispatch notes.',
        'B2B client account tracking with full order history.',
        'Built on hands-on experience automating business workflows in the electrical sector.'
      ],
      techTags: ['React', 'Node.js', 'Express', 'MongoDB', 'PDF Generation', 'Comercio B2B']
    }
  ];

  const filteredArtifacts = artifacts.filter(art => {
    if (activeFilter === 'all') return true;
    return art.category.includes(activeFilter);
  });

  const filterButtons: { id: ProjectFilter; label: string; count: number }[] = [
    { id: 'all', label: t('proyectos.filter.all'), count: artifacts.length },
    { id: 'live', label: t('proyectos.filter.live'), count: artifacts.filter(a => a.category.includes('live')).length },
    { id: 'fullstack', label: t('proyectos.filter.fullstack'), count: artifacts.filter(a => a.category.includes('fullstack')).length },
    { id: 'backend', label: t('proyectos.filter.backend'), count: artifacts.filter(a => a.category.includes('backend')).length },
    { id: 'forge', label: t('proyectos.filter.forge'), count: artifacts.filter(a => a.category.includes('forge')).length },
  ];

  const handleChannelForgeFlame = () => {
    sfx.playDragonFlame();
    setDragonFlameActive(true);
    setTimeout(() => setDragonFlameActive(false), 2000);
  };

  return (
    <div className="relative min-h-full w-full bg-transparent text-on-surface p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <header className="text-center px-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-mono uppercase tracking-widest">
            <Flame size={13} className="animate-pulse text-primary" />
            <span>{lang === 'en' ? '// ORDINAL DRAGON FORGE & ARTIFACTS' : '// FORJA DEL DRAGÓN ORDINAL & ARTEFACTOS'}</span>
          </div>

          <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-black text-on-surface uppercase italic tracking-normal sm:tracking-wider mb-3">
            {t('proyectos.title')}
          </h1>

          <p className="font-body text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {t('proyectos.description')}
          </p>

          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"></div>
        </header>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => {
                  sfx.playSelect();
                  setActiveFilter(btn.id);
                }}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer border flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(255,145,0,0.4)] font-bold scale-[1.03]'
                    : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface hover:border-primary/40 border-outline-variant/30'
                }`}
              >
                <span>{btn.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30 text-white' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Artifacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
          {filteredArtifacts.map((artifact) => {
            const IconComponent = artifact.icon;
            const currentRarity = lang === 'en' ? artifact.rarityEn : artifact.rarity;
            const currentLevel = lang === 'en' ? artifact.levelEn : artifact.level;
            const currentDragonSigil = lang === 'en' ? artifact.dragonSigilEn : artifact.dragonSigil;

            return (
              <motion.div
                key={artifact.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => sfx.playHover()}
                className={`bg-surface-container-high/60 border ${artifact.borderClass} p-6 sm:p-7 rounded-sm shadow-xl backdrop-blur-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-2xl transition-all`}
              >
                {/* Background Watermark Icon */}
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <IconComponent size={120} />
                </div>

                {/* Top Bar: Icon, Rarity, Dragon Sigil */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center ${artifact.colorClass} group-hover:scale-105 transition-transform shadow-md`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${artifact.badgeClass}`}>
                            {currentRarity} {artifact.stars}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-on-surface-variant block mt-0.5">
                          {currentLevel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {artifact.isLive && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-bold shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {t('proyectos.live.badge')}
                        </span>
                      )}
                      {artifact.isForge && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono text-[9px] uppercase tracking-wider font-bold">
                          <Settings size={10} className="animate-spin" />
                          {t('proyectos.forge.badge')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dragon Sigil Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/30 text-[10px] font-mono text-primary font-bold">
                    <Flame size={11} className="text-primary animate-pulse" />
                    <span>{currentDragonSigil}</span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                      {t(artifact.nameKey)}
                    </h3>
                    <p className={`font-mono text-[11px] uppercase tracking-wider font-semibold mb-3 ${artifact.colorClass}`}>
                      {t(artifact.techKey)}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                      {t(artifact.descKey)}
                    </p>
                  </div>

                  {/* Tech Runes / Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {artifact.techTags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-lowest/80 text-on-surface-variant border border-outline-variant/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Live, Repo, Inspect */}
                <div className="pt-6 border-t border-outline-variant/20 mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {artifact.liveUrl && (
                      <a
                        href={artifact.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sfx.playSelect()}
                        className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-[10px] uppercase tracking-widest font-mono font-bold rounded shadow-md hover:brightness-110 transition-all cursor-pointer"
                      >
                        <Globe size={13} /> {t('proyectos.moodapp.live')}
                      </a>
                    )}
                    {artifact.repoUrl && (
                      <a
                        href={artifact.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sfx.playSelect()}
                        className="flex items-center gap-2 px-3.5 py-2 bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-[10px] uppercase tracking-widest font-mono hover:text-primary hover:border-primary/40 rounded transition-all cursor-pointer"
                      >
                        <Github size={13} /> {t('proyectos.moodapp.repo')}
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      sfx.playSelect();
                      setSelectedArtifact(artifact);
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono text-primary hover:text-primary-container transition-colors cursor-pointer py-1 px-2 rounded hover:bg-primary/10 ml-auto"
                  >
                    <Eye size={14} />
                    <span>{t('proyectos.inspect')}</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Artifact Detailed Inspection Modal */}
      <AnimatePresence>
        {selectedArtifact && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sfx.playSelect();
                setSelectedArtifact(null);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-surface-container-highest border border-primary/40 shadow-2xl overflow-hidden flex flex-col rounded-sm z-10 max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-outline-variant/30 bg-surface-container">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center ${selectedArtifact.colorClass} shrink-0`}>
                    <selectedArtifact.icon size={20} />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline text-base sm:text-lg font-bold uppercase tracking-wider text-on-surface truncate">
                        {t(selectedArtifact.nameKey)}
                      </h3>
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${selectedArtifact.badgeClass}`}>
                        {lang === 'en' ? selectedArtifact.rarityEn : selectedArtifact.rarity}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-on-surface-variant truncate">
                      {lang === 'en' ? selectedArtifact.levelEn : selectedArtifact.level} · {lang === 'en' ? selectedArtifact.dragonSigilEn : selectedArtifact.dragonSigil}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sfx.playSelect();
                    setSelectedArtifact(null);
                  }}
                  className="p-1.5 hover:bg-surface-container-highest rounded transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
                {/* Description */}
                <div>
                  <p className="font-body text-xs sm:text-sm text-on-surface leading-relaxed">
                    {t(selectedArtifact.descKey)}
                  </p>
                </div>

                {/* Boss Defeated / Dragon Challenge */}
                <div className="bg-gradient-to-r from-amber-500/10 via-surface-container-lowest to-surface-container-lowest border border-amber-500/30 p-4 rounded space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-bold">
                    <Trophy size={14} className="text-amber-400" />
                    <span>{lang === 'en' ? 'Conquered Draconic Challenge (Boss Defeated)' : 'Desafío Dracónico Conquistado (Boss Vencido)'}</span>
                  </div>
                  <p className="font-mono text-xs text-on-surface">
                    {lang === 'en' ? selectedArtifact.bossDefeatedEn : selectedArtifact.bossDefeated}
                  </p>
                </div>

                {/* Architecture Pipeline */}
                <div className="bg-surface-container-lowest/80 border border-outline-variant/30 p-4 rounded space-y-2">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
                    <Layers size={14} />
                    <span>{t('proyectos.modal.architecture')}</span>
                  </div>
                  <p className="font-mono text-xs text-on-surface-variant bg-surface-container-highest/60 p-2.5 rounded border border-outline-variant/20 break-words leading-relaxed">
                    {selectedArtifact.architecture}
                  </p>
                </div>

                {/* Key Features & Powers */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
                    <Sparkles size={14} />
                    <span>{t('proyectos.modal.features')}</span>
                  </div>
                  <div className="space-y-2">
                    {(lang === 'en' ? selectedArtifact.highlightsEn : selectedArtifact.highlights).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-on-surface font-body bg-surface-container-high/40 p-2.5 rounded border border-outline-variant/15">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dragon Flame Feedback */}
                {dragonFlameActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 rounded bg-primary/20 border border-primary text-primary font-bold text-center text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,145,0,0.4)]"
                  >
                    <Flame size={16} className="animate-bounce" />
                    <span>
                      {lang === 'en' 
                        ? `DRACONIC BREATH UNLEASHED! Forge fury channeled into ${t(selectedArtifact.nameKey)}.`
                        : `¡ALIENTO DRACÓNICO ACTIVADO! Furia de la forja canalizada hacia ${t(selectedArtifact.nameKey)}.`}
                    </span>
                  </motion.div>
                )}

                {/* Tech Runes */}
                <div className="space-y-2 pt-2 border-t border-outline-variant/20">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant block">
                    {lang === 'en' ? 'Forged Technologies & Tools' : 'Tecnologías & Herramientas Forjadas'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArtifact.techTags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-lowest text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-4 border-t border-outline-variant/30 bg-surface-container flex-wrap gap-2">
                <button
                  onClick={handleChannelForgeFlame}
                  className="px-3.5 py-2 rounded bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Flame size={14} />
                  <span>{lang === 'en' ? 'Stoke Draconic Fire' : 'Avivar Fuego Dracónico'}</span>
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  {selectedArtifact.repoUrl && (
                    <a
                      href={selectedArtifact.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playSelect()}
                      className="flex items-center gap-2 px-3.5 py-2 bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs uppercase tracking-wider font-mono hover:text-primary rounded cursor-pointer"
                    >
                      <Github size={14} /> {t('proyectos.moodapp.repo')}
                    </a>
                  )}
                  {selectedArtifact.liveUrl && (
                    <a
                      href={selectedArtifact.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playSelect()}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-xs uppercase tracking-wider font-mono font-bold rounded hover:brightness-110 shadow-lg cursor-pointer"
                    >
                      <Globe size={14} /> {t('proyectos.moodapp.live')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
