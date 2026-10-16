import React, { useState, useEffect } from 'react';
import {
  History, Wand2, Zap, Terminal, Sparkles, BookOpen, Rocket, Award, Shield,
  ChevronLeft, ChevronRight, Globe, CheckCircle2, Cpu, Scroll, Feather, Compass,
  Sword, Skull, Flame, FileText, Check, ExternalLink, Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { sfx } from '../utils/sfx';
import { rpgState } from '../utils/rpgState';

interface Epoch {
  year: string;
  title: string;
  tag: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
  chapterIndex: number;
}

interface ChapterDetail {
  id: number;
  roman: string;
  epochYear: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  quote: string;
  loreParagraphs: string[];
  archmageDiary: {
    entryDate: string;
    note: string;
  };
  bossEncounter: {
    bossName: string;
    threatDesc: string;
    battleStrategy: string;
    legendaryLoot: string;
  };
  statsSheet: {
    artifact: string;
    ability: string;
    rank: string;
    xpGained: string;
    realm: string;
    keyQuest: string;
  };
}

export default function Historia() {
  const { t } = useLanguage();
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'cronica' | 'diario' | 'desafio' | 'ficha'>('cronica');

  useEffect(() => {
    // Unlock lore_master achievement upon opening the chronicle
    rpgState.unlockAchievement('lore_master');
  }, []);

  const EPOCHS: Epoch[] = [
    {
      year: '2016',
      title: 'El Génesis de los Electrones',
      tag: 'VBA & Ventas B2B',
      icon: Zap,
      desc: 'Dominio del comercio eléctrico y creación de las primeras macros de automatización en Excel para 100+ clientes B2B.',
      chapterIndex: 0,
    },
    {
      year: '2023',
      title: 'La Academia UTN & Pescar',
      tag: '.NET & Stack MERN',
      icon: Shield,
      desc: 'Formación universitaria en C#/.NET 8 y 345+ horas de entrenamiento intensivo MERN en Fundación Pescar.',
      chapterIndex: 1,
    },
    {
      year: '2024',
      title: 'El Reino Productivo',
      tag: 'FastAPI, IA & AWS',
      icon: Rocket,
      desc: 'Mood App en vivo con IA Gemini, EmotionShop desplegado en AWS, contenedores Docker y CI/CD continuo.',
      chapterIndex: 2,
    },
    {
      year: '2025',
      title: 'Las Tierras Globales',
      tag: 'Inglés C1+ & Cloud',
      icon: Globe,
      desc: 'Dominio fluido del idioma universal, comunicación intercultural y arquitectura de software sin fronteras.',
      chapterIndex: 3,
    },
    {
      year: '2026',
      title: 'La Profecía del Código',
      tag: 'Horizonte & Nuevos Gremios',
      icon: Compass,
      desc: 'Disponibilidad inmediata para unirse a equipos de ingeniería de alto impacto y resolver desafíos de escala masiva.',
      chapterIndex: 4,
    },
  ];

  const CHAPTERS: ChapterDetail[] = [
    {
      id: 0,
      roman: 'Capítulo I',
      epochYear: '2016 - 2022',
      title: 'Capítulo I: La Era de los Rayos',
      subtitle: 'Comercio Técnico y los Primeros Hechizos de Automatización',
      badge: 'El Despertar',
      icon: Zap,
      quote: '"Antes de modelar el software, el mago debe comprender las necesidades de quienes habitan el reino."',
      loreParagraphs: [
        'En los albores de su travesía, mucho antes de conjurar APIs y compilar contenedores, Nicolás Schernetzki recorría los caminos como un emisario comercial en el sector de materiales eléctricos. Atendía una cartera viva de más de 100 empresas clientes, asesorando en soluciones energéticas complejas y logrando un crecimiento sostenido del 25% anual.',
        'Fue en ese campo de batalla real donde descubrió su vocación por la ingeniería: la necesidad de eliminar el caos de los procesos manuales. Observando cómo los comerciantes perdían incontables horas actualizando listas de precios y órdenes de compra, Nicolás tomó por primera vez la pluma del programador y forjó herramientas a medida en Excel utilizando macros VBA.',
        'Aquel script inicial no solo optimizó el flujo de miles de transacciones y campañas de correo segmentadas a más de 500 contactos: encendió la chispa que lo llevaría a comprender que el código es la forma más pura de crear orden, eficiencia y valor tangible.',
        'La transición no fue repentina, sino orgánica: dominar los principios de la electricidad física (voltaje, corriente, resistencia) sentó las bases para comprender la lógica de los circuitos lógicos y las estructuras de datos. Cada venta cerrada era un ejercicio de escucha activa; cada macro escrita, una lección de automatización pragmática.',
      ],
      archmageDiary: {
        entryDate: 'Ciclo Comercial · Entrada #214',
        note: 'Hoy logré que una macro en VBA generara presupuestos dinámicos calculando fletes, descuentos escalonados y stock de tres depósitos en 3 segundos. Los vendedores veteranos creyeron que era magia oscura. Para mí, fue darme cuenta de que el mundo está lleno de fricción innecesaria, y que un verdadero programador es aquel que disuelve esa fricción con elegancia y empatía.',
      },
      bossEncounter: {
        bossName: 'La Hidra de las Planillas Desincronizadas (Error #REF! & Duplicados)',
        threatDesc: 'Centenares de catálogos desactualizados que generaban pérdidas económicas y desorden logístico en múltiples sucursales.',
        battleStrategy: 'Normalización de datos en Excel, algoritmos en VBA con validación defensiva de tipos y disparadores automáticos de eventos.',
        legendaryLoot: 'Visión comercial B2B, empatía con usuarios no técnicos y la certeza de que el software debe resolver problemas reales.',
      },
      statsSheet: {
        artifact: 'Pergamino de Automatización VBA & Listas de Precios',
        ability: 'Visión de Negocio & Empatía con el Usuario (+30 Carisma)',
        rank: 'Iniciado del Código / Asesor Técnico B2B',
        xpGained: '+1,200 XP',
        realm: 'Tierras del Comercio Eléctrico',
        keyQuest: 'Expansión de cartera comercial en +25% y estandarización de 3 catálogos',
      },
    },
    {
      id: 1,
      roman: 'Capítulo II',
      epochYear: '2023 - 2024',
      title: 'Capítulo II: La Forja del Archimago',
      subtitle: 'La Academia UTN.BA y la Inmersión MERN en Fundación Pescar',
      badge: 'La Maestría Técnica',
      icon: Wand2,
      quote: '"La verdadera maestría nace de la comunión entre el rigor del backend y la magia visual del frontend."',
      loreParagraphs: [
        'Con la convicción de convertir su instinto en maestría formal, Nicolás ingresó a las aulas de la prestigiosa Universidad Tecnológica Nacional (UTN.BA). Allí se sometió a las rigurosas disciplinas de la Programación Orientada a Objetos, LINQ, Entity Framework Core y el ecosistema C# 12 / .NET 8. Como prueba de graduación, concibió el "Simulador Bancario": un sistema integral con interfaz de escritorio Windows Forms, API REST en ASP.NET Core, persistencia relacional en MariaDB, autenticación JWT, hashing BCrypt y suites de tests unitarios con xUnit y Moq, todo aislado en contenedores Docker.',
        'Pero el hambre de un arquitecto no conoce fronteras. En paralelo, Nicolás fue seleccionado por la alianza entre Fundación Pescar, Fundación Desarrollar y el Banco Nación para cursar más de 345 horas de especialización intensiva en el Stack MERN (MongoDB, Express, React y Node.js).',
        'En este crisol, Nicolás no solo aprendió las técnicas más avanzadas del ciclo full-stack moderno, sino también la magia sagrada de los gremios ágiles: trabajó en equipos multidisciplinarios bajo la metodología Scrum, gestionando sprints, code reviews y ramas en Git, entregando con éxito 4 proyectos colaborativos que respondían a problemáticas reales de la sociedad.',
        'El resultado fue una dualidad técnica envidiable: la precisión quirúrgica del backend tipado en C# unida a la velocidad de prototipado y reactividad del stack JavaScript/TypeScript.',
      ],
      archmageDiary: {
        entryDate: 'Campamento Académico · Entrada #680',
        note: 'La Programación Orientada a Objetos no es una regla de sintaxis, es una forma de ordenar el universo. Cuando implementé el patrón Unit of Work y vi cómo mis tests unitarios con xUnit y Moq validaban cada escenario de transferencia bancaria sin tocar la base real, entendí que un buen software debe ser predecible, testeable y silencioso como la noche.',
      },
      bossEncounter: {
        bossName: 'El Basilisco del Spaghetti Code & Concurrencia Transaccional',
        threatDesc: 'Riesgo de condiciones de carrera bancarias, fugas de memoria por conexiones abiertas y deuda técnica acumulada.',
        battleStrategy: 'Patrón Repository, Dependency Injection nativa de .NET 8, encriptación BCrypt y aislamiento en contenedores Docker.',
        legendaryLoot: 'Título de Experto Universitario .NET (UTN.BA) y Pergamino de Honor MERN (Fundación Pescar).',
      },
      statsSheet: {
        artifact: 'Núcleo .NET 8 & Sello Sagrado MERN de Fundación Pescar',
        ability: 'Arquitectura Limpia & Metodología Scrum (+35 Inteligencia)',
        rank: 'Experto Universitario .NET & Archimago Full-Stack',
        xpGained: '+2,500 XP',
        realm: 'Santuario de la UTN.BA y Fundación Pescar',
        keyQuest: 'Simulador Bancario .NET y 4 Proyectos Grupales MERN en Scrum',
      },
    },
    {
      id: 2,
      roman: 'Capítulo III',
      epochYear: '2024 - 2026',
      title: 'Capítulo III: El Reino Productivo',
      subtitle: 'Arquitectura Cloud, Inteligencia Artificial y Microservicios en Vivo',
      badge: 'El Horizonte Eterno',
      icon: Rocket,
      quote: '"Un artefacto sólo demuestra su verdadero poder cuando resiste los embates de la producción en vivo."',
      loreParagraphs: [
        'Habiendo conquistado las bases teóricas y metodológicas, Nicolás avanzó hacia la frontera más desafiante: el despliegue en entornos productivos reales. Con la visión de unir arte interactivo e inteligencia artificial, forjó "Mood App", una plataforma integral que analiza el estado anímico del usuario y recomienda eventos en Buenos Aires utilizando la IA de Google Gemini. Su arquitectura combina un frontend reactivo en React 19 y Tailwind, un backend asíncrono con Python FastAPI y MongoDB, pipelines de scraping automático y contenedorización Docker con túneles Cloudflare.',
        'Sin detenerse, materializó "EmotionShop", una plataforma de comercio electrónico de grado industrial construida sobre el stack MERN con Redux Toolkit, almacenamiento multimedia en la nube de AWS S3, autenticación robusta mediante tokens JWT y un panel de administración con analíticas de ventas y métricas en tiempo real.',
        'Ambos artefactos se encuentran desplegados y operativos 24/7 en la red mundial, demostrando la capacidad de Nicolás para llevar un requerimiento desde la primera línea de código hasta una infraestructura resiliente, monitoreada y escalable.',
        'La producción no perdona el código perezoso: cada endpoint fue optimizado para tiempos de respuesta menores a 200ms, implementando compresión gzip, índices compuestos en MongoDB y políticas estrictas de CORS y seguridad de cabeceras.',
      ],
      archmageDiary: {
        entryDate: 'Sala de Máquinas de Producción · Entrada #1042',
        note: 'Ver a un usuario real interactuar con Mood App en su celular, pedirle a la IA de Gemini un plan para una noche lluviosa y recibir sugerencias geolocalizadas precisas mientras Docker balancea la carga en silencio... esa es la cumbre de este oficio. El software en vivo es un organismo que respira y debe ser cuidado con disciplina.',
      },
      bossEncounter: {
        bossName: 'El Leviatán de los 500 Internal Server & La Quimera del CORS',
        threatDesc: 'Desincronización de llamadas asíncronas, bloqueo por políticas de origen cruzado y caídas inesperadas de demonios en segundo plano.',
        battleStrategy: 'Túneles Cloudflare SSL, Nginx como proxy reverso, Docker Compose con reinicio automático y logging estructurado.',
        legendaryLoot: 'Dominio de producción en vivo 24/7 y maestría en integración de Modelos de Lenguaje (LLMs).',
      },
      statsSheet: {
        artifact: 'Matriz de Inteligencia Artificial Gemini & Bóveda AWS S3',
        ability: 'Despliegues en Vivo & Microservicios Docker (+40 Destreza)',
        rank: 'Arquitecto Cloud & Full-Stack Engineer',
        xpGained: '+3,000 XP',
        realm: 'Tierras de Producción en Vivo (AWS, Cloudflare & Docker)',
        keyQuest: 'Lanzamiento de Mood App y EmotionShop con usuarios reales',
      },
    },
    {
      id: 3,
      roman: 'Capítulo IV',
      epochYear: '2025 - 2026',
      title: 'Capítulo IV: Las Tierras Globales',
      subtitle: 'El Dominio del Idioma Universal y la Colaboración sin Fronteras',
      badge: 'El Nexo Internacional',
      icon: Globe,
      quote: '"El código es un lenguaje mundial; la comunicación fluida es el puente que une a los mejores gremios del planeta."',
      loreParagraphs: [
        'En un ecosistema tecnológico interconectado, la maestría técnica debe estar respaldada por una comunicación clara y universal. Con un nivel de inglés certificado en C1+ Advanced, Nicolás redacta documentación técnica, participa en ceremonias ágiles y discute decisiones de diseño arquitectónico con la misma soltura en español como en inglés.',
        'Esta habilidad le permite asimilar de inmediato las últimas especificaciones de la industria, contribuir a la comunidad open-source y colaborar sin fricciones en equipos distribuidos globalmente, cruzando husos horarios y culturas de trabajo.',
        'Ya sea debatiendo la conveniencia de microservicios frente a monolitos modulares, o redactando guías de contribución para otros desarrolladores, su enfoque prioriza siempre la claridad, la empatía y la precisión técnica.',
        'Un ingeniero global no es solo aquel que traduce palabras, sino el que comprende el contexto de negocio de clientes internacionales y transforma requerimientos ambiguos en especificaciones técnicas transparentes.',
      ],
      archmageDiary: {
        entryDate: 'Torre de Telecomunicaciones · Entrada #1250',
        note: 'La brecha entre un programador funcional y un gran ingeniero de software no radica en cuántos frameworks memoriza, sino en su capacidad de escuchar con atención, desarmar la complejidad y articular soluciones claras. En inglés o en español, la claridad es el antídoto definitivo contra el retrabajo.',
      },
      bossEncounter: {
        bossName: 'La Torre de Babel Tecnológica & El Espectro del Malentendido Ágil',
        threatDesc: 'Desalineación de expectativas entre clientes internacionales y equipos de ingeniería por ambigüedad lingüística o técnica.',
        battleStrategy: 'Contratos OpenAPI/Swagger autodocumentados, Pull Requests atómicos con diagramas Mermaid y comunicación fluida en inglés C1+.',
        legendaryLoot: 'Estatus de Ingeniero Bilingüe capaz de liderar o integrarse a gremios remotos globales.',
      },
      statsSheet: {
        artifact: 'Compás Lingüístico C1+ Advanced (Inglés Técnico & Fluido)',
        ability: 'Comunicación Intercultural & Liderazgo Técnico (+25 Carisma)',
        rank: 'Ingeniero Global / Nexo Internacional',
        xpGained: '+1,800 XP',
        realm: 'Reinos Distribuidos de la Red Global',
        keyQuest: 'Dominio de inglés C1+ y documentación técnica estandarizada',
      },
    },
    {
      id: 4,
      roman: 'Capítulo V',
      epochYear: '2026 y Más Allá',
      title: 'Capítulo V: La Profecía del Código Abierto',
      subtitle: 'La Búsqueda de Nuevos Gremios y Desafíos de Gran Escala',
      badge: 'La Nueva Senda',
      icon: Compass,
      quote: '"La senda del arquitecto no tiene un destino final; cada línea escrita es el prólogo de la siguiente gran aventura."',
      loreParagraphs: [
        'El códice de Nicolás Schernetzki permanece abierto y sus páginas en blanco aguardan los capítulos más ambiciosos. Equipado con un sólido stack frontend (React, TypeScript, Next.js), un poderoso motor backend (.NET, C#, Python FastAPI, Node.js) y devops modernos (Docker, AWS, Git/GitHub Actions), el héroe se encuentra listo para incorporarse a su próximo equipo.',
        'Busca unirse a proyectos que no teman resolver problemas complejos de escalabilidad, rendimiento e impacto social. Su lema es claro: diseñar con rigor, implementar con código limpio y testeable, y entregar soluciones que hagan una diferencia palpable en la vida cotidiana de las personas.',
        'La campana de la taberna resuena y el dragón compañero alza sus alas: la expedición apenas comienza.',
        'La tecnología evoluciona a ritmo vertiginoso, pero los principios fundamentales permanecen inalterables: curiosidad incansable, respeto por los compañeros de equipo, pasión por la calidad y un compromiso inquebrantable con la excelencia.',
      ],
      archmageDiary: {
        entryDate: 'El Umbral del Mañana · Entrada Presente',
        note: 'La taberna está en calma y OrdinalDragon vuela en círculos sobre el mapa del mundo digital. No temo a los bugs complejos, a las migraciones masivas ni a las tecnologías emergentes. Con fundamentos sólidos, mentalidad ágil y pasión por el oficio, cualquier problema es una oportunidad para forjar leyenda.',
      },
      bossEncounter: {
        bossName: 'El Dragón de la Complacencia & El Estancamiento Técnico',
        threatDesc: 'El riesgo de conformarse con soluciones superficiales en lugar de profundizar en la causa raíz de los desafíos de ingeniería.',
        battleStrategy: 'Curiosidad insaciable, experimentación continua con IA generativa, patrones de arquitectura limpia y amor por el código bien hecho.',
        legendaryLoot: 'Disponibilidad inmediata para expediciones de software de escala mundial.',
      },
      statsSheet: {
        artifact: 'Portafolio de la Reliquia Obsidiana & Ficha Activa del Héroe',
        ability: 'Adaptabilidad Extrema & Pasión por la Excelencia (+50 Todos los Atributos)',
        rank: 'Héroe Legendario Full-Stack Disponible',
        xpGained: '+5,000 XP',
        realm: 'El Horizonte Abierto del Desarrollo de Software',
        keyQuest: 'Incorporación inmediata a equipos de ingeniería de alto impacto',
      },
    },
  ];

  const current = CHAPTERS[activeChapter];

  const handleSelectEpoch = (epoch: Epoch) => {
    setActiveChapter(epoch.chapterIndex);
    sfx.playSelect();
  };

  const handleNextChapter = () => {
    if (activeChapter < CHAPTERS.length - 1) {
      setActiveChapter((prev) => prev + 1);
      sfx.playSelect();
    }
  };

  const handlePrevChapter = () => {
    if (activeChapter > 0) {
      setActiveChapter((prev) => prev - 1);
      sfx.playSelect();
    }
  };

  const THE_ARCHITECTS_OATH = [
    {
      num: 'I',
      title: 'El Código se Escribe para Ser Leído por Humanos',
      desc: 'El compilador ejecuta cualquier instrucción; el verdadero ingeniero escribe código autoexplicativo, modular y mantenible.',
    },
    {
      num: 'II',
      title: 'Sin Pruebas Automatizadas, No Hay Victoria',
      desc: 'Un sistema no testeado es una ilusión temporal. Las suites de tests son el escudo que previene regresiones en producción.',
    },
    {
      num: 'III',
      title: 'La Resiliencia es No Negociable',
      desc: 'Aislamiento en contenedores Docker, manejo preventivo de excepciones y diseño de APIs tolerantes a fallos.',
    },
    {
      num: 'IV',
      title: 'La Empatía con el Usuario Rige Cada Decisión',
      desc: 'Tiempos de carga menores a un segundo, interfaces intuitivas y respeto absoluto por la experiencia del usuario.',
    },
    {
      num: 'V',
      title: 'Aprender y Compartir en Cada Commit',
      desc: 'Humildad técnica para aprender de los pares, rigor para compartir conocimiento y mejora continua en cada iteración.',
    },
  ];

  return (
    <div className="flex flex-col items-center scroll-bg relative min-h-full w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 pb-32 text-on-surface">
      {/* Header */}
      <header className="text-center mb-8 max-w-2xl px-4">
        <span className="text-secondary font-label text-[10px] sm:text-xs uppercase tracking-[0.25em] block mb-2 font-bold">
          // CRÓNICAS DEL ARCHIMAGO & LORE DEL HÉROE
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-headline font-bold text-on-surface tracking-tight leading-none mb-3 uppercase break-words">
          El Ascenso del Héroe
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-4" />
        <p className="text-on-surface-variant font-body text-xs sm:text-sm italic opacity-85">
          &quot;De la alquimia de los electrones al dominio absoluto del tejido digital.&quot;
        </p>
      </header>

      {/* Interactive Timeline Epochs Bar */}
      <div className="w-full mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {EPOCHS.map((epoch) => {
            const Icon = epoch.icon;
            const isSelected = activeChapter === epoch.chapterIndex;
            return (
              <button
                key={epoch.year}
                type="button"
                onClick={() => handleSelectEpoch(epoch)}
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-primary bg-primary/15 shadow-[0_0_15px_rgba(255,145,0,0.25)] scale-[1.02]'
                    : 'border-outline-variant/30 bg-surface-container-high hover:border-outline-variant/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-headline font-bold text-base text-primary">
                    {epoch.year}
                  </span>
                  <Icon size={16} className={isSelected ? 'text-primary' : 'text-on-surface-variant'} />
                </div>
                <h4 className="font-headline text-xs font-bold text-on-surface line-clamp-1 mb-0.5">
                  {epoch.title}
                </h4>
                <p className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider line-clamp-1">
                  {epoch.tag}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Tabs Selector */}
      <div className="w-full flex items-center justify-between gap-2 mb-6">
        <button
          type="button"
          disabled={activeChapter === 0}
          onClick={handlePrevChapter}
          className="p-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          title="Capítulo Anterior"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center flex-1">
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChapter(ch.id);
                sfx.playSelect();
              }}
              className={`py-1.5 px-2.5 sm:px-3.5 rounded-lg font-mono text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeChapter === ch.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Capítulo {ch.id + 1}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={activeChapter === CHAPTERS.length - 1}
          onClick={handleNextChapter}
          className="p-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          title="Capítulo Siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Chapter Reader Container (Book Grimoire Style) */}
      <div className="w-full bg-surface-container-high rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.85)] overflow-hidden border-2 border-outline-variant/30 p-6 sm:p-10 lg:p-12 relative">
        <div className="absolute top-6 right-6 opacity-5 pointer-events-none">
          <BookOpen size={180} className="text-primary" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Chapter Header */}
            <div className="border-b border-outline-variant/30 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest bg-primary/10 border border-primary/20 px-2.5 py-1 rounded">
                  {current.epochYear} · {current.badge}
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-bold">
                  {activeChapter + 1} / {CHAPTERS.length}
                </span>
              </div>
              <h2 className="font-headline text-2xl sm:text-4xl font-bold text-on-surface">
                {current.title}
              </h2>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant italic mt-1">
                {current.subtitle}
              </p>
            </div>

            {/* Lore Quote Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container border-l-4 border-primary text-xs sm:text-sm italic text-on-surface font-body shadow-inner flex items-center gap-3">
              <Feather size={20} className="text-primary shrink-0" />
              <span>{current.quote}</span>
            </div>

            {/* Grimoire View Tabs: Crónica, Diario, Desafío, Ficha */}
            <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2 overflow-x-auto scrollbar-hide">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('cronica');
                  sfx.playSelect();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'cronica'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <BookOpen size={14} />
                <span>Crónica Principal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('diario');
                  sfx.playSelect();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'diario'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <Scroll size={14} />
                <span>Diario del Archimago</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('desafio');
                  sfx.playSelect();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'desafio'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <Sword size={14} />
                <span>Bestia Enfrentada</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('ficha');
                  sfx.playSelect();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'ficha'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <Award size={14} />
                <span>Ficha de Campaña</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[220px]">
              {/* Tab 1: Crónica */}
              {activeTab === 'cronica' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 text-on-surface-variant leading-relaxed text-sm sm:text-base font-body"
                >
                  {current.loreParagraphs.map((paragraph, idx) => (
                    <p key={idx} className="text-justify">
                      {idx === 0 && (
                        <span className="text-4xl sm:text-5xl font-headline text-primary mr-3 float-left leading-none">
                          {paragraph.charAt(0)}
                        </span>
                      )}
                      {idx === 0 ? paragraph.slice(1) : paragraph}
                    </p>
                  ))}
                </motion.div>
              )}

              {/* Tab 2: Diario del Archimago */}
              {activeTab === 'diario' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-surface-container-low border border-secondary/30 relative overflow-hidden space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                    <span className="font-mono text-xs text-secondary uppercase font-bold tracking-widest flex items-center gap-2">
                      <Bookmark size={15} />
                      {current.archmageDiary.entryDate}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant italic">
                      Fragmento del Manuscrito Secreto
                    </span>
                  </div>
                  <blockquote className="font-serif italic text-sm sm:text-base text-on-surface leading-relaxed border-l-2 border-secondary/50 pl-4 py-1">
                    &quot;{current.archmageDiary.note}&quot;
                  </blockquote>
                  <div className="text-right font-mono text-xs text-primary font-bold">
                    — Nicolás Schernetzki, Archimago Full-Stack
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Desafío / Boss */}
              {activeTab === 'desafio' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-surface-container-low border border-error/30 space-y-4"
                >
                  <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-3">
                    <Skull size={24} className="text-error shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-error font-bold block">
                        AMENAZA DE INGENIERÍA VENCIDA
                      </span>
                      <h4 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
                        {current.bossEncounter.bossName}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm font-mono">
                    <div className="bg-surface-container-high/60 p-3 rounded border border-outline-variant/20">
                      <span className="text-[10px] text-error uppercase font-bold block mb-1">
                        El Desafío en el Reino:
                      </span>
                      <p className="text-on-surface-variant font-body">
                        {current.bossEncounter.threatDesc}
                      </p>
                    </div>

                    <div className="bg-surface-container-high/60 p-3 rounded border border-outline-variant/20">
                      <span className="text-[10px] text-secondary uppercase font-bold block mb-1">
                        Estrategia & Conjuros de Código:
                      </span>
                      <p className="text-on-surface-variant font-body">
                        {current.bossEncounter.battleStrategy}
                      </p>
                    </div>

                    <div className="bg-surface-container-high/60 p-3 rounded border border-primary/20">
                      <span className="text-[10px] text-primary uppercase font-bold block mb-1">
                        Recompensa Legendaria:
                      </span>
                      <p className="text-primary font-body font-bold">
                        {current.bossEncounter.legendaryLoot}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Ficha de Campaña */}
              {activeTab === 'ficha' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 sm:p-6 rounded-xl bg-surface-container-low border border-primary/30 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                    <div className="flex items-center gap-2">
                      <Scroll size={18} className="text-primary" />
                      <h3 className="font-headline text-xs sm:text-sm font-bold uppercase tracking-wider text-on-surface">
                        Registro de Campaña · Ficha de Hechos Notables
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-amber-400 font-bold">
                      {current.statsSheet.xpGained}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-surface-container-high/60 p-3 rounded border border-outline-variant/20">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                        Artefacto Obtenido
                      </span>
                      <span className="text-primary font-bold">
                        {current.statsSheet.artifact}
                      </span>
                    </div>

                    <div className="bg-surface-container-high/60 p-3 rounded border border-outline-variant/20">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                        Habilidad Desbloqueada
                      </span>
                      <span className="text-secondary font-bold">
                        {current.statsSheet.ability}
                      </span>
                    </div>

                    <div className="bg-surface-container-high/60 p-3 rounded border border-outline-variant/20">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                        Rango del Héroe
                      </span>
                      <span className="text-on-surface font-bold">
                        {current.statsSheet.rank}
                      </span>
                    </div>

                    <div className="bg-surface-container-high/60 p-3 rounded border border-outline-variant/20">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                        Reino / Escenario
                      </span>
                      <span className="text-on-surface font-bold">
                        {current.statsSheet.realm}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-on-surface-variant">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>
                      <strong>Hito Clave:</strong> {current.statsSheet.keyQuest}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Chapter Navigation Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
              <button
                type="button"
                disabled={activeChapter === 0}
                onClick={handlePrevChapter}
                className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Capítulo Anterior</span>
              </button>

              <span className="font-mono text-xs text-primary font-bold">
                {current.roman}
              </span>

              <button
                type="button"
                disabled={activeChapter === CHAPTERS.length - 1}
                onClick={handleNextChapter}
                className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <span>Capítulo Siguiente</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The Architect's Oath (El Juramento del Arquitecto) */}
      <section className="w-full mt-12 bg-surface-container border-2 border-outline-variant/30 rounded-2xl p-6 sm:p-10 shadow-xl">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest block mb-1">
            // EL JURAMENTO DEL ARQUITECTO
          </span>
          <h3 className="font-headline text-2xl sm:text-3xl font-bold uppercase text-on-surface">
            Los Cinco Mandamientos Sagrados del Código
          </h3>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-2 italic">
            Principios inmutables que Nicolás Schernetzki defiende ante cada repositorio y proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THE_ARCHITECTS_OATH.map((oath) => (
            <div
              key={oath.num}
              className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/25 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary text-primary font-headline text-xs font-bold flex items-center justify-center">
                  {oath.num}
                </span>
                <h4 className="font-headline text-xs font-bold text-on-surface uppercase tracking-wider">
                  {oath.title}
                </h4>
              </div>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                {oath.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
