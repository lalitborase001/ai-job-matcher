import React from 'react';
import { Box, Card, CardContent, Avatar, Typography, Grid, Divider, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const name = user?.name || 'User';
  const email = user?.email || '';

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Profile</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your personal information.
      </Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item>
              <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', fontSize: 32, fontWeight: 700 }}>
                {(name && name.charAt(0)) || 'U'}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>{name}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>{email}</Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="h6" sx={{ mb: 2 }}>Profile Information</Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Full Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Email Address</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{email}</Typography>
                </Grid>
              </Grid>

              <Button variant="outlined" disabled>
                Edit Profile
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Profile editing is currently managed by your administrator.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;