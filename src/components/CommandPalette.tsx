import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ArrowRight,
  FileText,
  Mail,
  Gamepad2,
  Sun,
  Moon,
  Globe,
  ExternalLink,
  Code2,
  Sparkles,
  X,
  CornerDownLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

interface CommandItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onScrollTo: (id: string) => void;
  onCopyEmail: () => void;
  cvPdf: string;
}

export default function CommandPalette({
  open,
  onClose,
  onScrollTo,
  onCopyEmail,
  cvPdf,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { lang, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Focus input immediately on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Define commands with useMemo (prevents recreation and re-translations on every keystroke)
  const commands: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: 'nav-about',
      category: t('portfolio.nav.about'),
      title: t('portfolio.nav.about'),
      subtitle: t('portfolio.about.subtitle'),
      icon: ArrowRight,
      action: () => {
        onScrollTo('about');
        onClose();
      },
      keywords: ['sobre mi', 'about', 'bio', 'mindset', 'historia'],
    },
    {
      id: 'nav-projects',
      category: t('portfolio.nav.projects'),
      title: t('portfolio.nav.projects'),
      subtitle: t('portfolio.projects.subtitle'),
      icon: Code2,
      action: () => {
        onScrollTo('projects');
        onClose();
      },
      keywords: ['proyectos', 'projects', 'apps', 'work'],
    },
    {
      id: 'nav-stack',
      category: t('portfolio.nav.stack'),
      title: t('portfolio.nav.stack'),
      subtitle: t('portfolio.stack.subtitle'),
      icon: Sparkles,
      action: () => {
        onScrollTo('stack');
        onClose();
      },
      keywords: ['stack', 'tecnologias', 'skills', 'react', 'node', 'fastapi', 'docker'],
    },
    {
      id: 'nav-experience',
      category: t('portfolio.nav.experience'),
      title: t('portfolio.nav.experience'),
      subtitle: t('portfolio.exp.sales.role'),
      icon: ArrowRight,
      action: () => {
        onScrollTo('experience');
        onClose();
      },
      keywords: ['experiencia', 'experience', 'timeline', 'trabajo'],
    },
    {
      id: 'nav-education',
      category: t('portfolio.nav.education'),
      title: t('portfolio.nav.education'),
      subtitle: t('portfolio.education.title'),
      icon: ArrowRight,
      action: () => {
        onScrollTo('education');
        onClose();
      },
      keywords: ['educacion', 'education', 'estudios', 'pescar', 'utn', 'ticmas'],
    },
    {
      id: 'nav-contact',
      category: t('portfolio.nav.contact'),
      title: t('portfolio.nav.contact'),
      subtitle: t('portfolio.hero.cta.contact'),
      icon: Mail,
      action: () => {
        onScrollTo('contact');
        onClose();
      },
      keywords: ['contacto', 'contact', 'email', 'mensaje', 'escribir'],
    },

    // Projects direct
    {
      id: 'proj-mood',
      category: t('portfolio.nav.projects'),
      title: 'Mood App (Live Demo)',
      subtitle: 'FastAPI + React 19 + Gemini AI + Docker',
      icon: ExternalLink,
      action: () => {
        window.open('https://prototipomood.jesrepresentaciones.com.ar/', '_blank');
        onClose();
      },
      keywords: ['mood', 'gemini', 'fastapi', 'eventos', 'ia', 'live'],
    },
    {
      id: 'proj-emotionshop',
      category: t('portfolio.nav.projects'),
      title: 'EmotionShop (Live Demo)',
      subtitle: 'MERN Stack + AWS S3/CloudFront + Docker CI/CD',
      icon: ExternalLink,
      action: () => {
        window.open('https://emotionshop.jesrepresentaciones.com.ar/', '_blank');
        onClose();
      },
      keywords: ['emotionshop', 'ecommerce', 'tienda', 'mern', 'aws', 'live'],
    },
    {
      id: 'proj-bank',
      category: t('portfolio.nav.projects'),
      title: 'Banco.net (.NET 8 & C#)',
      subtitle: 'Repositorio GitHub + EF Core + MariaDB',
      icon: ExternalLink,
      action: () => {
        window.open('https://github.com/OrdinalDragon/Banco.net', '_blank');
        onClose();
      },
      keywords: ['banco', 'bank', 'c#', 'csharp', '.net', 'efcore'],
    },

    // Quick Actions
    {
      id: 'act-cv',
      category: 'Acciones Rápidas',
      title: t('portfolio.hero.cta.cv'),
      subtitle: 'Descargar Nicolas_Schernetzki_CV.pdf',
      icon: FileText,
      action: () => {
        window.open(cvPdf, '_blank');
        onClose();
      },
      keywords: ['cv', 'curriculum', 'resume', 'pdf', 'descargar'],
    },
    {
      id: 'act-email',
      category: 'Acciones Rápidas',
      title: t('portfolio.contact.copyEmail'),
      subtitle: 'nicoschernetzki@gmail.com',
      icon: Mail,
      action: () => {
        onCopyEmail();
        onClose();
      },
      keywords: ['email', 'copiar', 'correo', 'mail'],
    },
    {
      id: 'act-rpg',
      category: 'Acciones Rápidas',
      title: t('portfolio.rpg'),
      subtitle: 'Explora el portafolio en estética RPG retro 8-bit',
      icon: Gamepad2,
      action: () => {
        navigate('/rpg');
        onClose();
      },
      keywords: ['rpg', 'juego', 'game', 'retro', '8bit', 'dragon'],
    },
    {
      id: 'act-theme',
      category: 'Configuración',
      title: theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro',
      subtitle: 'Alternar tema visual de la página',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
      keywords: ['tema', 'theme', 'dark', 'light', 'oscuro', 'claro', 'modo'],
    },
    {
      id: 'act-lang',
      category: 'Configuración',
      title: lang === 'es' ? 'Switch to English' : 'Cambiar a Español',
      subtitle: 'Change interface language',
      icon: Globe,
      action: () => {
        setLanguage(lang === 'es' ? 'en' : 'es');
        onClose();
      },
      keywords: ['idioma', 'language', 'english', 'español', 'en', 'es'],
    },
  ], [t, lang, theme, cvPdf, onScrollTo, onClose, onCopyEmail, navigate, toggleTheme, setLanguage]);

  // Filter commands in-memory with useMemo
  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase().trim();
    return commands.filter((cmd) => {
      const inTitle = cmd.title.toLowerCase().includes(q);
      const inSub = cmd.subtitle?.toLowerCase().includes(q);
      const inCat = cmd.category.toLowerCase().includes(q);
      const inKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return inTitle || inSub || inCat || inKeywords;
    });
  }, [commands, query]);

  // Handle keyboard navigation with instant scroll without layout thrashing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (selectedIndex + 1) % Math.max(filtered.length, 1);
      setSelectedIndex(next);
      const el = listRef.current?.children[next] as HTMLElement | undefined;
      el?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (selectedIndex - 1 + filtered.length) % Math.max(filtered.length, 1);
      setSelectedIndex(prev);
      const el = listRef.current?.children[prev] as HTMLElement | undefined;
      el?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -12 }}
          transition={{ duration: 0.14, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-surface-container-low border-2 border-primary/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        >
          {/* Top Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-outline-variant/20 bg-surface-container-lowest">
            <Search size={18} className="text-primary shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
                if (listRef.current) listRef.current.scrollTop = 0;
              }}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un comando o busca... (ej. proyectos, cv, mood)"
              className="w-full bg-transparent font-body text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <X size={16} />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div ref={listRef} className="overflow-y-auto p-2 space-y-1 flex-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant text-sm font-body">
                No se encontraron comandos para &quot;{query}&quot;
              </div>
            ) : (
              filtered.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'text-on-surface hover:bg-surface-container-high/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-on-primary/20 text-on-primary'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-headline text-sm font-bold truncate">{cmd.title}</p>
                        {cmd.subtitle && (
                          <p
                            className={`text-xs truncate ${
                              isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'
                            }`}
                          >
                            {cmd.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <CornerDownLeft size={14} className="text-on-primary/80 shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-surface-container-lowest/80 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
            <span className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/20">↑↓</span>
              <span>Navegar</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/20 ml-2">↵</span>
              <span>Ejecutar</span>
            </span>
            <span className="font-bold text-primary">OrdinalDragon · Command</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
