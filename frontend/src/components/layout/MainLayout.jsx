import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const MainLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      {isAuthenticated && <Sidebar />}
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;