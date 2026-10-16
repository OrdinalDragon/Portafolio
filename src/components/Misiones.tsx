import React, { useState, useEffect } from 'react';
import { 
  Zap, BookOpen, CheckCircle2, ExternalLink, X, Swords, 
  Award, Shield, FileText, Sparkles, Terminal, Cpu, Layers, 
  Code, Compass, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

export interface CertificateChronicle {
  id: string;
  titleKey: string;
  metaKey: string;
  descKey: string;
  rankKey: string;
  xpKey: string;
  pdf: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  borderColor: string;
  glowColor: string;
  tags: string[];
}

export default function Misiones() {
  const { t, lang } = useLanguage();
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let currentUrl: string | null = null;
    if (selectedPdf) {
      const pdfPath = `${import.meta.env.BASE_URL}${selectedPdf}`;
      fetch(pdfPath)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          currentUrl = URL.createObjectURL(blob);
          setPdfBlobUrl(currentUrl);
        })
        .catch(() => {
          setPdfBlobUrl(pdfPath);
        });
    } else {
      setPdfBlobUrl(null);
    }
    return () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [selectedPdf]);

  const CHRONICLES: CertificateChronicle[] = [
    {
      id: 'pescar',
      titleKey: 'misiones.cert.pescar',
      metaKey: 'misiones.cert.pescar.meta',
      descKey: 'misiones.cert.pescar.desc',
      rankKey: 'misiones.cert.pescar.rank',
      xpKey: 'misiones.cert.pescar.xp',
      pdf: 'pescar_nico.pdf',
      icon: Sparkles,
      color: 'text-primary',
      borderColor: 'border-primary',
      glowColor: 'shadow-[0_0_20px_rgba(255,145,0,0.4)]',
      tags: ['Stack MERN', 'React 19', 'Node.js', 'Express', 'MongoDB', 'Scrum', 'Soft Skills']
    },
    {
      id: 'net',
      titleKey: 'misiones.cert.net',
      metaKey: 'misiones.cert.net.meta',
      descKey: 'misiones.cert.net.desc',
      rankKey: 'misiones.cert.net.rank',
      xpKey: 'misiones.cert.net.xp',
      pdf: 'net.pdf',
      icon: Cpu,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/50',
      glowColor: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      tags: ['.NET 8', 'C# 12', 'ASP.NET Core', 'Entity Framework', 'POO', 'MariaDB / SQL']
    },
    {
      id: 'fundamentos',
      titleKey: 'misiones.cert.fund',
      metaKey: 'misiones.cert.fund.meta',
      descKey: 'misiones.cert.fund.desc',
      rankKey: 'misiones.cert.fund.rank',
      xpKey: 'misiones.cert.fund.xp',
      pdf: 'fundamentos.pdf',
      icon: BookOpen,
      color: 'text-sky-400',
      borderColor: 'border-sky-500/50',
      glowColor: 'shadow-[0_0_20px_rgba(56,189,248,0.3)]',
      tags: ['Lógica Algorítmica', 'Estructuras de Datos', 'Control de Flujo', 'Pseudocódigo']
    },
    {
      id: 'ticmas',
      titleKey: 'misiones.cert.frontend',
      metaKey: 'misiones.cert.frontend.meta',
      descKey: 'misiones.cert.frontend.desc',
      rankKey: 'misiones.cert.frontend.rank',
      xpKey: 'misiones.cert.frontend.xp',
      pdf: 'ticmas.pdf',
      icon: Layers,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/50',
      glowColor: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]',
      tags: ['HTML5 Semántico', 'CSS3 Avanzado', 'JavaScript ES6+', 'Diseño Responsivo']
    }
  ];

  const handleOpenScroll = (pdf: string) => {
    sfx.playSelect();
    setSelectedPdf(pdf);
  };

  return (
    <div className="dragon-texture min-h-full w-full py-8 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-x-hidden">
      
      {/* Background Ambient Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div 
          animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center sm:text-left space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] sm:text-xs uppercase tracking-widest">
            <Compass size={13} className="animate-spin" style={{ animationDuration: '10s' }} />
            <span>{t('misiones.subtitle')}</span>
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black uppercase text-on-surface tracking-wider drop-shadow-2xl">
            {t('misiones.title')}
          </h1>

          <p className="font-body text-xs sm:text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            {t('misiones.description')}
          </p>
        </motion.header>

        {/* Hero Quest: Active Campaign (12 Cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          
          {/* Main Quest Parchment Card (8 Cols) */}
          <div className="lg:col-span-8 bg-surface-container-highest/90 backdrop-blur-md border-l-8 border-primary rounded-xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Swords size={180} />
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-primary bg-primary/10 border border-primary/30 px-3 py-1 rounded-sm inline-flex items-center gap-1.5 font-bold mb-2">
                    <Swords size={12} className="animate-pulse" />
                    {t('misiones.elite')}
                  </span>
                  <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
                    {t('misiones.mission')}
                  </h2>
                  <p className="font-mono text-xs text-on-surface-variant">
                    {t('misiones.institution')}
                  </p>
                </div>
                
                <div className="flex flex-col sm:items-end">
                  <span className="font-headline text-2xl sm:text-3xl font-black text-primary">
                    {t('misiones.xp')}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-on-surface-variant font-bold">
                    {t('misiones.training')}
                  </span>
                </div>
              </div>

              {/* Campaign Progress Bar */}
              <div className="mb-8 space-y-2">
                <div className="flex justify-between items-end font-mono text-xs">
                  <span className="text-on-surface font-semibold uppercase tracking-wider">{t('misiones.progress')}</span>
                  <span className="text-primary font-bold">85%</span>
                </div>
                <div className="h-3.5 bg-surface-container-lowest rounded-full overflow-hidden p-0.5 border border-outline-variant/30">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full shadow-[0_0_12px_#ff9100]"
                  />
                </div>
              </div>

              {/* Campaign Milestones Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-surface-container-low/80 p-3.5 rounded-lg border-l-4 border-emerald-500">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label text-[9px] uppercase text-emerald-400 font-bold">
                      {lang === 'en' ? 'Completed' : 'Completado'}
                    </span>
                    <CheckCircle2 size={13} className="text-emerald-400" />
                  </div>
                  <div className="font-headline text-xs font-bold text-on-surface">{t('misiones.subtask1')}</div>
                </div>

                <div className="bg-surface-container-low/80 p-3.5 rounded-lg border-l-4 border-primary">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label text-[9px] uppercase text-primary font-bold">{t('misiones.active')}</span>
                    <Sparkles size={13} className="text-primary animate-pulse" />
                  </div>
                  <div className="font-headline text-xs font-bold text-on-surface">{t('misiones.subtask2')}</div>
                </div>

                <div className="bg-surface-container-low/80 p-3.5 rounded-lg border-l-4 border-secondary">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label text-[9px] uppercase text-secondary font-bold">{t('misiones.next')}</span>
                    <Compass size={13} className="text-secondary" />
                  </div>
                  <div className="font-headline text-xs font-bold text-on-surface">{t('misiones.subtask3')}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Grimoire of Wisdom (4 Cols) */}
          <div className="lg:col-span-4 bg-surface-container/90 backdrop-blur-md rounded-xl p-6 sm:p-8 flex flex-col justify-between border-t-4 border-secondary shadow-lg">
            <div>
              <h3 className="font-headline text-lg sm:text-xl font-bold mb-6 text-on-surface flex items-center gap-2">
                <Award size={18} className="text-secondary" />
                {t('misiones.mana')}
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center shrink-0">
                    <Zap className="text-secondary" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-on-surface-variant uppercase">{t('misiones.focus')}</span>
                      <span className="text-secondary">98%</span>
                    </div>
                    <div className="h-2 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/15">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-secondary w-[98%]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-on-surface-variant uppercase">{t('misiones.scrolls')}</span>
                      <span className="text-primary">638+ hs</span>
                    </div>
                    <div className="h-2 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/15">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[100%]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-emerald-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-on-surface-variant uppercase">
                        {lang === 'en' ? 'Sealed Scrolls' : 'Pergaminos Sellados'}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {lang === 'en' ? '4 Official' : '4 Oficiales'}
                      </span>
                    </div>
                    <div className="h-2 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/15">
                      <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-[100%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant/15">
              <p className="font-mono text-[11px] text-on-surface-variant text-center">
                {lang === 'en' ? 'Languages: Spanish (Native) · English (C1+ Advanced)' : 'Idiomas: Español (Nativo) · Inglés (C1+ Advanced)'}
              </p>
            </div>
          </div>

        </motion.div>

        {/* Section: Completed Chronicles (4 Scrolls) */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-wider text-on-surface flex items-center gap-2.5">
                <Shield size={24} className="text-primary" />
                {t('misiones.completed')}
              </h2>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-0.5">
                {lang === 'en' 
                  ? 'Official certificates and credentials endorsed by educational institutions and professional reviewers.'
                  : 'Certificados y credenciales oficiales rubricadas por instituciones educativas y evaluadores profesionales.'}
              </p>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs text-primary font-bold">
              {lang === 'en' ? '4 / 4 Forged' : '4 / 4 Forjadas'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHRONICLES.map((chronicle, index) => {
              const IconComp = chronicle.icon;
              return (
                <motion.div 
                  key={chronicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`bg-surface-container-low/90 backdrop-blur-md rounded-2xl p-6 border-2 ${chronicle.borderColor} ${chronicle.glowColor} transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <IconComp size={90} />
                  </div>

                  <div>
                    {/* Top Tag & XP */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-surface-container-highest border border-outline-variant/20 ${chronicle.color}`}>
                        {t(chronicle.rankKey)}
                      </span>
                      <span className="font-headline text-sm font-bold text-primary">
                        {t(chronicle.xpKey)}
                      </span>
                    </div>

                    {/* Title & Metadata */}
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center shrink-0 ${chronicle.color}`}>
                        <IconComp size={24} />
                      </div>
                      <div>
                        <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface leading-snug">
                          {t(chronicle.titleKey)}
                        </h3>
                        <p className="font-mono text-xs text-on-surface-variant mt-0.5">
                          {t(chronicle.metaKey)}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4">
                      {t(chronicle.descKey)}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {chronicle.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container border border-outline-variant/20 text-on-surface-variant"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button: Review Sacred Scroll */}
                  <div className="pt-4 border-t border-outline-variant/15 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 font-bold">
                      <CheckCircle2 size={14} /> {lang === 'en' ? 'Official Certificate' : 'Certificado Oficial'}
                    </span>

                    <button 
                      onClick={() => handleOpenScroll(chronicle.pdf)}
                      className="px-4 py-2 bg-primary/10 border border-primary/40 hover:bg-primary text-primary hover:text-on-primary rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 group/btn"
                    >
                      <FileText size={14} />
                      <span>{t('misiones.review')}</span>
                      <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPdf(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-5xl h-full max-h-[92vh] bg-surface-container-highest border-2 border-primary/50 rounded-2xl shadow-[0_0_50px_rgba(255,145,0,0.3)] overflow-hidden flex flex-col z-10"
            >
              <div className="flex items-center justify-between p-4 border-b border-outline-variant/30 bg-surface-container">
                <div className="flex items-center gap-3">
                  <FileText className="text-primary" size={20} />
                  <h3 className="font-headline text-base sm:text-lg font-bold uppercase tracking-wider text-primary">
                    {t('misiones.modal.title')}
                  </h3>
                  <a 
                    href={`${import.meta.env.BASE_URL}${selectedPdf}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/30 rounded-md text-[10px] uppercase tracking-widest font-mono text-primary hover:bg-primary/20 transition-all"
                  >
                    <ExternalLink size={12} /> {t('misiones.modal.open')}
                  </a>
                </div>
                <button 
                  onClick={() => setSelectedPdf(null)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="flex-1 bg-white relative overflow-hidden">
                {pdfBlobUrl ? (
                  <object 
                    key={pdfBlobUrl}
                    data={pdfBlobUrl} 
                    type="application/pdf"
                    className="w-full h-full border-none"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-surface-container-low">
                      <p className="text-on-surface-variant mb-4 font-mono text-sm">{t('misiones.modal.error')}</p>
                      <a 
                        href={pdfBlobUrl} 
                        download={selectedPdf || 'certificado.pdf'}
                        className="px-6 py-2.5 bg-primary text-on-primary font-mono text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-all rounded-lg"
                      >
                        {t('misiones.modal.download')}
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="flex items-center justify-center h-full bg-surface-container-low">
                    <p className="text-on-surface-variant font-mono text-xs uppercase tracking-widest animate-pulse">
                      {t('misiones.modal.loading')}
                    </p>
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
