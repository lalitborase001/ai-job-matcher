import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import PageTransition from '../common/PageTransition';
import { setCredentials } from '../../redux/slices/authSlice';

const MainLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => setMobileOpen((o) => !o);

  useEffect(() => {
    // If token exists but user not loaded, try to decode token and fetch user info
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      if (user) return; // already loaded

      try {
        const jwtDecode = (await import('jwt-decode')).default;
        const decoded = jwtDecode(token);
        const email = decoded?.sub || decoded?.email || decoded?.subject || null;
        if (!email) return;

        const axiosInstance = (await import('../../api/axiosInstance')).default;
        const resp = await axiosInstance.get('/api/users');
        const users = resp.data || [];
        const found = users.find((u) => String(u.email).toLowerCase() === String(email).toLowerCase());
        if (found) {
          dispatch(setCredentials({ token, user: found }));
        }
      } catch (err) {
        // ignore errors; user will be treated as unauthenticated display name 'User'
        console.error('Failed to load user info', err);
      }
    };

    loadUser();
  }, [dispatch, user]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMobileMenu={handleDrawerToggle} />
      {isAuthenticated && <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />}

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        <Toolbar />
        <PageTransition>
          <Outlet />
        </PageTransition>
      </Box>
    </Box>
  );
};

export default MainLayout;