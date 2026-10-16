import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, Wand2, FileText, Coffee, Sparkles, Check, Download, Zap,
  Layers, Database, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

export interface InventoryItem {
  id: string;
  name: string;
  category: 'arma' | 'armadura' | 'accesorio' | 'consumible' | 'pergamino';
  rarity: 'comun' | 'raro' | 'epico' | 'legendario';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  stats: Record<string, string>;
  actionLabel?: string;
  onAction?: () => void;
  equipped?: boolean;
}

export default function Inventario() {
  const { t, lang } = useLanguage();
  const cvPdf = `${import.meta.env.BASE_URL}Nicolas_Schernetzki_CV_${lang === 'en' ? 'Eng' : 'Esp'}.pdf`;

  const [equippedIds, setEquippedIds] = useState<string[]>(['weapon-ts', 'armor-docker', 'ring-fastapi']);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [potionConsumed, setPotionConsumed] = useState(false);

  const ITEMS: InventoryItem[] = [
    {
      id: 'weapon-ts',
      name: 'Espada de Tipado Estricto',
      category: 'arma',
      rarity: 'legendario',
      icon: Wand2,
      description: 'Forjada en el fuego de TypeScript y ESLint. Detecta errores en tiempo de diseño antes de que alcancen el campo de batalla.',
      stats: { 'Precisión en Runtime': '+35%', 'Arquitectura Limpia': '+25 pts' },
    },
    {
      id: 'armor-docker',
      name: 'Coraza del Contenedor Blindado',
      category: 'armadura',
      rarity: 'epico',
      icon: Layers,
      description: 'Armadura forjada con Docker Compose y Linux. Aísla completamente la ejecución garantizando que "en mi máquina funciona" funcione en todo el reino.',
      stats: { 'Defensa en Producción': '+40%', 'Resistencia a Conflictos': '+30%' },
    },
    {
      id: 'ring-fastapi',
      name: 'Anillo de Resiliencia Asíncrona',
      category: 'accesorio',
      rarity: 'epico',
      icon: Zap,
      description: 'Engarzado con gemas de FastAPI y Node.js. Permite procesar miles de peticiones por segundo sin bloquear el hilo principal.',
      stats: { 'Concurrencia': '+45%', 'Rendimiento I/O': '+30%' },
    },
    {
      id: 'scroll-cv',
      name: 'Pergamino de Credenciales (CV)',
      category: 'pergamino',
      rarity: 'legendario',
      icon: FileText,
      description: 'Documento sellado con la trayectoria completa, formación académica (UTN, Pescar) y certificaciones de Nicolás Schernetzki.',
      stats: { 'Nivel Profesional': 'Full-Stack', 'Idiomas': 'ES (Nativo) / EN (C1+)' },
      actionLabel: 'Descargar Pergamino CV',
      onAction: () => {
        sfx.playSelect();
        window.open(cvPdf, '_blank');
      },
    },
    {
      id: 'potion-coffee',
      name: 'Poción de Refactor Limpio (Café)',
      category: 'consumible',
      rarity: 'comun',
      icon: Coffee,
      description: 'Bebida mágica con alta concentración de cafeína. Restaura vitalidad y reactiva el pensamiento algorítmico agudo.',
      stats: { 'Vitalidad': '+200 HP', 'Maná': '+150 MP' },
      actionLabel: potionConsumed ? 'Bebida consumida' : 'Beber Poción',
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
      category: 'accesorio',
      rarity: 'legendario',
      icon: Sparkles,
      description: 'Reliquia ancestral que canaliza el espíritu de OrdinalDragon. Brinda bendición contra fallos de memoria y optimiza el pipeline.',
      stats: { 'Todos los Atributos': '+15', 'Factor de Liderazgo': '+20' },
    },
    {
      id: 'db-oracle',
      name: 'Grimorio de Persistencia ACID',
      category: 'accesorio',
      rarity: 'epico',
      icon: Database,
      description: 'Manuscrito sagrado de MongoDB, MariaDB y Entity Framework Core. Mantiene la consistencia de los datos en cualquier circunstancia.',
      stats: { 'Integridad de Datos': '+50%', 'Eficiencia de Índices': '+28%' },
    },
    {
      id: 'shield-ci',
      name: 'Égida de Despliegue Continuo',
      category: 'armadura',
      rarity: 'raro',
      icon: Shield,
      description: 'Pipeline forjado en GitHub Actions. Ejecuta suites de tests y compila imágenes automáticamente con cada push a la rama sagrada.',
      stats: { 'Velocidad de Entrega': '+35%', 'Tolerancia a Regresiones': '+40%' },
    },
  ];

  const handleToggleEquip = (item: InventoryItem) => {
    if (item.category === 'consumible' || item.category === 'pergamino') {
      if (item.onAction) item.onAction();
      return;
    }
    const isEquipped = equippedIds.includes(item.id);
    if (isEquipped) {
      setEquippedIds(equippedIds.filter((id) => id !== item.id));
      sfx.playHover();
    } else {
      setEquippedIds([...equippedIds, item.id]);
      sfx.playEquip();
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-full p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <header className="mb-8 text-center sm:text-left">
        <span className="font-mono text-primary text-xs uppercase tracking-widest block mb-1">
          // EQUIPAMIENTO & RELIQUIAS
        </span>
        <h1 className="font-headline text-3xl sm:text-5xl font-bold uppercase text-on-surface">
          Alijo del Desarrollador
        </h1>
        <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl">
          Selecciona y equipa tus herramientas legendarias. Cada artefacto otorga bonificaciones reales a tu hoja de personaje.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inventory Grid (8 cols on lg) */}
        <div className="lg:col-span-7 bg-surface-container-low border-2 border-outline-variant/20 p-4 sm:p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4 border-b border-outline-variant/20 pb-3">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-on-surface">
              Mochila de Reliquias ({ITEMS.length} / 12)
            </h3>
            <span className="font-mono text-xs text-primary font-bold">
              {equippedIds.length} Equipados
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              const isEquipped = equippedIds.includes(item.id);
              const isSelected = selectedItem?.id === item.id;

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
                    {item.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/70 mt-1">
                    {item.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Item Details Panel (5 cols on lg) */}
        <div className="lg:col-span-5 bg-surface-container-high border-2 border-outline-variant/25 p-6 rounded-xl flex flex-col justify-between">
          {selectedItem ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className={`inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border ${getRarityColor(selectedItem.rarity)} mb-2 font-bold`}>
                    {selectedItem.rarity} · {selectedItem.category}
                  </span>
                  <h3 className="font-headline text-xl font-bold text-on-surface">
                    {selectedItem.name}
                  </h3>
                </div>
                <div className="p-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-primary">
                  <selectedItem.icon size={26} />
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed italic border-l-2 border-primary/40 pl-3">
                &quot;{selectedItem.description}&quot;
              </p>

              {/* Stats list */}
              <div className="space-y-1.5 pt-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                  Bonificaciones de Atributo:
                </p>
                {Object.entries(selectedItem.stats).map(([k, v]) => (
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
                    <span>{selectedItem.actionLabel}</span>
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
                    <span>{equippedIds.includes(selectedItem.id) ? 'Desequipar' : 'Equipar Reliquia'}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-on-surface-variant">
              <Sparkles size={36} className="text-primary/40 mb-3" />
              <p className="font-headline text-base font-bold text-on-surface mb-1">
                Ninguna Reliquia Seleccionada
              </p>
              <p className="font-body text-xs text-on-surface-variant max-w-xs">
                Haz clic en cualquier artefacto de tu mochila para inspeccionar sus atributos, historia y equiparlo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
