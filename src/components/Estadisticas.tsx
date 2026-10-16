import React, { useState, useEffect, useCallback } from 'react';
import { 
  FileText, History, School, ExternalLink, Eye, X, Award, 
  Sparkles, CheckCircle2, ShieldCheck, Download, Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { rpgState } from '../utils/rpgState';
import { sfx } from '../utils/sfx';

export default function Estadisticas() {
  const { t, lang } = useLanguage();
  const [dynAttrs, setDynAttrs] = useState(() => rpgState.getDynamicAttributes());
  const [combatBonuses, setCombatBonuses] = useState(() => rpgState.getCombatBonuses());

  useEffect(() => {
    return rpgState.subscribe(() => {
      setDynAttrs(rpgState.getDynamicAttributes());
      setCombatBonuses(rpgState.getCombatBonuses());
    });
  }, []);

  const [previewPdf, setPreviewPdf] = useState<string | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [selectedCertPdf, setSelectedCertPdf] = useState<string | null>(null);
  const [selectedCertTitle, setSelectedCertTitle] = useState<string>('Certificado');
  const [certBlobUrl, setCertBlobUrl] = useState<string | null>(null);

  const base = import.meta.env.BASE_URL;
  const cvPdf = lang === 'en' ? `${base}Nicolas_Schernetzki_CV_Eng.pdf` : `${base}Nicolas_Schernetzki_CV_Esp.pdf`;

  const handleDownload = useCallback((url: string) => {
    sfx.playSelect();
    window.open(url, '_blank');
  }, []);

  useEffect(() => {
    let currentUrl: string | null = null;
    if (previewPdf) {
      fetch(previewPdf)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status}`);
          return res.blob();
        })
        .then(blob => {
          currentUrl = URL.createObjectURL(blob);
          setPdfBlobUrl(currentUrl);
        })
        .catch(() => {
          setPdfBlobUrl(previewPdf);
        });
    } else {
      setPdfBlobUrl(null);
    }
    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
  }, [previewPdf]);

  useEffect(() => {
    let currentUrl: string | null = null;
    if (selectedCertPdf) {
      const pdfPath = `${import.meta.env.BASE_URL}${selectedCertPdf}`;
      fetch(pdfPath)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status}`);
          return res.blob();
        })
        .then(blob => {
          currentUrl = URL.createObjectURL(blob);
          setCertBlobUrl(currentUrl);
        })
        .catch(() => {
          setCertBlobUrl(pdfPath);
        });
    } else {
      setCertBlobUrl(null);
    }
    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
  }, [selectedCertPdf]);

  const certificates = [
    {
      id: 'pescar',
      file: 'pescar_nico.pdf',
      title: t('estadisticas.cert4'),
      entity: 'Fundación Pescar / Banco Nación',
      badge: 'MERN 345 HS',
      isRecent: true,
      color: 'border-primary/50 bg-primary/10 text-primary',
    },
    {
      id: 'net',
      file: 'net.pdf',
      title: t('estadisticas.cert1'),
      entity: 'UTN.BA',
      badge: 'C# & .NET 8',
      isRecent: false,
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    },
    {
      id: 'fundamentos',
      file: 'fundamentos.pdf',
      title: t('estadisticas.cert2'),
      entity: 'UTN.BA',
      badge: 'POO & LÓGICA',
      isRecent: false,
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
    },
    {
      id: 'ticmas',
      file: 'ticmas.pdf',
      title: t('estadisticas.cert3'),
      entity: 'Ticmas / Arg. Programa',
      badge: 'FRONT-END',
      isRecent: false,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    },
  ];

  return (
    <div className="relative min-h-full w-full bg-transparent text-on-surface p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <header className="text-center px-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-mono uppercase tracking-widest">
            <Sparkle size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>{lang === 'en' ? '// SCROLLS & HERO LOG' : '// PERGAMINOS & BITÁCORA DEL HÉROE'}</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-black text-on-surface uppercase italic tracking-normal sm:tracking-wider mb-2">
            {t('estadisticas.title')}
          </h1>
          <p className="font-label text-on-surface-variant text-[10px] sm:text-xs uppercase tracking-[0.2em] max-w-xl mx-auto">
            {t('estadisticas.subtitle')}
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"></div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column: Attributes, Combat Relics, Languages, Certificates (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Dynamic Attributes */}
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-5 rounded-sm shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-primary/20 pb-2 mb-4">
                <h2 className="font-headline text-primary font-bold uppercase text-xs tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} />
                  {t('estadisticas.attributes')}
                </h2>
                <span className="text-[10px] font-mono text-on-surface-variant uppercase">{lang === 'en' ? 'Synchronized' : 'Sincronizado'}</span>
              </div>
              
              <div className="space-y-3.5">
                {[
                  { label: t('habilidades.attr.str'), val: dynAttrs.str, color: 'from-red-500 to-rose-600', sub: lang === 'en' ? 'Backend & Logic' : 'Backend & Lógica' },
                  { label: t('habilidades.attr.agi'), val: dynAttrs.agi, color: 'from-amber-500 to-yellow-400', sub: lang === 'en' ? 'Frontend & UI' : 'Frontend & UI' },
                  { label: t('habilidades.attr.int'), val: dynAttrs.int, color: 'from-purple-500 to-indigo-500', sub: lang === 'en' ? 'Architecture & OOP' : 'Arquitectura & POO' },
                  { label: t('habilidades.attr.dex'), val: dynAttrs.dex, color: 'from-emerald-500 to-teal-400', sub: lang === 'en' ? 'DevOps & Cloud' : 'DevOps & Cloud' },
                  { label: t('habilidades.attr.cha'), val: dynAttrs.cha, color: 'from-sky-500 to-cyan-400', sub: lang === 'en' ? 'B2B & Business' : 'B2B & Negocio' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline text-[10px] uppercase font-mono mb-1">
                      <span className="text-on-surface font-semibold">{stat.label} <span className="text-on-surface-variant font-normal">({stat.sub})</span></span>
                      <span className="text-primary font-bold">{stat.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(stat.val, 100)}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className={`h-full bg-gradient-to-r ${stat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Relic Combat Bonus Box */}
            <div className="bg-surface-container-high/60 border border-primary/40 p-5 rounded-sm shadow-xl backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 border-b border-primary/20 pb-2">
                <Award size={16} className="text-primary animate-pulse" />
                <h2 className="font-headline text-primary font-bold uppercase text-xs tracking-wider">
                  {lang === 'en' ? 'Active Relic Bonuses' : 'Bonos de Reliquias Activas'}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-surface-container-lowest/80 border border-outline-variant/20 p-2.5 rounded">
                  <span className="text-[9px] text-on-surface-variant block uppercase tracking-wider">{lang === 'en' ? 'Attack Power' : 'Poder de Ataque'}</span>
                  <span className="text-primary font-bold text-sm">+{combatBonuses.damageBonus} ATK</span>
                </div>
                <div className="bg-surface-container-lowest/80 border border-outline-variant/20 p-2.5 rounded">
                  <span className="text-[9px] text-on-surface-variant block uppercase tracking-wider">{lang === 'en' ? 'Mitigation' : 'Mitigación'}</span>
                  <span className="text-secondary font-bold text-sm">+{combatBonuses.defensePercent}% DEF</span>
                </div>
                <div className="bg-surface-container-lowest/80 border border-outline-variant/20 p-2.5 rounded">
                  <span className="text-[9px] text-on-surface-variant block uppercase tracking-wider">{lang === 'en' ? 'Critical Strike' : 'Golpe Crítico'}</span>
                  <span className="text-amber-400 font-bold text-sm">{combatBonuses.critChance}% CRT</span>
                </div>
                <div className="bg-surface-container-lowest/80 border border-outline-variant/20 p-2.5 rounded">
                  <span className="text-[9px] text-on-surface-variant block uppercase tracking-wider">{lang === 'en' ? 'Mana Pool' : 'Reserva de Maná'}</span>
                  <span className="text-blue-400 font-bold text-sm">+{combatBonuses.maxMpBonus} MP</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-5 rounded-sm shadow-xl backdrop-blur-sm">
              <h2 className="font-headline text-primary font-bold uppercase text-xs tracking-wider mb-3 border-b border-primary/20 pb-2">
                {t('estadisticas.languages')}
              </h2>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center p-2 rounded bg-surface-container-lowest/60 border border-outline-variant/20">
                  <span className="text-on-surface font-semibold flex items-center gap-1.5">
                    🇦🇷 {t('estadisticas.spanish')}
                  </span>
                  <span className="text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                    {t('estadisticas.spanish.level')}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-surface-container-lowest/60 border border-outline-variant/20">
                  <span className="text-on-surface font-semibold flex items-center gap-1.5">
                    🌐 {t('estadisticas.english')}
                  </span>
                  <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                    {t('estadisticas.english.level')}
                  </span>
                </div>
              </div>
            </div>

            {/* Power Scrolls / Certifications */}
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-5 rounded-sm shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-primary/20 pb-2 mb-3">
                <h2 className="font-headline text-primary font-bold uppercase text-xs tracking-wider flex items-center gap-2">
                  <Sparkles size={14} className="text-primary" />
                  {t('estadisticas.power')}
                </h2>
                <span className="text-[10px] font-mono text-primary font-bold">{lang === 'en' ? '4 Verified' : '4 Verificados'}</span>
              </div>
              
              <div className="space-y-2.5">
                {certificates.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => {
                      sfx.playSelect();
                      setSelectedCertTitle(cert.title);
                      setSelectedCertPdf(cert.file);
                    }}
                    className={`w-full text-left p-3 rounded border transition-all cursor-pointer group hover:scale-[1.01] ${
                      cert.isRecent 
                        ? 'bg-gradient-to-r from-primary/15 via-surface-container-lowest to-surface-container-lowest border-primary/50 shadow-[0_0_15px_rgba(255,145,0,0.15)]' 
                        : 'bg-surface-container-lowest/80 border-outline-variant/30 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        {cert.title}
                      </span>
                      <ExternalLink size={12} className="text-on-surface-variant group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-on-surface-variant">{cert.entity}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${cert.color}`}>
                        {cert.badge}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Work Experience & Education (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Experience Chronicles */}
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-6 sm:p-8 rounded-sm shadow-xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <FileText size={120} />
              </div>

              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <h2 className="font-headline text-primary font-bold uppercase text-lg sm:text-xl flex items-center gap-3">
                  <History size={22} className="text-primary" />
                  {t('estadisticas.experience')}
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {lang === 'en' ? 'Active' : 'En Actividad'}
                </span>
              </div>

              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/25">
                
                {/* Exp 1: Freelance Full-Stack Developer */}
                <div className="pl-9 relative">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_10px_rgba(255,145,0,0.5)]">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  
                  <div className="bg-surface-container-lowest/80 border border-outline-variant/30 p-5 rounded-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="font-headline text-on-surface font-bold text-base sm:text-lg uppercase tracking-tight">
                        {t('estadisticas.exp2.title')}
                      </h3>
                      <span className="font-mono text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 border border-primary/20 shrink-0 self-start sm:self-auto">
                        {t('estadisticas.exp2.date')}
                      </span>
                    </div>

                    <p className="font-label text-secondary text-[11px] uppercase tracking-widest font-bold">
                      {t('estadisticas.exp2.place')}
                    </p>

                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {t('estadisticas.exp2.desc')}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/15">
                      {['React 19', 'Python FastAPI', 'Gemini AI', 'Node.js', 'Express', 'MongoDB', 'Docker', 'AWS S3', 'TypeScript'].map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/80 text-on-surface border border-outline-variant/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Exp 2: Sales Representative & VBA Automation */}
                <div className="pl-9 relative">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-outline-variant flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  </div>

                  <div className="bg-surface-container-lowest/80 border border-outline-variant/30 p-5 rounded-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="font-headline text-on-surface font-bold text-base sm:text-lg uppercase tracking-tight">
                        {t('estadisticas.exp1.title')}
                      </h3>
                      <span className="font-mono text-on-surface-variant text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/20 shrink-0 self-start sm:self-auto">
                        {t('estadisticas.exp1.date')}
                      </span>
                    </div>

                    <p className="font-label text-secondary text-[11px] uppercase tracking-widest font-bold">
                      {t('estadisticas.exp1.place')}
                    </p>

                    <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {t('estadisticas.exp1.desc')}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/15">
                      {[
                        'Excel VBA', 
                        lang === 'en' ? 'Task Automation' : 'Automatización de Tareas', 
                        lang === 'en' ? '100+ B2B Clients' : '100+ Clientes B2B', 
                        'Email Marketing', 
                        lang === 'en' ? 'Catalogs & Pricing' : 'Catálogos & Precios'
                      ].map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-highest/80 text-on-surface border border-outline-variant/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Education & Academies */}
            <div className="bg-surface-container-high/60 border border-outline-variant/30 p-6 sm:p-8 rounded-sm shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <h2 className="font-headline text-primary font-bold uppercase text-lg sm:text-xl flex items-center gap-3">
                  <School size={22} className="text-primary" />
                  {t('estadisticas.education')}
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                  {lang === 'en' ? 'Continuing Education' : 'Formación Continua'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Edu 1: Pescar MERN */}
                <div className="bg-surface-container-lowest/80 border border-primary/30 p-5 rounded-sm flex flex-col justify-between space-y-4 hover:border-primary/60 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-bold">
                        {lang === 'en' ? '★ 345 Academic Hours' : '★ 345 Horas Académicas'}
                      </span>
                      <span className="text-[10px] font-mono text-on-surface-variant">2024 - 2025</span>
                    </div>
                    <h3 className="font-headline text-on-surface font-bold text-base uppercase tracking-tight">
                      {t('estadisticas.edu1.title')}
                    </h3>
                    <p className="font-label text-primary text-[10px] uppercase tracking-wider font-semibold">
                      {t('estadisticas.edu1.place')}
                    </p>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      {t('estadisticas.edu1.desc')}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      sfx.playSelect();
                      setSelectedCertTitle(lang === 'en' ? 'Full Stack MERN Web Developer - Pescar Foundation' : 'Desarrollador Web Full Stack MERN - Fundación Pescar');
                      setSelectedCertPdf('pescar_nico.pdf');
                    }}
                    className="w-full py-2 px-3 rounded bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Eye size={14} />
                    {lang === 'en' ? 'View Pescar Certificate' : 'Ver Certificado Pescar'}
                  </button>
                </div>

                {/* Edu 2: UTN .NET */}
                <div className="bg-surface-container-lowest/80 border border-outline-variant/30 p-5 rounded-sm flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                        {lang === 'en' ? 'University Diploma' : 'Diplomatura Universitaria'}
                      </span>
                      <span className="text-[10px] font-mono text-on-surface-variant">2023 - 2024</span>
                    </div>
                    <h3 className="font-headline text-on-surface font-bold text-base uppercase tracking-tight">
                      {t('estadisticas.edu2.title')}
                    </h3>
                    <p className="font-label text-purple-400 text-[10px] uppercase tracking-wider font-semibold">
                      {t('estadisticas.edu2.place')}
                    </p>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      {t('estadisticas.edu2.desc')}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      sfx.playSelect();
                      setSelectedCertTitle(lang === 'en' ? '.NET Programming Diploma - UTN.BA' : 'Diplomatura Programación .NET - UTN.BA');
                      setSelectedCertPdf('net.pdf');
                    }}
                    className="w-full py-2 px-3 rounded bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Eye size={14} />
                    {lang === 'en' ? 'View .NET Certificate' : 'Ver Certificado .NET'}
                  </button>
                </div>

              </div>
            </div>

            {/* Official CV Section */}
            <div className="bg-surface-container-high/60 border border-primary/30 p-6 rounded-sm shadow-xl backdrop-blur-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-primary/20 pb-3">
                <div>
                  <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface uppercase tracking-wider">
                    {t('estadisticas.download.sub')}
                  </h3>
                  <p className="font-mono text-[11px] text-on-surface-variant">
                    Nicolas Schernetzki · Full-Stack Developer ({lang === 'en' ? 'English Version' : 'Versión en Español'})
                  </p>
                </div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 rounded self-start sm:self-auto">
                  {lang === 'en' ? 'ATS-Optimized PDF' : 'PDF Optimizado ATS'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Preview Button */}
                <button
                  onClick={() => {
                    sfx.playSelect();
                    setPreviewPdf(cvPdf);
                  }}
                  className="flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary p-4 rounded transition-all cursor-pointer group text-left"
                >
                  <div className="w-10 h-10 bg-secondary/10 border border-secondary/30 flex items-center justify-center rounded">
                    <Eye className="text-secondary group-hover:scale-110 transition-transform" size={20} />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-secondary uppercase tracking-wider text-xs">
                      {t('estadisticas.download.preview')}
                    </p>
                    <p className="text-[10px] font-mono text-on-surface-variant">
                      {lang === 'en' ? 'Open interactive viewer' : 'Abrir visor interactivo'}
                    </p>
                  </div>
                </button>

                {/* PDF Download Button */}
                <button
                  onClick={() => handleDownload(cvPdf)}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary/15 to-primary-container/10 border border-primary/50 hover:bg-primary/20 p-4 rounded transition-all cursor-pointer group text-left shadow-[0_0_15px_rgba(255,145,0,0.15)]"
                >
                  <div className="w-10 h-10 bg-primary/20 border border-primary/40 flex items-center justify-center rounded">
                    <Download className="text-primary group-hover:scale-110 transition-transform" size={20} />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-primary uppercase tracking-wider text-xs">
                      {t('estadisticas.download.pdf')}
                    </p>
                    <p className="text-[10px] font-mono text-on-surface-variant">
                      {lang === 'en' ? 'Direct download in new tab' : 'Descarga directa en nueva pestaña'}
                    </p>
                  </div>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {previewPdf && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sfx.playSelect();
                setPreviewPdf(null);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-5xl h-full max-h-[92vh] bg-surface-container-highest border border-primary/40 shadow-2xl overflow-hidden flex flex-col rounded-sm z-10"
            >
              <div className="flex items-center justify-between p-4 border-b border-outline-variant/30 bg-surface-container">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="truncate">
                    <h3 className="font-headline text-sm sm:text-base font-bold uppercase tracking-wider text-primary truncate">
                      {t('estadisticas.download.preview')}
                    </h3>
                    <p className="text-[10px] font-mono text-on-surface-variant truncate">
                      Nicolas Schernetzki · Curriculum Vitae
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a 
                    href={cvPdf} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playSelect()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded text-[10px] uppercase tracking-wider font-mono text-primary hover:bg-primary/20 transition-all"
                  >
                    <ExternalLink size={12} />
                    <span className="hidden sm:inline">{t('estadisticas.download.pdf')}</span>
                  </a>
                  <button 
                    onClick={() => {
                      sfx.playSelect();
                      setPreviewPdf(null);
                    }}
                    className="p-1.5 hover:bg-surface-container-highest rounded transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
                    aria-label="Cerrar modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-neutral-900 relative overflow-hidden">
                {pdfBlobUrl ? (
                  <object 
                    key={pdfBlobUrl}
                    data={pdfBlobUrl} 
                    type="application/pdf"
                    className="w-full h-full border-none"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center text-on-surface space-y-4">
                      <FileText size={48} className="text-primary/60" />
                      <p className="text-sm font-mono text-on-surface-variant max-w-md">
                        {lang === 'en' ? 'Your browser does not support direct PDF preview in this frame.' : 'Tu navegador no admite la previsualización directa de PDF en este marco.'}
                      </p>
                      <a 
                        href={pdfBlobUrl} 
                        download={lang === 'en' ? 'Nicolas_Schernetzki_CV_Eng.pdf' : 'Nicolas_Schernetzki_CV_Esp.pdf'}
                        onClick={() => sfx.playSelect()}
                        className="px-6 py-2.5 bg-primary text-on-primary font-mono text-xs uppercase tracking-widest hover:bg-primary/80 transition-all rounded shadow-lg"
                      >
                        {lang === 'en' ? 'Download PDF File' : 'Descargar Archivo PDF'}
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-on-surface-variant">
                    <Sparkles className="animate-spin text-primary" size={28} />
                    <p className="font-mono text-xs uppercase tracking-widest">{lang === 'en' ? 'Loading Scroll...' : 'Cargando Pergamino...'}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certificate PDF Modal */}
      <AnimatePresence>
        {selectedCertPdf && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sfx.playSelect();
                setSelectedCertPdf(null);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-5xl h-full max-h-[92vh] bg-surface-container-highest border border-primary/40 shadow-2xl overflow-hidden flex flex-col rounded-sm z-10"
            >
              <div className="flex items-center justify-between p-4 border-b border-outline-variant/30 bg-surface-container">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Award size={16} />
                  </div>
                  <div className="truncate">
                    <h3 className="font-headline text-sm sm:text-base font-bold uppercase tracking-wider text-primary truncate">
                      {selectedCertTitle}
                    </h3>
                    <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={10} /> {lang === 'en' ? 'Official Verified Credential' : 'Credencial Verificada Oficial'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a 
                    href={certBlobUrl || `${import.meta.env.BASE_URL}${selectedCertPdf}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => sfx.playSelect()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded text-[10px] uppercase tracking-wider font-mono text-primary hover:bg-primary/20 transition-all"
                  >
                    <ExternalLink size={12} />
                    <span className="hidden sm:inline">{lang === 'en' ? 'Open in tab' : 'Abrir en pestaña'}</span>
                  </a>
                  <button 
                    onClick={() => {
                      sfx.playSelect();
                      setSelectedCertPdf(null);
                    }}
                    className="p-1.5 hover:bg-surface-container-highest rounded transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
                    aria-label="Cerrar modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-neutral-900 relative overflow-hidden">
                {certBlobUrl ? (
                  <object 
                    key={certBlobUrl}
                    data={certBlobUrl} 
                    type="application/pdf"
                    className="w-full h-full border-none"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center text-on-surface space-y-4">
                      <Award size={48} className="text-primary/60" />
                      <p className="text-sm font-mono text-on-surface-variant max-w-md">
                        {lang === 'en' ? 'Your browser does not support direct certificate preview in this frame.' : 'Tu navegador no admite la previsualización directa del certificado en este marco.'}
                      </p>
                      <a 
                        href={certBlobUrl} 
                        download={selectedCertPdf}
                        onClick={() => sfx.playSelect()}
                        className="px-6 py-2.5 bg-primary text-on-primary font-mono text-xs uppercase tracking-widest hover:bg-primary/80 transition-all rounded shadow-lg"
                      >
                        {lang === 'en' ? 'Download Certificate' : 'Descargar Certificado'}
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-on-surface-variant">
                    <Sparkles className="animate-spin text-primary" size={28} />
                    <p className="font-mono text-xs uppercase tracking-widest">{lang === 'en' ? 'Loading Certificate...' : 'Cargando Certificado...'}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
