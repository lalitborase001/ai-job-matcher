import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Typography, Button, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, CircularProgress, Alert, Fab
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getJobsAPI, createJobAPI, deleteJobAPI } from '../services/jobService';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../components/common/PageHeader';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const [filters, setFilters] = useState({ q: '', location: '', sort: 'relevance' });

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const data = await getJobsAPI();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError('Could not load jobs. Is the backend endpoint ready?');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
    try {
      setJobs(jobs.filter(job => job.id !== id));
      await deleteJobAPI(id);
    } catch (err) {
      console.error('Failed to delete job:', err);
      fetchJobs();
    }
  };

  const onSearch = () => {
    // basic client-side filtering for now
    // if backend supports search, replace with API call
    fetchJobs();
  };

  if (isLoading) return <Loading message="Loading jobs..." />;

  return (
    <Box sx={{ position: 'relative', minHeight: '80vh', p: { xs: 2, md: 3 } }}>
      <PageHeader title="Find Your Next Opportunity" subtitle="Discover jobs that match your skills and experience." action={<Button variant="contained" onClick={() => navigate('/jobs')}>Explore</Button>} />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <JobFilters filters={filters} setFilters={setFilters} onSearch={onSearch} />

      {jobs.length === 0 ? (
        <EmptyState title="No jobs found" subtitle="Try changing your search filters." actionLabel="Refresh" onAction={() => fetchJobs()} />
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <JobCard job={job} onMatch={(id) => navigate(`/jobs/${id}/match`)} onView={(id) => navigate(`/jobs/${id}`)} />
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
                minLength: { value: 20, message: 'Please provide more detail (min 20 characters)' }
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseModal} color="inherit">Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Job'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Jobs;