import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Simulation from './pages/Simulation';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}