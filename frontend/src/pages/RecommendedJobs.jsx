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
                  {job.employmentType && (
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary' }}>
                      {job.employmentType}
                    </Typography>
                  )}
                  {job.skills && (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      {job.skills.split(',').map((skill, idx) => (
                        <Chip key={idx} label={skill.trim()} size="small" sx={{ bgcolor: 'primary.50', color: 'primary.main', fontWeight: 600 }} />
                      ))}
                    </Box>
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 1 }}>
                    💡 {job.matchReason}
                  </Typography>
                  {job.postedDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 3, pt: 0, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate(`/jobs/${job.jobId}`)}
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                  >
                    AI Match
                  </Button>
                  {(job.sourceUrl) && (
                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      onClick={() => window.open(job.sourceUrl, '_blank')}
                      sx={{ borderRadius: 2, fontWeight: 700, borderColor: 'rgba(0,0,0,0.12)' }}
                    >
                      Apply on {job.source || 'Platform'}
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}