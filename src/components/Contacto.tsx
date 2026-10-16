import React, { useState } from 'react';
import { 
  CheckCircle2, Linkedin, Mail, Github, Sparkles, Send, 
  Copy, Check, Compass, ShieldAlert, MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';

export default function Contacto() {
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedQuestType, setSelectedQuestType] = useState<string | null>(null);

  const questTypes = [
    { id: 'job', label: t('contacto.quick.job') },
    { id: 'freelance', label: t('contacto.quick.freelance') },
    { id: 'collab', label: t('contacto.quick.collab') },
    { id: 'coffee', label: t('contacto.quick.coffee') },
  ];

  const handleQuestSelect = (quest: { id: string; label: string }) => {
    sfx.playSelect();
    setSelectedQuestType(quest.id);
    setFormData(prev => ({
      ...prev,
      subject: quest.label
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    sfx.playSelect();
    navigator.clipboard.writeText('nicoschernetzki@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playSelect();
    setStatus('sending');

    const rawFormspreeId = import.meta.env.VITE_FORMSPREE_ID;
    const isFormspreeValid = rawFormspreeId && rawFormspreeId !== 'undefined' && rawFormspreeId.trim() !== '';
    
    let endpoint = '/api/contact';
    if (isFormspreeValid) {
      const idMatch = rawFormspreeId.match(/\/f\/([a-zA-Z0-9]+)/) || rawFormspreeId.match(/^([a-zA-Z0-9]+)$/);
      const formspreeId = idMatch ? idMatch[1] : rawFormspreeId;
      endpoint = `https://formspree.io/f/${formspreeId}`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        sfx.playVictory();
        setStatus('sent');
        setFormData({ email: '', subject: '', message: '' });
        setSelectedQuestType(null);
      } else {
        if (response.status === 404 && endpoint === '/api/contact') {
          alert(t('error.server'));
        }
        setStatus('error');
      }
    } catch {
      if (endpoint === '/api/contact' && window.location.hostname.includes('github.io')) {
        alert(t('error.github'));
      }
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-full w-full bg-transparent text-on-surface p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <header className="text-center px-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-mono uppercase tracking-widest">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t('contacto.subtitle')}</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-black text-on-surface uppercase italic tracking-normal sm:tracking-wider mb-3">
            {t('contacto.title')}
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {t('contacto.desc')}
          </p>

          {/* Availability Beacon */}
          <div className="inline-flex items-center gap-2.5 mt-4 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t('contacto.availability')}</span>
          </div>
        </header>

        {/* Quick Guild Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nicolas-schernetzki-518b28212/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playSelect()}
            className="flex items-center gap-3.5 p-4 rounded bg-surface-container-high/60 border border-outline-variant/30 hover:border-primary/60 hover:bg-surface-container-high transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Linkedin className="text-primary" size={20} />
            </div>
            <div className="truncate">
              <p className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                {t('contacto.linkedin')}
              </p>
              <p className="text-[10px] font-mono text-on-surface-variant truncate">
                in/nicolas-schernetzki
              </p>
            </div>
          </a>

          {/* Direct Email with Quick Copy */}
          <div className="flex items-center justify-between p-4 rounded bg-surface-container-high/60 border border-outline-variant/30 hover:border-cyan-400/50 hover:bg-surface-container-high transition-all group shadow-md">
            <a 
              href="mailto:nicoschernetzki@gmail.com" 
              onClick={() => sfx.playSelect()}
              className="flex items-center gap-3.5 min-w-0"
            >
              <div className="w-10 h-10 rounded bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="text-cyan-400" size={20} />
              </div>
              <div className="truncate">
                <p className="font-mono text-xs uppercase tracking-wider text-on-surface font-bold group-hover:text-cyan-400 transition-colors">
                  {t('contacto.direct')}
                </p>
                <p className="text-[10px] font-mono text-on-surface-variant truncate">
                  nicoschernetzki@gmail.com
                </p>
              </div>
            </a>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded bg-surface-container-lowest/80 border border-outline-variant/30 text-on-surface-variant hover:text-cyan-400 hover:border-cyan-400/40 transition-colors shrink-0 cursor-pointer ml-2"
              title={lang === 'en' ? 'Copy email' : 'Copiar correo'}
              aria-label={lang === 'en' ? 'Copy email address' : 'Copiar correo electrónico'}
            >
              {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/OrdinalDragon"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playSelect()}
            className="flex items-center gap-3.5 p-4 rounded bg-surface-container-high/60 border border-outline-variant/30 hover:border-purple-400/60 hover:bg-surface-container-high transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Github className="text-purple-400" size={20} />
            </div>
            <div className="truncate">
              <p className="font-mono text-xs uppercase tracking-wider text-purple-400 font-bold">
                {lang === 'en' ? 'Forge on GitHub' : 'Forja en GitHub'}
              </p>
              <p className="text-[10px] font-mono text-on-surface-variant truncate">
                github.com/OrdinalDragon
              </p>
            </div>
          </a>
        </div>

        {/* Quest Selector Buttons (Pills) */}
        <div className="bg-surface-container-high/40 border border-outline-variant/30 p-5 rounded-sm backdrop-blur-sm space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold flex items-center gap-2">
              <Compass size={14} />
              {t('contacto.quick.title')}
            </span>
            <span className="text-[10px] font-mono text-on-surface-variant">
              {lang === 'en' ? 'Auto-fills subject' : 'Auto-completa el asunto'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {questTypes.map((quest) => {
              const isSelected = selectedQuestType === quest.id || formData.subject === quest.label;
              return (
                <button
                  key={quest.id}
                  type="button"
                  onClick={() => handleQuestSelect(quest)}
                  className={`px-3.5 py-2 rounded font-mono text-xs transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-primary text-on-primary border-primary shadow-[0_0_12px_rgba(255,145,0,0.4)] font-bold scale-[1.02]'
                      : 'bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface hover:border-primary/40 border-outline-variant/30'
                  }`}
                >
                  {quest.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summoning Scroll Card / Form */}
        <div className="bg-surface-container-high/60 border border-outline-variant/30 p-6 sm:p-10 rounded-sm shadow-2xl backdrop-blur-sm relative overflow-hidden">
          
          {status === 'sent' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/15 border-2 border-primary mx-auto flex items-center justify-center text-primary shadow-[0_0_20px_rgba(255,145,0,0.5)]">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-wider text-on-surface">
                {t('contacto.success.title')}
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-lg mx-auto leading-relaxed">
                {t('contacto.success.text')}
              </p>
              <button 
                onClick={() => {
                  sfx.playSelect();
                  setStatus('idle');
                }}
                className="mt-6 px-8 py-3 bg-surface-container-highest hover:bg-primary/20 hover:text-primary border border-outline-variant/40 rounded font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                {t('contacto.success.another')}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              {status === 'error' && (
                <div className="p-4 bg-error/15 border border-error/50 rounded text-error text-xs font-mono uppercase tracking-wider flex items-center gap-3">
                  <ShieldAlert size={18} className="shrink-0" />
                  <span>{t('contacto.error')}</span>
                </div>
              )}

              {/* Sender Email */}
              <div className="space-y-2">
                <label className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant flex items-center justify-between" htmlFor="email">
                  <span>{t('contacto.label.email')}</span>
                  <span className="text-primary font-bold">*</span>
                </label>
                <input 
                  id="email"
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contacto.placeholder.email')}
                  className="w-full bg-surface-container-lowest/90 border border-outline-variant/40 rounded p-3.5 font-mono text-xs text-on-surface focus:border-primary focus:shadow-[0_0_15px_rgba(255,145,0,0.15)] outline-none transition-all"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant flex items-center justify-between" htmlFor="subject">
                  <span>{t('contacto.label.subject')}</span>
                  <span className="text-primary font-bold">*</span>
                </label>
                <input 
                  id="subject"
                  required
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contacto.placeholder.subject')}
                  className="w-full bg-surface-container-lowest/90 border border-outline-variant/40 rounded p-3.5 font-mono text-xs text-on-surface focus:border-primary focus:shadow-[0_0_15px_rgba(255,145,0,0.15)] outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant flex items-center justify-between" htmlFor="message">
                  <span>{t('contacto.label.message')}</span>
                  <span className="text-primary font-bold">*</span>
                </label>
                <textarea 
                  id="message"
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contacto.placeholder.message')}
                  className="w-full bg-surface-container-lowest/90 border border-outline-variant/40 rounded p-3.5 font-body text-sm text-on-surface focus:border-primary focus:shadow-[0_0_15px_rgba(255,145,0,0.15)] outline-none transition-all resize-none leading-relaxed"
                ></textarea>
              </div>

              {/* Transmit Button */}
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 rounded bg-gradient-to-r from-primary via-primary to-primary-container text-on-primary font-headline font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_25px_rgba(255,145,0,0.45)] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 group"
              >
                {status === 'sending' ? (
                  <>
                    <Sparkles className="animate-spin" size={18} />
                    <span>{t('contacto.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    <span>{t('contacto.submit')}</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
