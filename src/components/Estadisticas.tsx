import React, { useState, useEffect, useCallback } from 'react';
import { FileText, History, School, ExternalLink, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Estadisticas() {
  const { t, lang } = useLanguage();
  const [previewPdf, setPreviewPdf] = useState<string | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [selectedCertPdf, setSelectedCertPdf] = useState<string | null>(null);
  const [certBlobUrl, setCertBlobUrl] = useState<string | null>(null);

  const base = import.meta.env.BASE_URL;
  const cvPdf = lang === 'en' ? `${base}Nicolas_Schernetzki_CV_Eng.pdf` : `${base}Nicolas_Schernetzki_CV_Esp.pdf`;
  const cvDocx = lang === 'en' ? `${base}Nicolas_Schernetzki_CV_Eng.docx` : `${base}Nicolas_Schernetzki_CV_Esp.docx`;

  const handleDownload = useCallback(async (url: string, _filename: string) => {
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

  return (
    <div className="parchment-bg relative min-h-screen w-full">
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-0">
      <header className="mb-10 md:mb-12 text-center px-4">
        <h2 className="font-headline text-xl sm:text-4xl md:text-5xl font-black text-primary italic uppercase tracking-normal sm:tracking-widest mb-4 break-words">{t('estadisticas.title')}</h2>
        <p className="font-label text-on-surface-variant text-[9px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.3em]">{t('estadisticas.subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Core Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-sm shadow-lg">
            <h3 className="font-headline text-primary font-bold uppercase text-sm mb-6 border-b border-primary/20 pb-2">{t('estadisticas.attributes')}</h3>
            <div className="space-y-4">
              {[
                { label: t('habilidades.attr.str'), val: 88, color: 'bg-red-500' },
                { label: t('habilidades.attr.agi'), val: 82, color: 'bg-blue-500' },
                { label: t('habilidades.attr.int'), val: 85, color: 'bg-purple-500' },
                { label: t('habilidades.attr.cha'), val: 92, color: 'bg-yellow-500' },
                { label: t('habilidades.attr.dex'), val: 80, color: 'bg-green-500' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] uppercase font-label mb-1">
                    <span className="text-on-surface-variant">{stat.label}</span>
                    <span className="text-primary font-bold">{stat.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${stat.color}`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-sm shadow-lg">
            <h3 className="font-headline text-primary font-bold uppercase text-sm mb-4 border-b border-primary/20 pb-2">{t('estadisticas.languages')}</h3>
            <div className="space-y-2 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface">{t('estadisticas.spanish')}</span>
                <span className="text-primary italic">{t('estadisticas.spanish.level')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface">{t('estadisticas.english')}</span>
                <span className="text-primary italic">{t('estadisticas.english.level')}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-sm shadow-lg">
            <h3 className="font-headline text-primary font-bold uppercase text-sm mb-4 border-b border-primary/20 pb-2">{t('estadisticas.power')}</h3>
            <div className="space-y-3 font-body text-[11px] text-on-surface-variant leading-tight">
              <button 
                onClick={() => setSelectedCertPdf('net.pdf')}
                className="w-full text-left hover:text-primary hover:bg-primary/5 p-2 -mx-2 rounded transition-colors cursor-pointer flex items-center gap-2"
              >
                <ExternalLink size={10} className="text-primary/60 flex-shrink-0" />
                {t('estadisticas.cert1')}
              </button>
              <button 
                onClick={() => setSelectedCertPdf('fundamentos.pdf')}
                className="w-full text-left hover:text-primary hover:bg-primary/5 p-2 -mx-2 rounded transition-colors cursor-pointer flex items-center gap-2"
              >
                <ExternalLink size={10} className="text-primary/60 flex-shrink-0" />
                {t('estadisticas.cert2')}
              </button>
              <button 
                onClick={() => setSelectedCertPdf('ticmas.pdf')}
                className="w-full text-left hover:text-primary hover:bg-primary/5 p-2 -mx-2 rounded transition-colors cursor-pointer flex items-center gap-2"
              >
                <ExternalLink size={10} className="text-primary/60 flex-shrink-0" />
                {t('estadisticas.cert3')}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Experience & Education */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-sm shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FileText size={80} />
            </div>
            
            <h3 className="font-headline text-primary font-bold uppercase text-xl mb-8 flex items-center gap-3">
              <History size={24} />
              {t('estadisticas.experience')}
            </h3>

            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/20">
              {[
                { 
                  title: t('estadisticas.exp1.title'), 
                  place: t('estadisticas.exp1.place'), 
                  date: t('estadisticas.exp1.date'),
                  desc: t('estadisticas.exp1.desc')
                },
                { 
                  title: t('estadisticas.exp2.title'), 
                  place: t('estadisticas.exp2.place'), 
                  date: t('estadisticas.exp2.date'),
                  desc: t('estadisticas.exp2.desc')
                }
              ].map((exp, i) => (
                <div key={i} className="pl-10 relative">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <h4 className="font-headline text-on-surface font-bold text-lg uppercase tracking-tight">{exp.title}</h4>
                  <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">{exp.place} | {exp.date}</p>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-sm shadow-lg">
            <h3 className="font-headline text-primary font-bold uppercase text-xl mb-8 flex items-center gap-3">
              <School size={24} />
              {t('estadisticas.education')}
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-headline text-on-surface font-bold text-lg uppercase tracking-tight">{t('estadisticas.edu1.title')}</h4>
                <p className="font-label text-primary text-[10px] uppercase tracking-widest">{t('estadisticas.edu1.place')}</p>
                <p className="font-body text-xs text-on-surface-variant mt-1">{t('estadisticas.edu1.desc')}</p>
              </div>
              <div className="pt-4 border-t border-outline-variant/10">
                <h4 className="font-headline text-on-surface font-bold text-lg uppercase tracking-tight">{t('estadisticas.edu2.title')}</h4>
                <p className="font-label text-primary text-[10px] uppercase tracking-widest">{t('estadisticas.edu2.place')}</p>
                <p className="font-body text-xs text-on-surface-variant mt-1">{t('estadisticas.edu2.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CV Download & Preview - Language aware */}
      <div className="mt-8 space-y-4">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant text-center">{t('estadisticas.download.sub')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Preview Button */}
          <button
            onClick={() => setPreviewPdf(cvPdf)}
            className="group flex items-center gap-4 bg-surface-container-highest border border-outline-variant/20 p-6 hover:border-secondary/40 transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
              <Eye className="text-secondary" size={24} />
            </div>
            <div className="flex-1">
              <p className="font-headline font-bold text-secondary uppercase tracking-widest text-sm">{t('estadisticas.download.preview')}</p>
            </div>
          </button>

          {/* PDF Download */}
          <button
            onClick={() => handleDownload(cvPdf, '')}
            className="group flex items-center gap-4 bg-gradient-to-r from-primary/5 to-primary-container/5 border border-primary/30 p-6 hover:bg-primary/10 transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <FileText className="text-primary" size={24} />
            </div>
            <div className="flex-1">
              <p className="font-headline font-bold text-primary uppercase tracking-widest text-sm">{t('estadisticas.download.pdf')}</p>
            </div>
            <ExternalLink size={16} className="text-primary/60 group-hover:text-primary transition-colors" />
          </button>

          {/* DOCX Download */}
          <button
            onClick={() => handleDownload(cvDocx, '')}
            className="group flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/30 p-6 hover:border-primary/30 transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center flex-shrink-0">
              <FileText className="text-on-surface-variant" size={24} />
            </div>
            <div className="flex-1">
              <p className="font-headline font-bold text-on-surface uppercase tracking-widest text-sm">{t('estadisticas.download.docx')}</p>
            </div>
            <ExternalLink size={16} className="text-on-surface-variant/60 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
      </div>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {previewPdf && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewPdf(null)}
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
                  <h3 className="font-headline text-lg font-bold uppercase tracking-widest text-primary">{t('estadisticas.download.preview')}</h3>
                  <a 
                    href={cvPdf} 
                    download
                    className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] uppercase tracking-widest font-label text-primary hover:bg-primary/20 transition-all"
                  >
                    <ExternalLink size={12} /> {t('estadisticas.download.pdf')}
                  </a>
                </div>
                <button 
                  onClick={() => setPreviewPdf(null)}
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
                      <p className="text-on-surface-variant mb-4">Browser cannot display PDF</p>
                      <a 
                        href={pdfBlobUrl} 
                        download={previewPdf}
                        className="px-6 py-2 bg-primary text-on-primary font-label uppercase tracking-widest hover:bg-primary/80 transition-all"
                      >
                        Download
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-on-surface-variant font-label uppercase tracking-widest animate-pulse">Loading...</p>
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
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertPdf(null)}
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
                  <h3 className="font-headline text-lg font-bold uppercase tracking-widest text-primary">Certificate</h3>
                  <a 
                    href={certBlobUrl || `${import.meta.env.BASE_URL}${selectedCertPdf}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] uppercase tracking-widest font-label text-primary hover:bg-primary/20 transition-all"
                  >
                    <ExternalLink size={12} /> Open in new tab
                  </a>
                </div>
                <button 
                  onClick={() => setSelectedCertPdf(null)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 bg-white relative overflow-hidden">
                {certBlobUrl ? (
                  <object 
                    key={certBlobUrl}
                    data={certBlobUrl} 
                    type="application/pdf"
                    className="w-full h-full border-none"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                      <p className="text-on-surface-variant mb-4">Browser cannot display PDF</p>
                      <a 
                        href={certBlobUrl} 
                        download={selectedCertPdf}
                        className="px-6 py-2 bg-primary text-on-primary font-label uppercase tracking-widest hover:bg-primary/80 transition-all"
                      >
                        Download
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-on-surface-variant font-label uppercase tracking-widest animate-pulse">Loading...</p>
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
