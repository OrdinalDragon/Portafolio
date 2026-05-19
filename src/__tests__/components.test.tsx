import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../i18n/LanguageContext';
import Personaje from '../components/Personaje';

// Mock motion to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => 
      React.createElement('div', props, children),
    img: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => 
      React.createElement('img', props, children),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<Record<string, unknown>>) => 
    React.createElement(React.Fragment, null, children),
}));

describe('Personaje Component', () => {
  it('renders the landing page title', () => {
    render(
      <LanguageProvider>
        <Personaje onStart={() => {}} />
      </LanguageProvider>
    );

    expect(screen.getByText('NICOLÁS SCHERNETZKI')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
