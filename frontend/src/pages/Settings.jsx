import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, FormControlLabel, Switch, Stack, Divider, Button } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import PageHeader from '../components/common/PageHeader';
import LinkIcon from '@mui/icons-material/Link';

const Settings = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [emailNotif, setEmailNotif] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem('emailNotif');
    if (saved !== null) {
      setEmailNotif(saved === 'true');
    }
  }, []);

  const handleEmailToggle = (e) => {
    const checked = e.target.checked;
    setEmailNotif(checked);
    localStorage.setItem('emailNotif', checked);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <PageHeader title="Settings" subtitle="Manage your preferences and account settings." />

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Appearance</Typography>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={toggleTheme} color="primary" />}
            label={<Typography variant="body1">Dark Mode</Typography>}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
            Adjust the appearance of the application.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Notifications</Typography>
          <FormControlLabel
            control={<Switch checked={emailNotif} onChange={handleEmailToggle} color="primary" />}
            label={<Typography variant="body1">Email Notifications</Typography>}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
            Receive updates about your job matches and application status.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinkIcon color="primary" /> Integrations
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Connect your job boards (LinkedIn, Naukri, etc.) to discover more jobs.
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/platforms')}>
            Manage Connected Platforms
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Account</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => navigate('/profile')}>
              View Profile
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;