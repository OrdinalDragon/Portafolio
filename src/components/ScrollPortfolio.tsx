import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ScrollPortfolio() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-headline text-3xl md:text-5xl font-bold text-on-surface uppercase tracking-wider mb-4">
        Portfolio
      </h1>
      <p className="text-on-surface-variant mb-8 max-w-md">
        The main single-page portfolio is coming soon. Until then, explore the RPG version.
      </p>
      <Link
        to="/rpg"
        className="px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold tracking-widest uppercase rounded-sm hover:shadow-[0_0_15px_rgba(255,145,0,0.4)] transition-all flex items-center gap-2"
      >
        <Gamepad2 size={18} />
        Switch to RPG Mode
      </Link>
    </div>
  );
}
