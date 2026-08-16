import React from 'react';
import { Box, Card, CardContent, Avatar, Typography, Divider, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const name = user?.name || 'User';
  const email = user?.email || '';

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Profile</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your personal information.
      </Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 4 }}>
            <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', fontSize: 32, fontWeight: 700, mb: 2 }}>
              {(name && name.charAt(0)) || 'U'}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{name}</Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Typography variant="h6" sx={{ mb: 3 }}>Profile Information</Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{name}</Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Email
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{email}</Typography>
          </Box>

          <Button variant="outlined" disabled>
            Edit Profile
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Profile editing isn't available yet.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;