import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Simulation from './pages/Simulation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/simulation" replace />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </BrowserRouter>
  );
}