import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  caption?: string;
}

export default function Lightbox({ open, onClose, children, caption }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 bg-surface-container-high border-2 border-primary/40 text-on-surface hover:text-primary transition-colors cursor-pointer z-10"
      >
        <X size={22} />
      </button>
      <div
        className="relative max-w-6xl w-full max-h-[90vh] overflow-auto bg-surface-container-low border-2 border-primary/40 pixel-corners p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {caption && (
          <p className="text-center text-on-surface-variant font-mono text-xs mt-3 pb-2">{caption}</p>
        )}
      </div>
    </div>
  );
}
