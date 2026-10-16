import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageContext';
import Inventario from '../components/Inventario';
import ArenaCombate from '../components/ArenaCombate';
import Habilidades from '../components/Habilidades';
import DragonCompanion from '../components/DragonCompanion';
import { sfx } from '../utils/sfx';

// Mock motion to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) =>
          React.createElement(prop, props, children);
      },
    }
  ),
  AnimatePresence: ({ children }: React.PropsWithChildren<Record<string, unknown>>) =>
    React.createElement(React.Fragment, null, children),
}));

describe('SFX Synthesizer Utility', () => {
  it('toggles mute correctly and persists in state', () => {
    const initialMute = sfx.isMuted();
    const toggled = sfx.toggleMute();
    expect(toggled).toBe(!initialMute);
    expect(sfx.isMuted()).toBe(toggled);
    // revert
    sfx.setMuted(initialMute);
  });

  it('safely invokes audio methods without throwing errors', () => {
    expect(() => {
      sfx.playHover();
      sfx.playSelect();
      sfx.playLevelUp();
      sfx.playEquip();
      sfx.playAttack();
      sfx.playDefend();
      sfx.playVictory();
      sfx.playDragonRoar();
    }).not.toThrow();
  });
});

describe('Inventario Component', () => {
  it('renders relics and inventory UI correctly', () => {
    render(
      <LanguageProvider defaultLang="es">
        <Inventario />
      </LanguageProvider>
    );

    expect(screen.getByText('Alijo del Desarrollador')).toBeInTheDocument();
    expect(screen.getByText(/Espada de Tipado Estricto/i)).toBeInTheDocument();
    expect(screen.getByText(/Coraza del Contenedor Blindado/i)).toBeInTheDocument();
    expect(screen.getByText(/Pergamino de Credenciales/i)).toBeInTheDocument();
  });

  it('allows selecting an item and equipping/unequipping', () => {
    render(
      <LanguageProvider defaultLang="es">
        <Inventario />
      </LanguageProvider>
    );

    // Click on TypeScript weapon item
    const tsItem = screen.getByText(/Espada de Tipado Estricto/i);
    fireEvent.click(tsItem);

    // Inspect panel should have Desequipar button because weapon-ts starts equipped
    const desequiparBtn = screen.getByRole('button', { name: /Desequipar/i });
    expect(desequiparBtn).toBeInTheDocument();
    fireEvent.click(desequiparBtn);

    // Now it should show Equipar
    expect(screen.getByRole('button', { name: /Equipar/i })).toBeInTheDocument();
  });
});

describe('ArenaCombate Component', () => {
  it('renders arena bosses and player stats', () => {
    render(
      <LanguageProvider defaultLang="es">
        <ArenaCombate />
      </LanguageProvider>
    );

    expect(screen.getByText('Depurador de Bugs')).toBeInTheDocument();
    expect(screen.getAllByText(/NullReferenceException/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /^Atacar$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try\/Catch/i })).toBeInTheDocument();
  });

  it('allows executing an attack against a boss and logs it to console', () => {
    render(
      <LanguageProvider defaultLang="es">
        <ArenaCombate />
      </LanguageProvider>
    );

    // Open Attack submenu
    const attackBtn = screen.getByRole('button', { name: /^Atacar$/i });
    fireEvent.click(attackBtn);

    // Click on Unit Test Suite
    const unitTestBtn = screen.getByRole('button', { name: /Unit Test Suite/i });
    fireEvent.click(unitTestBtn);

    // Console log should show action
    expect(screen.getByText(/Registro de Consola/i)).toBeInTheDocument();
    expect(screen.getByText(/Ejecutaste 'Unit Test Suite'/i)).toBeInTheDocument();
  });
});

describe('Habilidades Component (with Point Allocation)', () => {
  it('renders skill points and allows investing points', () => {
    render(
      <LanguageProvider defaultLang="es">
        <Habilidades />
      </LanguageProvider>
    );

    expect(screen.getByText(/ÁRBOL DE HABILIDADES/i)).toBeInTheDocument();
    expect(screen.getByText(/Puntos Disponibles/i)).toBeInTheDocument();

    const plusBadges = screen.getAllByText('+');
    expect(plusBadges.length).toBeGreaterThan(0);
    fireEvent.click(plusBadges[0]);

    // Reset points button should appear
    expect(screen.getByTitle('Reiniciar Puntos')).toBeInTheDocument();
  });
});

describe('DragonCompanion Component', () => {
  it('renders floating companion and handles roar interaction', () => {
    render(<DragonCompanion />);

    const dragonMascot = screen.getByTitle('Haz clic para interactuar con OrdinalDragon');
    expect(dragonMascot).toBeInTheDocument();
    fireEvent.click(dragonMascot);
  });
});
