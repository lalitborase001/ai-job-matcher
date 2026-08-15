import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import Logo from '../common/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
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

        <Logo onClick={() => navigate('/dashboard')} />

        <Box sx={{ flexGrow: 1 }} />

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton color="inherit" aria-label="notifications">
              <NotificationsOutlinedIcon />
            </IconButton>

            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1, pl: 1, cursor: 'pointer' }}
              onClick={handleAvatarClick}
            >
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 600 }}>
                {user?.name || 'User'}
              </Typography>
              <Avatar
                alt={user?.name || 'User'}
                src={user?.avatar || ''}
                sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: '0.9rem', fontWeight: 700 }}
              >
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </Avatar>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{ sx: { mt: 1, minWidth: 190, borderRadius: 2 } }}
            >
              <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                <PersonOutlineIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} /> Profile
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
                <SettingsOutlinedIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} /> Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1.5, color: 'error.main' }} />
                <Typography color="error.main">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <IconButton onClick={() => navigate('/login')} color="inherit">
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Login</Typography>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;