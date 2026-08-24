import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, CircularProgress, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getRecommendedJobsAPI } from '../services/jobService';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getRecommendedJobsAPI();
        setJobs(data || []);
      } catch (err) {
        console.error("Failed to fetch recommended jobs:", err);
        setError("Could not load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return "success";
    if (score >= 50) return "warning";
    return "error";
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/dashboard')} 
        sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}
      >
        Back to Dashboard
      </Button>

      <PageHeader
        title="Recommended Jobs"
        subtitle="AI-curated opportunities based on your extracted resume skills."
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <EmptyState 
          title="Oops!" 
          subtitle={error} 
          actionLabel="Go Back" 
          onAction={() => navigate('/dashboard')} 
        />
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No matches found"
          subtitle="We couldn't find any jobs matching your skills. Try uploading a new resume to extract more skills!"
          actionLabel="Go to My Resumes"
          onAction={() => navigate('/resumes')}
        />
      ) : (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job.jobId}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 4, 
                  border: '1px solid rgba(15,23,42,0.06)',
                  borderTop: `4px solid #1976d2`, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px -10px rgb(0 0 0 / 0.15)' }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>{job.title}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {job.company} • {job.location}
                      </Typography>
                    </Box>
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={`${job.matchScore}% Match`}
                      color={getScoreColor(job.matchScore)}
                      variant="filled"
                      sx={{ fontWeight: 'bold', px: 1 }}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 1 }}>
                    💡 {job.matchReason}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate(`/jobs/${job.jobId}`)} // Navigates to job details where they can do a Deep Gemini Match
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                  >
                    View Job & Analyze
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}