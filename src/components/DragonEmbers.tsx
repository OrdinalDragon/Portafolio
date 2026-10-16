import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useTheme } from '../i18n/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  decay: number;
}

export default function DragonEmbers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const prefersReduced = useReducedMotion();
  const particlesRef = useRef<Particle[]>([]);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const darkColors = ['#ff9100', '#ffb97c', '#ff5722', '#ffd54f', '#f9abff'];
    const lightColors = ['#b3541e', '#d97706', '#b45309', '#f59e0b', '#9c4168'];

    let isLooping = false;
    let lastTime = performance.now();

    const render = (now: number) => {
      const particles = particlesRef.current;
      if (particles.length === 0) {
        ctx.clearRect(0, 0, width, height);
        isLooping = false;
        return;
      }

      const dt = Math.min((now - lastTime) / 16.66, 2.5);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= p.decay * dt;

        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.life * 0.85, 0);

        // Soft glow on dark mode
        if (isDark) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw crisp pixel ember
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > width || y < 0 || y > height) return;

      const colors = isDark ? darkColors : lightColors;
      // Spawn 1-2 embers per move event
      const count = Math.random() > 0.5 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        if (particlesRef.current.length > 50) break; // limit pool
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 2 - 0.5, // drift upward
          size: Math.floor(Math.random() * 2.5) + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.0,
          decay: 0.025 + Math.random() * 0.02,
        });
      }

      if (!isLooping) {
        isLooping = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [isDark, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
