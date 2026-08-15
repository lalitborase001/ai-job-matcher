import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ResumeUpload from '../pages/ResumeUpload';
import Jobs from '../pages/Jobs';
import ResumeMatch from '../pages/ResumeMatch';
import JobDetails from '../pages/JobDetails';
import Applications from '../pages/Applications';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

const HomePlaceholder = () => <h1>Home Page</h1>;
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePlaceholder />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
          <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resumes" element={<ResumeUpload />} />
          <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />
              <Route path="/jobs/:jobId/match" element={<ResumeMatch />} />
              <Route path="/match" element={<ResumeMatch />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;