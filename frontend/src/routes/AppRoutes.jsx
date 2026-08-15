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
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import ResumeIntelligence from '../pages/ResumeIntelligence';
import ConnectedPlatforms from '../pages/ConnectedPlatforms';
import RecommendedJobs from '../pages/RecommendedJobs';
import ApplicationAssistant from '../pages/ApplicationAssistant';
import Profile from '../pages/Profile';

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
          <Route path="/resume-intelligence" element={<ResumeIntelligence />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/recommended" element={<RecommendedJobs />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/application-assistant/:jobId" element={<ApplicationAssistant />} />
          <Route path="/application-assistant" element={<ApplicationAssistant />} />
          <Route path="/jobs/:jobId/match" element={<ResumeMatch />} />
              <Route path="/match" element={<ResumeMatch />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/platforms" element={<ConnectedPlatforms />} />
                </Route>
              </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;