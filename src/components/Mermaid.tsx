import { useEffect, useRef } from 'react';
import { useTheme } from '../i18n/ThemeContext';

interface MermaidProps {
  chart: string;
  className?: string;
}

export default function Mermaid({ chart, className }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    if (!el) return;

    const isDark = theme === 'dark';
    const themeVariables = isDark
      ? {
          background: 'transparent',
          primaryColor: '#1e1e2e',
          primaryBorderColor: '#ff9100',
          primaryTextColor: '#e8e6e3',
          lineColor: '#8a8a85',
          secondaryColor: '#26263a',
          tertiaryColor: '#1a1a28',
          fontSize: '14px',
        }
      : {
          background: 'transparent',
          primaryColor: '#fbf8f2',
          primaryBorderColor: '#b3541e',
          primaryTextColor: '#2b2621',
          lineColor: '#7a6f60',
          secondaryColor: '#ece5d8',
          tertiaryColor: '#f0eadf',
          fontSize: '14px',
        };

    import('mermaid')
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables,
          flowchart: { curve: 'basis' },
          securityLevel: 'loose',
        });
        return mermaid.render(`mmd-${Math.random().toString(36).slice(2)}`, chart);
      })
      .then(({ svg }) => {
        if (!cancelled && el) el.innerHTML = svg;
      })
      .catch((err) => {
        if (!cancelled && el) el.innerHTML = `<pre class="text-xs text-on-surface-variant">${err.message || 'Diagram unavailable'}</pre>`;
      });

    return () => {
      cancelled = true;
    };
  }, [chart, theme]);

  return <div ref={ref} className={className} />;
}
