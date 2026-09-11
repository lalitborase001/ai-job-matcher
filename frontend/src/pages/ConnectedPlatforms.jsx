import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import PageHeader from '../components/common/PageHeader';
import { linkGoogleAPI } from '../services/platformService';

// Extract the login logic into a sub-component so it can use the useGoogleLogin hook
const GoogleConnectButton = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess(tokenResponse.access_token),
    onError: () => onError("Google login failed or was cancelled."),
  });

  return (
    <Button 
      variant="outlined" 
      size="large" 
      startIcon={<GoogleIcon />} 
      onClick={() => login()}
    >
      Connect Google
    </Button>
  );
};

export default function ConnectedPlatforms() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isConnected, setIsConnected] = useState(false);

  // You will replace this with your actual Google Client ID
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

  const handleGoogleSuccess = async (token) => {
    try {
      setStatus({ type: 'info', message: 'Verifying with server...' });
      await linkGoogleAPI(token);
      setIsConnected(true);
      setStatus({ type: 'success', message: 'Google account successfully linked!' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to link account on the server.' });
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <PageHeader 
          title="Connected Platforms" 
          subtitle="Sync your external profiles to improve your AI matches." 
        />

        {status.message && (
          <Alert severity={status.type} sx={{ mb: 3 }}>{status.message}</Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <GoogleIcon sx={{ fontSize: 48, color: '#DB4437', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Google Account</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Connect your Google account to sync your calendar for interviews and import drive documents.
              </Typography>
              
              {isConnected ? (
                <Button variant="contained" color="success" disabled>Connected</Button>
              ) : (
                <GoogleConnectButton 
                  onSuccess={handleGoogleSuccess} 
                  onError={(err) => setStatus({ type: 'error', message: err })} 
                />
              )}
            </Paper>
          </Grid>
          {/* You can duplicate the Grid item above for LinkedIn later! */}
        </Grid>
      </Box>
    </GoogleOAuthProvider>
  );
}