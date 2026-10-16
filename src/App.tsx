import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const ScrollPortfolio = lazy(() => import('./components/ScrollPortfolio'));
const AppRPG = lazy(() => import('./components/AppRPG'));

function RouteLoader() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0d0c0b] text-primary font-mono text-xs gap-3 select-none">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="uppercase tracking-widest text-[10px] animate-pulse">// Canalizando Entorno...</span>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<ScrollPortfolio />} />
        <Route path="/rpg" element={<AppRPG />} />
      </Routes>
    </Suspense>
  );
}
