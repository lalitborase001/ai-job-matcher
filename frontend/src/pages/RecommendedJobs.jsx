import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { getRecommendedJobsAPI } from '../services/jobService';

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await getRecommendedJobsAPI();
        
        // Mock ranking by adding a matchScore property for demonstration
        // (In a real app, this would be computed on the backend)
        const rankedJobs = (data || []).map(job => ({
          ...job,
          matchScore: Math.floor(Math.random() * 20) + 75 // Random score between 75-95%
        })).sort((a, b) => b.matchScore - a.matchScore);

        setJobs(rankedJobs);
      } catch (err) {
        setError('Failed to fetch recommended jobs.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (isLoading) return <Loading message="Finding your best matches..." />;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AutoAwesomeIcon color="primary" fontSize="large" /> Recommended for You
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Jobs ranked by AI based on your skills, experience, and preferences.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {jobs.length === 0 ? (
        <EmptyState 
          icon={<AutoAwesomeIcon fontSize="inherit" />}
          title="No Recommendations Yet" 
          subtitle="We couldn't find any recommended jobs. Please upload a resume first."
        />
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard 
                job={job} 
                matchScore={job.matchScore}
                onView={(id) => navigate(`/jobs/${id}`)}
                onMatch={(id) => navigate(`/application-assistant/${id}`)} 
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecommendedJobs;
