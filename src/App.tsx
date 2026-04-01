import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Backpack, 
  Wand2, 
  Swords, 
  BookOpen, 
  User, 
  Settings, 
  LogOut, 
  Flame, 
  Zap,
  Shield,
  History,
  Globe,
  Terminal,
  Database,
  Cpu,
  Layers,
  Code2,
  Coffee,
  Linkedin,
  Github,
  ChevronRight,
  CheckCircle2,
  School,
  BookMarked,
  X,
  ExternalLink,
  Hammer,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Screen = 'personaje' | 'habilidades' | 'misiones' | 'historia' | 'bestiario' | 'contacto' | 'proyectos' | 'estadisticas';

// --- Components ---

const Sidebar = ({ activeScreen, setScreen }: { activeScreen: Screen, setScreen: (s: Screen) => void }) => {
  const [showDragon, setShowDragon] = useState(false);
  const profileImg = "https://lh3.googleusercontent.com/aida/ADBb0ujoxFR9nWzFBZIpsZyAk9g9ceCgacFrRgml8IujafVhJAcjR4yMqohH3oBeXSXkfM68UJUmM2CiIhtwVuIyAk6vS8GBu5m-Pi_mM5mYkweZ8rsTClt9KmktGA0OtfR0ExT3LawmIW4BuYYNESDlGlly0cfF-gGWM_Wb45Ni7o0S0UfrzKwNLWFY5LbCO44JsMOBZx-x0VNgzgX1sm2vTV6llJuPMe81cGtI8S1PFCSr_UUmhbj7t42KIUGcctJAdx0nWSXI_8Xr_Q";
  const dragonImg = "/dragon.png";

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDragon(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'personaje', label: 'Personaje', icon: User },
    { id: 'habilidades', label: 'Árbol de Habilidades', icon: Layers },
    { id: 'misiones', label: 'Registro de Misiones', icon: Swords },
    { id: 'historia', label: 'Historia', icon: History },
    { id: 'bestiario', label: 'Bestiario', icon: BookOpen },
    { id: 'proyectos', label: 'Forja de Artefactos', icon: Hammer },
  ];

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-surface-container-lowest border-r border-outline-variant/15 flex flex-col pt-8 hidden lg:flex z-40">
      <div className="px-6 mb-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border-2 border-primary-container shadow-lg mb-4 overflow-hidden relative bg-surface-container-highest">
          <motion.img 
            src={profileImg} 
            animate={{ opacity: showDragon ? 0 : 1 }}
            transition={{ duration: 0.8 }}
            alt="Profile" 
            className="w-full h-full object-cover absolute inset-0"
            referrerPolicy="no-referrer"
          />
          <motion.img 
            src={dragonImg} 
            animate={{ opacity: showDragon ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            alt="Dragon" 
            className="w-full h-full object-cover absolute inset-0"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-1">Nicolas Schernetzki</p>
        <h3 className="font-headline text-on-surface font-bold text-lg">FullStack Hero</h3>
        <p className="font-label text-on-surface-variant text-xs uppercase tracking-widest">Level 30 Architect</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 font-label">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={`w-full flex items-center gap-4 px-4 py-3 transition-all duration-200 rounded-sm cursor-pointer ${
              activeScreen === item.id 
                ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                : 'text-on-surface/60 hover:bg-surface-container-highest hover:text-primary'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-outline-variant/10 space-y-3">
        <button 
          onClick={() => setScreen('estadisticas')}
          className="w-full py-3 border border-primary/40 text-primary font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <FileText size={16} />
          Hoja de Estadísticas
        </button>
        <button 
          onClick={() => setScreen('contacto')}
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-xs tracking-widest uppercase rounded-sm hover:shadow-[0_0_15px_rgba(255,145,0,0.4)] transition-all cursor-pointer"
        >
          Contactar Heroe
        </button>
      </div>
    </aside>
  );
};

const TopNav = ({ activeScreen, setScreen }: { activeScreen: Screen, setScreen: (s: Screen) => void }) => {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 h-20 bg-surface-container-lowest z-50 border-b border-outline-variant/15 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]">
      <div className="font-headline font-black text-primary-container drop-shadow-[0_2px_4px_rgba(255,145,0,0.5)] text-2xl tracking-tighter cursor-pointer" onClick={() => setScreen('personaje')}>
        ORDINAL DRAGON_STACK
      </div>
      
      <div className="hidden md:flex items-center gap-8 font-headline uppercase tracking-widest text-sm">
        {(['personaje', 'habilidades', 'misiones', 'historia', 'bestiario', 'proyectos'] as Screen[]).map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s)}
            className={`transition-colors duration-300 pb-1 cursor-pointer ${
              activeScreen === s 
                ? 'text-primary border-b-2 border-primary-container' 
                : 'text-on-surface opacity-70 hover:text-primary'
            }`}
          >
            {s === 'personaje' ? 'Inicio' : s === 'proyectos' ? 'Proyectos' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <a 
          href="https://www.linkedin.com/in/nicolas-schernetzki-518b28212/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-110"
          title="LinkedIn Profile"
        >
          <Linkedin size={22} />
        </a>
        <a 
          href="https://github.com/OrdinalDragon" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-on-surface/60 hover:text-primary transition-all hover:scale-110"
          title="GitHub Forge"
        >
          <Github size={22} />
        </a>
        <div className="w-10 h-10 rounded-sm border-2 border-outline-variant overflow-hidden ml-2">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujoxFR9nWzFBZIpsZyAk9g9ceCgacFrRgml8IujafVhJAcjR4yMqohH3oBeXSXkfM68UJUmM2CiIhtwVuIyAk6vS8GBu5m-Pi_mM5mYkweZ8rsTClt9KmktGA0OtfR0ExT3LawmIW4BuYYNESDlGlly0cfF-gGWM_Wb45Ni7o0S0UfrzKwNLWFY5LbCO44JsMOBZx-x0VNgzgX1sm2vTV6llJuPMe81cGtI8S1PFCSr_UUmhbj7t42KIUGcctJAdx0nWSXI_8Xr_Q" 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

const Bestiario = () => {
  const skills = [
    { name: 'React', class: 'UI_WEAVER', icon: Layers, desc: '"Sus hilos invisibles mantienen el estado de la materia en un flujo constante de reconciliación divina."', mastery: 70, rank: 'VETERAN' },
    { name: 'Next.js', class: 'GATE_MASTER', icon: Globe, desc: '"Abre caminos instantáneos entre el servidor y el cliente, eliminando las esperas con la magia del renderizado estático."', mastery: 60, rank: 'KNIGHT' },
    { name: 'JavaScript', class: 'DOM_SORCERER', icon: Wand2, desc: '"La lengua vernácula de la red. Sus conjuros asíncronos dan vida a la arquitectura inanimada."', mastery: 80, rank: 'EXPERT' },
    { name: 'TypeScript', class: 'TYPE_SENTINEL', icon: Shield, desc: '"Impone el orden sagrado sobre el caos del lenguaje, previniendo desastres antes de que ocurran."', mastery: 70, rank: 'VETERAN' },
    { name: 'C# / .NET', class: 'FORGE_ENG', icon: Cpu, desc: '"Robusto y metódico, construye las catedrales de lógica corporativa sobre las que descansa el imperio digital."', mastery: 75, rank: 'ELITE' },
    { name: 'Python', class: 'SERPENT_TAMER', icon: Terminal, desc: '"Susurrador de datos. Su elegancia esconde la fuerza necesaria para procesar océanos de información con una sola orden."', mastery: 55, rank: 'KNIGHT' },
    { name: 'Java', class: 'COFFEE_MAGE', icon: Coffee, desc: '"Escribe una vez, conjura en cualquier lugar. Un pilar antiguo de la magia de sistemas."', mastery: 50, rank: 'INITIATE' },
    { name: 'Tailwind CSS', class: 'STYLE_SMITH', icon: Wand2, desc: '"Teje armaduras visuales con hilos de utilidad, creando interfaces hermosas a la velocidad del pensamiento."', mastery: 50, rank: 'INITIATE' },
    { name: 'C++', class: 'SYS_SMITH', icon: Settings, desc: '"Forja la propia armadura del hardware. Solo los valientes se atreven a gestionar manualmente el alma de su memoria."', mastery: 70, rank: 'VETERAN' },
    { name: 'MongoDB', class: 'DOC_GUARDIAN', icon: Database, desc: '"Protector de lo desestructurado. Almacena pergaminos infinitos de JSON en las bóvedas sin esquemas del olvido."', mastery: 65, rank: 'VETERAN' },
    { name: 'MySQL', class: 'REL_LORD', icon: Database, desc: '"Mantiene el orden sagrado de las tablas. Sus claves foráneas son los contratos que unen el mundo conocido."', mastery: 65, rank: 'VETERAN' },
    { name: 'Git / GitHub', class: 'TIME_WEAVER', icon: History, desc: '"Controla las líneas temporales del código, permitiendo viajar al pasado y fusionar realidades alternativas."', mastery: 80, rank: 'EXPERT' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-20 text-center lg:text-left relative">
        <p className="font-label text-primary-container text-sm font-bold tracking-[0.3em] uppercase mb-2">Compendio de Sabiduría</p>
        <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface leading-none mb-6 uppercase">BESTIARIO TÉCNICO</h1>
        <div className="h-1 w-24 bg-primary-container mx-auto lg:mx-0"></div>
        <p className="max-w-2xl mt-8 text-on-surface-variant text-lg leading-relaxed font-light mx-auto lg:mx-0">
          En las profundidades del código, estas entidades gobiernan el flujo de la realidad digital. Cada una posee una esencia única, forjada en el fuego de la computación y la abstracción.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {skills.map((skill, i) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relic-card bg-surface-container-high p-8 flex flex-col gap-6 group hover:bg-surface-container-highest transition-colors duration-300"
          >
            <div className="flex justify-between items-start">
              <skill.icon className="text-secondary" size={40} />
              <span className="font-label text-[10px] text-outline tracking-tighter opacity-50 uppercase">CLASE: {skill.class}</span>
            </div>
            <div>
              <h2 className="font-headline text-2xl font-bold text-primary mb-1">{skill.name}</h2>
              <p className="font-label text-xs uppercase text-on-surface-variant tracking-widest mb-4">Especialista en Sistemas</p>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 italic">
                {skill.desc}
              </p>
            </div>
            <div className="mt-auto">
              <div className="flex justify-between text-[10px] font-label uppercase tracking-widest mb-2 text-on-surface">
                <span>Maestría: {skill.mastery}%</span>
                <span className="text-primary">{skill.rank}</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-lowest">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container shadow-[0_0_8px_rgba(255,145,0,0.5)]" style={{ width: `${skill.mastery}%` }}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

const Misiones = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  React.useEffect(() => {
    let currentUrl: string | null = null;
    if (selectedPdf) {
      const pdfPath = selectedPdf;
      console.log("Fetching PDF:", pdfPath);
      fetch(pdfPath)
        .then(res => {
          console.log("Fetch response status:", res.status);
          if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status} ${res.statusText}`);
          return res.blob();
        })
        .then(blob => {
          console.log("Blob created:", blob.type, blob.size);
          currentUrl = URL.createObjectURL(blob);
          setPdfBlobUrl(currentUrl);
        })
        .catch(err => {
          console.error("Error loading PDF:", err);
          // Fallback to direct link if blob fails
          setPdfBlobUrl(pdfPath);
        });
    } else {
      setPdfBlobUrl(null);
    }
    return () => {
      if (currentUrl) {
        console.log("Revoking URL:", currentUrl);
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [selectedPdf]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="h-[2px] w-12 bg-primary"></span>
          <span className="font-label text-sm uppercase tracking-[0.4em] text-on-surface-variant">Viajes en curso</span>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-none italic">
          Misiones Activas
        </h1>
        <p className="mt-4 text-on-surface-variant max-w-xl font-body text-lg leading-relaxed">
          Contempla las tareas grabadas en el libro eterno. Completa estos desafíos para ascender en las filas de la Gran Orden de Arquitectos.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-highest parchment-glow border-l-8 border-primary relative overflow-hidden group">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="font-label text-[10px] uppercase tracking-widest text-primary bg-on-primary-fixed-variant/20 px-3 py-1 mb-4 inline-block">ENTRENAMIENTO DE ÉLITE</span>
                <h2 className="font-headline text-3xl font-bold text-on-surface">Misión: Programación Full-Stack</h2>
                <p className="font-label text-sm text-on-surface-variant">(Fundación Pescar / Banco Nación)</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-headline text-2xl font-black text-primary">+1500 XP</span>
                <span className="font-label text-[10px] uppercase text-on-surface-variant">En Formación</span>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex justify-between items-end mb-2">
                <span className="font-label text-xs uppercase tracking-tighter text-on-surface">Progreso: Forjando el Conocimiento</span>
                <span className="font-mono text-sm text-primary">60%</span>
              </div>
              <div className="h-3 bg-surface-container-lowest border border-outline-variant/20 relative">
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary-container shadow-[0_0_10px_rgba(255,145,0,0.4)]" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-container-low p-4 border-l-2 border-outline-variant/30">
                <div className="font-label text-[10px] uppercase text-on-surface-variant mb-1">Sub-tarea</div>
                <div className="text-sm font-medium">Arquitectura Web</div>
              </div>
              <div className="bg-surface-container-low p-4 border-l-2 border-primary">
                <div className="font-label text-[10px] uppercase text-primary mb-1">Activa</div>
                <div className="text-sm font-medium">Lógica de Backend Avanzada</div>
              </div>
              <div className="bg-surface-container-low p-4 border-l-2 border-outline-variant/30">
                <div className="font-label text-[10px] uppercase text-on-surface-variant mb-1">Próxima</div>
                <div className="text-sm font-medium">Despliegue en la Nube</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-surface-container relative p-8 flex flex-col justify-between border-t-4 border-secondary overflow-hidden">
          <div>
            <h3 className="font-headline text-xl font-bold mb-6">Reservas de Maná</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-secondary-container/30 flex items-center justify-center">
                  <Zap className="text-secondary" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold mb-1">
                    <span>Enfoque Cognitivo</span>
                    <span>88%</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[88%]"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary-container/10 flex items-center justify-center">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold mb-1">
                    <span>Pergaminos Leídos</span>
                    <span>345+ hs</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-3 border border-secondary text-secondary font-label text-xs uppercase tracking-widest hover:bg-secondary/10 transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Zap size={14} /> Ver Árbol de Habilidades
          </button>
        </div>
      </div>

      <section className="mt-24">
        <h3 className="font-headline text-3xl font-bold mb-8">Crónicas Completadas</h3>
        <div className="space-y-0 border border-outline-variant/10">
          {[
            { title: 'Diplomatura en Programación .NET', meta: 'UTN.BA • 120 hs • 2024', pdf: 'net.pdf' },
            { title: 'Curso de Fundamentos de la Programación', meta: 'UTN.BA • 67 hs • 2023', pdf: 'fundamentos.pdf' },
            { title: 'Primeros pasos del desarrollo frontend', meta: 'Ticmas • Argentina Programa • 2023', pdf: 'ticmas.pdf' }
          ].map((cert, i) => (
            <div key={i} className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/10 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'}`}>
              <div className="flex items-center gap-6">
                <CheckCircle2 className="text-secondary-container" size={40} />
                <div>
                  <h4 className="font-bold text-lg text-on-surface">{cert.title}</h4>
                  <p className="text-on-surface-variant text-sm font-label uppercase">{cert.meta}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPdf(cert.pdf)}
                className="px-6 py-2 bg-surface-container-highest text-xs uppercase tracking-widest font-label hover:text-primary transition-colors cursor-pointer"
              >
                Revisar Pergamino
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPdf(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-full max-h-[90vh] bg-surface-container-highest border border-outline-variant shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container">
                <div className="flex items-center gap-4">
                  <h3 className="font-headline text-lg font-bold uppercase tracking-widest text-primary">Visualizando Pergamino</h3>
                  <a 
                    href={selectedPdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] uppercase tracking-widest font-label text-primary hover:bg-primary/20 transition-all"
                  >
                    <ExternalLink size={12} /> Abrir en pestaña nueva
                  </a>
                </div>
                <button 
                  onClick={() => setSelectedPdf(null)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 bg-white relative overflow-hidden">
                {pdfBlobUrl ? (
                  <object 
                    key={pdfBlobUrl}
                    data={pdfBlobUrl} 
                    type="application/pdf"
                    className="w-full h-full border-none"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                      <p className="text-on-surface-variant mb-4">Tu navegador no puede mostrar este pergamino directamente.</p>
                      <a 
                        href={pdfBlobUrl} 
                        download={selectedPdf || 'certificado.pdf'}
                        className="px-6 py-2 bg-primary text-on-primary font-label uppercase tracking-widest hover:bg-primary/80 transition-all"
                      >
                        Descargar Pergamino
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-on-surface-variant font-label uppercase tracking-widest animate-pulse">Cargando Pergamino...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Historia = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
      <header className="text-center mb-16 max-w-2xl">
        <span className="text-secondary font-label text-xs uppercase tracking-[0.3em] block mb-2">Los Registros del Cronista</span>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tight leading-none mb-6 uppercase">EL ASCENSO DEL ARCHIMAGO</h1>
        <div className="h-1 w-24 bg-primary mx-auto mb-6"></div>
        <p className="text-on-surface-variant font-body text-lg italic opacity-80">"De la alquimia de los electrones al dominio absoluto del tejido digital."</p>
      </header>

      <div className="relative w-full max-w-6xl aspect-[16/10] bg-surface-container-high rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex border border-outline-variant/20">
        <div className="flex-1 bg-surface-container-low p-12 md:p-20 relative overflow-y-auto scrollbar-hide book-spine border-r border-black/40">
          <div className="absolute top-8 left-8 opacity-20 pointer-events-none">
            <History className="text-primary" size={120} />
          </div>
          <h2 className="font-headline text-3xl text-primary mb-8 border-b border-outline-variant/20 pb-4">Capítulo I: La Era de los Rayos</h2>
          <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg font-body">
            <p><span className="text-5xl font-headline text-primary-container mr-3 float-left">E</span>n un eón anterior, Nicolás Schernetzki recorría los caminos como un Vendedor Viajante de Materiales Eléctricos. Era un maestro de la persuasión, gestionando una cartera de más de 100 clientes y logrando un crecimiento del 25%. Sin embargo, en el fondo, ya canalizaba chispas de magia digital: automatizaba campañas de mailing masivo y mantenía intrincados catálogos de productos para optimizar las ventas del reino.</p>
            <p>Aunque dominaba el comercio de cables y luces físicas, su mente buscaba las corrientes más profundas de la lógica pura. El cambio era inminente; las runas de la electricidad física pronto serían reemplazadas por las líneas de código ancestral.</p>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-error/20 blur-md rounded-full scale-125"></div>
              <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center shadow-inner border border-error/30 relative">
                <Zap className="text-on-error" size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-surface-container-low p-12 md:p-20 relative overflow-y-auto scrollbar-hide">
          <div className="absolute bottom-8 right-8 opacity-20 pointer-events-none">
            <Wand2 className="text-secondary" size={120} />
          </div>
          <h2 className="font-headline text-3xl text-secondary mb-8 border-b border-outline-variant/20 pb-4">Capítulo II: La Forja del Archimago</h2>
          <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg font-body">
            <p>La verdadera transmutación comenzó en las salas de la UTN.BA, donde se convirtió en Experto Universitario en Programación .NET. Fue allí donde forjó sus primeros artefactos back-end, dominando C# y los principios de la Programación Orientada a Objetos. Pero la ambición de un mago no conoce límites.</p>
            <p>A través de la Fundación Pescar, Fundación Desarrollar y el Banco Nación, Nicolás se sumergió en más de 345 horas de formación intensiva. No caminó solo; lideró y colaboró en múltiples proyectos en equipos mixtos, integrando JavaScript, Python, Java y bases de datos como MongoDB y MySQL para crear soluciones web de punta a punta.</p>
            <p>Hoy, con un dominio de Inglés C1+, se encuentra preparado para tejer productos digitales innovadores en cualquier rincón del mundo digital.</p>
          </div>
          <div className="absolute bottom-10 right-10 rotate-12 opacity-40 hover:opacity-100 transition-opacity">
            <Terminal className="text-primary" size={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Habilidades = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const paths = [
    {
      name: 'Senda del Front-end',
      color: 'text-primary',
      borderColor: 'border-primary',
      glow: 'shadow-[0_0_20px_rgba(255,145,0,0.4)]',
      skills: [
        { id: 'js', name: 'JavaScript', icon: Wand2, level: 5, max: 5, status: 'mastered' },
        { id: 'react', name: 'React.js', icon: Layers, level: 4, max: 5, status: 'active' },
        { id: 'next', name: 'Next.js', icon: Globe, level: 3, max: 5, status: 'active' },
        { id: 'tailwind', name: 'Tailwind', icon: Shield, level: 5, max: 5, status: 'mastered' },
      ]
    },
    {
      name: 'Senda del Back-end',
      color: 'text-secondary',
      borderColor: 'border-secondary',
      glow: 'shadow-[0_0_20px_rgba(249,171,255,0.4)]',
      skills: [
        { id: 'dotnet', name: '.NET / C#', icon: Cpu, level: 4, max: 5, status: 'active' },
        { id: 'sql', name: 'SQL Server', icon: Database, level: 3, max: 5, status: 'active' },
        { id: 'mongo', name: 'MongoDB', icon: Database, level: 2, max: 5, status: 'active' },
        { id: 'python', name: 'Python', icon: Terminal, level: 3, max: 5, status: 'active' },
      ]
    },
    {
      name: 'Magia de Herramientas',
      color: 'text-primary-container',
      borderColor: 'border-primary-container',
      glow: 'shadow-[0_0_20px_rgba(255,145,0,0.3)]',
      skills: [
        { id: 'git', name: 'Git / GitHub', icon: History, level: 4, max: 5, status: 'active' },
        { id: 'docker', name: 'Docker', icon: Layers, level: 1, max: 5, status: 'locked' },
        { id: 'cloud', name: 'Cloud Ops', icon: Globe, level: 0, max: 5, status: 'locked' },
        { id: 'testing', name: 'Unit Testing', icon: CheckCircle2, level: 2, max: 5, status: 'active' },
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-screen">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <span className="font-label text-sm uppercase tracking-[0.3em] text-primary block mb-2">Senda de Maestría Técnica</span>
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-on-surface">Árbol de Habilidades</h1>
        </div>
        <div className="bg-surface-container-high p-4 border border-outline-variant/20 flex gap-8">
          <div className="text-center">
            <p className="font-label text-[10px] uppercase text-on-surface-variant">Puntos Disponibles</p>
            <p className="font-headline text-2xl text-primary">∞</p>
          </div>
          <div className="text-center">
            <p className="font-label text-[10px] uppercase text-on-surface-variant">Nivel de Clase</p>
            <p className="font-headline text-2xl text-secondary">30</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left Panel: Attributes */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-surface-container-low p-6 border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <User size={80} />
            </div>
            <h3 className="font-headline text-xl font-bold mb-6 uppercase tracking-widest border-b border-outline-variant/20 pb-2">Atributos</h3>
            <div className="space-y-6">
              {[
                { label: 'Fuerza (Backend)', val: 18, color: 'bg-error' },
                { label: 'Agilidad (Frontend)', val: 22, color: 'bg-primary' },
                { label: 'Intelecto (Lógica)', val: 25, color: 'bg-secondary' },
                { label: 'Suerte (Debugging)', val: 12, color: 'bg-primary-container' },
              ].map((attr) => (
                <div key={attr.label} className="space-y-2">
                  <div className="flex justify-between font-label text-[10px] uppercase tracking-tighter">
                    <span>{attr.label}</span>
                    <span>{attr.val}</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className={`${attr.color} h-full`} style={{ width: `${(attr.val / 30) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary/5 p-6 border border-primary/20">
            <h4 className="font-headline text-sm font-bold text-primary mb-2 uppercase">Bonus de Clase: Archimago</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              +15% de velocidad en renderizado de componentes. <br/>
              -20% de consumo de memoria en procesos asíncronos.
            </p>
          </section>
        </div>

        {/* Main Tree Area */}
        <div className="lg:col-span-3 bg-surface-container-lowest/50 p-8 md:p-12 border border-outline-variant/10 relative overflow-hidden rounded-xl">
          {/* SVG Connection Lines (Conceptual representation) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-p" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-primary-container)" />
              </linearGradient>
            </defs>
            {/* Front-end lines */}
            <path d="M 150 150 L 150 550" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
            {/* Back-end lines */}
            <path d="M 450 150 L 450 550" stroke="currentColor" strokeWidth="2" fill="none" className="text-secondary" />
            {/* Tools lines */}
            <path d="M 750 150 L 750 550" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary-container" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {paths.map((path) => (
              <div key={path.name} className="flex flex-col items-center gap-16">
                <h3 className={`font-headline text-sm font-bold uppercase tracking-[0.2em] ${path.color} text-center`}>
                  {path.name}
                </h3>
                
                <div className="flex flex-col gap-12 w-full items-center">
                  {path.skills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.05 }}
                      onMouseEnter={() => setSelectedSkill(skill.id)}
                      onMouseLeave={() => setSelectedSkill(null)}
                      className={`relative w-20 h-20 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        skill.status === 'locked' ? 'opacity-30 grayscale' : 'opacity-100'
                      } ${selectedSkill === skill.id ? 'z-[100]' : 'z-10'}`}
                    >
                      {/* Node Background */}
                      <div className={`absolute inset-0 bg-surface-container-high border-2 ${path.borderColor} rotate-45 ${skill.status !== 'locked' ? path.glow : ''}`}></div>
                      
                      {/* Icon */}
                      <div className="relative z-10">
                        <skill.icon className={path.color} size={32} />
                      </div>

                      {/* Level Indicator */}
                      <div className="absolute -bottom-2 -right-2 z-20 bg-surface-container-lowest border border-outline-variant px-1.5 py-0.5 font-mono text-[10px] font-bold">
                        {skill.level}/{skill.max}
                      </div>

                      {/* Tooltip (Smart Positioning) */}
                      <AnimatePresence>
                        {selectedSkill === skill.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: index > 1 ? 10 : -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`absolute ${index > 1 ? 'bottom-full mb-6' : 'top-full mt-6'} left-1/2 -translate-x-1/2 w-48 bg-surface-container-highest p-4 z-[110] border border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-left backdrop-blur-md pointer-events-none`}
                          >
                            {/* Arrow */}
                            <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-surface-container-highest border-l border-t border-primary/30 rotate-45 ${index > 1 ? 'top-full -mt-1.5' : 'bottom-full -mb-1.5 rotate-[225deg]'}`}></div>
                            
                            <p className="font-bold text-xs text-primary mb-1 uppercase tracking-wider">{skill.name}</p>
                            <p className="text-[10px] text-on-surface-variant leading-relaxed">
                              {skill.status === 'mastered' ? 'Habilidad dominada al máximo nivel. El Heroe ha alcanzado la perfección en esta disciplina.' : 
                               skill.status === 'locked' ? 'Esta técnica está sellada. Requiere nivel 40 y completar la misión "El Despertar del Código".' : 
                               'Entrenamiento en progreso. La maestría fluye a través de la práctica constante.'}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <footer className="mt-12 flex justify-center gap-8 font-label text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rotate-45"></div>
          <span>Dominado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-primary rotate-45"></div>
          <span>En Progreso</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-surface-container-highest rotate-45 opacity-30"></div>
          <span>Bloqueado</span>
        </div>
      </footer>
    </div>
  );
};

const Personaje = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 dragon-texture min-h-screen flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl w-full">
        <span className="font-label text-primary uppercase tracking-[0.4em] mb-6 block text-sm">Búsqueda del Aspirante Fullstack</span>
        <h1 className="font-headline text-5xl md:text-8xl font-bold text-on-background mb-12 drop-shadow-2xl leading-tight uppercase">EL DESPERTAR DEL <br/> <span className="text-primary-container">PROGRAMADOR</span></h1>
        
        <div className="mx-auto max-w-lg bg-surface-container-lowest border-l-4 border-primary p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left relative overflow-hidden">
          <div className="flex gap-6 items-start mb-8">
            <div className="w-24 h-24 bg-surface-container-highest flex-shrink-0 relative">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0ujoxFR9nWzFBZIpsZyAk9g9ceCgacFrRgml8IujafVhJAcjR4yMqohH3oBeXSXkfM68UJUmM2CiIhtwVuIyAk6vS8GBu5m-Pi_mM5mYkweZ8rsTClt9KmktGA0OtfR0ExT3LawmIW4BuYYNESDlGlly0cfF-gGWM_Wb45Ni7o0S0UfrzKwNLWFY5LbCO44JsMOBZx-x0VNgzgX1sm2vTV6llJuPMe81cGtI8S1PFCSr_UUmhbj7t42KIUGcctJAdx0nWSXI_8Xr_Q" 
                alt="Perfil" 
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary px-2 py-1 font-mono text-xs font-bold">NIVEL 30</div>
            </div>
            <div className="flex-1">
              <h3 className="font-headline text-2xl text-on-surface mb-1 uppercase tracking-wider">NICOLÁS SCHERNETZKI</h3>
              <p className="font-label text-secondary text-xs uppercase tracking-widest mb-4">Maestro de los Reinos Fullstack</p>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
                  <span>EXPERIENCIA</span>
                  <span>89%</span>
                </div>
                <div className="h-1 bg-surface-container-high w-full">
                  <div className="h-full bg-secondary shadow-[0_0_10px_#f9abff]" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-on-surface-variant uppercase flex items-center gap-2">
                  <Flame size={14} className="text-primary" /> VITALIDAD
                </span>
                <span className="font-mono text-sm text-primary">1000 / 1000</span>
              </div>
              <div className="h-4 bg-surface-container-highest border border-outline-variant/15 p-0.5">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-on-surface-variant uppercase flex items-center gap-2">
                  <Zap size={14} className="text-secondary" /> MANÁ
                </span>
                <span className="font-mono text-sm text-secondary">420 / 500</span>
              </div>
              <div className="h-4 bg-surface-container-highest border border-outline-variant/15 p-0.5">
                <div className="h-full bg-gradient-to-r from-secondary to-secondary-container" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between gap-4">
            <div className="text-center p-3 bg-surface-container-low border border-outline-variant/10 flex-1">
              <p className="font-label text-[10px] text-on-surface-variant uppercase mb-1">Fuerza</p>
              <p className="font-headline text-lg text-primary">22</p>
            </div>
            <div className="text-center p-3 bg-surface-container-low border border-outline-variant/10 flex-1">
              <p className="font-label text-[10px] text-on-surface-variant uppercase mb-1">Agilidad</p>
              <p className="font-headline text-lg text-primary">20</p>
            </div>
            <div className="text-center p-3 bg-surface-container-low border border-outline-variant/10 flex-1">
              <p className="font-label text-[10px] text-on-surface-variant uppercase mb-1">Intelecto</p>
              <p className="font-headline text-lg text-primary">32</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <button 
            onClick={onStart}
            className="px-12 py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline text-xl font-bold tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,145,0,0.4)] cursor-pointer relative overflow-hidden group"
          >
            <span className="relative z-10">COMENZAR AVENTURA</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

const Contacto = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    const endpoint = formspreeId ? `https://formspree.io/f/${formspreeId}` : '/api/contact';

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
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto">
      <header className="mb-12 text-center">
        <span className="font-label text-primary uppercase tracking-[0.3em] mb-2 block text-xs">Canal de Comunicación</span>
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-on-surface uppercase italic">Enviar Mensaje</h1>
        <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
      </header>

      <div className="bg-surface-container-high p-8 md:p-12 border border-outline-variant/15 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Wand2 size={100} className="text-primary" />
        </div>

        {status === 'sent' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle2 className="text-primary mx-auto mb-6" size={64} />
            <h2 className="font-headline text-2xl font-bold mb-2">¡Mensaje Enviado!</h2>
            <p className="text-on-surface-variant font-body">Tu pergamino ha sido entregado al Heroe. Recibirás respuesta pronto.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 px-8 py-3 bg-surface-container-highest text-xs uppercase tracking-widest font-label hover:text-primary transition-colors cursor-pointer"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {status === 'error' && (
              <div className="p-4 bg-error/10 border border-error text-error text-sm font-label uppercase tracking-widest text-center">
                Error al enviar el pergamino. Intenta de nuevo.
              </div>
            )}
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Correo Electrónico</label>
              <input 
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@reino.com"
                className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 font-body text-on-surface focus:border-primary outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Asunto de la Búsqueda</label>
              <input 
                required
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Propuesta de Alianza / Consulta"
                className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 font-body text-on-surface focus:border-primary outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Contenido del Pergamino</label>
              <textarea 
                required
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe aquí tu mensaje..."
                className="w-full bg-surface-container-lowest border border-outline-variant/30 p-4 font-body text-on-surface focus:border-primary outline-none transition-colors resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(255,145,0,0.4)] transition-all disabled:opacity-50 cursor-pointer"
            >
              {status === 'sending' ? 'CANALIZANDO...' : 'ENVIAR PERGAMINO'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const Proyectos = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <header className="mb-16 text-center">
        <h2 className="font-headline text-5xl font-black text-primary italic uppercase tracking-widest mb-4">La Forja de Artefactos</h2>
        <div className="h-1 w-32 bg-primary mx-auto mb-6"></div>
        <p className="font-body text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
          Aquí es donde los fragmentos de código se funden con la creatividad para dar vida a herramientas legendarias.
        </p>
      </header>

      <div className="relative bg-surface-container-lowest border-2 border-dashed border-primary/30 p-12 md:p-20 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        
        <motion.div 
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 text-primary/40"
        >
          <Hammer size={120} strokeWidth={1} />
        </motion.div>

        <h3 className="font-headline text-3xl font-bold text-on-surface mb-4 uppercase tracking-widest">Forja en Mantenimiento</h3>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
          <p className="font-label text-primary text-sm uppercase tracking-widest">Martillos golpeando el yunque...</p>
        </div>

        <p className="font-body text-on-surface-variant max-w-md mb-10 leading-relaxed italic">
          "Los enanos del código están transcribiendo las runas de nuevos proyectos. Vuelve cuando el fuego de la creación haya templado el acero digital."
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {[
            { label: 'Planos de Diseño', status: 'En Pergamino' },
            { label: 'Estructura de Datos', status: 'Fundiendo' },
            { label: 'Magia de Interfaz', status: 'Encantando' }
          ].map((item, i) => (
            <div key={i} className="bg-surface-container-highest/50 p-4 border border-outline-variant/10 rounded-sm">
              <p className="font-label text-[10px] text-on-surface-variant uppercase mb-1">{item.label}</p>
              <p className="font-headline text-primary font-bold text-sm uppercase">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Estadisticas = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <header className="mb-12 text-center">
        <h2 className="font-headline text-5xl font-black text-primary italic uppercase tracking-widest mb-4">Hoja de Estadísticas</h2>
        <p className="font-label text-on-surface-variant text-xs uppercase tracking-[0.3em]">Resumen de Atributos y Experiencia</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Core Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-sm shadow-lg">
            <h3 className="font-headline text-primary font-bold uppercase text-sm mb-6 border-b border-primary/20 pb-2">Atributos Base</h3>
            <div className="space-y-4">
              {[
                { label: 'Fuerza (Backend)', val: 88, color: 'bg-red-500' },
                { label: 'Agilidad (Frontend)', val: 82, color: 'bg-blue-500' },
                { label: 'Inteligencia (Lógica/POO)', val: 85, color: 'bg-purple-500' },
                { label: 'Carisma (Ventas/Soft Skills)', val: 92, color: 'bg-yellow-500' },
                { label: 'Destreza (Herramientas/Git)', val: 80, color: 'bg-green-500' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] uppercase font-label mb-1">
                    <span className="text-on-surface-variant">{stat.label}</span>
                    <span className="text-primary font-bold">{stat.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${stat.color}`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-sm shadow-lg">
            <h3 className="font-headline text-primary font-bold uppercase text-sm mb-4 border-b border-primary/20 pb-2">Idiomas</h3>
            <div className="space-y-2 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface">Español</span>
                <span className="text-primary italic">Nativo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface">Inglés</span>
                <span className="text-primary italic">C1+ Advanced</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-sm shadow-lg">
            <h3 className="font-headline text-primary font-bold uppercase text-sm mb-4 border-b border-primary/20 pb-2">Pergaminos de Poder</h3>
            <div className="space-y-3 font-body text-[11px] text-on-surface-variant leading-tight">
              <p>• Diplomatura Programación .NET (UTN.BA)</p>
              <p>• Fundamentos de Programación (UTN.BA)</p>
              <p>• Front-End (Ticmas / Arg. Programa)</p>
            </div>
          </div>
        </div>

        {/* Right Column: Experience & Education */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-sm shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FileText size={80} />
            </div>
            
            <h3 className="font-headline text-primary font-bold uppercase text-xl mb-8 flex items-center gap-3">
              <History size={24} />
              Crónicas de Experiencia
            </h3>

            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/20">
              {[
                { 
                  title: 'Comerciante Errante (Viajante Vendedor)', 
                  place: 'Múltiples Empresas de Materiales Eléctricos', 
                  date: '2016 - Actualidad',
                  desc: 'Automatización de campañas de mailing (100-500 contactos), creación de catálogos y gestión de cartera de más de 100 clientes con crecimiento del 25%.'
                },
                { 
                  title: 'Forjador de Artefactos Digitales', 
                  place: 'Proyectos Web Personales', 
                  date: '2024 - Actualidad',
                  desc: 'Desarrollo de aplicaciones full-stack utilizando JavaScript, HTML, CSS e integraciones back-end robustas.'
                }
              ].map((exp, i) => (
                <div key={i} className="pl-10 relative">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <h4 className="font-headline text-on-surface font-bold text-lg uppercase tracking-tight">{exp.title}</h4>
                  <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">{exp.place} | {exp.date}</p>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-sm shadow-lg">
            <h3 className="font-headline text-primary font-bold uppercase text-xl mb-8 flex items-center gap-3">
              <School size={24} />
              Academias de Magia
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-headline text-on-surface font-bold text-lg uppercase tracking-tight">Programación Full-Stack</h4>
                <p className="font-label text-primary text-[10px] uppercase tracking-widest">Fundación Pescar / Desarrollar / Banco Nación | 2026 - Actualidad</p>
                <p className="font-body text-xs text-on-surface-variant mt-1">Más de 345 hs de formación y 4+ proyectos grupales.</p>
              </div>
              <div className="pt-4 border-t border-outline-variant/10">
                <h4 className="font-headline text-on-surface font-bold text-lg uppercase tracking-tight">Experto Universitario en Programación .NET</h4>
                <p className="font-label text-primary text-[10px] uppercase tracking-widest">UTN.BA | 2023 - 2024</p>
                <p className="font-body text-xs text-on-surface-variant mt-1">Orientación en C# y principios de POO.</p>
              </div>
              <div className="pt-4 border-t border-outline-variant/10">
                <a 
                  href="/CV.pdf" 
                  download="CV_Nicolas_Schernetzki.pdf"
                  className="group flex flex-col gap-1 text-primary hover:text-primary-container transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-label text-xs uppercase tracking-widest">
                    <ExternalLink size={14} />
                    Descargar Pergamino Completo (PDF)
                  </div>
                  <p className="font-body text-[10px] text-on-surface-variant italic group-hover:text-primary-container transition-colors">Curriculum vitae</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('personaje');
  const [questAlert, setQuestAlert] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const startAdventure = () => {
    setQuestAlert("¡MISIÓN INICIADA: EXPLORAR EL PORTAFOLIO!");
    setScreen('habilidades');
    setTimeout(() => setQuestAlert(null), 4000);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary-container selection:text-on-primary overflow-x-hidden">
      <TopNav activeScreen={screen} setScreen={setScreen} />
      
      <AnimatePresence>
        {questAlert && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-primary text-on-primary px-6 py-3 font-headline font-bold tracking-[0.2em] shadow-[0_0_30px_rgba(255,145,0,0.6)] border-2 border-on-primary/20 flex items-center gap-3"
          >
            <Swords size={20} className="animate-pulse" />
            {questAlert}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex pt-20">
        <Sidebar activeScreen={screen} setScreen={setScreen} />
        
        <main className="flex-1 lg:ml-64 p-8 md:p-12 lg:p-20 mb-20 lg:mb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {screen === 'personaje' && <Personaje onStart={startAdventure} />}
              {screen === 'habilidades' && <Habilidades />}
              {screen === 'misiones' && <Misiones />}
              {screen === 'historia' && <Historia />}
              {screen === 'bestiario' && <Bestiario />}
              {screen === 'proyectos' && <Proyectos />}
              {screen === 'estadisticas' && <Estadisticas />}
              {screen === 'contacto' && <Contacto />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-surface-container-lowest border-t border-outline-variant/15 flex items-center justify-around z-50 backdrop-blur-md bg-opacity-90">
        <button onClick={() => setScreen('personaje')} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'personaje' ? 'text-primary' : 'text-on-surface/40'}`}>
          <User size={20} />
          <span className="text-[10px] uppercase font-label">Inicio</span>
        </button>
        <button onClick={() => setScreen('habilidades')} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'habilidades' ? 'text-primary' : 'text-on-surface/40'}`}>
          <Layers size={20} />
          <span className="text-[10px] uppercase font-label">Skills</span>
        </button>
        <button onClick={() => setScreen('misiones')} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'misiones' ? 'text-primary' : 'text-on-surface/40'}`}>
          <Swords size={20} />
          <span className="text-[10px] uppercase font-label">Logs</span>
        </button>
        <button onClick={() => setScreen('historia')} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'historia' ? 'text-primary' : 'text-on-surface/40'}`}>
          <History size={20} />
          <span className="text-[10px] uppercase font-label">Mapa</span>
        </button>
        <button onClick={() => setScreen('bestiario')} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'bestiario' ? 'text-primary' : 'text-on-surface/40'}`}>
          <BookOpen size={20} />
          <span className="text-[10px] uppercase font-label">Bestias</span>
        </button>
        <button onClick={() => setScreen('proyectos')} className={`flex flex-col items-center gap-1 cursor-pointer ${screen === 'proyectos' ? 'text-primary' : 'text-on-surface/40'}`}>
          <Hammer size={20} />
          <span className="text-[10px] uppercase font-label">Forja</span>
        </button>
      </nav>

      <footer className="w-full py-8 px-12 flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-outline-variant/15 font-body text-xs tracking-tighter mt-20">
        <div className="text-primary-container font-bold mb-4 md:mb-0">
          ORDINAL DRAGON_STACK
        </div>
        <div className="text-on-surface/40 text-center mb-4 md:mb-0">
          © 2026 The Obsidian Relic. Forged in Code.
        </div>
        <div className="flex gap-6">
          <button 
            onClick={() => setActiveModal('privacy')}
            className="text-on-surface/40 hover:text-primary transition-colors cursor-pointer"
          >
            Privacy Scroll
          </button>
          <button 
            onClick={() => setActiveModal('terms')}
            className="text-on-surface/40 hover:text-primary transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </footer>

      {/* RPG Themed Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface-container-lowest border-2 border-primary p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-[0_0_50px_rgba(255,145,0,0.3)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-on-surface/40 hover:text-primary cursor-pointer"
              >
                <X size={24} />
              </button>

              {activeModal === 'privacy' ? (
                <div className="space-y-6">
                  <header className="border-b border-primary/20 pb-4">
                    <h2 className="font-headline text-3xl font-bold text-primary italic uppercase tracking-widest">El Pergamino de Privacidad</h2>
                    <p className="font-label text-[10px] text-on-surface-variant uppercase mt-2">Sellado por el Guardián del Código</p>
                  </header>
                  <div className="font-body text-sm text-on-surface-variant leading-relaxed space-y-4">
                    <p>
                      En los Reinos de Ordinal Dragon Stack, la protección de tu esencia digital es nuestra ley suprema. No recolectamos almas, solo datos mínimos para forjar una mejor experiencia.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-bold text-on-surface uppercase text-xs">I. Recolección de Esencia</h4>
                      <p>Solo almacenamos los fragmentos de información que tú decides compartir voluntariamente a través de nuestros portales de contacto.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-on-surface uppercase text-xs">II. El Velo de Seguridad</h4>
                      <p>Tus datos están protegidos por hechizos de cifrado de alto nivel. Ninguna entidad maliciosa o dragón oscuro tendrá acceso a tu información sin tu consentimiento expreso.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-on-surface uppercase text-xs">III. Tu Derecho al Olvido</h4>
                      <p>En cualquier momento, puedes solicitar que tu rastro sea borrado de nuestras crónicas. Solo tienes que enviar un cuervo mensajero (o un correo electrónico).</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <header className="border-b border-primary/20 pb-4">
                    <h2 className="font-headline text-3xl font-bold text-primary italic uppercase tracking-widest">Pacto de Servicio</h2>
                    <p className="font-label text-[10px] text-on-surface-variant uppercase mt-2">Leyes de la Ciudadela de Código</p>
                  </header>
                  <div className="font-body text-sm text-on-surface-variant leading-relaxed space-y-4">
                    <p>
                      Al cruzar las puertas de este portafolio, aceptas los siguientes términos de convivencia en nuestra comunidad de aventureros.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-bold text-on-surface uppercase text-xs">I. Uso de la Magia</h4>
                      <p>El código y diseño aquí presentes son propiedad intelectual del Gran Maestro Nicolás. Puedes admirarlos, pero no reclamarlos como propios sin el debido tributo.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-on-surface uppercase text-xs">II. Conducta del Aventurero</h4>
                      <p>Se prohíbe el uso de hechizos oscuros (hacking), ataques de denegación de servicio o cualquier acto que perturbe la paz de la Ciudadela.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-on-surface uppercase text-xs">III. Limitación de Responsabilidad</h4>
                      <p>El Gran Maestro no se hace responsable por misiones fallidas, bugs inesperados o pérdida de maná resultante del uso de las herramientas aquí mostradas.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-primary/10 text-center">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-8 py-2 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
                >
                  He leído el Pacto
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
