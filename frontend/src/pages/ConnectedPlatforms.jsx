import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Card, CardContent, Grid, Chip, Avatar, Alert
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { getUserPlatformsAPI, connectPlatformAPI, disconnectPlatformAPI } from '../services/platformService';
import Loading from '../components/common/Loading';

// None of these platforms currently expose a public OAuth/API integration
// an individual app can use to search or apply on a user's behalf (LinkedIn's
// job APIs require an approved partnership; the others have no public API
// at all). Per the "never claim Connected unless it's real" rule, every
// platform is marked `supported: false` and rendered as Coming Soon rather
// than offering a Connect button that can't do anything real. Flip a
// platform's `supported` flag to `true` once a genuine integration exists
// for it — the Connect/Disconnect flow below is already wired for that.
const AVAILABLE_PLATFORMS = [
  { id: 'LinkedIn', name: 'LinkedIn', desc: 'Find relevant professional opportunities', color: '#0077b5', supported: false },
  { id: 'Unstop', name: 'Unstop', desc: 'Competitions, hackathons & jobs', color: '#1c4980', supported: false },
  { id: 'Naukri', name: 'Naukri', desc: 'Discover jobs across India', color: '#0052cc', supported: false },
  { id: 'Indeed', name: 'Indeed', desc: 'Search millions of jobs online', color: '#2164f4', supported: false },
  { id: 'Wellfound', name: 'Wellfound', desc: 'Startup jobs and hiring', color: '#000000', supported: false },
  { id: 'Internshala', name: 'Internshala', desc: 'Internships and fresher jobs', color: '#1295c9', supported: false },
];

const ConnectedPlatforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [failedPlatform, setFailedPlatform] = useState(null);

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
    setFailedPlatform(null);
    try {
      await connectPlatformAPI(platformName);
      await fetchPlatforms();
    } catch (err) {
      console.error(err);
      setFailedPlatform(platformName);
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
    const found = platforms.find((p) => p.platformName === platformName);
    return found ? found.status : 'NOT_CONNECTED';
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LinkIcon color="primary" fontSize="large" /> Connected Job Platforms
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect your accounts to discover and track jobs across multiple platforms as integrations become available.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {AVAILABLE_PLATFORMS.map((platform) => {
          const status = getPlatformStatus(platform.id);
          const isConnected = platform.supported && status === 'CONNECTED';
          const isConnecting = actionLoading === platform.id;
          const hasFailed = failedPlatform === platform.id;

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
                    {platform.supported ? platform.desc : `${platform.desc} — integration coming soon.`}
                  </Typography>

                  {!platform.supported ? (
                    <Chip icon={<ScheduleIcon />} label="Coming Soon" variant="outlined" sx={{ width: '100%', fontWeight: 600 }} disabled />
                  ) : isConnected ? (
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
                    <Box sx={{ width: '100%' }}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ bgcolor: platform.color, '&:hover': { bgcolor: platform.color, opacity: 0.9 } }}
                        onClick={() => handleConnect(platform.id)}
                        disabled={isConnecting}
                      >
                        {isConnecting ? 'Connecting...' : 'Connect'}
                      </Button>
                      {hasFailed && (
                        <Alert severity="error" sx={{ mt: 1.5, textAlign: 'left' }}>
                          Connection failed. Please try again.
                        </Alert>
                      )}
                    </Box>
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