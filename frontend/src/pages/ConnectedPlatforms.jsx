import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Card, CardContent, Grid, Chip, Avatar
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getUserPlatformsAPI, connectPlatformAPI, disconnectPlatformAPI } from '../services/platformService';
import Loading from '../components/common/Loading';

const AVAILABLE_PLATFORMS = [
  { id: 'LinkedIn', name: 'LinkedIn', desc: 'Find relevant professional opportunities', color: '#0077b5' },
  { id: 'Unstop', name: 'Unstop', desc: 'Competitions, Hackathons & Jobs', color: '#1c4980' },
  { id: 'Naukri', name: 'Naukri', desc: 'Discover jobs across India', color: '#0052cc' },
  { id: 'Indeed', name: 'Indeed', desc: 'Search millions of jobs online', color: '#2164f4' },
  { id: 'Wellfound', name: 'Wellfound', desc: 'Startup jobs and hiring', color: '#000000' },
  { id: 'Internshala', name: 'Internshala', desc: 'Internships and fresher jobs', color: '#1295c9' }
];

const ConnectedPlatforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchPlatforms = async () => {
    try {
      const data = await getUserPlatformsAPI();
      setPlatforms(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleConnect = async (platformName) => {
    setActionLoading(platformName);
    try {
      // Simulate OAuth redirect or direct connect
      await connectPlatformAPI(platformName);
      await fetchPlatforms();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDisconnect = async (platformName) => {
    setActionLoading(platformName);
    try {
      await disconnectPlatformAPI(platformName);
      await fetchPlatforms();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) return <Loading message="Loading platforms..." />;

  const getPlatformStatus = (platformName) => {
    const found = platforms.find(p => p.platformName === platformName);
    return found ? found.status : 'NOT_CONNECTED';
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LinkIcon color="primary" fontSize="large" /> Connected Job Platforms
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect your accounts to search, match, and apply for jobs automatically across multiple platforms.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {AVAILABLE_PLATFORMS.map((platform) => {
          const status = getPlatformStatus(platform.id);
          const isConnected = status === 'CONNECTED';
          const isConnecting = actionLoading === platform.id;

          return (
            <Grid item xs={12} sm={6} md={4} key={platform.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                {isConnected && (
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: 'success.main' }} />
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                  <Avatar sx={{ width: 64, height: 64, mb: 2, bgcolor: platform.color, fontWeight: 700, fontSize: '1.5rem' }}>
                    {platform.name.charAt(0)}
                  </Avatar>
                  
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{platform.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {platform.desc}
                  </Typography>

                  {isConnected ? (
                    <Box sx={{ width: '100%' }}>
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Connected" 
                        color="success" 
                        variant="outlined" 
                        sx={{ mb: 2, width: '100%', fontWeight: 600 }} 
                      />
                      <Button 
                        variant="text" 
                        color="error" 
                        size="small" 
                        onClick={() => handleDisconnect(platform.id)}
                        disabled={isConnecting}
                      >
                        Disconnect
                      </Button>
                    </Box>
                  ) : (
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ bgcolor: platform.color, '&:hover': { bgcolor: platform.color, opacity: 0.9 } }}
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting}
                    >
                      {isConnecting ? 'Connecting...' : 'Connect'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ConnectedPlatforms;
