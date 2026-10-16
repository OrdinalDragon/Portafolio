import React, { useMemo, useState, useEffect } from 'react';

interface FloatingRune {
  id: number;
  char: string;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

interface FloatingEmber {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function RPGBackground() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ancient runic and fantasy glyphs (scaled down count on mobile for max GPU efficiency)
  const runes = useMemo<FloatingRune[]>(() => {
    const glyphs = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᛟ', 'ᛞ', 'ᛉ', '⚡', '🔥', '⚔', '✦'];
    const colors = [
      'rgba(255, 145, 0, 0.45)', // Fire amber
      'rgba(255, 185, 124, 0.4)', // Warm gold
      'rgba(249, 171, 255, 0.35)', // Mystical magenta
      'rgba(110, 231, 183, 0.35)', // Emerald ether
      'rgba(147, 197, 253, 0.35)', // Celestial cyan
    ];

    const count = isMobile ? 8 : 18;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      char: glyphs[i % glyphs.length],
      left: `${(i * (isMobile ? 12 : 5.6) + (i % 4) * 3) % 92 + 4}%`,
      top: `${(i * (isMobile ? 11 : 7.2) + (i % 3) * 5) % 86 + 7}%`,
      size: 13 + (i % 4) * 3,
      duration: 10 + (i % 5) * 3,
      delay: (i % 6) * 1.5,
      opacity: 0.15 + (i % 3) * 0.1,
      color: colors[i % colors.length],
    }));
  }, [isMobile]);

  // Rising embers from the dragon's forge (scaled down count on mobile)
  const embers = useMemo<FloatingEmber[]>(() => {
    const colors = [
      '#ff9100',
      '#ff5722',
      '#ffd54f',
      '#f9abff',
      '#ff6f00',
    ];

    const count = isMobile ? 10 : 24;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * (isMobile ? 9.5 : 4.2) + (i % 5) * 2) % 94 + 3}%`,
      size: 2 + (i % 3),
      duration: 7 + (i % 4) * 2.5,
      delay: (i % 8) * 1.2,
      color: colors[i % colors.length],
    }));
  }, [isMobile]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Obsidian Base with Volcanic Vignette */}
      <div 
        className="absolute inset-0 bg-[#0d0c0b]" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 145, 0, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 100% 100%, rgba(180, 50, 0, 0.07) 0%, transparent 55%),
            radial-gradient(circle at 0% 100%, rgba(134, 3, 156, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(20, 18, 16, 0.4) 0%, rgba(10, 9, 8, 0.95) 100%)
          `
        }}
      />

      {/* 2. Dragon Scale / Hexagonal Runic Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="rpg-dragon-scales" width="48" height="48" patternUnits="userSpaceOnUse">
            <path 
              d="M24 0 L48 24 L24 48 L0 24 Z" 
              fill="none" 
              stroke="#ff9100" 
              strokeWidth="0.75" 
            />
            <path 
              d="M24 12 L36 24 L24 36 L12 24 Z" 
              fill="none" 
              stroke="#f9abff" 
              strokeWidth="0.5" 
              strokeDasharray="2,2" 
            />
            <circle cx="24" cy="24" r="1.5" fill="#ff9100" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rpg-dragon-scales)" />
      </svg>

      {/* 3. Mystical Constellation Lines across the background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M 50 150 Q 300 80 600 220 T 1100 180 T 1600 250" 
          fill="none" 
          stroke="#ff9100" 
          strokeWidth="1.2" 
          strokeDasharray="4,8"
        />
        <path 
          d="M 120 700 Q 450 550 850 680 T 1400 620" 
          fill="none" 
          stroke="#f9abff" 
          strokeWidth="1" 
          strokeDasharray="3,6"
        />
        <circle cx="300" cy="80" r="3" fill="#ff9100" />
        <circle cx="600" cy="220" r="2.5" fill="#ffd54f" />
        <circle cx="1100" cy="180" r="3" fill="#f9abff" />
        <circle cx="450" cy="550" r="2.5" fill="#ff9100" />
        <circle cx="850" cy="680" r="3" fill="#ffd54f" />
      </svg>

      {/* 4. Giant Ordinal Dragon Silhouette Watermark (Breathing Glow) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] md:w-[850px] md:h-[850px] opacity-[0.035] pointer-events-none select-none dragon-breathe"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
          <path d="M50 5 C55 18, 65 24, 78 20 C72 32, 64 38, 75 48 C62 48, 56 55, 50 68 C44 55, 38 48, 25 48 C36 38, 28 32, 22 20 C35 24, 45 18, 50 5 Z" />
          <path d="M50 72 C55 82, 68 88, 80 82 C68 90, 58 92, 50 98 C42 92, 32 90, 20 82 C32 88, 45 82, 50 72 Z" opacity="0.7" />
          <circle cx="50" cy="38" r="4" fill="#ff9100" />
        </svg>
      </div>

      {/* 5. Floating Ancient Runes (Slow drift & fade, with GPU will-change) */}
      {runes.map((rune) => (
        <div
          key={rune.id}
          className="absolute font-mono select-none"
          style={{
            left: rune.left,
            top: rune.top,
            fontSize: `${rune.size}px`,
            color: rune.color,
            textShadow: `0 0 10px ${rune.color}`,
            opacity: rune.opacity,
            animation: `rpg-rune-float ${rune.duration}s ease-in-out infinite alternate`,
            animationDelay: `${rune.delay}s`,
            willChange: 'transform, opacity',
          }}
        >
          {rune.char}
        </div>
      ))}

      {/* 6. Rising Dragon Embers from the Depth (with GPU will-change) */}
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ember.left,
            bottom: '-15px',
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            backgroundColor: ember.color,
            boxShadow: `0 0 ${ember.size * 3}px ${ember.color}`,
            animation: `rpg-ember-rise ${ember.duration}s infinite linear`,
            animationDelay: `${ember.delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* 7. Vignette Border Frame (Dungeon Ambient) */}
      <div 
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] md:shadow-[inset_0_0_140px_rgba(0,0,0,0.92)]" 
      />

      {/* Embedded Animations with GPU transforms */}
      <style>{`
        @keyframes rpg-ember-rise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.6);
            opacity: 0;
          }
          12% {
            opacity: 0.85;
          }
          80% {
            opacity: 0.35;
          }
          100% {
            transform: translate3d(35px, -108vh, 0) scale(0.2);
            opacity: 0;
          }
        }

        @keyframes rpg-rune-float {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0.12;
          }
          50% {
            transform: translate3d(0, -14px, 0) rotate(3deg);
            opacity: 0.38;
          }
          100% {
            transform: translate3d(0, 4px, 0) rotate(-3deg);
            opacity: 0.15;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes rpg-ember-rise {
            0%, 100% { opacity: 0; }
          }
          @keyframes rpg-rune-float {
            0%, 100% { transform: none; }
          }
        }
      `}</style>
    </div>
  );
}
