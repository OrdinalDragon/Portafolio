import { Routes, Route } from 'react-router-dom';
import AppRPG from './components/AppRPG';
import ScrollPortfolio from './components/ScrollPortfolio';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ScrollPortfolio />} />
      <Route path="/rpg" element={<AppRPG />} />
    </Routes>
  );
}
