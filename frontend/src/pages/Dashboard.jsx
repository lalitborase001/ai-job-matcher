import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button, CircularProgress, Alert } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { getDashboardStatsAPI } from '../services/dashboardService';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalJobs: 0,
    totalMatches: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardStatsAPI();
        if (data) {
          setStats(data);
        }
      } catch (err) {
        console.error("Dashboard stats fetch failed:", err);
        setStats({ totalResumes: 0, totalJobs: 0, totalMatches: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name || 'User'}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here is an overview of your recent activity and resume matches.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <DescriptionIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" component="div">
                {stats.totalResumes || 0}
              </Typography>
              <Typography color="text.secondary">
                Uploaded Resumes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <WorkIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" component="div">
                {stats.totalJobs || 0}
              </Typography>
              <Typography color="text.secondary">
                Saved Jobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <AssessmentIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" component="div">
                {stats.totalMatches || 0}
              </Typography>
              <Typography color="text.secondary">
                Total Matches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/resumes')}>
          Upload New Resume
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/jobs')}>
          Analyze Job Description
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;