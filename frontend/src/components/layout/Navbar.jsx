import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { useState } from 'react';

const Navbar = ({ onMobileMenu }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton edge="start" color="inherit" onClick={onMobileMenu} aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <Box sx={{ width: 36, height: 36, bgcolor: 'primary.main', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>AI</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>AI Resume Matcher</Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" aria-label="notifications">
            <Badge badgeContent={3} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> 
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>{user?.name || 'User'}</Typography>
                <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                  <Avatar alt={user?.name || 'User'} src={user?.avatar || ''} />
                </IconButton>
              </Box>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Settings</MenuItem>
                <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box>
              <IconButton onClick={() => navigate('/login')} color="inherit">Login</IconButton>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;