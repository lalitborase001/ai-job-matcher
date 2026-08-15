import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import PageTransition from '../common/PageTransition';
import { setCredentials } from '../../redux/slices/authSlice';
import { getCurrentUserAPI } from '../../services/authService';

const MainLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => setMobileOpen((o) => !o);

  useEffect(() => {
    // If token exists but user not loaded yet (e.g. page refresh), fetch it.
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token || user) return;

      const found = await getCurrentUserAPI(token);
      if (found) {
        dispatch(setCredentials({ token, user: found }));
      }
    };

    loadUser();
  }, [dispatch, user]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMobileMenu={handleDrawerToggle} />
      {isAuthenticated && <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, md: 3 },
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <PageTransition>
          <Outlet />
        </PageTransition>
      </Box>
    </Box>
  );
};

export default MainLayout;