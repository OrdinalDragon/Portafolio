import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import es from '../locales/es';

type Language = 'en' | 'es';
type Translations = Record<string, string>;

const translations: Record<Language, Translations> = { en, es };

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = lang;
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
