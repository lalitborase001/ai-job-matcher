import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PageTransition from '../common/PageTransition';

const MainLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((o) => !o);

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