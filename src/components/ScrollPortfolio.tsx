import React, { useState, useRef, useEffect, Suspense } from 'react';
import {
  FolderGit2, Code2, Rocket, Github,
  Globe, Mail, Download, ChevronRight, CheckCircle2,
  Award, Briefcase, GraduationCap, Send, Gamepad2, Languages, Linkedin, ArrowUp, Star,
  Server, Cpu, Shield, Network, ZoomIn, Sun, Moon,
  Copy, Check, Layers, Sparkles, Target, ExternalLink, Menu, X, Search
} from 'lucide-react';
import {
  motion, AnimatePresence, useInView, useScroll, useSpring, useTransform, useMotionValue, useReducedMotion
} from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const Mermaid = React.lazy(() => import('./Mermaid'));
import Lightbox from './Lightbox';
import DragonEmbers from './DragonEmbers';
import Magnetic from './Magnetic';
import CommandPalette from './CommandPalette';

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
  gif?: string;
  status: ProjectStatus;
  accent: string;
  featured?: boolean;
  simulatedUrl?: string;
  highlights?: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'mood',
    nameKey: 'portfolio.mood.name',
    descKey: 'portfolio.mood.desc',
    metricKey: 'portfolio.mood.metric',
    tags: ['React 19', 'TypeScript', 'FastAPI', 'MongoDB', 'Docker', 'Nginx', 'Cloudflare', 'Gemini AI'],
    live: 'https://prototipomood.jesrepresentaciones.com.ar/',
    repo: 'https://github.com/OrdinalDragon/Mood',
    screenshot: 'projects/mood.png',
    gif: 'projects/mood.gif',
    status: 'completed',
    accent: '#ff9100',
    featured: true,
    simulatedUrl: 'https://prototipomood.jesrepresentaciones.com.ar',
    highlights: [
      'portfolio.mood.highlight1',
      'portfolio.mood.highlight2',
      'portfolio.mood.highlight3',
    ],
  },
  {
    id: 'emotionshop',
    nameKey: 'portfolio.emotionshop.name',
    descKey: 'portfolio.emotionshop.desc',
    metricKey: 'portfolio.emotionshop.metric',
    tags: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'AWS (S3/CloudFront/EC2)', 'Docker', 'GitHub Actions'],
    live: 'https://emotionshop.jesrepresentaciones.com.ar/',
    repo: 'https://github.com/OrdinalDragon/E-commerce',
    screenshot: 'projects/emotionshop.png',
    gif: 'projects/emotionshop.gif',
    status: 'completed',
    accent: '#f9abff',
    featured: true,
    simulatedUrl: 'https://emotionshop.jesrepresentaciones.com.ar',
    highlights: [
      'portfolio.emotionshop.highlight1',
      'portfolio.emotionshop.highlight2',
      'portfolio.emotionshop.highlight3',
    ],
  },
  {
    id: 'bank',
    nameKey: 'portfolio.bank.name',
    descKey: 'portfolio.bank.desc',
    metricKey: 'portfolio.bank.metric',
    tags: ['C#', '.NET 8', 'EF Core', 'MariaDB', 'WinForms', 'Docker', 'xUnit'],
    repo: 'https://github.com/OrdinalDragon/Banco.net',
    screenshot: 'projects/bank.png',
    status: 'completed',
    accent: '#4fc3f7',
    featured: true,
    simulatedUrl: 'https://github.com/OrdinalDragon/Banco.net',
    highlights: [
      'portfolio.bank.highlight1',
      'portfolio.bank.highlight2',
      'portfolio.bank.highlight3',
    ],
  },
  {
    id: 'portfolio',
    nameKey: 'portfolio.portfolio.name',
    descKey: 'portfolio.portfolio.desc',
    metricKey: 'portfolio.portfolio.metric',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion'],
    repo: 'https://github.com/OrdinalDragon/Portafolio',
    screenshot: 'projects/portfolio.png',
    status: 'completed',
    accent: '#ffb97c',
    simulatedUrl: 'https://ordinaldragon.github.io/Portafolio',
  },
  {
    id: 'commerce',
    nameKey: 'portfolio.commerce.name',
    descKey: 'portfolio.commerce.desc',
    metricKey: 'portfolio.commerce.metric',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    screenshot: 'projects/commerce.png',
    status: 'progress',
    accent: '#81c784',
    simulatedUrl: 'https://commerce.local/wip',
  },
];

interface TechCategory {
  titleKey: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  skills: { name: string; highlight?: boolean; color?: string }[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    titleKey: 'portfolio.stack.cat.frontend',
    icon: Code2,
    accent: '#ff9100',
    skills: [
      { name: 'React 19', highlight: true, color: '#61dafb' },
      { name: 'TypeScript', highlight: true, color: '#3178c6' },
      { name: 'Tailwind CSS v4', highlight: true, color: '#38bdf8' },
      { name: 'Vite', highlight: true, color: '#bd34fe' },
      { name: 'Redux Toolkit', color: '#764abc' },
      { name: 'Next.js', color: '#000000' },
      { name: 'Motion (Framer)', color: '#ff0055' },
      { name: 'HTML5 & CSS3', color: '#e34f26' },
    ],
  },
  {
    titleKey: 'portfolio.stack.cat.backend',
    icon: Server,
    accent: '#f9abff',
    skills: [
      { name: 'Python (FastAPI)', highlight: true, color: '#009688' },
      { name: 'Node.js / Express', highlight: true, color: '#68a063' },
      { name: 'C# (.NET 8)', highlight: true, color: '#239120' },
      { name: 'ASP.NET Core', highlight: true, color: '#512bd4' },
      { name: 'RESTful APIs', highlight: true, color: '#ff6c37' },
      { name: 'JWT & OAuth', color: '#d63aff' },
      { name: 'Async Web Scraping', color: '#f59e0b' },
      { name: 'POO & Design Patterns', color: '#8b5cf6' },
    ],
  },
  {
    titleKey: 'portfolio.stack.cat.database',
    icon: Cpu,
    accent: '#4fc3f7',
    skills: [
      { name: 'MongoDB & Atlas', highlight: true, color: '#00ed64' },
      { name: 'MariaDB / MySQL', highlight: true, color: '#00758f' },
      { name: 'Entity Framework Core', highlight: true, color: '#9b51e0' },
      { name: 'LINQ', color: '#68217a' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'Oracle', color: '#f80000' },
      { name: 'Mongoose', color: '#e11d48' },
    ],
  },
  {
    titleKey: 'portfolio.stack.cat.devops',
    icon: Shield,
    accent: '#81c784',
    skills: [
      { name: 'Docker & Compose', highlight: true, color: '#2496ed' },
      { name: 'GitHub Actions CI/CD', highlight: true, color: '#2088ff' },
      { name: 'AWS (S3, CloudFront, EC2)', color: '#ff9900' },
      { name: 'Nginx Reverse Proxy', color: '#009639' },
      { name: 'Cloudflare Tunnel', color: '#f38020' },
      { name: 'Git & GitHub', color: '#f05032' },
      { name: 'Linux / Bash', color: '#fcc624' },
      { name: 'Postman', color: '#ff6c37' },
    ],
  },
];

const SOFT_SKILLS = [
  'Business Acumen',
  'Problem-First Mindset',
  'Client Focus',
  'Effective Communication',
  'Self-Taught & Fast Learner',
  'Scrum & Agile Teamwork',
  'Technical Ownership'
];

const SECTION_LINKS = [
  { id: 'about', label: 'portfolio.nav.about' },
  { id: 'projects', label: 'portfolio.nav.projects' },
  { id: 'stack', label: 'portfolio.nav.stack' },
  { id: 'experience', label: 'portfolio.nav.experience' },
  { id: 'education', label: 'portfolio.nav.education' },
  { id: 'contact', label: 'portfolio.nav.contact' },
];

/* ---------- animation helpers ---------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// Tracks whether the page has scrolled past a threshold
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
function useTypewriter(text: string, speed = 40) {
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

// Scrollspy
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
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

// 3D tilt on hover
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

function ProjectScreenshot({
  screenshot,
  gif,
  accent,
  status,
  simulatedUrl = 'https://app.local',
  onZoom,
}: {
  screenshot?: string;
  gif?: string;
  accent: string;
  status: ProjectStatus;
  simulatedUrl?: string;
  onZoom?: () => void;
}) {
  const [failed, setFailed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [showGif, setShowGif] = React.useState(false);

  const baseSrc = screenshot ? `${import.meta.env.BASE_URL}${screenshot}` : '';
  const gifSrc = gif ? `${import.meta.env.BASE_URL}${gif}` : '';
  const activeSrc = (isHovered || showGif) && gifSrc ? gifSrc : baseSrc;
  const showImage = Boolean(activeSrc) && !failed;

  return (
    <div
      className="browser-frame"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Browser top chrome */}
      <div className="flex items-center justify-between px-3 py-2 bg-surface-container-highest border-b border-outline-variant/30 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
        </div>
        <div className="px-2.5 py-0.5 rounded bg-surface-container-lowest/70 border border-outline-variant/20 font-mono text-[10px] text-on-surface-variant truncate max-w-[180px] sm:max-w-[260px]">
          {simulatedUrl}
        </div>
        <div className="flex items-center gap-2">
          {gif && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowGif(!showGif);
              }}
              className={`flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                showGif || isHovered
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-primary hover:border-primary/40 border border-outline-variant/30'
              }`}
              title="Alternar demo animada"
            >
              <span>{showGif || isHovered ? '● GIF ACTIVO' : '▶ GIF DEMO'}</span>
            </button>
          )}
          {status === 'completed' ? (
            <span className="flex items-center gap-1 font-mono text-[9px] text-green-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="font-mono text-[9px] text-secondary font-bold">WIP</span>
          )}
        </div>
      </div>

      {/* Screenshot / GIF area */}
      <button
        type="button"
        onClick={onZoom}
        className="group/shot relative w-full aspect-video overflow-hidden text-left cursor-zoom-in block bg-surface-container-lowest"
        style={{ background: `linear-gradient(135deg, rgba(255,145,0,0.06), rgba(0,0,0,0.4))` }}
        aria-label="View full size"
      >
        {showImage ? (
          <>
            <img
              src={activeSrc}
              alt=""
              loading="lazy"
              onError={() => setFailed(true)}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/shot:scale-[1.02]"
            />
            {gif && !isHovered && !showGif && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-highest/95 dark:bg-black/85 backdrop-blur text-primary text-[10px] font-mono font-bold border border-primary/40 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                HOVER PARA DEMO
              </div>
            )}
            <div className="project-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-amber-600/20 dark:via-white/20 to-transparent -skew-x-12 pointer-events-none opacity-0" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center border border-outline-variant/30" style={{ background: `${accent}22` }}>
              <Code2 size={28} style={{ color: accent }} />
            </div>
          </div>
        )}
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-highest/95 dark:bg-black/85 backdrop-blur text-on-surface font-label text-[10px] uppercase tracking-wider opacity-0 group-hover/shot:opacity-100 transition-opacity border border-outline-variant/30 shadow-md">
          <ZoomIn size={14} className="text-primary" />
          Zoom
        </span>
      </button>
    </div>
  );
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

function Reveal({
  children,
  threshold = 0.12,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
  key?: string | number;
  delay?: number;
}) {
  const { ref, inView } = useReveal(threshold);
  return (
    <div
      ref={ref}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
      className={`${inView ? 'is-visible' : ''} pixel-reveal ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <p className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-2">{kicker}</p>
      <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
        {title}
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-container rounded-full mx-auto mt-4" />
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
      transition={{ duration: 0.55, ease: EASE, delay }}
      className="text-center bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors"
    >
      <p className="font-headline font-black text-3xl sm:text-4xl text-primary tracking-tight">
        {reduced ? value : count}{suffix}
      </p>
      <p className="mt-2 font-label text-xs uppercase tracking-wider text-on-surface-variant font-medium">{label}</p>
    </motion.div>
  );
}

export default function ScrollPortfolio() {
  const { t, lang, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [diagramOpen, setDiagramOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  // Global keyboard shortcut: Ctrl+K / Cmd+K to toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const BASE = import.meta.env.BASE_URL;
  const cvPdf = `${BASE}Nicolas_Schernetzki_CV_${lang === 'en' ? 'Eng' : 'Esp'}.pdf`;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nicoschernetzki@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // ignore
    }
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolledPast = useScrolledPast(50);
  const activeSection = useScrollSpy(SECTION_LINKS.map((s) => s.id));
  const { ref: typeRef, output: typewriterLine } = useTypewriter('> hello_world.init()', 35);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  // Experience timeline energy progress
  const experienceRef = useRef<HTMLElement>(null);
  const { scrollYProgress: expScrollProgress } = useScroll({
    target: experienceRef,
    offset: ['start 80%', 'end 65%'],
  });
  const timelineScaleY = useSpring(expScrollProgress, { stiffness: 120, damping: 24 });
  const timelineSparkTop = useTransform(timelineScaleY, (v) => `${Math.min(Math.max(v * 100, 0), 100)}%`);
  const timelineSparkOpacity = useTransform(timelineScaleY, [0, 0.05, 0.95, 1], [0, 1, 1, 0.4]);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body relative overflow-x-hidden">
      {/* Sticky header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolledPast
            ? 'h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/15 shadow-sm'
            : 'h-18 sm:h-20 bg-surface-container-lowest/80 backdrop-blur-sm border-b border-outline-variant/10'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full gap-4">
          {/* Brand Logo with Magnetic friction */}
          <Magnetic strength={0.25}>
            <button
              onClick={() => {
                scrollTo('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
              aria-label="Ir al inicio"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary font-bold text-sm tracking-wider group-hover:scale-105 group-hover:bg-primary group-hover:text-on-primary transition-all duration-200">
                NS
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-sm sm:text-base tracking-tight text-on-surface group-hover:text-primary transition-colors">
                  Nicolás Schernetzki
                </span>
                <span className="text-[11px] text-on-surface-variant font-mono leading-none">
                  Full-Stack Engineer
                </span>
              </div>
            </button>
          </Magnetic>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {SECTION_LINKS.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-on-surface/70 hover:text-on-surface hover:bg-surface-container-high/40'
                  }`}
                >
                  {t(s.label)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-surface-container-high/60 border border-outline-variant/30 hover:border-primary/50 text-on-surface-variant hover:text-primary transition-all cursor-pointer group"
              title="Abrir paleta de comandos (Ctrl+K / Cmd+K)"
              aria-label="Abrir paleta de comandos"
            >
              <Search size={14} className="group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-[11px] font-sans text-on-surface-variant group-hover:text-on-surface">Buscar</span>
              <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant group-hover:border-primary/40 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Download CV Button */}
            <Magnetic strength={0.15}>
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-outline-variant/30 hover:border-primary text-on-surface hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
                aria-label={t('portfolio.contact.download')}
              >
                <Download size={14} />
                <span>{t('portfolio.contact.download')}</span>
              </a>
            </Magnetic>

            {/* RPG Mode Access */}
            <Magnetic strength={0.15}>
              <Link
                to="/rpg"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 text-on-surface hover:text-primary transition-all group"
                title={t('portfolio.rpg')}
                aria-label={t('portfolio.rpg')}
              >
                <Gamepad2 size={15} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-medium">{t('portfolio.rpg')}</span>
              </Link>
            </Magnetic>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe size={15} />
              <span className="font-mono text-[11px]">{lang === 'en' ? 'ES' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/20 px-4 py-4 flex flex-col gap-1.5 shadow-2xl"
            >
              {/* Command Palette quick search for mobile */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandOpen(true);
                }}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono bg-surface-container-high/60 border border-outline-variant/30 text-primary mb-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search size={15} />
                  <span>Buscar / Comandos</span>
                </div>
                <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant font-mono">
                  ⌘K
                </kbd>
              </button>

              {SECTION_LINKS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    scrollTo(s.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeSection === s.id
                      ? 'text-primary bg-primary/10 font-bold'
                      : 'text-on-surface/80 hover:bg-surface-container-high'
                  }`}
                >
                  <span>{t(s.label)}</span>
                  {activeSection === s.id && <ChevronRight size={15} className="text-primary" />}
                </button>
              ))}
              <div className="pt-2 mt-1 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                <a
                  href={cvPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg border border-outline-variant/30 text-primary"
                >
                  <Download size={14} />
                  <span>{t('portfolio.contact.download')}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============ HERO ============ */}
      <section id="home" ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center px-4 pt-20 overflow-hidden">
        {/* Dragon Embers cursor trail (ambient ember sparks) */}
        <DragonEmbers />

        <div className="absolute inset-0 scanlines pointer-events-none" />

        {/* Floating particles (active in both light and dark mode) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[
            { left: '8%', size: 3, delay: 0, dur: 14, darkColor: '#ff9100', lightColor: '#b3541e' },
            { left: '20%', size: 2, delay: 3, dur: 16, darkColor: '#f9abff', lightColor: '#9c4168' },
            { left: '33%', size: 2, delay: 6, dur: 13, darkColor: '#ffb97c', lightColor: '#d97706' },
            { left: '55%', size: 3, delay: 1.5, dur: 18, darkColor: '#ff9100', lightColor: '#b45309' },
            { left: '70%', size: 2, delay: 8, dur: 15, darkColor: '#f9abff', lightColor: '#86039c' },
            { left: '82%', size: 3, delay: 4, dur: 17, darkColor: '#ffb97c', lightColor: '#b3541e' },
            { left: '92%', size: 2, delay: 9.5, dur: 12, darkColor: '#ff9100', lightColor: '#d97706' },
            { left: '48%', size: 2, delay: 11, dur: 16, darkColor: '#f9abff', lightColor: '#9c4168' },
          ].map((p, i) => {
            const color = theme === 'dark' ? p.darkColor : p.lightColor;
            return (
              <span
                key={i}
                className="particle"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: color,
                  boxShadow: `0 0 8px ${color}`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.dur}s`,
                  opacity: theme === 'dark' ? 0.75 : 0.65,
                }}
              />
            );
          })}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-3xl">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            {/* Availability Badge */}
            <motion.div variants={heroItem} className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full border border-emerald-600/30 dark:border-green-500/40 bg-emerald-500/10 dark:bg-green-500/10 text-emerald-800 dark:text-green-400 font-mono text-[11px] sm:text-xs shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-green-400 animate-pulse" />
              <span>{t('portfolio.hero.available')}</span>
            </motion.div>

            <motion.p variants={heroItem} ref={typeRef} className="font-mono text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-6">
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
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => scrollTo('projects')}
                    className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <FolderGit2 size={18} />
                    {t('portfolio.hero.cta.projects')}
                  </button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="flex items-center gap-2 px-6 sm:px-8 py-3 border border-primary/40 hover:border-primary text-primary hover:bg-primary/10 font-label font-bold uppercase tracking-wider text-sm rounded-xl transition-all cursor-pointer"
                  >
                    <Send size={18} />
                    {t('portfolio.hero.cta.contact')}
                  </button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 px-5 sm:px-6 py-3 border border-outline-variant/30 bg-surface-container-high/50 hover:bg-surface-container-high hover:border-primary/50 text-on-surface font-label text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    title="nicoschernetzki@gmail.com"
                  >
                    {copiedEmail ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-primary" />}
                    <span>{copiedEmail ? t('portfolio.contact.copied') : t('portfolio.contact.copyEmail')}</span>
                  </button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Link
                    to="/rpg"
                    className="flex items-center gap-2 px-6 sm:px-8 py-3 border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary font-label font-bold uppercase tracking-wider text-sm rounded-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Gamepad2 size={18} />
                    {t('portfolio.hero.cta.rpg')}
                  </Link>
                </Magnetic>
              </div>
            </motion.div>

            <motion.div variants={heroItem} className="mt-6">
              <Magnetic strength={0.15}>
                <a href={cvPdf} target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                  <Download size={16} />
                  {t('portfolio.hero.cta.cv')}
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronRight className="text-primary animate-bounce rotate-90" size={28} />
        </motion.div>
      </section>

      {/* ============ ABOUT & ENGINEERING MINDSET ============ */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionHeading kicker={t('portfolio.about.kicker')} title={t('portfolio.about.title')} />
          </Reveal>
          <Reveal>
            <p className="text-center text-primary font-mono text-sm sm:text-base max-w-2xl mx-auto mb-10">
              {t('portfolio.about.subtitle')}
            </p>
          </Reveal>

          {/* Bio text cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Reveal>
              <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 sm:p-8 h-full">
                <p className="text-sm sm:text-base text-on-surface-variant font-body leading-relaxed">
                  {t('portfolio.about.p1')}
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 sm:p-8 h-full">
                <p className="text-sm sm:text-base text-on-surface-variant font-body leading-relaxed">
                  {t('portfolio.about.p2')}
                </p>
              </div>
            </Reveal>
          </div>

          {/* 3 Engineering Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Reveal delay={0.1}>
              <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary">
                  <Target size={22} />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-2">{t('portfolio.about.pillar1.title')}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{t('portfolio.about.pillar1.desc')}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded bg-secondary/10 border border-secondary/30 flex items-center justify-center mb-4 text-secondary">
                  <Layers size={22} />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-2">{t('portfolio.about.pillar2.title')}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{t('portfolio.about.pillar2.desc')}</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded bg-primary-container/10 border border-primary-container/30 flex items-center justify-center mb-4 text-primary-container">
                  <Sparkles size={22} />
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-2">{t('portfolio.about.pillar3.title')}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{t('portfolio.about.pillar3.desc')}</p>
              </div>
            </Reveal>
          </div>

          {/* Stat counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCounter value={391} suffix="+" label={t('portfolio.stack.stat.hours')} />
            <StatCounter value={5} label={t('portfolio.stack.stat.projects')} delay={0.1} />
            <StatCounter value={100} suffix="+" label={t('portfolio.stack.stat.clients')} delay={0.2} />
          </div>
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
          <div className="flex flex-col gap-10" style={{ transformStyle: 'preserve-3d' }}>
            {PROJECTS.filter((p) => p.featured).map((p, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <div
                    className="bg-surface-container-low border border-outline-variant/25 rounded-2xl overflow-hidden hover:border-primary/60 transition-all shadow-md hover:shadow-2xl flex flex-col lg:grid lg:grid-cols-12 group relative"
                    style={{ borderColor: `${p.accent}55` }}
                  >
                    <span className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary font-label text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                      <Star size={12} />
                      {t('portfolio.featured')}
                    </span>

                    {/* Screenshot / GIF column */}
                    <div
                      className={`lg:col-span-7 flex flex-col justify-center bg-surface-container-lowest/30 border-b lg:border-b-0 ${
                        isEven ? 'lg:border-r' : 'lg:order-last lg:border-l'
                      } border-outline-variant/20 p-2 sm:p-4`}
                    >
                      <ProjectScreenshot
                        screenshot={p.screenshot}
                        gif={p.gif}
                        accent={p.accent}
                        status={p.status}
                        simulatedUrl={p.simulatedUrl}
                        onZoom={() => {
                          const media = p.gif || p.screenshot;
                          if (media) setLightboxUrl(`${BASE}${media}`);
                        }}
                      />
                    </div>

                    {/* Content details column */}
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        {(() => {
                          const pAccent = theme === 'dark'
                            ? p.accent
                            : (p.id === 'emotionshop' ? '#9c4168' : p.id === 'bank' ? '#0284c7' : '#b3541e');
                          return (
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-headline text-2xl font-bold" style={{ color: pAccent }}>
                                {t(p.nameKey)}
                              </h3>
                              <span
                                className={`font-label text-[10px] uppercase tracking-widest px-2.5 py-1 rounded font-bold ${
                                  p.status === 'completed'
                                    ? 'text-emerald-800 dark:text-green-400 bg-emerald-500/15 dark:bg-green-500/10 border border-emerald-600/30 dark:border-green-500/30'
                                    : 'text-amber-800 dark:text-secondary bg-amber-500/15 dark:bg-secondary/10 border border-amber-600/30'
                                }`}
                              >
                                {p.status === 'completed' ? t('portfolio.projects.liveBadge') : t('portfolio.projects.status.progress')}
                              </span>
                            </div>
                          );
                        })()}
                        <p className="text-sm sm:text-base text-on-surface-variant font-body leading-relaxed">
                          {t(p.descKey)}
                        </p>

                        {/* Technical Highlights / Engineering Challenges */}
                        {p.highlights && p.highlights.length > 0 && (
                          <div className="mt-4 p-3.5 bg-surface-container-highest/40 border border-outline-variant/20 rounded">
                            <p className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-2">
                              {t('portfolio.projects.challengesTitle')}
                            </p>
                            <ul className="space-y-1.5">
                              {p.highlights.map((hKey, hIdx) => (
                                <li
                                  key={hIdx}
                                  className="flex items-start gap-2 text-xs text-on-surface-variant font-body leading-relaxed"
                                >
                                  <span className="text-primary text-xs mt-0.5 shrink-0">▸</span>
                                  <span>{t(hKey)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[11px] px-2.5 py-0.5 bg-surface-container-highest text-on-surface/90 border border-outline-variant/30 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-outline-variant/15">
                        <p className="flex items-start gap-2 text-xs sm:text-sm text-on-surface-variant">
                          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                          <span>{t(p.metricKey)}</span>
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                          {p.live && (
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label text-xs font-bold uppercase tracking-widest pixel-shadow cursor-pointer hover:brightness-110 transition-all"
                            >
                              <Rocket size={15} />
                              {t('portfolio.projects.live')}
                            </a>
                          )}
                          {p.repo && (
                            <a
                              href={p.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 border-2 border-primary/50 text-primary hover:bg-primary hover:text-on-primary font-label text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              <Github size={15} />
                              {t('portfolio.projects.code')}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10" style={{ transformStyle: 'preserve-3d' }}>
            {PROJECTS.filter((p) => !p.featured).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, ease: EASE, delay: (i % 2) * 0.1 }}
              >
                <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-lg flex flex-col h-full group">
                  <ProjectScreenshot
                    screenshot={p.screenshot}
                    gif={p.gif}
                    accent={p.accent}
                    status={p.status}
                    simulatedUrl={p.simulatedUrl}
                    onZoom={() => {
                      const media = p.gif || p.screenshot;
                      if (media) setLightboxUrl(`${BASE}${media}`);
                    }}
                  />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-headline text-xl font-bold" style={{ color: theme === 'dark' ? p.accent : '#b3541e' }}>
                        {t(p.nameKey)}
                      </h3>
                      <span
                        className={`font-label text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-bold ${
                          p.status === 'completed'
                            ? 'text-emerald-800 dark:text-primary bg-emerald-500/15 dark:bg-primary/10 border border-emerald-600/30 dark:border-primary/30'
                            : 'text-amber-800 dark:text-secondary bg-amber-500/15 dark:bg-secondary/10 border border-amber-600/30'
                        }`}
                      >
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

          {/* ===== FEATURED PROJECT ENGINEERING DEEP DIVE ===== */}
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

      {/* ============ TECHNICAL STACK ============ */}
      <section id="stack" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <SectionHeading kicker="// architecture" title={t('portfolio.stack.title')} />
          </Reveal>
          <Reveal>
            <p className="text-center text-on-surface-variant mb-12 max-w-2xl mx-auto">{t('portfolio.stack.subtitle')}</p>
          </Reveal>

          {/* 4 Engineering Quadrants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {TECH_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Reveal key={cat.titleKey} delay={i * 0.1}>
                  <div className="bg-surface-container-low border-2 border-outline-variant/20 pixel-corners p-6 sm:p-7 h-full flex flex-col hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded flex items-center justify-center border" style={{ backgroundColor: `${cat.accent}15`, borderColor: `${cat.accent}40`, color: cat.accent }}>
                        <Icon size={20} />
                      </div>
                      <h3 className="font-headline text-lg font-bold text-on-surface tracking-wide">{t(cat.titleKey)}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-1">
                      {cat.skills.map((skill) => {
                        const skillColor = skill.color || cat.accent;
                        return (
                          <motion.span
                            key={skill.name}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                            className={`group relative flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm border cursor-default select-none transition-all duration-200 ${
                              skill.highlight
                                ? 'bg-surface-container-highest/80 text-on-surface font-semibold border-primary/30'
                                : 'bg-surface-container-lowest/70 text-on-surface-variant border-outline-variant/20'
                            }`}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget;
                              el.style.borderColor = skillColor;
                              el.style.boxShadow = `0 0 14px ${skillColor}${theme === 'dark' ? '45' : '30'}`;
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget;
                              el.style.borderColor = '';
                              el.style.boxShadow = '';
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover:scale-150 shrink-0"
                              style={{ backgroundColor: skillColor }}
                            />
                            <span>{skill.name}</span>
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Soft skills */}
          <Reveal>
            <div className="flex flex-col items-center mb-8">
              <p className="font-pixel text-primary text-[10px] uppercase tracking-widest mb-4">{t('portfolio.stack.softskills')}</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
                {SOFT_SKILLS.map((s) => (
                  <span key={s} className="font-label text-xs uppercase tracking-widest text-on-surface-variant px-3 py-1 border border-primary/20 bg-surface-container-low">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Currently Exploring / Active Learning Focus Card */}
          <Reveal>
            <div className="p-6 bg-surface-container-low border-2 border-primary/40 pixel-corners max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles size={18} className="text-primary animate-pulse" />
                <h4 className="font-pixel text-xs text-primary uppercase tracking-widest">{t('portfolio.stack.exploring.title')}</h4>
              </div>
              <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {t('portfolio.stack.exploring.desc')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section id="experience" ref={experienceRef} className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <SectionHeading kicker="// timeline" title={t('portfolio.experience.title')} />
          </Reveal>
          <div className="relative pl-8 ml-4 space-y-12">
            {/* Base circuit rail */}
            <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-outline-variant/25 rounded-full" />

            {/* Dynamic Energy Circuit Beam */}
            <motion.div
              style={{ scaleY: timelineScaleY, originY: 0 }}
              className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-primary via-primary-container to-secondary shadow-[0_0_12px_rgba(255,145,0,0.6)]"
            />

            {/* Traveling energy circuit spark */}
            <motion.div
              style={{
                top: timelineSparkTop,
                opacity: timelineSparkOpacity,
              }}
              className="absolute -left-[4.5px] w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_#ff9100,0_0_24px_#ff9100] pointer-events-none"
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
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">{t('portfolio.exp.sales.desc1')}</p>
                <p className="text-on-surface-variant text-sm sm:text-base mt-2 leading-relaxed">{t('portfolio.exp.sales.desc2')}</p>
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
              { nameKey: 'portfolio.edu.pescar.name', orgKey: 'portfolio.edu.pescar.org', dateKey: 'portfolio.edu.pescar.date', descKey: 'portfolio.edu.pescar.desc', cert: 'pescar_nico.pdf' },
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
              {/* Quick Copy Email Card */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-5 bg-surface-container-low border-2 border-primary/30 pixel-corners hover:border-primary transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <span className="font-label text-[10px] uppercase tracking-widest text-primary block font-bold">
                      {copiedEmail ? t('portfolio.contact.copied') : t('portfolio.contact.copyEmail')}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-on-surface/90">nicoschernetzki@gmail.com</span>
                  </div>
                </div>
                {copiedEmail ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-primary/70 group-hover:text-primary" />}
              </button>

              <a href="https://www.linkedin.com/in/nicolas-schernetzki-518b28212/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-surface-container-low border-2 border-outline-variant/20 pixel-corners hover:border-primary/50 transition-colors group">
                <Linkedin className="text-primary" size={24} />
                <span className="font-label text-xs uppercase tracking-widest text-on-surface/80 group-hover:text-primary transition-colors">LinkedIn Profile</span>
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
      <footer className="py-12 border-t-2 border-outline-variant/20 bg-surface-container-lowest/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-on-surface-variant text-center sm:text-left">
            © {new Date().getFullYear()} Nicolas Schernetzki. {t('portfolio.footer')}
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

      {/* Modal: Mood Engineering Mermaid Architecture Diagram */}
      <Lightbox
        open={diagramOpen}
        onClose={() => setDiagramOpen(false)}
        caption={t('portfolio.mood.engineering.arch.title')}
      >
        <div className="p-4 sm:p-6 bg-surface-container-lowest max-w-4xl mx-auto overflow-x-auto">
          <Suspense fallback={<p className="font-mono text-xs text-on-surface-variant">Loading diagram…</p>}>
            <Mermaid chart={t('portfolio.mood.engineering.arch.mermaid')} />
          </Suspense>
        </div>
      </Lightbox>

      {/* Command Palette Modal (Ctrl+K / Cmd+K) */}
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onScrollTo={scrollTo}
        onCopyEmail={handleCopyEmail}
        cvPdf={cvPdf}
      />
    </div>
  );
}
