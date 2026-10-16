import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageContext';
import Inventario from '../components/Inventario';
import ArenaCombate from '../components/ArenaCombate';
import Habilidades from '../components/Habilidades';
import DragonCompanion from '../components/DragonCompanion';
import Misiones from '../components/Misiones';
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

describe('Misiones Component', () => {
  it('renders active campaign and completed chronicles including Fundación Pescar', () => {
    render(
      <LanguageProvider defaultLang="es">
        <Misiones />
      </LanguageProvider>
    );

    expect(screen.getByText('MISIONES & CRÓNICAS')).toBeInTheDocument();
    expect(screen.getByText(/Conquista del Reino Productivo/i)).toBeInTheDocument();
    expect(screen.getByText(/Fundación Pescar/i)).toBeInTheDocument();
    expect(screen.getByText(/Desarrollador Web Full Stack/i)).toBeInTheDocument();
    expect(screen.getByText(/Archimago MERN/i)).toBeInTheDocument();
    expect(screen.getByText(/4 \/ 4 Forjadas/i)).toBeInTheDocument();
  });

  it('opens sacred scroll modal on click', () => {
    render(
      <LanguageProvider defaultLang="es">
        <Misiones />
      </LanguageProvider>
    );

    const reviewButtons = screen.getAllByRole('button', { name: /Revisar Pergamino/i });
    expect(reviewButtons.length).toBe(4);
    fireEvent.click(reviewButtons[0]);

    // Modal should be open
    expect(screen.getByText(/Visualizando Pergamino Sagrado/i)).toBeInTheDocument();
  });
});

describe('Bestiario Component', () => {
  it('renders skill categories and filters by category', async () => {
    const Bestiario = (await import('../components/Bestiario')).default;
    render(
      <LanguageProvider defaultLang="es">
        <Bestiario />
      </LanguageProvider>
    );

    expect(screen.getByPlaceholderText(/>_ Buscar conjuro/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Todas las Artes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Frontend$/i })).toBeInTheDocument();

    // Click Frontend filter
    fireEvent.click(screen.getByRole('button', { name: /^Frontend$/i }));
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Docker')).not.toBeInTheDocument();
  });

  it('filters skills using search bar', async () => {
    const Bestiario = (await import('../components/Bestiario')).default;
    render(
      <LanguageProvider defaultLang="es">
        <Bestiario />
      </LanguageProvider>
    );

    const searchInput = screen.getByPlaceholderText(/>_ Buscar conjuro/i);
    fireEvent.change(searchInput, { target: { value: 'Docker' } });

    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});

describe('Historia Component', () => {
  it('renders interactive epochs and chapters', async () => {
    const Historia = (await import('../components/Historia')).default;
    render(
      <LanguageProvider defaultLang="es">
        <Historia />
      </LanguageProvider>
    );

    expect(screen.getByText(/El Ascenso del Héroe/i)).toBeInTheDocument();
    expect(screen.getByText('2016')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();

    // Click chapter 3 tab
    fireEvent.click(screen.getByRole('button', { name: /Capítulo 3/i }));
    expect(screen.getByText(/Capítulo III: El Reino Productivo/i)).toBeInTheDocument();
  });
});
describe('Estadisticas Component', () => {
  it('renders attributes, combat bonuses, and all 4 certificates including Fundación Pescar', async () => {
    const Estadisticas = (await import('../components/Estadisticas')).default;
    render(
      <LanguageProvider defaultLang="es">
        <Estadisticas />
      </LanguageProvider>
    );

    expect(screen.getByText(/Hoja de Estadísticas/i)).toBeInTheDocument();
    expect(screen.getByText(/Bonos de Reliquias Activas/i)).toBeInTheDocument();
    expect(screen.getByText(/4 Verificados/i)).toBeInTheDocument();
    expect(screen.getByText(/Desarrollador Web Full Stack MERN \(Fundación Pescar \/ Banco Nación\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Diplomatura Programación \.NET \(UTN\.BA\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Visualizar CV en Pantalla/i)).toBeInTheDocument();
  });
});

describe('Contacto Component', () => {
  it('renders summoning screen, quest selectors, and auto-fills subject', async () => {
    const Contacto = (await import('../components/Contacto')).default;
    render(
      <LanguageProvider defaultLang="es">
        <Contacto />
      </LanguageProvider>
    );

    expect(screen.getByText(/CONVOCAR AL HÉROE/i)).toBeInTheDocument();
    expect(screen.getByText(/Disponible para Nuevas Misiones/i)).toBeInTheDocument();
    
    // Quick quest selector
    const jobPill = screen.getByRole('button', { name: /💼 Oferta Laboral Full-Stack/i });
    expect(jobPill).toBeInTheDocument();

    const subjectInput = screen.getByLabelText(/Asunto de la Convocatoria/i) as HTMLInputElement;
    expect(subjectInput.value).toBe('');

    fireEvent.click(jobPill);
    expect(subjectInput.value).toBe('💼 Oferta Laboral Full-Stack');
  });
});

describe('Proyectos Component', () => {
  it('renders forged artifacts, filter tabs, and opens artifact inspection modal', async () => {
    const Proyectos = (await import('../components/Proyectos')).default;
    render(
      <LanguageProvider defaultLang="es">
        <Proyectos />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: /^LA FORJA DE ARTEFACTOS$/i })).toBeInTheDocument();
    expect(screen.getByText(/Mood App/i)).toBeInTheDocument();
    expect(screen.getByText(/EmotionShop/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulador Bancario/i)).toBeInTheDocument();

    // Filter by backend
    const backendFilter = screen.getByRole('button', { name: /\.NET & Sistemas/i });
    fireEvent.click(backendFilter);
    expect(screen.getByText(/Simulador Bancario/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mood App/i)).not.toBeInTheDocument();

    // Inspect artifact
    const inspectBtn = screen.getByRole('button', { name: /Examinar Artefacto/i });
    fireEvent.click(inspectBtn);
    expect(screen.getByText(/Arquitectura Forjada/i)).toBeInTheDocument();
  });
});

describe('RPGBackground Component', () => {
  it('renders dragon scales and mystical background runes', async () => {
    const RPGBackground = (await import('../components/RPGBackground')).default;
    const { container } = render(<RPGBackground />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});


