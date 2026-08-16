import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, FormControlLabel, Switch, Stack, Divider, Button } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import PageHeader from '../components/common/PageHeader';
import LinkIcon from '@mui/icons-material/Link';

const STORAGE_KEY = 'notificationPreferences';

const DEFAULT_PREFERENCES = {
  emailNotifications: true,
  applicationUpdates: true,
  jobMatchAlerts: true,
  aiRecommendations: false,
};

const NOTIFICATION_OPTIONS = [
  {
    key: 'emailNotifications',
    label: 'Email Notifications',
    description: 'Receive important updates about your applications and AI job matches.',
  },
  {
    key: 'applicationUpdates',
    label: 'Application Updates',
    description: 'Get notified when your application status changes.',
  },
  {
    key: 'jobMatchAlerts',
    label: 'Job Match Alerts',
    description: 'Receive alerts when highly relevant jobs are discovered.',
  },
  {
    key: 'aiRecommendations',
    label: 'AI Recommendations',
    description: 'Receive resume and career recommendations.',
  },
];

const Settings = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) setPreferences({ ...DEFAULT_PREFERENCES, ...saved });
    } catch {
      // ignore malformed storage
    }
  }, []);

  // Persisted locally per-device for now. When the backend exposes a
  // preferences endpoint (e.g. PUT /api/users/me/preferences), swap this
  // for an API call — the shape here already matches what that payload
  // would look like, so callers of `preferences` don't need to change.
  const handleToggle = (key) => (e) => {
    const next = { ...preferences, [key]: e.target.checked };
    setPreferences(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
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
          <Stack spacing={2.5} divider={<Divider flexItem />}>
            {NOTIFICATION_OPTIONS.map((opt) => (
              <Box key={opt.key}>
                <FormControlLabel
                  control={<Switch checked={preferences[opt.key]} onChange={handleToggle(opt.key)} color="primary" />}
                  label={<Typography variant="body1">{opt.label}</Typography>}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, ml: 4 }}>
                  {opt.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinkIcon color="primary" /> Integrations
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Connect your job boards to discover more opportunities as support becomes available.
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