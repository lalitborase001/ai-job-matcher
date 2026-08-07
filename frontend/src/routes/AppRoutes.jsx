import { Routes, Route } from 'react-router-dom';

const HomePlaceholder = () => <h1>Home Page</h1>;
const LoginPlaceholder = () => <h1>Login Page</h1>;
const DashboardPlaceholder = () => <h1>Dashboard</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePlaceholder />} />
      <Route path="/login" element={<LoginPlaceholder />} />
      <Route path="/dashboard" element={<DashboardPlaceholder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;