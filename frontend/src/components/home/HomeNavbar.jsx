import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, useTheme, useMediaQuery, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../common/Logo';

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileAnchor, setMobileAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'How It Works', id: 'how-it-works' },
    { title: 'AI Matching', id: 'ai-matching' },
    { title: 'Job Search', id: 'job-search' },
    { title: 'Features', id: 'features' },
  ];

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileAnchor(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 1 : 0}
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        color: 'text.primary',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(15,23,42,0.06)' : 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, maxWidth: 1200, width: '100%', mx: 'auto' }}>
        <Logo onClick={() => window.scrollTo(0, 0)} />

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                color="inherit"
                onClick={() => handleScrollTo(link.id)}
                sx={{
                  fontWeight: 600,
                  opacity: 0.8,
                  '&:hover': { opacity: 1, backgroundColor: 'transparent', color: 'primary.main' }
                }}
              >
                {link.title}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isAuthenticated ? (
            <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ borderRadius: 8, px: 3 }}>
              Dashboard
            </Button>
          ) : (
            <>
              {!isMobile && (
                <Button color="inherit" sx={{ fontWeight: 600 }} onClick={() => navigate('/login')}>
                  Sign In
                </Button>
              )}
              <Button variant="contained" onClick={() => navigate('/register')} sx={{ borderRadius: 8, px: 3 }}>
                Get Started
              </Button>
            </>
          )}

          {isMobile && (
            <IconButton edge="end" color="inherit" onClick={(e) => setMobileAnchor(e.currentTarget)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <Menu
          anchorEl={mobileAnchor}
          open={Boolean(mobileAnchor)}
          onClose={() => setMobileAnchor(null)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {navLinks.map((link) => (
            <MenuItem key={link.title} onClick={() => handleScrollTo(link.id)}>
              {link.title}
            </MenuItem>
          ))}
          {!isAuthenticated && (
            <MenuItem onClick={() => navigate('/login')}>
              Sign In
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;
