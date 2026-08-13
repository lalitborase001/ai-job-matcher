import React from 'react';
import { Box, Paper, Typography, FormControlLabel, Switch, Stack } from '@mui/material';

const Settings = () => {
  const [dark, setDark] = React.useState(false);
  const [emailNotif, setEmailNotif] = React.useState(true);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Settings</Typography>

        <Stack spacing={2}>
          <FormControlLabel
            control={<Switch checked={dark} onChange={(e) => setDark(e.target.checked)} />}
            label="Dark Mode"
          />

          <FormControlLabel
            control={<Switch checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />}
            label="Email Notifications"
          />

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            These are placeholder settings. Hook them up to your preferences store as needed.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settings;