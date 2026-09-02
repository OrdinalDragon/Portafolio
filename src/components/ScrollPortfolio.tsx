import React, { useState, useRef, useEffect, Suspense } from 'react';
import {
  FolderGit2, Code2, Rocket, Github,
  Globe, Mail, Download, ChevronRight, CheckCircle2,
  Award, Briefcase, GraduationCap, Send, Gamepad2, Languages, Linkedin, ArrowUp, Star,
  Server, Cpu, Shield, Network, ZoomIn, Sun, Moon
} from 'lucide-react';
import {
  motion, AnimatePresence, useInView, useScroll, useSpring, useTransform, useMotionValue, useReducedMotion
} from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const Mermaid = React.lazy(() => import('./Mermaid'));
import Lightbox from './Lightbox';

type ProjectStatus = 'completed' | 'progress';

interface Project {
  id: string;
  nameKey: string;
  descKey: string;
  metricKey: string;
  tags: string[];
  live?: string;
  repo?: string;
  screenshot?: string;
  status: ProjectStatus;
  accent: string;
  featured?: boolean;
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
    screenshot: 'projects/emotionshop.png',
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
    screenshot: 'projects/mood.png',
    status: 'completed',
    accent: '#ff9100',
    featured: true,
  },
  {
    id: 'bank',
    nameKey: 'portfolio.bank.name',
    descKey: 'portfolio.bank.desc',
    metricKey: 'portfolio.bank.metric',
    tags: ['C#', '.NET 8', 'EF Core', 'MariaDB', 'WinForms', 'Docker'],
    repo: 'https://github.com/OrdinalDragon/Banco.net',
    screenshot: 'projects/bank.png',
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
    screenshot: 'projects/portfolio.png',
    status: 'completed',
    accent: '#ffb97c',
  },
  {
    id: 'commerce',
    nameKey: 'portfolio.commerce.name',
    descKey: 'portfolio.commerce.desc',
    metricKey: 'portfolio.commerce.metric',
    tags: ['React', 'Node.js', 'MongoDB'],
    screenshot: 'projects/commerce.png',
    status: 'progress',
    accent: '#81c784',
  },
];

/* ---------- animation helpers ---------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Scroll progress for the pixelated top bar (0 → 1)
function usePageProgress() {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
}

// Tracks whether the page has scrolled past a threshold (header shrink + back-to-top)
function useScrolledPast(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

// Terminal typewriter effect
function useTypewriter(text: string, speed = 42) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useInView(ref, { once: true, amount: 0.6 });
  const [output, setOutput] = useState('');
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [started, text, speed]);
  return { ref, output };
}

// Count-up number when it enters the viewport
function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

// Scrollspy: returns the id of the section currently in the middle of the viewport
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

// 3D tilt on hover (disabled on touch + reduced-motion)
function TiltCard({ children, className = '', max = 4 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 180, damping: 20 });
  const rY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 180, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={reduced ? undefined : { rotateX: rX, rotateY: rY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

function ProjectScreenshot({ screenshot, accent, status, onZoom }: { screenshot?: string; accent: string; status: ProjectStatus; onZoom?: () => void }) {
  const [failed, setFailed] = React.useState(false);
  const src = screenshot ? `${import.meta.env.BASE_URL}${screenshot}` : '';
  const showImage = Boolean(screenshot) && !failed;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onZoom}
        className="group/shot relative h-44 sm:h-52 overflow-hidden border-b-2 border-outline-variant/20 w-full text-left cursor-zoom-in block"
        style={{ background: `linear-gradient(135deg, rgba(255,145,0,0.06), rgba(0,0,0,0.4))` }}
        aria-label="View full size"
      >
        {showImage ? (
          <>
            <img
              src={src}
              alt=""
              loading="lazy"
              onError={() => setFailed(true)}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/shot:scale-105"
            />
            <div className="absolute inset-0 scanlines pointer-events-none opacity-40" />
            <div className="project-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none opacity-0" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 scanlines pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 flex items-center justify-center border-4 border-black/30 pixel-shadow" style={{ background: `${accent}22`, boxShadow: `5px 5px 0 0 ${accent}55` }}>
                <Code2 size={28} style={{ color: accent }} />
              </div>
            </div>
          </>
        )}
        {status === 'progress' && (
          <div className="absolute top-3 right-3 px-2 py-1 font-pixel text-[8px] bg-secondary text-black">
            WIP
          </div>
        )}
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60 text-on-surface font-label text-[10px] uppercase tracking-widest opacity-0 group-hover/shot:opacity-100 transition-opacity">
          <ZoomIn size={14} className="text-primary" />
          Zoom
        </span>
      </button>
    </div>
  );
}

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

function StatCounter({ value, suffix, label, delay = 0 }: { value: number; suffix?: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useCountUp(value, inView);
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: EASE as [number, number, number, number], delay }}
      className="text-center bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6"
    >
      <p className="font-pixel text-2xl sm:text-3xl text-primary">
        {reduced ? value : count}{suffix}
      </p>
      <p className="mt-2 font-label text-[11px] uppercase tracking-widest text-on-surface-variant">{label}</p>
    </motion.div>
  );
}

export default function ScrollPortfolio() {
  const { t, lang, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [lightboxUrl, setLightboxUrl] = React.useState<string | null>(null);
  const [diagramOpen, setDiagramOpen] = React.useState(false);

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

  const pageProgress = usePageProgress();
  const scrolledPast = useScrolledPast(60);
  const activeSection = useScrollSpy(SECTION_LINKS.map((s) => s.id));
  const { ref: typeRef, output: typewriterLine } = useTypewriter('> hello_world.init()', 35);
  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body relative overflow-x-hidden">
      {/* Sticky header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur border-b-[3px] border-primary/40 pixel-corners transition-all duration-300"
        style={{ height: scrolledPast ? '3.5rem' : '4rem' }}>
        <motion.div
          style={{ scaleX: pageProgress }}
          className="absolute top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-primary to-primary-container"
        />
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-full">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 text-primary tracking-tight cursor-pointer">
            <span className="font-pixel text-[10px] sm:text-xs">N.</span>
            <span className="font-headline font-bold text-sm sm:text-base tracking-wide">SCHERNETZKI</span>
            <span className="blink-cursor text-on-surface-variant hidden sm:inline">_</span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {SECTION_LINKS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`relative font-label text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                  activeSection === s.id ? 'text-primary' : 'text-on-surface/70 hover:text-primary'
                }`}
              >
                {t(s.label)}
                {activeSection === s.id && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-primary" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 font-label text-xs uppercase tracking-widest text-primary border-2 border-primary/50 hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              aria-label={t('portfolio.contact.download')}
            >
              <Download size={14} />
              <span className="hidden lg:inline">{t('portfolio.contact.download')}</span>
            </a>
            <button
              onClick={() => setLanguage(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-on-surface/70 hover:text-primary transition-all hover:scale-105 cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? 'ES' : 'EN'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 px-3 py-1.5 font-label text-xs uppercase tracking-widest text-on-surface/70 hover:text-primary transition-transform hover:scale-105 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section id="home" ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center px-4 pt-20 overflow-hidden">
        <div className="absolute inset-0 scanlines pointer-events-none" />

        {/* Floating 8-bit particles (dark mode only — signature of the retro identity) */}
        {theme === 'dark' && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {[
              { left: '8%', size: 3, delay: 0, dur: 14, color: '#ff9100' },
              { left: '20%', size: 2, delay: 3, dur: 16, color: '#f9abff' },
              { left: '33%', size: 2, delay: 6, dur: 13, color: '#ffb97c' },
              { left: '55%', size: 3, delay: 1.5, dur: 18, color: '#ff9100' },
              { left: '70%', size: 2, delay: 8, dur: 15, color: '#f9abff' },
              { left: '82%', size: 3, delay: 4, dur: 17, color: '#ffb97c' },
              { left: '92%', size: 2, delay: 9.5, dur: 12, color: '#ff9100' },
              { left: '48%', size: 2, delay: 11, dur: 16, color: '#f9abff' },
            ].map((p, i) => (
              <span
                key={i}
                className="particle"
                style={{ left: p.left, width: p.size, height: p.size, background: p.color, boxShadow: `0 0 6px ${p.color}`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, opacity: 0.7 }}
              />
            ))}
          </div>
        )}

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-3xl">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <motion.p variants={heroItem} ref={typeRef} className="font-pixel text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-6">
              {typewriterLine}
            </motion.p>
            <motion.h1 variants={heroItem} className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold text-on-surface uppercase leading-tight">
              Nicolas<br />
              <span className="text-primary-container">Schernetzki</span>
            </motion.h1>
            <motion.p variants={heroItem} className="mt-4 font-mono text-primary text-sm sm:text-base uppercase tracking-widest">
              {t('portfolio.hero.title')}
              <span className="blink-cursor">_</span>
            </motion.p>
            <motion.p variants={heroItem} className="mt-6 text-on-surface-variant text-base sm:text-lg max-w-xl mx-auto font-body">
              {t('portfolio.hero.tagline')}
            </motion.p>
            <motion.div variants={heroItem} className="mt-10">
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => scrollTo('projects')} className="glow-pulse flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-sm pixel-shadow cursor-pointer">
                  <FolderGit2 size={18} />
                  {t('portfolio.hero.cta.projects')}
                </button>
                <button onClick={() => scrollTo('contact')} className="flex items-center gap-2 px-6 sm:px-8 py-3 border-2 border-primary/40 text-primary font-label font-bold uppercase tracking-widest text-sm hover:bg-primary/5 transition-colors cursor-pointer">
                  <Send size={18} />
                  {t('portfolio.hero.cta.contact')}
                </button>
              </div>
            </motion.div>
            <motion.div variants={heroItem} className="mt-6">
              <a href={cvPdf} target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                <Download size={16} />
                {t('portfolio.hero.cta.cv')}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronRight className="text-primary animate-bounce rotate-90" size={28} />
        </motion.div>
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
          <div className="flex flex-col gap-8" style={{ transformStyle: 'preserve-3d' }}>
            {PROJECTS.filter((p) => p.featured).map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <div className="bg-surface-container-low border-2 pixel-corners hover:border-primary/50 transition-colors flex flex-col h-full group relative"
                  style={{ borderColor: p.accent }}>
                    <span className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-primary text-on-primary font-label text-[10px] uppercase tracking-widest pixel-shadow">
                      <Star size={12} />
                      {t('portfolio.featured')}
                    </span>
                    <ProjectScreenshot screenshot={p.screenshot} accent={p.accent} status={p.status} onZoom={() => p.screenshot && setLightboxUrl(`${BASE}${p.screenshot}`)} />
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
                          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border-2 border-primary/50 text-primary hover:bg-primary hover:text-on-primary font-label text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                            <Github size={14} />
                            {t('portfolio.projects.code')}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8" style={{ transformStyle: 'preserve-3d' }}>
            {PROJECTS.filter((p) => !p.featured).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: EASE, delay: (i % 2) * 0.1 }}
              >
                <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners hover:border-primary/50 transition-colors flex flex-col h-full group">
                    <ProjectScreenshot screenshot={p.screenshot} accent={p.accent} status={p.status} onZoom={() => p.screenshot && setLightboxUrl(`${BASE}${p.screenshot}`)} />
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
                          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border-2 border-primary/50 text-primary hover:bg-primary hover:text-on-primary font-label text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                            <Github size={14} />
                            {t('portfolio.projects.code')}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
              </motion.div>
            ))}
          </div>

          {/* ===== FEATURED PROJECT ENGINEERING ===== */}
          <Reveal>
            <div className="mt-20">
              <SectionHeading kicker="// deep dive" title={t('portfolio.mood.engineering.title')} />
              <p className="text-center text-on-surface-variant mb-12 max-w-2xl mx-auto">{t('portfolio.mood.engineering.subtitle')}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Server size={20} className="text-primary" />
                    <h3 className="font-headline text-base font-bold text-on-surface">{t('portfolio.mood.engineering.infra.title')}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant font-body flex-1">{t('portfolio.mood.engineering.infra.desc')}</p>
                </div>

                <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu size={20} className="text-primary" />
                    <h3 className="font-headline text-base font-bold text-on-surface">{t('portfolio.mood.engineering.stack.title')}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant font-body flex-1">{t('portfolio.mood.engineering.stack.desc')}</p>
                </div>

                <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={20} className="text-primary" />
                    <h3 className="font-headline text-base font-bold text-on-surface">{t('portfolio.mood.engineering.security.title')}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant font-body flex-1">{t('portfolio.mood.engineering.security.desc')}</p>
                </div>
              </div>

              <div className="mt-6 bg-surface-container-lowest border-2 border-primary/40 pixel-corners p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Network size={20} className="text-primary" />
                    <h3 className="font-headline text-base font-bold text-on-surface">{t('portfolio.mood.engineering.arch.title')}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDiagramOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-primary/50 text-primary hover:bg-primary hover:text-on-primary font-label text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    <ZoomIn size={14} />
                    Expand
                  </button>
                </div>
                <Suspense fallback={<p className="font-mono text-xs text-on-surface-variant">Loading diagram…</p>}>
                  <Mermaid chart={t('portfolio.mood.engineering.arch.mermaid')} className="overflow-x-auto" />
                </Suspense>
              </div>
            </div>
          </Reveal>
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
            <StatCounter value={391} suffix="+" label={t('portfolio.stack.stat.hours')} />
            <StatCounter value={5} label={t('portfolio.stack.stat.projects')} delay={0.1} />
            <StatCounter value={100} suffix="+" label={t('portfolio.stack.stat.clients')} delay={0.2} />
          </div>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-10"
          >
            {TECH_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, ease: EASE, delay: Math.min(i * 0.02, 0.6) }}
                className="font-mono text-xs px-3 py-1.5 bg-surface-container-low border border-outline-variant/20 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_12px_rgba(255,145,0,0.35)] transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

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
          <div className="relative pl-8 ml-4 space-y-12">
            {/* Growing timeline */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute left-0 top-1 bottom-1 w-[3px] origin-top bg-gradient-to-b from-primary to-primary-container/30"
            />
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="relative">
                <div className="pulse-dot absolute -left-[41px] top-1 w-3 h-3 bg-primary pixel-corners" />
                <div className="flex items-center gap-2 text-on-surface-variant font-mono text-xs uppercase tracking-widest mb-1">
                  <Briefcase size={14} className="text-primary" />
                  {t('portfolio.exp.sales.date')}
                </div>
                <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">{t('portfolio.exp.sales.role')}</h3>
                <p className="text-primary text-sm mb-3">{t('portfolio.exp.sales.company')}</p>
                <p className="text-on-surface-variant text-sm">{t('portfolio.exp.sales.desc1')}</p>
                <p className="text-on-surface-variant text-sm mt-2">{t('portfolio.exp.sales.desc2')}</p>
              </div>
            </motion.div>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ transformStyle: 'preserve-3d' }}>
            {[
              { nameKey: 'portfolio.edu.pescar.name', orgKey: 'portfolio.edu.pescar.org', dateKey: 'portfolio.edu.pescar.date', descKey: 'portfolio.edu.pescar.desc', cert: null },
              { nameKey: 'portfolio.edu.utn.name', orgKey: 'portfolio.edu.utn.org', dateKey: 'portfolio.edu.utn.date', descKey: 'portfolio.edu.utn.desc', cert: 'net.pdf' },
              { nameKey: 'portfolio.edu.ticmas.name', orgKey: 'portfolio.edu.ticmas.org', dateKey: 'portfolio.edu.ticmas.date', descKey: 'portfolio.edu.ticmas.desc', cert: 'ticmas.pdf' },
            ].map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
              >
                <TiltCard>
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
                </TiltCard>
              </motion.div>
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
            <p className="text-center text-on-surface-variant mb-2">{t('portfolio.contact.subtitle')}</p>
            <p className="text-center text-primary font-label text-xs sm:text-sm uppercase tracking-widest mb-10">
              {t('portfolio.contact.cta')}
            </p>
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
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="text-center py-10"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}>
                      <CheckCircle2 className="text-primary mx-auto mb-6" size={48} />
                    </motion.div>
                    <h3 className="font-headline text-xl font-bold mb-2">{t('contacto.success.title')}</h3>
                    <p className="text-on-surface-variant font-body">{t('contacto.success.text')}</p>
                    <button onClick={() => setStatus('idle')} className="mt-8 px-6 py-3 bg-surface-container-highest text-xs uppercase tracking-widest font-label hover:text-primary transition-colors cursor-pointer">
                      {t('contacto.success.another')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
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
                  </motion.form>
                )}
              </AnimatePresence>
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
            <Link
              to="/rpg"
              className="flex items-center gap-1.5 px-3 py-2 font-pixel text-[9px] text-on-primary bg-gradient-to-r from-primary to-primary-container pixel-shadow hover:brightness-110 transition-all hover:scale-105 cursor-pointer"
            >
              <Gamepad2 size={14} />
              <span className="hidden sm:inline">{t('portfolio.rpg')}</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {scrolledPast && (
          <motion.button
            key="backtotop"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => scrollTo('home')}
            aria-label={t('portfolio.backToTop')}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary to-primary-container text-on-primary pixel-shadow cursor-pointer"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Lightbox: project screenshot */}
      <Lightbox
        open={Boolean(lightboxUrl)}
        onClose={() => setLightboxUrl(null)}
        caption={t('portfolio.projects.title')}
      >
        {lightboxUrl && (
          <img src={lightboxUrl} alt="" className="w-full h-auto max-h-[85vh] object-contain" />
        )}
      </Lightbox>

      {/* Lightbox: architecture diagram */}
      <Lightbox open={diagramOpen} onClose={() => setDiagramOpen(false)} caption={t('portfolio.mood.engineering.arch.title')}>
        <div className="overflow-auto">
          <Suspense fallback={<p className="font-mono text-xs text-on-surface-variant">Loading diagram…</p>}>
            <Mermaid chart={t('portfolio.mood.engineering.arch.mermaid')} className="w-full" />
          </Suspense>
        </div>
      </Lightbox>
    </div>
  );
}
