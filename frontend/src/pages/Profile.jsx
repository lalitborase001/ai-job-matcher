import React from 'react';
import { Box, Paper, Avatar, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const name = user?.name || 'User';
  const email = user?.email || '';

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 86, height: 86, bgcolor: 'primary.main', fontSize: 28 }}>{(name && name.charAt(0)) || 'U'}</Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{email}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This is your profile page. Add profile fields and edit functionality here.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;