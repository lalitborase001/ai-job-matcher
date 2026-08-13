import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Avatar, Typography, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';

const drawerWidth = 260;

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'My Resumes', icon: <DescriptionIcon />, path: '/resumes' },
    { text: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
    { text: 'Applications', icon: <ListAltIcon />, path: '/applications' },
    { text: 'AI Match', icon: <AutoAwesomeIcon />, path: '/match' },
  ];

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ alignItems: 'center', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'primary.main', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>AI</Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>AI Resume</Typography>
        </Box>
      </Toolbar>

      <Divider />

      <Box sx={{ p: 1, flexGrow: 1 }}>
        <List>
          {menuItems.map((item) => {
            const selected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton onClick={() => { navigate(item.path); if (!isMdUp && onClose) onClose(); }}
                  selected={selected}
                  sx={{
                    borderRadius: 1.5,
                    ...(selected && { bgcolor: 'primary.light', color: 'primary.main' }),
                  }}
                >
                  <ListItemIcon sx={{ color: selected ? 'primary.main' : 'text.secondary' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 40, height: 40 }}>{(user?.name && user.name.charAt(0)) || 'U'}</Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{user?.name || 'User'}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>View profile</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}> 
          <ListItemButton onClick={() => { navigate('/logout'); if (!isMdUp && onClose) onClose(); }} sx={{ borderRadius: 1 }}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="sidebar-navigation">
      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={Boolean(mobileOpen)}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;