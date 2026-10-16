// Shared RPG state manager with localStorage persistence and reactive listeners
import { sfx } from './sfx';

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  xp: number;
  unlockedAt?: number;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'start_quest', title: 'El Despertar', desc: 'Comenzaste la travesía en la Ficha del Personaje.', icon: '⚔️', xp: 200 },
  { id: 'bug_hunter', title: 'Cazador de Bugs', desc: 'Derrotaste a un demonio de servidor en la Arena de Combate.', icon: '🐛', xp: 500 },
  { id: 'relic_master', title: 'Maestro de Reliquias', desc: 'Equipaste 3 o más artefactos legendarios en el Inventario.', icon: '🎒', xp: 300 },
  { id: 'pescar_scroll', title: 'Archivero de Pescar', desc: 'Examinaste el pergamino oficial de Fundación Pescar.', icon: '📜', xp: 400 },
  { id: 'skill_strategist', title: 'Estratega del Código', desc: 'Asignaste todos tus puntos de talento en el Árbol de Habilidades.', icon: '🌟', xp: 350 },
  { id: 'dragon_friend', title: 'Amigo de los Dragones', desc: 'Interactuaste 5 veces con la mascota OrdinalDragon.', icon: '🐉', xp: 250 },
  { id: 'lore_master', title: 'Cronista del Reino', desc: 'Leíste la Historia completa de Nicolás Schernetzki.', icon: '📖', xp: 200 },
];

const STORAGE_KEYS = {
  EQUIPPED: 'rpg_equipped_relics',
  SKILLS: 'rpg_skill_allocations',
  POINTS: 'rpg_available_points',
  ACHIEVEMENTS: 'rpg_unlocked_achievements',
  DRAGON_CLICKS: 'rpg_dragon_clicks',
  BOSSES_DEFEATED: 'rpg_bosses_defeated',
};

type StateListener = () => void;
type AchievementListener = (achievement: Achievement) => void;

class RpgStateManager {
  private stateListeners: Set<StateListener> = new Set();
  private achievementListeners: Set<AchievementListener> = new Set();

  private equippedIds: string[] = ['weapon-ts', 'armor-docker', 'ring-fastapi'];
  private skillAllocations: Record<string, number> = {
    react: 4, next: 4, tailwind: 3, redux: 4,
    csharp: 4, dotnet: 3, node: 3, sql: 3,
    git: 4, docker: 3, linux: 2, testing: 3,
  };
  private availablePoints: number = 6;
  private unlockedAchievements: string[] = [];
  private dragonClicks: number = 0;
  private bossesDefeated: string[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const eq = localStorage.getItem(STORAGE_KEYS.EQUIPPED);
      if (eq) this.equippedIds = JSON.parse(eq);

      const sk = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (sk) this.skillAllocations = JSON.parse(sk);

      const pts = localStorage.getItem(STORAGE_KEYS.POINTS);
      if (pts !== null) this.availablePoints = parseInt(pts, 10);

      const ach = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (ach) this.unlockedAchievements = JSON.parse(ach);

      const dc = localStorage.getItem(STORAGE_KEYS.DRAGON_CLICKS);
      if (dc) this.dragonClicks = parseInt(dc, 10);

      const bd = localStorage.getItem(STORAGE_KEYS.BOSSES_DEFEATED);
      if (bd) this.bossesDefeated = JSON.parse(bd);
    } catch (e) {
      console.warn('Could not load RPG state from localStorage:', e);
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.EQUIPPED, JSON.stringify(this.equippedIds));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(this.skillAllocations));
      localStorage.setItem(STORAGE_KEYS.POINTS, this.availablePoints.toString());
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(this.unlockedAchievements));
      localStorage.setItem(STORAGE_KEYS.DRAGON_CLICKS, this.dragonClicks.toString());
      localStorage.setItem(STORAGE_KEYS.BOSSES_DEFEATED, JSON.stringify(this.bossesDefeated));
    } catch (e) {
      console.warn('Could not save RPG state to localStorage:', e);
    }
    this.notifyState();
  }

  public subscribe(fn: StateListener) {
    this.stateListeners.add(fn);
    return () => { this.stateListeners.delete(fn); };
  }

  public onAchievement(fn: AchievementListener) {
    this.achievementListeners.add(fn);
    return () => { this.achievementListeners.delete(fn); };
  }

  private notifyState() {
    this.stateListeners.forEach((fn) => fn());
  }

  // --- Equipment & Sinergy ---
  public getEquippedIds(): string[] {
    return [...this.equippedIds];
  }

  public isEquipped(id: string): boolean {
    return this.equippedIds.includes(id);
  }

  public toggleEquip(id: string) {
    if (this.equippedIds.includes(id)) {
      this.equippedIds = this.equippedIds.filter((item) => item !== id);
      sfx.playEquip();
    } else {
      this.equippedIds.push(id);
      sfx.playEquip();
      if (this.equippedIds.length >= 3) {
        this.unlockAchievement('relic_master');
      }
    }
    this.saveToStorage();
  }

  // Synergy calculations for battle
  public getCombatBonuses() {
    let damageBonus = 0;
    let defensePercent = 0;
    let maxMpBonus = 0;
    let critChance = 10; // 10% base

    if (this.equippedIds.includes('weapon-ts')) {
      damageBonus += 35;
      critChance += 25; // 35% crit with TypeScript strict
    }
    if (this.equippedIds.includes('armor-docker')) {
      defensePercent += 30; // 30% damage reduction
    }
    if (this.equippedIds.includes('ring-fastapi')) {
      maxMpBonus += 100;
    }
    if (this.equippedIds.includes('amulet-dragon')) {
      damageBonus += 25;
      critChance += 15;
    }

    return { damageBonus, defensePercent, maxMpBonus, critChance };
  }

  // --- Skill Tree ---
  public getSkillAllocations(): Record<string, number> {
    return { ...this.skillAllocations };
  }

  public getAvailablePoints(): number {
    return this.availablePoints;
  }

  public upgradeSkill(id: string, max: number = 5) {
    if (this.availablePoints <= 0) return;
    const current = this.skillAllocations[id] || 0;
    if (current >= max) return;

    this.skillAllocations[id] = current + 1;
    this.availablePoints -= 1;
    sfx.playLevelUp();

    if (this.availablePoints === 0) {
      this.unlockAchievement('skill_strategist');
    }
    this.saveToStorage();
  }

  public resetSkills() {
    this.skillAllocations = {
      react: 4, next: 4, tailwind: 3, redux: 4,
      csharp: 4, dotnet: 3, node: 3, sql: 3,
      git: 4, docker: 3, linux: 2, testing: 3,
    };
    this.availablePoints = 6;
    sfx.playSelect();
    this.saveToStorage();
  }

  // Dynamic attributes based on skill allocations
  public getDynamicAttributes() {
    const s = this.skillAllocations;
    const backendLvl = (s.csharp || 0) + (s.dotnet || 0) + (s.node || 0) + (s.sql || 0);
    const frontendLvl = (s.react || 0) + (s.next || 0) + (s.tailwind || 0) + (s.redux || 0);
    const toolsLvl = (s.git || 0) + (s.docker || 0) + (s.linux || 0) + (s.testing || 0);

    return {
      str: 82 + backendLvl,
      agi: 81 + frontendLvl,
      int: 85 + Math.round((backendLvl + frontendLvl) / 2),
      dex: 80 + toolsLvl,
      cha: 92,
    };
  }

  // --- Achievements ---
  public getUnlockedAchievements(): string[] {
    return [...this.unlockedAchievements];
  }

  public unlockAchievement(id: string) {
    if (this.unlockedAchievements.includes(id)) return;
    this.unlockedAchievements.push(id);
    this.saveToStorage();

    const ach = ALL_ACHIEVEMENTS.find((a) => a.id === id);
    if (ach) {
      sfx.playVictory();
      this.achievementListeners.forEach((fn) => fn(ach));
    }
  }

  // --- Dragon Clicks ---
  public registerDragonClick() {
    this.dragonClicks += 1;
    this.saveToStorage();
    if (this.dragonClicks >= 5) {
      this.unlockAchievement('dragon_friend');
    }
  }

  // --- Boss Defeated ---
  public registerBossDefeat(bossId: string) {
    if (!this.bossesDefeated.includes(bossId)) {
      this.bossesDefeated.push(bossId);
    }
    this.unlockAchievement('bug_hunter');
    this.saveToStorage();
  }

  public getBossesDefeated(): string[] {
    return [...this.bossesDefeated];
  }
}

export const rpgState = new RpgStateManager();
