import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UploadAssignment from '../pages/UploadAssignment';
import Results from '../pages/Results';
import Students from '../pages/Students';
import Assignments from '../pages/Assignments';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/upload"
        element={
          <ProtectedRoute>
            <UploadAssignment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/assignments"
        element={
          <ProtectedRoute>
            <Assignments />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
