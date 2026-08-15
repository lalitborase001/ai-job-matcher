import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getJobsAPI, createJobAPI, deleteJobAPI } from '../services/jobService';
import { useNavigate, useLocation } from 'react-router-dom';

import PageHeader from '../components/common/PageHeader';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Carried over from the Resumes page when the user clicks "AI Match" on a
  // specific resume, so we can pre-select it once they pick a job.
  const preselectedResumeId = location.state?.preselectedResumeId;

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const [filters, setFilters] = useState({ q: '', location: '', sort: 'relevance' });

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getJobsAPI();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError('Could not load jobs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Backend has no search/sort query params, so we filter and sort the
  // already-fetched list client-side.
  const visibleJobs = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const loc = filters.location.trim().toLowerCase();

    let result = jobs.filter((job) => {
      const matchesQuery = !q || `${job.title} ${job.description} ${job.company || ''}`.toLowerCase().includes(q);
      const matchesLocation = !loc || (job.location || '').toLowerCase().includes(loc);
      return matchesQuery && matchesLocation;
    });

    if (filters.sort === 'recent') {
      result = [...result].sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    return result;
  }, [jobs, filters]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      setError('');
      const newJob = await createJobAPI(data);
      setJobs([newJob, ...jobs]);
      handleCloseModal();
    } catch (err) {
      console.error('Failed to create job:', err);
      setError('Failed to save the job description.');
    }
  };

  const handleDelete = async (id) => {
    const prev = jobs;
    setJobs(jobs.filter((job) => job.id !== id));
    try {
      await deleteJobAPI(id);
    } catch (err) {
      console.error('Failed to delete job:', err);
      setError('Failed to delete the job.');
      setJobs(prev);
    }
  };

  const goToJob = (id) => navigate(`/jobs/${id}`, { state: { preselectedResumeId } });
  const goToMatch = (id) => navigate(`/jobs/${id}/match`, { state: { preselectedResumeId } });

  if (isLoading) return <Loading message="Loading jobs..." />;

  return (
    <Box sx={{ position: 'relative', minHeight: '80vh' }}>
      <PageHeader
        title="Find Your Next Opportunity"
        subtitle="Discover jobs that match your skills and experience."
      />

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}

      <JobFilters filters={filters} setFilters={setFilters} onSearch={() => {}} />

      {visibleJobs.length === 0 ? (
        <EmptyState
          title={jobs.length === 0 ? 'No jobs found' : 'No jobs match your filters'}
          subtitle={jobs.length === 0 ? 'Check back soon for new listings.' : 'Try adjusting your search or location.'}
          actionLabel="Refresh"
          onAction={() => fetchJobs()}
        />
      ) : (
        <Grid container spacing={3}>
          {visibleJobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <JobCard job={job} onMatch={goToMatch} onView={goToJob} />
            </Grid>
          ))}
        </Grid>
      )}

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenModal}
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Add New Job Description</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              label="Job Title"
              type="text"
              fullWidth
              variant="outlined"
              {...register('title', { required: 'Job title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Job Description"
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              {...register('description', {
                required: 'Job description is required',
                minLength: { value: 20, message: 'Please provide more detail (min 20 characters)' },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseModal} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Job'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Jobs;