import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';
import { ThemeProvider, useTheme } from '../i18n/ThemeContext';
import Personaje from '../components/Personaje';
import ScrollPortfolio from '../components/ScrollPortfolio';

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
  useInView: () => true,
  useScroll: () => ({
    scrollYProgress: {
      get: () => 0,
      on: () => () => {},
    },
  }),
  useSpring: (v: unknown) => {
    if (v && typeof v === 'object' && 'on' in v) return v;
    return {
      get: () => 0,
      on: () => () => {},
    };
  },
  useTransform: () => ({ get: () => 0 }),
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  useReducedMotion: () => false,
}));

describe('Personaje Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the landing page title in English by default', () => {
    render(
      <LanguageProvider defaultLang="en">
        <Personaje onStart={() => {}} />
      </LanguageProvider>
    );

    expect(screen.getByText('NICOLAS SCHERNETZKI')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('calls onStart when start button is clicked', () => {
    const handleStart = vi.fn();
    render(
      <LanguageProvider defaultLang="en">
        <Personaje onStart={handleStart} />
      </LanguageProvider>
    );

    const startBtn = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startBtn);
    expect(handleStart).toHaveBeenCalledTimes(1);
  });
});

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function TestLangConsumer() {
    const { lang, setLanguage, t } = useLanguage();
    return (
      <div>
        <span data-testid="current-lang">{lang}</span>
        <span data-testid="translated-title">{t('personaje.start')}</span>
        <button onClick={() => setLanguage('es')}>Set ES</button>
        <button onClick={() => setLanguage('en')}>Set EN</button>
      </div>
    );
  }

  it('switches languages and synchronizes document.documentElement.lang', () => {
    render(
      <LanguageProvider defaultLang="en">
        <TestLangConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(screen.getByTestId('translated-title').textContent).toBe('Start');
    expect(document.documentElement.lang).toBe('en');

    act(() => {
      fireEvent.click(screen.getByText('Set ES'));
    });

    expect(screen.getByTestId('current-lang').textContent).toBe('es');
    expect(screen.getByTestId('translated-title').textContent).toBe('Comenzar');
    expect(document.documentElement.lang).toBe('es');
    expect(localStorage.getItem('portal-lang')).toBe('es');
  });
});

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  function TestThemeConsumer() {
    const { theme, toggleTheme } = useTheme();
    return (
      <div>
        <span data-testid="current-theme">{theme}</span>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    );
  }

  it('toggles theme between dark and light, updating document class and localStorage', () => {
    render(
      <ThemeProvider>
        <TestThemeConsumer />
      </ThemeProvider>
    );

    const initialTheme = screen.getByTestId('current-theme').textContent;
    const toggleBtn = screen.getByText('Toggle Theme');

    act(() => {
      fireEvent.click(toggleBtn);
    });

    const newTheme = screen.getByTestId('current-theme').textContent;
    expect(newTheme).not.toBe(initialTheme);
    expect(localStorage.getItem('portal-theme')).toBe(newTheme);

    if (newTheme === 'dark') {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    } else {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    }
  });
});

describe('ScrollPortfolio Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders availability badge, about section, and projects', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <LanguageProvider defaultLang="es">
            <ScrollPortfolio />
          </LanguageProvider>
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Disponible para nuevas oportunidades/i)).toBeInTheDocument();
    expect(screen.getAllByText('Sobre Mí').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Problema Primero')).toBeInTheDocument();
    expect(screen.getByText('Responsabilidad End-to-End')).toBeInTheDocument();
    expect(screen.getByText('Productividad Acelerada con IA')).toBeInTheDocument();
    expect(screen.getAllByText('Copiar Email').length).toBeGreaterThan(0);
    expect(screen.getByText('Mood App')).toBeInTheDocument();
    expect(screen.getByText('EmotionShop')).toBeInTheDocument();
    expect(screen.getByText('Foco de Aprendizaje Activo')).toBeInTheDocument();
  });
});

import PrivacyTermsModal from '../components/PrivacyTermsModal';

describe('PrivacyTermsModal Component', () => {
  it('does not render anything when activeModal is null', () => {
    const { container } = render(
      <LanguageProvider defaultLang="es">
        <PrivacyTermsModal activeModal={null} onClose={() => {}} />
      </LanguageProvider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders Privacy Scroll when activeModal is "privacy"', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider defaultLang="es">
        <PrivacyTermsModal activeModal="privacy" onClose={handleClose} />
      </LanguageProvider>
    );

    expect(screen.getByText('El Pergamino de Privacidad')).toBeInTheDocument();
    expect(screen.getByText(/Sellado por el Guardián del Código/i)).toBeInTheDocument();
    expect(screen.getByText(/I. Recolección de Esencia/i)).toBeInTheDocument();
    expect(screen.getByText('He leído el Pacto')).toBeInTheDocument();

    fireEvent.click(screen.getByText('He leído el Pacto'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders Terms of Service when activeModal is "terms"', () => {
    const handleClose = vi.fn();
    const handleSelectModal = vi.fn();
    render(
      <LanguageProvider defaultLang="es">
        <PrivacyTermsModal activeModal="terms" onClose={handleClose} onSelectModal={handleSelectModal} />
      </LanguageProvider>
    );

    expect(screen.getByText('Pacto de Servicio')).toBeInTheDocument();
    expect(screen.getByText(/Leyes de la Ciudadela de Código/i)).toBeInTheDocument();
    expect(screen.getByText(/I. Uso de la Magia/i)).toBeInTheDocument();

    // Test tab switcher
    const privacyTabs = screen.getAllByText('Privacy');
    if (privacyTabs.length > 0) {
      fireEvent.click(privacyTabs[0]);
      expect(handleSelectModal).toHaveBeenCalledWith('privacy');
    }
  });

  it('renders Privacy and Terms in English when defaultLang is "en"', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider defaultLang="en">
        <PrivacyTermsModal activeModal="privacy" onClose={handleClose} onSelectModal={() => {}} />
      </LanguageProvider>
    );

    expect(screen.getByText('The Privacy Scroll')).toBeInTheDocument();
    expect(screen.getByText(/Sealed by the Code Guardian/i)).toBeInTheDocument();
    expect(screen.getByText(/I. Essence Collection/i)).toBeInTheDocument();
    expect(screen.getByText('I have read the Pact')).toBeInTheDocument();
  });
});

describe('English-First Localization Audit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to English when localStorage is completely empty', () => {
    function LangDetector() {
      const { lang } = useLanguage();
      return <span data-testid="detected-lang">{lang}</span>;
    }

    render(
      <LanguageProvider>
        <LangDetector />
      </LanguageProvider>
    );

    expect(screen.getByTestId('detected-lang').textContent).toBe('en');
  });
});

