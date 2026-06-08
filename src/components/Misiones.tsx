import React, { useState } from 'react';
import { Zap, BookOpen, CheckCircle2, ExternalLink, X, Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Misiones() {
  const { t } = useLanguage();
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  React.useEffect(() => {
    let currentUrl: string | null = null;
    if (selectedPdf) {
      const pdfPath = selectedPdf;
      fetch(pdfPath)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status} ${res.statusText}`);
          return res.blob();
        })
        .then(blob => {
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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 grid-bg relative h-full w-full">
      <header className="mb-12 md:mb-16 px-4 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
          <span className="h-[2px] w-8 md:w-12 bg-primary"></span>
          <span className="font-label text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.4em] text-on-surface-variant">{t('misiones.subtitle')}</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-none italic break-words text-center md:text-left">
          {t('misiones.title')}
        </h1>
        <p className="mt-4 text-on-surface-variant max-w-xl font-body text-sm md:text-lg leading-relaxed text-center md:text-left mx-auto md:mx-0">
          {t('misiones.description')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-highest parchment-glow border-l-8 border-primary relative overflow-hidden group">
          <div className="p-6 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="font-label text-[9px] uppercase tracking-widest text-primary bg-on-primary-fixed-variant/20 px-3 py-1 mb-3 inline-block">{t('misiones.elite')}</span>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface break-words">{t('misiones.mission')}</h2>
                <p className="font-label text-xs text-on-surface-variant">{t('misiones.institution')}</p>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <span className="font-headline text-xl md:text-2xl font-black text-primary">{t('misiones.xp')}</span>
                <span className="font-label text-[9px] uppercase text-on-surface-variant">{t('misiones.training')}</span>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex justify-between items-end mb-2">
                <span className="font-label text-xs uppercase tracking-tighter text-on-surface">{t('misiones.progress')}</span>
                <span className="font-mono text-sm text-primary">60%</span>
              </div>
              <div className="h-3 bg-surface-container-lowest border border-outline-variant/20 relative">
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary-container shadow-[0_0_10px_rgba(255,145,0,0.4)]" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-container-low p-4 border-l-2 border-outline-variant/30">
                <div className="font-label text-[10px] uppercase text-on-surface-variant mb-1">{t('misiones.subtask')}</div>
                <div className="text-sm font-medium">{t('misiones.subtask1')}</div>
              </div>
              <div className="bg-surface-container-low p-4 border-l-2 border-primary">
                <div className="font-label text-[10px] uppercase text-primary mb-1">{t('misiones.active')}</div>
                <div className="text-sm font-medium">{t('misiones.subtask2')}</div>
              </div>
              <div className="bg-surface-container-low p-4 border-l-2 border-outline-variant/30">
                <div className="font-label text-[10px] uppercase text-on-surface-variant mb-1">{t('misiones.next')}</div>
                <div className="text-sm font-medium">{t('misiones.subtask3')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-surface-container relative p-8 flex flex-col justify-between border-t-4 border-secondary overflow-hidden">
          <div>
            <h3 className="font-headline text-xl font-bold mb-6">{t('misiones.mana')}</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-secondary-container/30 flex items-center justify-center">
                  <Zap className="text-secondary" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold mb-1">
                    <span>{t('misiones.focus')}</span>
                    <span>88%</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[88%]"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary-container/10 flex items-center justify-center">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold mb-1">
                    <span>{t('misiones.scrolls')}</span>
                    <span>345+ hs</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-3 border border-secondary text-secondary font-label text-xs uppercase tracking-widest hover:bg-secondary/10 transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Zap size={14} /> {t('misiones.viewtree')}
          </button>
        </div>
      </div>

      <section className="mt-24">
        <h3 className="font-headline text-3xl font-bold mb-8">{t('misiones.completed')}</h3>
        <div className="space-y-0 border border-outline-variant/10">
          {[
            { title: t('misiones.cert.net'), meta: t('misiones.cert.net.meta'), pdf: 'net.pdf' },
            { title: t('misiones.cert.fund'), meta: t('misiones.cert.fund.meta'), pdf: 'fundamentos.pdf' },
            { title: t('misiones.cert.frontend'), meta: t('misiones.cert.frontend.meta'), pdf: 'ticmas.pdf' }
          ].map((cert, i) => (
            <div key={i} className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/10 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'}`}>
              <div className="flex items-center gap-6">
                <CheckCircle2 className="text-secondary-container" size={40} />
                <div>
                  <h4 className="font-bold text-lg text-on-surface">{cert.title}</h4>
                  <p className="text-on-surface-variant text-sm font-label uppercase">{cert.meta}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPdf(cert.pdf)}
                className="px-6 py-2 bg-surface-container-highest text-xs uppercase tracking-widest font-label hover:text-primary transition-colors cursor-pointer"
              >
                {t('misiones.review')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPdf(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-full max-h-[90vh] bg-surface-container-highest border border-outline-variant shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container">
                <div className="flex items-center gap-4">
                  <h3 className="font-headline text-lg font-bold uppercase tracking-widest text-primary">{t('misiones.modal.title')}</h3>
                  <a 
                    href={selectedPdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] uppercase tracking-widest font-label text-primary hover:bg-primary/20 transition-all"
                  >
                    <ExternalLink size={12} /> {t('misiones.modal.open')}
                  </a>
                </div>
                <button 
                  onClick={() => setSelectedPdf(null)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <X size={24} />
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
                    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                      <p className="text-on-surface-variant mb-4">{t('misiones.modal.error')}</p>
                      <a 
                        href={pdfBlobUrl} 
                        download={selectedPdf || 'certificado.pdf'}
                        className="px-6 py-2 bg-primary text-on-primary font-label uppercase tracking-widest hover:bg-primary/80 transition-all"
                      >
                        {t('misiones.modal.download')}
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-on-surface-variant font-label uppercase tracking-widest animate-pulse">{t('misiones.modal.loading')}</p>
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
