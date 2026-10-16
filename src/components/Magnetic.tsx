import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // 0 to 1, default 0.3
  className?: string;
}

export default function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    if (reduced) return;
    x.set(0);
    y.set(0);
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
