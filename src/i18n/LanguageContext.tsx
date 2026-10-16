import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import es from '../locales/es';

export type Language = 'en' | 'es';
type Translations = Record<string, string>;

const translations: Record<Language, Translations> = { en, es };

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const STORAGE_KEY = 'portal-lang';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
    if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')) {
      return 'es';
    }
  } catch {
    // ignore localStorage errors
  }
  return 'en';
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({
  children,
  defaultLang,
}: {
  children: React.ReactNode;
  defaultLang?: Language;
}) => {
  const [lang, setLang] = useState<Language>(() => defaultLang ?? getInitialLanguage());

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore localStorage errors
    }
  }, [lang]);

  const setLanguage = (l: Language) => setLang(l);

  const t = (key: string): string => {
    return translations[lang][key] ?? translations['en'][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
