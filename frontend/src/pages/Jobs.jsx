import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useNavigate } from 'react-router-dom';

import { searchLiveJobsAPI } from '../services/jobService';
import JobCard from '../components/jobs/JobCard';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import PageHeader from '../components/common/PageHeader';

export default function Jobs() {
  const [title, setTitle] = useState('Software Engineer');
  const [location, setLocation] = useState('Remote');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError('');
      // Trigger the external API call we wired up in jobService.js
      const data = await searchLiveJobsAPI(title, location);
      setJobs(data || []);
    } catch (err) {
      console.error("Job search failed:", err);
      setError('Failed to load live jobs. Ensure your backend API is running and configured.');
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch default jobs on first load
  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    fetchJobs();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader 
        title="Discover Jobs" 
        subtitle="Search for live opportunities pulled directly from external job boards." 
      />

      {/* 1. PREMIUM SEARCH BAR */}
      <Paper 
        component="form" 
        onSubmit={handleSearch}
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 4, 
          borderRadius: 4, 
          border: '1px solid rgba(15,23,42,0.08)',
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 2,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Job title, keywords, or company"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 2, bgcolor: '#f8fafc' }
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="City, state, or 'Remote'"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 2, bgcolor: '#f8fafc' }
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          size="large" 
          sx={{ px: 4, borderRadius: 2, fontWeight: 'bold', minWidth: { md: '150px' } }}
          disabled={loading}
        >
          Search
        </Button>
      </Paper>

      {/* 2. RESULTS AREA */}
      {loading ? (
        <Loading message="Scouring job boards for live roles..." />
      ) : error ? (
        <EmptyState 
          title="API Error" 
          subtitle={error} 
          actionLabel="Try Again" 
          onAction={fetchJobs} 
        />
      ) : jobs.length === 0 ? (
        <EmptyState 
          icon={<WorkOutlineIcon fontSize="inherit" />}
          title="No Jobs Found" 
          subtitle={`We couldn't find any live listings for "${title}" in "${location}".`} 
        />
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              {/* Maps through the results and renders your existing JobCard component */}
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}