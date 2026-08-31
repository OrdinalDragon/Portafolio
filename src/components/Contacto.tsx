import React, { useState } from 'react';
import { CheckCircle2, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Contacto() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setStatus('sent');
        setFormData({ email: '', subject: '', message: '' });
      } else {
        if (response.status === 404 && endpoint === '/api/contact') {
          alert(t('error.server'));
        }
        setStatus('error');
      }
    } catch (error) {
      if (endpoint === '/api/contact' && window.location.hostname.includes('github.io')) {
        alert(t('error.github'));
      }
      setStatus('error');
    }
  };

  return (
    <div className="signal-bg relative h-full w-full">
      <div className="max-w-2xl mx-auto py-8 md:py-12 px-4 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10 md:mb-12 text-center px-2">
        <span className="font-label text-primary uppercase tracking-[0.3em] mb-2 block text-[10px] md:text-xs">{t('contacto.subtitle')}</span>
        <h1 className="font-headline text-3xl md:text-6xl font-bold text-on-surface uppercase italic break-words">{t('contacto.title')}</h1>
        <div className="h-1 w-16 md:w-20 bg-primary mx-auto mt-4"></div>
      </header>

      {/* Quick contact options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a
          href="https://www.linkedin.com/in/nicolas-schernetzki-518b28212/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 bg-surface-container-high border border-outline-variant/10 hover:border-primary/30 transition-all group"
        >
          <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <Linkedin className="text-primary" size={20} />
          </div>
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-primary font-bold">{t('contacto.linkedin')}</p>
            <p className="text-[10px] text-on-surface-variant">linkedin.com/in/nicolas-schernetzki</p>
          </div>
        </a>
        <a
          href="mailto:schernetzki96@gmail.com"
          className="flex items-center gap-4 p-5 bg-surface-container-high border border-outline-variant/10 hover:border-primary/30 transition-all group"
        >
          <div className="w-10 h-10 bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center flex-shrink-0">
            <Mail className="text-on-surface-variant" size={20} />
          </div>
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface font-bold">{t('contacto.direct')}</p>
            <p className="text-[10px] text-on-surface-variant">schernetzki96@gmail.com</p>
          </div>
        </a>
      </div>

      <div className="bg-surface-container-high p-6 md:p-12 border border-outline-variant/15 shadow-2xl relative overflow-hidden">
        {status === 'sent' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle2 className="text-primary mx-auto mb-6" size={64} />
            <h2 className="font-headline text-2xl font-bold mb-2">{t('contacto.success.title')}</h2>
            <p className="text-on-surface-variant font-body">{t('contacto.success.text')}</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 px-8 py-3 bg-surface-container-highest text-xs uppercase tracking-widest font-label hover:text-primary transition-colors cursor-pointer"
            >
              {t('contacto.success.another')}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {status === 'error' && (
              <div className="p-4 bg-error/10 border border-error text-error text-sm font-label uppercase tracking-widest text-center">
                {t('contacto.error')}
              </div>
            )}
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant" htmlFor="email">{t('contacto.label.email')}</label>
              <input 
                id="email"
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contacto.placeholder.email')}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 font-body text-on-surface focus:border-primary outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant" htmlFor="subject">{t('contacto.label.subject')}</label>
              <input 
                id="subject"
                required
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('contacto.placeholder.subject')}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 font-body text-on-surface focus:border-primary outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant" htmlFor="message">{t('contacto.label.message')}</label>
              <textarea 
                id="message"
                required
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contacto.placeholder.message')}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 font-body text-on-surface focus:border-primary outline-none transition-colors resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(255,145,0,0.4)] transition-all disabled:opacity-50 cursor-pointer"
            >
              {status === 'sending' ? t('contacto.sending') : t('contacto.submit')}
            </button>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}
