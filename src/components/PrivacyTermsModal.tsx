import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Scroll, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

export interface PrivacyTermsModalProps {
  activeModal: 'privacy' | 'terms' | null;
  onClose: () => void;
  onSelectModal?: (modal: 'privacy' | 'terms') => void;
}

export default function PrivacyTermsModal({ activeModal, onClose, onSelectModal }: PrivacyTermsModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        onClose();
      }
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, onClose]);

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => {
            sfx.playSelect();
            onClose();
          }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.92, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 12, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-surface-container-lowest border-2 border-primary/60 p-6 sm:p-8 rounded-none shadow-[0_0_50px_rgba(255,145,0,0.3)] text-on-surface overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dragon Scale Corner Accents */}
            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-primary pointer-events-none" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary pointer-events-none" />
            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-primary pointer-events-none" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-primary pointer-events-none" />

            {/* Header with Switcher Tabs and Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-primary/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(255,145,0,0.2)] shrink-0">
                  {activeModal === 'privacy' ? <ShieldCheck size={22} /> : <Scroll size={22} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {onSelectModal && (
                      <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider">
                        <button
                          onClick={() => {
                            sfx.playSelect();
                            onSelectModal('privacy');
                          }}
                          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                            activeModal === 'privacy'
                              ? 'bg-primary text-on-primary font-bold shadow-xs'
                              : 'text-on-surface-variant hover:text-primary'
                          }`}
                        >
                          {t('sidebar.privacy')}
                        </button>
                        <span className="text-on-surface-variant/40">/</span>
                        <button
                          onClick={() => {
                            sfx.playSelect();
                            onSelectModal('terms');
                          }}
                          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                            activeModal === 'terms'
                              ? 'bg-primary text-on-primary font-bold shadow-xs'
                              : 'text-on-surface-variant hover:text-primary'
                          }`}
                        >
                          {t('sidebar.terms')}
                        </button>
                      </div>
                    )}
                  </div>
                  <h2 className="font-headline text-2xl sm:text-3xl font-bold text-primary italic uppercase tracking-wider">
                    {activeModal === 'privacy' ? t('modal.privacy.title') : t('modal.terms.title')}
                  </h2>
                  <p className="font-label text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-primary/70" />
                    {activeModal === 'privacy' ? t('modal.privacy.subtitle') : t('modal.terms.subtitle')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sfx.playSelect();
                  onClose();
                }}
                className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-sm hover:bg-surface-container-highest cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto pr-2 my-4 space-y-5 font-body text-sm text-on-surface-variant leading-relaxed custom-scrollbar">
              {activeModal === 'privacy' ? (
                <>
                  <p className="text-on-surface font-medium border-l-2 border-primary/40 pl-3 italic bg-primary/5 py-2">
                    {t('modal.privacy.p1')}
                  </p>
                  <div className="space-y-2 bg-surface-container-low/40 p-4 border border-outline-variant/20 rounded-xs">
                    <h4 className="font-headline font-bold text-on-surface text-xs sm:text-sm tracking-wide text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
                      {t('modal.privacy.s1')}
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant">
                      {t('modal.privacy.s1.desc')}
                    </p>
                  </div>
                  <div className="space-y-2 bg-surface-container-low/40 p-4 border border-outline-variant/20 rounded-xs">
                    <h4 className="font-headline font-bold text-on-surface text-xs sm:text-sm tracking-wide text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
                      {t('modal.privacy.s2')}
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant">
                      {t('modal.privacy.s2.desc')}
                    </p>
                  </div>
                  <div className="space-y-2 bg-surface-container-low/40 p-4 border border-outline-variant/20 rounded-xs">
                    <h4 className="font-headline font-bold text-on-surface text-xs sm:text-sm tracking-wide text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
                      {t('modal.privacy.s3')}
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant">
                      {t('modal.privacy.s3.desc')}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-on-surface font-medium border-l-2 border-primary/40 pl-3 italic bg-primary/5 py-2">
                    {t('modal.terms.p1')}
                  </p>
                  <div className="space-y-2 bg-surface-container-low/40 p-4 border border-outline-variant/20 rounded-xs">
                    <h4 className="font-headline font-bold text-on-surface text-xs sm:text-sm tracking-wide text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
                      {t('modal.terms.s1')}
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant">
                      {t('modal.terms.s1.desc')}
                    </p>
                  </div>
                  <div className="space-y-2 bg-surface-container-low/40 p-4 border border-outline-variant/20 rounded-xs">
                    <h4 className="font-headline font-bold text-on-surface text-xs sm:text-sm tracking-wide text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
                      {t('modal.terms.s2')}
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant">
                      {t('modal.terms.s2.desc')}
                    </p>
                  </div>
                  <div className="space-y-2 bg-surface-container-low/40 p-4 border border-outline-variant/20 rounded-xs">
                    <h4 className="font-headline font-bold text-on-surface text-xs sm:text-sm tracking-wide text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
                      {t('modal.terms.s3')}
                    </h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant">
                      {t('modal.terms.s3.desc')}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="font-mono text-[10px] text-on-surface-variant/60 tracking-wider">
                {t('common.footer')}
              </span>
              <button
                onClick={() => {
                  sfx.playSelect();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,145,0,0.3)] cursor-pointer"
              >
                {t('common.read.pact')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
