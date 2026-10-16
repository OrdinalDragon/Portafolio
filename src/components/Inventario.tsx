import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, Wand2, FileText, Coffee, Sparkles, Check, Download, Zap,
  Layers, Database, ArrowRight, Flame, ShieldAlert, Award
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';
import { rpgState } from '../utils/rpgState';

export interface InventoryItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'arma' | 'armadura' | 'accesorio' | 'consumible' | 'pergamino';
  rarity: 'comun' | 'raro' | 'epico' | 'legendario';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  descriptionEn: string;
  stats: Record<string, string>;
  statsEn: Record<string, string>;
  actionLabel?: string;
  actionLabelEn?: string;
  onAction?: () => void;
  equipped?: boolean;
}

export default function Inventario() {
  const { t, lang } = useLanguage();
  const cvPdf = `${import.meta.env.BASE_URL}Nicolas_Schernetzki_CV_${lang === 'en' ? 'Eng' : 'Esp'}.pdf`;

  const [equippedIds, setEquippedIds] = useState<string[]>(() => rpgState.getEquippedIds());
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [potionConsumed, setPotionConsumed] = useState(false);

  useEffect(() => {
    return rpgState.subscribe(() => {
      setEquippedIds(rpgState.getEquippedIds());
    });
  }, []);

  const combatBonuses = rpgState.getCombatBonuses();

  const ITEMS: InventoryItem[] = [
    {
      id: 'weapon-ts',
      name: 'Espada de Tipado Estricto',
      nameEn: 'Sword of Strict Typing',
      category: 'arma',
      rarity: 'legendario',
      icon: Wand2,
      description: 'Forjada en el fuego de TypeScript y ESLint. Detecta errores en tiempo de diseño antes de que alcancen el campo de batalla.',
      descriptionEn: 'Forged in the fires of TypeScript and ESLint. Catches design-time errors before they reach the production battlefield.',
      stats: { 'Precisión en Runtime': '+35%', 'Arquitectura Limpia': '+25 pts' },
      statsEn: { 'Runtime Precision': '+35%', 'Clean Architecture': '+25 pts' },
    },
    {
      id: 'armor-docker',
      name: 'Coraza del Contenedor Blindado',
      nameEn: 'Armor of the Shielded Container',
      category: 'armadura',
      rarity: 'epico',
      icon: Layers,
      description: 'Armadura forjada con Docker Compose y Linux. Aísla completamente la ejecución garantizando que "en mi máquina funciona" funcione en todo el reino.',
      descriptionEn: 'Armor forged with Docker Compose and Linux. Completely isolates execution, guaranteeing "it works on my machine" works everywhere.',
      stats: { 'Defensa en Producción': '+40%', 'Resistencia a Conflictos': '+30%' },
      statsEn: { 'Production Defense': '+40%', 'Conflict Resistance': '+30%' },
    },
    {
      id: 'ring-fastapi',
      name: 'Anillo de Resiliencia Asíncrona',
      nameEn: 'Ring of Asynchronous Resilience',
      category: 'accesorio',
      rarity: 'epico',
      icon: Zap,
      description: 'Engarzado con gemas de FastAPI y Node.js. Permite procesar miles de peticiones por segundo sin bloquear el hilo principal.',
      descriptionEn: 'Inlaid with gems of FastAPI and Node.js. Processes thousands of requests per second without blocking the main event loop.',
      stats: { 'Concurrencia': '+45%', 'Rendimiento I/O': '+30%' },
      statsEn: { 'Concurrency': '+45%', 'I/O Throughput': '+30%' },
    },
    {
      id: 'scroll-cv',
      name: 'Pergamino de Credenciales (CV)',
      nameEn: 'Scroll of Credentials (CV)',
      category: 'pergamino',
      rarity: 'legendario',
      icon: FileText,
      description: 'Documento sellado con la trayectoria completa, formación académica (UTN, Pescar) y certificaciones de Nicolas Schernetzki.',
      descriptionEn: 'Sealed parchment carrying the full career track record, academic training (UTN, Pescar) and verified credentials of Nicolas Schernetzki.',
      stats: { 'Nivel Profesional': 'Full-Stack', 'Idiomas': 'ES (Nativo) / EN (C1+)' },
      statsEn: { 'Professional Level': 'Full-Stack', 'Languages': 'ES (Native) / EN (C1+)' },
      actionLabel: 'Descargar Pergamino CV',
      actionLabelEn: 'Download CV Scroll',
      onAction: () => {
        sfx.playSelect();
        window.open(cvPdf, '_blank');
      },
    },
    {
      id: 'potion-coffee',
      name: 'Poción de Refactor Limpio (Café)',
      nameEn: 'Potion of Clean Refactoring (Coffee)',
      category: 'consumible',
      rarity: 'comun',
      icon: Coffee,
      description: 'Bebida mágica con alta concentración de cafeína. Restaura vitalidad y reactiva el pensamiento algorítmico agudo.',
      descriptionEn: 'Magical brew with high caffeine concentration. Restores vitality and re-engages sharp algorithmic reasoning.',
      stats: { 'Vitalidad': '+200 HP', 'Maná': '+150 MP' },
      statsEn: { 'Vitality': '+200 HP', 'Mana': '+150 MP' },
      actionLabel: potionConsumed ? 'Bebida consumida' : 'Beber Poción',
      actionLabelEn: potionConsumed ? 'Potion Consumed' : 'Drink Potion',
      onAction: () => {
        if (potionConsumed) return;
        sfx.playLevelUp();
        setPotionConsumed(true);
        setTimeout(() => setPotionConsumed(false), 5000);
      },
    },
    {
      id: 'amulet-dragon',
      name: 'Amuleto del Dragón Ordinal',
      nameEn: 'Amulet of the Ordinal Dragon',
      category: 'accesorio',
      rarity: 'legendario',
      icon: Sparkles,
      description: 'Reliquia ancestral que canaliza el espíritu de OrdinalDragon. Brinda bendición contra fallos de memoria y optimiza el pipeline.',
      descriptionEn: 'Ancient relic channeling the spirit of the Ordinal Dragon. Bestows warding against memory leaks and turbocharges the pipeline.',
      stats: { 'Todos los Atributos': '+15', 'Factor de Liderazgo': '+20' },
      statsEn: { 'All Attributes': '+15', 'Leadership Factor': '+20' },
    },
    {
      id: 'db-oracle',
      name: 'Grimorio de Persistencia ACID',
      nameEn: 'Grimoire of ACID Persistence',
      category: 'accesorio',
      rarity: 'epico',
      icon: Database,
      description: 'Manuscrito sagrado de MongoDB, MariaDB y Entity Framework Core. Mantiene la consistencia de los datos en cualquier circunstancia.',
      descriptionEn: 'Sacred manuscript of MongoDB, MariaDB and Entity Framework Core. Maintains unbreakable data consistency under any circumstance.',
      stats: { 'Integridad de Datos': '+50%', 'Eficiencia de Índices': '+28%' },
      statsEn: { 'Data Integrity': '+50%', 'Index Efficiency': '+28%' },
    },
    {
      id: 'shield-ci',
      name: 'Égida de Despliegue Continuo',
      nameEn: 'Aegis of Continuous Deployment',
      category: 'armadura',
      rarity: 'raro',
      icon: Shield,
      description: 'Pipeline forjado en GitHub Actions. Ejecuta suites de tests y compila imágenes automáticamente con cada push a la rama sagrada.',
      descriptionEn: 'Pipeline forged with GitHub Actions. Executes automated test suites and builds container images on every push to the sacred branch.',
      stats: { 'Velocidad de Entrega': '+35%', 'Tolerancia a Regresiones': '+40%' },
      statsEn: { 'Delivery Speed': '+35%', 'Regression Tolerance': '+40%' },
    },
  ];

  const handleToggleEquip = (item: InventoryItem) => {
    if (item.category === 'consumible' || item.category === 'pergamino') {
      if (item.onAction) item.onAction();
      return;
    }
    rpgState.toggleEquip(item.id);
  };

  const getCategoryLabel = (category: string) => {
    if (lang === 'en') {
      switch (category) {
        case 'arma': return 'Weapon';
        case 'armadura': return 'Armor';
        case 'accesorio': return 'Accessory';
        case 'pergamino': return 'Scroll';
        case 'consumible': return 'Consumable';
        default: return category;
      }
    }
    switch (category) {
      case 'arma': return 'Arma';
      case 'armadura': return 'Armadura';
      case 'accesorio': return 'Accesorio';
      case 'pergamino': return 'Pergamino';
      case 'consumible': return 'Consumible';
      default: return category;
    }
  };

  const getRarityLabel = (rarity: string) => {
    if (lang === 'en') {
      switch (rarity) {
        case 'legendario': return 'Legendary';
        case 'epico': return 'Epic';
        case 'raro': return 'Rare';
        default: return 'Common';
      }
    }
    switch (rarity) {
      case 'legendario': return 'Legendario';
      case 'epico': return 'Épico';
      case 'raro': return 'Raro';
      default: return 'Común';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendario': return 'text-primary border-primary bg-primary/10';
      case 'epico': return 'text-secondary border-secondary bg-secondary/10';
      case 'raro': return 'text-blue-400 border-blue-400 bg-blue-400/10';
      default: return 'text-on-surface-variant border-outline-variant/30 bg-surface-container-low';
    }
  };

  return (
    <div className="relative min-h-full w-full bg-transparent text-on-surface p-4 sm:p-6 lg:p-8 pb-32 max-w-6xl mx-auto">
      <header className="mb-6 text-center sm:text-left">
        <span className="font-mono text-primary text-xs uppercase tracking-widest block mb-1">
          {lang === 'en' ? '// EQUIPMENT & RELICS' : '// EQUIPAMIENTO & RELIQUIAS'}
        </span>
        <h1 className="font-headline text-3xl sm:text-5xl font-bold uppercase text-on-surface">
          {lang === 'en' ? "Developer's Stash" : 'Alijo del Desarrollador'}
        </h1>
        <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl">
          {lang === 'en'
            ? 'Select and equip your legendary tools. Each artifact grants real combat bonuses transferable to the Battle Arena.'
            : 'Selecciona y equipa tus herramientas legendarias. Cada artefacto otorga bonificaciones reales transferibles a la Arena de Combate.'}
        </p>
      </header>

      {/* Combat Synergy Stat Bar */}
      <div className="mb-6 p-4 rounded-xl bg-surface-container/80 backdrop-blur-sm border border-primary/40 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-primary" />
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-on-surface">
            {lang === 'en' ? 'Active Combat Synergy:' : 'Bonos de Combate Activos:'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-surface-container-highest border border-primary/20 text-primary font-bold">
            ⚔️ {lang === 'en' ? 'Damage' : 'Daño'}: +{combatBonuses.damageBonus}
          </span>
          <span className="px-2.5 py-1 rounded bg-surface-container-highest border border-outline-variant/30 text-secondary font-bold">
            🛡️ {lang === 'en' ? 'Damage Reduction' : 'Reducción Daño'}: +{combatBonuses.defensePercent}%
          </span>
          <span className="px-2.5 py-1 rounded bg-surface-container-highest border border-outline-variant/30 text-amber-400 font-bold">
            💥 {lang === 'en' ? 'Critical' : 'Crítico'}: {combatBonuses.critChance}%
          </span>
          <span className="px-2.5 py-1 rounded bg-surface-container-highest border border-outline-variant/30 text-blue-400 font-bold">
            ✨ {lang === 'en' ? 'Max MP' : 'MP Máx'}: +{combatBonuses.maxMpBonus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inventory Grid (7 cols on lg) */}
        <div className="lg:col-span-7 bg-surface-container-low/90 backdrop-blur-sm border-2 border-outline-variant/30 p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4 border-b border-outline-variant/20 pb-3">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-on-surface">
              {lang === 'en' ? `Relic Backpack (${ITEMS.length} / 12)` : `Mochila de Reliquias (${ITEMS.length} / 12)`}
            </h3>
            <span className="font-mono text-xs text-primary font-bold">
              {equippedIds.length} {lang === 'en' ? 'Equipped' : 'Equipados'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              const isEquipped = equippedIds.includes(item.id);
              const isSelected = selectedItem?.id === item.id;
              const itemName = lang === 'en' ? item.nameEn : item.name;
              const itemCat = getCategoryLabel(item.category);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedItem(item);
                    sfx.playHover();
                  }}
                  onDoubleClick={() => handleToggleEquip(item)}
                  className={`group relative p-3 rounded-lg border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer aspect-square ${
                    isSelected
                      ? 'border-primary bg-primary/20 shadow-[0_0_15px_rgba(255,145,0,0.3)] scale-105'
                      : isEquipped
                      ? 'border-primary-container bg-surface-container-high hover:border-primary'
                      : 'border-outline-variant/20 bg-surface-container hover:border-outline-variant/50'
                  }`}
                >
                  {isEquipped && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_#ff9100]" />
                  )}
                  <Icon size={28} className={isEquipped ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'} />
                  <span className="font-headline text-[11px] font-bold mt-2 leading-tight line-clamp-2 text-on-surface">
                    {itemName}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/70 mt-1">
                    {itemCat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Item Details Panel (5 cols on lg) */}
        <div className="lg:col-span-5 bg-surface-container-high/90 backdrop-blur-sm border-2 border-outline-variant/30 p-6 rounded-xl flex flex-col justify-between shadow-lg min-h-[380px]">
          {selectedItem ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className={`inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border ${getRarityColor(selectedItem.rarity)} mb-2 font-bold`}>
                    {getRarityLabel(selectedItem.rarity)} · {getCategoryLabel(selectedItem.category)}
                  </span>
                  <h3 className="font-headline text-xl font-bold text-on-surface">
                    {lang === 'en' ? selectedItem.nameEn : selectedItem.name}
                  </h3>
                </div>
                <div className="p-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-primary">
                  <selectedItem.icon size={26} />
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed italic border-l-2 border-primary/40 pl-3">
                &quot;{lang === 'en' ? selectedItem.descriptionEn : selectedItem.description}&quot;
              </p>

              {/* Stats list */}
              <div className="space-y-1.5 pt-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                  {lang === 'en' ? 'Attribute Bonuses:' : 'Bonificaciones de Atributo:'}
                </p>
                {Object.entries(lang === 'en' ? selectedItem.statsEn : selectedItem.stats).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-xs font-mono bg-surface-container-lowest px-2.5 py-1.5 rounded border border-outline-variant/20">
                    <span className="text-on-surface-variant">{k}</span>
                    <span className="text-primary font-bold">{v}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-col gap-2">
                {selectedItem.actionLabel ? (
                  <button
                    type="button"
                    onClick={() => selectedItem.onAction && selectedItem.onAction()}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:brightness-110 shadow-md cursor-pointer"
                  >
                    {selectedItem.category === 'pergamino' ? <Download size={15} /> : <Zap size={15} />}
                    <span>{lang === 'en' ? selectedItem.actionLabelEn : selectedItem.actionLabel}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleToggleEquip(selectedItem)}
                    className={`w-full py-2.5 px-4 font-label font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      equippedIds.includes(selectedItem.id)
                        ? 'border-2 border-primary text-primary hover:bg-primary/10'
                        : 'bg-primary text-on-primary hover:brightness-110 shadow-md'
                    }`}
                  >
                    <Check size={15} />
                    <span>
                      {equippedIds.includes(selectedItem.id)
                        ? (lang === 'en' ? 'Unequip' : 'Desequipar')
                        : (lang === 'en' ? 'Equip Relic' : 'Equipar Reliquia')}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-on-surface-variant">
              <Sparkles size={36} className="text-primary/40 mb-3" />
              <p className="font-headline text-base font-bold text-on-surface mb-1">
                {lang === 'en' ? 'No Relic Selected' : 'Ninguna Reliquia Seleccionada'}
              </p>
              <p className="font-body text-xs text-on-surface-variant max-w-xs">
                {lang === 'en'
                  ? 'Click any artifact in your backpack to inspect its attributes, lore, and equip it.'
                  : 'Haz clic en cualquier artefacto de tu mochila para inspeccionar sus atributos, historia y equiparlo.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
