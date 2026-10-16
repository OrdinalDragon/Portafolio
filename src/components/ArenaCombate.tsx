import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Swords, Shield, Zap, Coffee, RefreshCw, Trophy, Skull, Flame,
  CheckCircle2, Terminal
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

interface Boss {
  id: string;
  name: string;
  subtitle: string;
  maxHp: number;
  icon: string;
  attackPower: number;
}

const BOSSES: Boss[] = [
  {
    id: 'null-bug',
    name: 'NullReferenceException',
    subtitle: 'El Demonio de los Objetos No Inicializados',
    maxHp: 400,
    icon: '🐛',
    attackPower: 90,
  },
  {
    id: 'race-condition',
    name: 'Async Race Condition',
    subtitle: 'Espectro de las Promesas Desincronizadas',
    maxHp: 600,
    icon: '🌀',
    attackPower: 125,
  },
  {
    id: 'server-500',
    name: 'The 500 Internal Server Dragon',
    subtitle: 'Bestia Titánica de Producción en Caída',
    maxHp: 850,
    icon: '🐉',
    attackPower: 160,
  },
];

export default function ArenaCombate() {
  const { t } = useLanguage();

  const [selectedBoss, setSelectedBoss] = useState<Boss>(BOSSES[0]);
  const [bossHp, setBossHp] = useState(BOSSES[0].maxHp);
  const [playerHp, setPlayerHp] = useState(1000);
  const [playerMp, setPlayerMp] = useState(500);
  const [shieldActive, setShieldActive] = useState(false);
  const [battleLogs, setBattleLogs] = useState<string[]>([
    '¡El combate ha comenzado! Selecciona una acción en tu consola de batalla.',
  ]);
  const [turn, setTurn] = useState<'player' | 'boss'>('player');
  const [battleState, setBattleState] = useState<'fighting' | 'won' | 'lost'>('fighting');
  const [activeMenu, setActiveMenu] = useState<'main' | 'attack' | 'spell' | 'item'>('main');

  const resetBattle = (boss: Boss) => {
    setSelectedBoss(boss);
    setBossHp(boss.maxHp);
    setPlayerHp(1000);
    setPlayerMp(500);
    setShieldActive(false);
    setBattleState('fighting');
    setTurn('player');
    setActiveMenu('main');
    setBattleLogs([`¡Desafiaste a ${boss.name}! Prepara tus pruebas y defensas.`]);
    sfx.playSelect();
  };

  const addLog = (msg: string) => {
    setBattleLogs((prev) => [msg, ...prev.slice(0, 7)]);
  };

  const handleBossTurn = (currentBossHp: number) => {
    if (currentBossHp <= 0) {
      setBattleState('won');
      sfx.playVictory();
      addLog(`🏆 ¡Victoria! ${selectedBoss.name} ha sido erradicado del codebase.`);
      return;
    }

    setTurn('boss');
    setTimeout(() => {
      let damage = Math.floor(selectedBoss.attackPower * (0.8 + Math.random() * 0.4));
      if (shieldActive) {
        damage = Math.floor(damage * 0.3);
        setShieldActive(false);
        addLog(`🛡️ Tu Try/Catch redujo el impacto a solo ${damage} de daño.`);
      } else {
        addLog(`💥 ${selectedBoss.name} atacó con Bug en Producción causando ${damage} de daño.`);
      }

      sfx.playAttack();
      setPlayerHp((prev) => {
        const nextHp = Math.max(prev - damage, 0);
        if (nextHp <= 0) {
          setBattleState('lost');
          sfx.playHover();
          addLog('💀 Caíste en combate. Refactoriza y vuelve a intentarlo.');
        } else {
          setTurn('player');
        }
        return nextHp;
      });
    }, 800);
  };

  // Player action: Normal Attack
  const handleAttack = (type: 'test' | 'refactor') => {
    if (turn !== 'player' || battleState !== 'fighting') return;

    if (type === 'test') {
      const dmg = 120 + Math.floor(Math.random() * 30);
      sfx.playAttack();
      addLog(`⚔️ Ejecutaste 'Unit Test Suite': causó ${dmg} de daño certero.`);
      const nextBossHp = Math.max(bossHp - dmg, 0);
      setBossHp(nextBossHp);
      setActiveMenu('main');
      handleBossTurn(nextBossHp);
    } else if (type === 'refactor') {
      if (playerMp < 40) {
        addLog('⚠️ Maná insuficiente para Refactor.');
        return;
      }
      const dmg = 220 + Math.floor(Math.random() * 50);
      setPlayerMp((mp) => mp - 40);
      sfx.playAttack();
      addLog(`⚡ 'Refactor Arquitectónico Limpio': ¡Daño crítico de ${dmg}!`);
      const nextBossHp = Math.max(bossHp - dmg, 0);
      setBossHp(nextBossHp);
      setActiveMenu('main');
      handleBossTurn(nextBossHp);
    }
  };

  // Player action: Spell
  const handleSpell = (type: 'ts' | 'async') => {
    if (turn !== 'player' || battleState !== 'fighting') return;

    if (type === 'ts') {
      if (playerMp < 50) {
        addLog('⚠️ Maná insuficiente para TypeScript Strict.');
        return;
      }
      setPlayerMp((mp) => mp - 50);
      sfx.playEquip();
      const dmg = 160;
      addLog(`🔮 'TypeScript Strict Mode': Causó ${dmg} de daño y aturdió al enemigo.`);
      const nextBossHp = Math.max(bossHp - dmg, 0);
      setBossHp(nextBossHp);
      setActiveMenu('main');
      // Stunned: boss skips turn!
      if (nextBossHp <= 0) {
        setBattleState('won');
        sfx.playVictory();
      } else {
        setTimeout(() => {
          addLog(`🌀 ${selectedBoss.name} está aturdido por los tipos y pierde su turno.`);
          setTurn('player');
        }, 600);
      }
    } else if (type === 'async') {
      if (playerMp < 70) {
        addLog('⚠️ Maná insuficiente para Workers Asíncronos.');
        return;
      }
      setPlayerMp((mp) => mp - 70);
      sfx.playLevelUp();
      const dmg = 280;
      addLog(`🚀 'Lluvia de Microservicios Concurrentes': ¡Impacto masivo de ${dmg}!`);
      const nextBossHp = Math.max(bossHp - dmg, 0);
      setBossHp(nextBossHp);
      setActiveMenu('main');
      handleBossTurn(nextBossHp);
    }
  };

  // Player action: Defend
  const handleDefend = (type: 'shield' | 'docker') => {
    if (turn !== 'player' || battleState !== 'fighting') return;

    if (type === 'shield') {
      setShieldActive(true);
      sfx.playDefend();
      addLog('🛡️ Activaste bloque Try / Catch: El próximo golpe será mitigado un 70%.');
      setActiveMenu('main');
      handleBossTurn(bossHp);
    } else if (type === 'docker') {
      if (playerMp < 30) {
        addLog('⚠️ Maná insuficiente para Docker Restart.');
        return;
      }
      setPlayerMp((mp) => mp - 30);
      const heal = 180;
      setPlayerHp((hp) => Math.min(hp + heal, 1000));
      sfx.playLevelUp();
      addLog(`🐳 'Docker Container Restart': Restauraste ${heal} HP.`);
      setActiveMenu('main');
      handleBossTurn(bossHp);
    }
  };

  // Player action: Item
  const handleItem = () => {
    if (turn !== 'player' || battleState !== 'fighting') return;
    setPlayerHp((hp) => Math.min(hp + 250, 1000));
    setPlayerMp((mp) => Math.min(mp + 150, 500));
    sfx.playLevelUp();
    addLog('☕ Bebiste una Taza de Café Espresso: +250 HP y +150 MP.');
    setActiveMenu('main');
    handleBossTurn(bossHp);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-full p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header with boss selection pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-primary block">
            // ARENA DE COMBATE
          </span>
          <h1 className="font-headline text-3xl sm:text-4xl font-bold uppercase text-on-surface">
            Depurador de Bugs
          </h1>
        </div>

        {/* Boss Switcher */}
        <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/20">
          {BOSSES.map((b) => (
            <button
              key={b.id}
              onClick={() => resetBattle(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedBoss.id === b.id
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {b.icon} {b.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Battle Scene Viewport */}
      <div className="relative bg-surface-container-lowest border-2 border-outline-variant/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ff9100_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Boss Display (Top) */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-outline-variant/20 pb-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="text-5xl sm:text-6xl p-3 bg-surface-container-high/60 rounded-2xl border border-outline-variant/30 shadow-inner">
              {selectedBoss.icon}
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-error font-bold block mb-0.5">
                JEFE DE SERVIDOR
              </span>
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
                {selectedBoss.name}
              </h2>
              <p className="font-body text-xs text-on-surface-variant italic">
                {selectedBoss.subtitle}
              </p>
            </div>
          </div>

          {/* Boss HP Bar */}
          <div className="w-full sm:w-64 space-y-1">
            <div className="flex justify-between font-mono text-xs text-on-surface-variant">
              <span>HP JEFE</span>
              <span className="font-bold text-error">{bossHp} / {selectedBoss.maxHp}</span>
            </div>
            <div className="h-3 bg-surface-container-high rounded-full overflow-hidden p-0.5 border border-outline-variant/30">
              <motion.div
                initial={false}
                animate={{ width: `${(bossHp / selectedBoss.maxHp) * 100}%` }}
                className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Player Status Display (Middle) */}
        <div className="relative z-10 my-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low/70 border border-outline-variant/20 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold">
              NS
            </div>
            <div>
              <h4 className="font-headline text-sm font-bold text-on-surface">
                Nicolás Schernetzki (Nivel 30 Hero)
              </h4>
              <p className="font-mono text-[10px] text-primary">Arquitecto Full-Stack</p>
            </div>
          </div>

          <div className="flex items-center gap-6 w-full sm:w-auto">
            {/* Player HP */}
            <div className="space-y-1 flex-1 sm:w-36">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-on-surface-variant">HP</span>
                <span className="text-emerald-400 font-bold">{playerHp} / 1000</span>
              </div>
              <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(playerHp / 1000) * 100}%` }}
                />
              </div>
            </div>

            {/* Player MP */}
            <div className="space-y-1 flex-1 sm:w-36">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-on-surface-variant">MP</span>
                <span className="text-secondary font-bold">{playerMp} / 500</span>
              </div>
              <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all duration-300"
                  style={{ width: `${(playerMp / 500) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls & Console Log (Bottom) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Action Menu (6 cols) */}
          <div className="md:col-span-6 bg-surface-container-high/80 border border-outline-variant/30 rounded-xl p-4 flex flex-col justify-center">
            {battleState !== 'fighting' ? (
              <div className="text-center py-4 space-y-3">
                <p className="font-headline text-lg font-bold">
                  {battleState === 'won' ? '🎉 ¡BUG RESUELTO CON ÉXITO!' : '💀 EL SERVIDOR CAYÓ'}
                </p>
                <button
                  onClick={() => resetBattle(selectedBoss)}
                  className="px-6 py-2.5 bg-primary text-on-primary font-label font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 shadow-md cursor-pointer"
                >
                  Reiniciar Combate
                </button>
              </div>
            ) : activeMenu === 'main' ? (
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  disabled={turn !== 'player'}
                  onClick={() => {
                    setActiveMenu('attack');
                    sfx.playHover();
                  }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary text-on-surface hover:text-primary transition-all font-label text-xs uppercase font-bold tracking-wider cursor-pointer disabled:opacity-50"
                >
                  <Swords size={16} className="text-primary" />
                  <span>Atacar</span>
                </button>
                <button
                  type="button"
                  disabled={turn !== 'player'}
                  onClick={() => {
                    setActiveMenu('spell');
                    sfx.playHover();
                  }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary text-on-surface hover:text-secondary transition-all font-label text-xs uppercase font-bold tracking-wider cursor-pointer disabled:opacity-50"
                >
                  <Zap size={16} className="text-secondary" />
                  <span>Hechizos</span>
                </button>
                <button
                  type="button"
                  disabled={turn !== 'player'}
                  onClick={() => {
                    setActiveMenu('attack'); // defend inside
                    handleDefend('shield');
                  }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-blue-400 text-on-surface hover:text-blue-400 transition-all font-label text-xs uppercase font-bold tracking-wider cursor-pointer disabled:opacity-50"
                >
                  <Shield size={16} className="text-blue-400" />
                  <span>Try/Catch</span>
                </button>
                <button
                  type="button"
                  disabled={turn !== 'player'}
                  onClick={handleItem}
                  className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-amber-400 text-on-surface hover:text-amber-400 transition-all font-label text-xs uppercase font-bold tracking-wider cursor-pointer disabled:opacity-50"
                >
                  <Coffee size={16} className="text-amber-400" />
                  <span>Café Espresso</span>
                </button>
              </div>
            ) : activeMenu === 'attack' ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleAttack('test')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary text-xs font-mono cursor-pointer"
                >
                  <span className="font-bold text-on-surface">Unit Test Suite</span>
                  <span className="text-on-surface-variant">0 MP · ~120 Daño</span>
                </button>
                <button
                  onClick={() => handleAttack('refactor')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-primary text-xs font-mono cursor-pointer"
                >
                  <span className="font-bold text-on-surface">Refactor Limpio</span>
                  <span className="text-secondary">40 MP · ~220 Daño</span>
                </button>
                <button
                  onClick={() => setActiveMenu('main')}
                  className="text-xs font-mono text-on-surface-variant hover:text-primary pt-1 cursor-pointer"
                >
                  ← Volver al Menú
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => handleSpell('ts')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary text-xs font-mono cursor-pointer"
                >
                  <span className="font-bold text-on-surface">TypeScript Strict</span>
                  <span className="text-secondary">50 MP · 160 Dmg + Aturdir</span>
                </button>
                <button
                  onClick={() => handleSpell('async')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary text-xs font-mono cursor-pointer"
                >
                  <span className="font-bold text-on-surface">Async Worker Pool</span>
                  <span className="text-secondary">70 MP · 280 Dmg</span>
                </button>
                <button
                  onClick={() => setActiveMenu('main')}
                  className="text-xs font-mono text-on-surface-variant hover:text-secondary pt-1 cursor-pointer"
                >
                  ← Volver al Menú
                </button>
              </div>
            )}
          </div>

          {/* Terminal Battle Log (6 cols) */}
          <div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-3.5 font-mono text-xs flex flex-col justify-between max-h-48 overflow-y-auto">
            <div className="flex items-center gap-1.5 text-[10px] text-primary uppercase font-bold border-b border-outline-variant/20 pb-1.5 mb-2">
              <Terminal size={12} />
              <span>Registro de Consola</span>
            </div>
            <div className="space-y-1 overflow-y-auto">
              {battleLogs.map((log, i) => (
                <p key={i} className={i === 0 ? 'text-primary font-semibold' : 'text-on-surface-variant/70'}>
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
