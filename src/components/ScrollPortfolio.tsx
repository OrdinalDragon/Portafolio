import React, { useState, useRef } from 'react';
import {
  FolderGit2, Code2, Rocket, Github,
  Globe, Mail, Download, ChevronRight, CheckCircle2,
  Award, Briefcase, GraduationCap, Send, Gamepad2, Languages, Linkedin
} from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

type ProjectStatus = 'completed' | 'progress';

interface Project {
  id: string;
  nameKey: string;
  descKey: string;
  metricKey: string;
  tags: string[];
  live?: string;
  repo?: string;
  status: ProjectStatus;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    id: 'emotionshop',
    nameKey: 'portfolio.emotionshop.name',
    descKey: 'portfolio.emotionshop.desc',
    metricKey: 'portfolio.emotionshop.metric',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Docker'],
    live: 'https://emotionshop.jesrepresentaciones.com.ar/',
    repo: 'https://github.com/OrdinalDragon/E-commerce',
    status: 'completed',
    accent: '#f9abff',
  },
  {
    id: 'mood',
    nameKey: 'portfolio.mood.name',
    descKey: 'portfolio.mood.desc',
    metricKey: 'portfolio.mood.metric',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'MongoDB', 'Gemini IA', 'Docker', 'Nginx', 'Cloudflare'],
    live: 'https://prototipomood.jesrepresentaciones.com.ar/',
    repo: 'https://github.com/OrdinalDragon/Mood',
    status: 'completed',
    accent: '#ff9100',
  },
  {
    id: 'bank',
    nameKey: 'portfolio.bank.name',
    descKey: 'portfolio.bank.desc',
    metricKey: 'portfolio.bank.metric',
    tags: ['C#', '.NET 8', 'EF Core', 'MariaDB', 'WinForms', 'Docker'],
    repo: 'https://github.com/OrdinalDragon/Banco.net',
    status: 'completed',
    accent: '#4fc3f7',
  },
  {
    id: 'portfolio',
    nameKey: 'portfolio.portfolio.name',
    descKey: 'portfolio.portfolio.desc',
    metricKey: 'portfolio.portfolio.metric',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Motion'],
    repo: 'https://github.com/OrdinalDragon/Portafolio',
    status: 'completed',
    accent: '#ffb97c',
  },
  {
    id: 'commerce',
    nameKey: 'portfolio.commerce.name',
    descKey: 'portfolio.commerce.desc',
    metricKey: 'portfolio.commerce.metric',
    tags: ['React', 'Node.js', 'MongoDB'],
    status: 'progress',
    accent: '#81c784',
  },
];

const TECH_TAGS = [
  'React', 'TypeScript', 'JavaScript', 'Next.js', 'Node.js', 'Express',
  'C# / .NET', 'ASP.NET Core', 'Entity Framework', 'Python', 'Java', 'C++', 'PHP', 'Laravel',
  'Tailwind CSS', 'HTML', 'CSS', 'MongoDB', 'MongoDB Atlas', 'MySQL', 'MariaDB', 'Oracle', 'PostgreSQL',
  'Redux Toolkit', 'TypeScript', 'Vite',
  'Git', 'GitHub Actions', 'Docker', 'Linux / Bash', 'AWS S3', 'CloudFront', 'EC2', 'VBA', 'Postman',
  'REST APIs', 'JWT', 'BCrypt', 'xUnit', 'Moq', 'Serilog', 'Scrum', 'Agile',
  'AI Coding', 'Copilot', 'Claude', 'Ollama'
];

const SOFT_SKILLS = ['Business Acumen', 'Client Focus', 'Communication', 'Self-Taught', 'Teamwork', 'Problem Solving'];

const SECTION_LINKS = [
  { id: 'home', label: 'portfolio.nav.home' },
  { id: 'projects', label: 'portfolio.nav.projects' },
  { id: 'stack', label: 'portfolio.nav.stack' },
  { id: 'experience', label: 'portfolio.nav.experience' },
  { id: 'education', label: 'portfolio.nav.education' },
  { id: 'contact', label: 'portfolio.nav.contact' },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

function Reveal({ children, threshold = 0.12, className = '' }: { children: React.ReactNode; threshold?: number; className?: string; key?: string | number }) {
  const { ref, inView } = useReveal(threshold);
  return (
    <div ref={ref} className={`${inView ? 'is-visible' : ''} pixel-reveal ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <p className="font-pixel text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-3">{kicker}</p>
      <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface uppercase tracking-tight">
        {title}
      </h2>
      <div className="w-24 h-[3px] bg-primary mx-auto mt-4 pixel-corners" />
    </div>
  );
}

export default function ScrollPortfolio() {
  const { t, lang, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const BASE = import.meta.env.BASE_URL;
  const cvPdf = `${BASE}Nicolas_Schernetzki_CV_${lang === 'en' ? 'Eng' : 'Esp'}.pdf`;
  const cvDocx = `${BASE}Nicolas_Schernetzki_CV_${lang === 'en' ? 'Eng' : 'Esp'}.docx`;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Contact form state
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

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
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: formData.email, subject: formData.subject, message: `${formData.name}\n${formData.message}` }),
      });
      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        if (response.status === 404 && endpoint === '/api/contact') alert(t('error.server'));
        setStatus('error');
      }
    } catch {
      if (endpoint === '/api/contact' && window.location.hostname.includes('github.io')) alert(t('error.github'));
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body relative overflow-x-hidden">
      {/* Sticky header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur border-b-[3px] border-primary/40 pixel-corners">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-2 font-pixel text-primary text-[10px] sm:text-xs tracking-tight">
            <span className="hidden sm:inline">N.</span>
            <span>SCHERNETZKI</span>
            <span className="blink-cursor text-on-surface-variant">_</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {SECTION_LINKS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="font-label text-xs uppercase tracking-widest text-on-surface/70 hover:text-primary transition-colors cursor-pointer"
              >
                {t(s.label)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-on-surface/70 hover:text-primary transition-all hover:scale-105 cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? 'ES' : 'EN'}</span>
            </button>
            <Link
              to="/rpg"
              className="flex items-center gap-1 px-3 py-1.5 font-pixel text-[9px] sm:text-[10px] text-on-primary bg-gradient-to-r from-primary to-primary-container pixel-shadow cursor-pointer"
            >
              <Gamepad2 size={14} />
              <span className="hidden sm:inline">{t('portfolio.rpg')}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section id="home" className="relative min-h-[100dvh] flex items-center justify-center px-4 pt-20 overflow-hidden">
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="relative z-10 max-w-3xl text-center">
          <Reveal>
            <p className="font-pixel text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-6">
              &gt; hello_world.init()
            </p>
          </Reveal>
          <Reveal>
            <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold text-on-surface uppercase leading-tight">
              Nicolas<br />
              <span className="text-primary-container">Schernetzki</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-4 font-mono text-primary text-sm sm:text-base uppercase tracking-widest">
              {t('portfolio.hero.title')}
              <span className="blink-cursor">_</span>
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-on-surface-variant text-base sm:text-lg max-w-xl mx-auto font-body">
              {t('portfolio.hero.tagline')}
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => scrollTo('projects')} className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-sm pixel-shadow cursor-pointer">
                <FolderGit2 size={18} />
                {t('portfolio.hero.cta.projects')}
              </button>
              <button onClick={() => scrollTo('contact')} className="flex items-center gap-2 px-6 sm:px-8 py-3 border-2 border-primary/40 text-primary font-label font-bold uppercase tracking-widest text-sm hover:bg-primary/5 transition-colors cursor-pointer">
                <Send size={18} />
                {t('portfolio.hero.cta.contact')}
              </button>
            </div>
          </Reveal>
          <Reveal className="mt-6">
            <a href={cvPdf} target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <Download size={16} />
              {t('portfolio.hero.cta.cv')}
            </a>
          </Reveal>
          <Reveal className="mt-14">
            <ChevronRight className="mx-auto text-primary animate-bounce rotate-90" size={28} />
          </Reveal>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionHeading kicker="// artifacts" title={t('portfolio.projects.title')} />
          </Reveal>
          <Reveal>
            <p className="text-center text-on-surface-variant mb-12">{t('portfolio.projects.subtitle')}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((p) => (
              <Reveal key={p.id}>
                <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners hover:border-primary/50 transition-colors flex flex-col h-full">
                  {/* Screenshot placeholder */}
                  <div className="relative h-44 sm:h-52 overflow-hidden border-b-2 border-outline-variant/20" style={{ background: `linear-gradient(135deg, rgba(255,145,0,0.06), rgba(0,0,0,0.4))` }}>
                    <div className="absolute inset-0 scanlines pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 flex items-center justify-center border-4 border-black/30 pixel-shadow" style={{ background: `${p.accent}22`, boxShadow: `5px 5px 0 0 ${p.accent}55` }}>
                        <Code2 size={28} style={{ color: p.accent }} />
                      </div>
                    </div>
                    {p.status === 'progress' && (
                      <div className="absolute top-3 right-3 px-2 py-1 font-pixel text-[8px] bg-secondary text-black">
                        WIP
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-headline text-xl font-bold text-on-surface" style={{ color: p.accent }}>
                        {t(p.nameKey)}
                      </h3>
                      <span className={`font-label text-[10px] uppercase tracking-widest px-2 py-0.5 ${p.status === 'completed' ? 'text-primary bg-primary/10' : 'text-secondary bg-secondary/10'}`}>
                        {p.status === 'completed' ? t('portfolio.projects.status.completed') : t('portfolio.projects.status.progress')}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-body flex-1">{t(p.descKey)}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[11px] px-2 py-0.5 bg-surface-container-highest text-on-surface/80 border border-outline-variant/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 flex items-start gap-2 text-xs text-on-surface-variant">
                      <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{t(p.metricKey)}</span>
                    </p>

                    <div className="mt-5 flex gap-3">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label text-xs font-bold uppercase tracking-widest pixel-shadow cursor-pointer">
                          <Rocket size={14} />
                          {t('portfolio.projects.live')}
                        </a>
                      )}
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border-2 border-outline-variant/40 text-on-surface/80 hover:border-primary/50 hover:text-primary font-label text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                          <Github size={14} />
                          {t('portfolio.projects.code')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STACK & ABOUT ============ */}
      <section id="stack" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <SectionHeading kicker="// loadout" title={t('portfolio.stack.title')} />
          </Reveal>
          <Reveal>
            <p className="text-center text-on-surface-variant mb-8 max-w-2xl mx-auto">{t('portfolio.stack.bio1')}</p>
          </Reveal>
          <Reveal>
            <p className="text-center text-on-surface-variant mb-12 max-w-2xl mx-auto">{t('portfolio.stack.bio2')}</p>
          </Reveal>

          {/* Stat counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { value: '391+', label: t('portfolio.stack.stat.hours') },
              { value: '5', label: t('portfolio.stack.stat.projects') },
              { value: '100+', label: t('portfolio.stack.stat.clients') },
            ].map((s, i) => (
              <Reveal key={s.label}>
                <div className="text-center bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6">
                  <p className="font-pixel text-2xl sm:text-3xl text-primary">{s.value}</p>
                  <p className="mt-2 font-label text-[11px] uppercase tracking-widest text-on-surface-variant">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tech tags */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-10">
              {TECH_TAGS.map((tag) => (
                <span key={tag} className="font-mono text-xs px-3 py-1.5 bg-surface-container-low border border-outline-variant/20 hover:border-primary/50 hover:text-primary transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Soft skills */}
          <Reveal>
            <div className="flex flex-col items-center">
              <p className="font-pixel text-primary text-[10px] uppercase tracking-widest mb-4">{t('portfolio.stack.softskills')}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SOFT_SKILLS.map((s) => (
                  <span key={s} className="font-label text-xs uppercase tracking-widest text-on-surface-variant px-3 py-1 border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <SectionHeading kicker="// timeline" title={t('portfolio.experience.title')} />
          </Reveal>
          <div className="relative border-l-[3px] border-primary/40 pl-8 ml-4 space-y-12">
            <Reveal>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-3 h-3 bg-primary pixel-corners" />
                <div className="flex items-center gap-2 text-on-surface-variant font-mono text-xs uppercase tracking-widest mb-1">
                  <Briefcase size={14} className="text-primary" />
                  {t('portfolio.exp.sales.date')}
                </div>
                <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">{t('portfolio.exp.sales.role')}</h3>
                <p className="text-primary text-sm mb-3">{t('portfolio.exp.sales.company')}</p>
                <p className="text-on-surface-variant text-sm">{t('portfolio.exp.sales.desc1')}</p>
                <p className="text-on-surface-variant text-sm mt-2">{t('portfolio.exp.sales.desc2')}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-3 h-3 bg-primary pixel-corners" />
                <div className="flex items-center gap-2 text-on-surface-variant font-mono text-xs uppercase tracking-widest mb-1">
                  <Code2 size={14} className="text-primary" />
                  {t('portfolio.exp.freelance.date')}
                </div>
                <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">{t('portfolio.exp.freelance.role')}</h3>
                <p className="text-primary text-sm mb-3">{t('portfolio.exp.freelance.company')}</p>
                <p className="text-on-surface-variant text-sm">{t('portfolio.exp.freelance.desc')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ EDUCATION ============ */}
      <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <SectionHeading kicker="// academies" title={t('portfolio.education.title')} />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { nameKey: 'portfolio.edu.pescar.name', orgKey: 'portfolio.edu.pescar.org', dateKey: 'portfolio.edu.pescar.date', descKey: 'portfolio.edu.pescar.desc', cert: null },
              { nameKey: 'portfolio.edu.utn.name', orgKey: 'portfolio.edu.utn.org', dateKey: 'portfolio.edu.utn.date', descKey: 'portfolio.edu.utn.desc', cert: 'net.pdf' },
              { nameKey: 'portfolio.edu.ticmas.name', orgKey: 'portfolio.edu.ticmas.org', dateKey: 'portfolio.edu.ticmas.date', descKey: 'portfolio.edu.ticmas.desc', cert: 'ticmas.pdf' },
            ].map((e, i) => (
              <Reveal key={i}>
                <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <GraduationCap size={24} className="text-primary" />
                    <span className="font-mono text-[11px] text-on-surface-variant">{t(e.dateKey)}</span>
                  </div>
                  <h3 className="font-headline text-base font-bold text-on-surface mb-1">{t(e.nameKey)}</h3>
                  <p className="text-primary text-sm mb-3">{t(e.orgKey)}</p>
                  <p className="text-on-surface-variant text-sm flex-1">{t(e.descKey)}</p>
                  {e.cert && (
                    <a
                      href={`${BASE}${e.cert}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-primary hover:text-on-primary hover:bg-primary/20 px-3 py-2 border border-primary/30 transition-colors cursor-pointer"
                    >
                      <Award size={14} />
                      {t('portfolio.education.certificate')}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <SectionHeading kicker="// connect" title={t('portfolio.contact.title')} />
          </Reveal>
          <Reveal>
            <p className="text-center text-on-surface-variant mb-10">{t('portfolio.contact.subtitle')}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: contact info */}
            <div className="space-y-4">
              <a href="https://www.linkedin.com/in/nicolas-schernetzki-518b28212/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-surface-container-low border-2 border-outline-variant/20 pixel-corners hover:border-primary/50 transition-colors group">
                <Linkedin className="text-primary" size={24} />
                <span className="font-label text-xs uppercase tracking-widest text-on-surface/80 group-hover:text-primary transition-colors">LinkedIn</span>
              </a>
              <a href="mailto:schernetzki96@gmail.com" className="flex items-center gap-4 p-5 bg-surface-container-low border-2 border-outline-variant/20 pixel-corners hover:border-primary/50 transition-colors group">
                <Mail className="text-primary" size={24} />
                <span className="font-label text-xs uppercase tracking-widest text-on-surface/80 group-hover:text-primary transition-colors break-all">schernetzki96@gmail.com</span>
              </a>
              <a href={cvPdf} target="_blank" rel="noopener noreferrer" download className="flex items-center gap-4 p-5 bg-surface-container-low border-2 border-outline-variant/20 pixel-corners hover:border-primary/50 transition-colors group">
                <Download className="text-primary" size={24} />
                <span className="font-label text-xs uppercase tracking-widest text-on-surface/80 group-hover:text-primary transition-colors">{t('portfolio.contact.download')}</span>
              </a>

              <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-5">
                <p className="font-pixel text-primary text-[10px] uppercase tracking-widest mb-4">{t('portfolio.contact.languages.title')}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-label text-sm text-on-surface/80">
                    <Languages size={14} className="text-on-surface-variant" />
                    {t('portfolio.contact.languages.es')}
                  </div>
                  <div className="flex items-center gap-2 font-label text-sm text-on-surface/80">
                    <Languages size={14} className="text-on-surface-variant" />
                    {t('portfolio.contact.languages.en')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 sm:p-8">
              {status === 'sent' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="text-primary mx-auto mb-6" size={48} />
                  <h3 className="font-headline text-xl font-bold mb-2">{t('contacto.success.title')}</h3>
                  <p className="text-on-surface-variant font-body">{t('contacto.success.text')}</p>
                  <button onClick={() => setStatus('idle')} className="mt-8 px-6 py-3 bg-surface-container-highest text-xs uppercase tracking-widest font-label hover:text-primary transition-colors cursor-pointer">
                    {t('contacto.success.another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3 bg-error/10 border border-error text-error text-sm font-label uppercase tracking-widest text-center">
                      {t('contacto.error')}
                    </div>
                  )}
                  <div>
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant" htmlFor="pf-name">{t('portfolio.contact.name')}</label>
                    <input required name="name" id="pf-name" value={formData.name} onChange={handleChange} className="w-full mt-1 bg-surface-container-lowest border border-outline-variant/30 p-3 font-body text-on-surface focus:border-primary outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant" htmlFor="pf-email">{t('portfolio.contact.email')}</label>
                    <input required type="email" name="email" id="pf-email" value={formData.email} onChange={handleChange} className="w-full mt-1 bg-surface-container-lowest border border-outline-variant/30 p-3 font-body text-on-surface focus:border-primary outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant" htmlFor="pf-subject">{t('portfolio.contact.subject')}</label>
                    <input required name="subject" id="pf-subject" value={formData.subject} onChange={handleChange} className="w-full mt-1 bg-surface-container-lowest border border-outline-variant/30 p-3 font-body text-on-surface focus:border-primary outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant" htmlFor="pf-message">{t('portfolio.contact.message')}</label>
                    <textarea required rows={4} name="message" id="pf-message" value={formData.message} onChange={handleChange} className="w-full mt-1 bg-surface-container-lowest border border-outline-variant/30 p-3 font-body text-on-surface focus:border-primary outline-none transition-colors resize-none" />
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label font-bold tracking-widest uppercase pixel-shadow disabled:opacity-50 cursor-pointer">
                    {status === 'sending' ? t('contacto.sending') : t('portfolio.contact.send')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t-[3px] border-primary/30 bg-surface-container-lowest py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-headline text-lg font-bold text-on-surface">
            Nicolas <span className="text-primary">Schernetzki</span>
          </p>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
            © {new Date().getFullYear()} — {t('portfolio.footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/OrdinalDragon" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/nicolas-schernetzki-518b28212/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
