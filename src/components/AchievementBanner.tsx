import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { rpgState, ALL_ACHIEVEMENTS, type Achievement } from '../utils/rpgState';

export default function AchievementBanner() {
  const [currentBanner, setCurrentBanner] = useState<Achievement | null>(null);
  const [showTrophyModal, setShowTrophyModal] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<string[]>(rpgState.getUnlockedAchievements());

  useEffect(() => {
    // Listen for new achievement unlocks
    const unsubscribeAch = rpgState.onAchievement((ach) => {
      setCurrentBanner(ach);
      setTimeout(() => {
        setCurrentBanner(null);
      }, 5500);
    });

    // Listen for state changes (to keep unlockedIds fresh)
    const unsubscribeState = rpgState.subscribe(() => {
      setUnlockedIds(rpgState.getUnlockedAchievements());
    });

    return () => {
      unsubscribeAch();
      unsubscribeState();
    };
  }, []);

  return (
    <>
      {/* Floating Retro Banner */}
      <AnimatePresence>
        {currentBanner && (
          <motion.div
            initial={{ y: -120, opacity: 0, scale: 0.9 }}
            animate={{ y: 24, opacity: 1, scale: 1 }}
            exit={{ y: -120, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[150] w-[90%] max-w-md bg-surface-container-highest/95 backdrop-blur-md border-2 border-primary rounded-xl p-4 shadow-[0_0_40px_rgba(255,145,0,0.6)] flex items-center gap-3.5 select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center text-2xl shadow-md shrink-0">
              {currentBanner.icon}
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-primary tracking-widest">
                <Trophy size={12} className="animate-bounce" />
                <span>¡Logro Desbloqueado!</span>
                <span className="ml-auto text-secondary font-bold">+{currentBanner.xp} XP</span>
              </div>
              <h4 className="font-headline text-sm font-bold text-on-surface truncate">
                {currentBanner.title}
              </h4>
              <p className="font-body text-xs text-on-surface-variant line-clamp-1">
                {currentBanner.desc}
              </p>
            </div>

            <button
              onClick={() => setCurrentBanner(null)}
              className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer shrink-0"
              aria-label="Cerrar notificación"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trophy Modal (When opened) */}
      <AnimatePresence>
        {showTrophyModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTrophyModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-surface-container-highest border-2 border-primary/50 rounded-2xl shadow-2xl overflow-hidden p-6 z-10"
            >
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="text-primary" size={22} />
                  <h3 className="font-headline text-lg font-bold uppercase text-on-surface">
                    Sala de Trofeos & Logros
                  </h3>
                </div>
                <button
                  onClick={() => setShowTrophyModal(false)}
                  className="p-1 text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {ALL_ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = unlockedIds.includes(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isUnlocked
                          ? 'bg-primary/10 border-primary/40 text-on-surface'
                          : 'bg-surface-container-low/50 border-outline-variant/15 opacity-50'
                      }`}
                    >
                      <div className="text-2xl w-10 text-center">{ach.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-headline text-xs font-bold">{ach.title}</h5>
                          <span className="font-mono text-[10px] text-primary font-bold">
                            +{ach.xp} XP
                          </span>
                        </div>
                        <p className="font-body text-[11px] text-on-surface-variant leading-snug">
                          {ach.desc}
                        </p>
                      </div>
                      {isUnlocked && (
                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
