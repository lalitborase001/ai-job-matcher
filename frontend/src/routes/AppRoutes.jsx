import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';

const HomePlaceholder = () => <h1>Home Page</h1>;
const DashboardPlaceholder = () => <h1>Dashboard (Protected)</h1>;
const ResumesPlaceholder = () => <h1>Resumes (Protected)</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePlaceholder />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPlaceholder />} />
          <Route path="/resumes" element={<ResumesPlaceholder />} />
          <Route path="/jobs" element={<h1>Jobs (Protected)</h1>} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;