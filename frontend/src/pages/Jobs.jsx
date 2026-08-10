import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Typography, Button, Grid, Card, CardContent, CardActions, 
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, CircularProgress, Alert, Fab
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getJobsAPI, createJobAPI, deleteJobAPI } from '../services/jobService';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const data = await getJobsAPI();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
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
      console.error("Failed to create job:", err);
      setError('Failed to save the job description.');
    }
  };

  const handleDelete = async (id) => {
    try {
      setJobs(jobs.filter(job => job.id !== id));
      await deleteJobAPI(id);
    } catch (err) {
      console.error("Failed to delete job:", err);
      fetchJobs();
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', minHeight: '80vh' }}>
      <Typography variant="h4" gutterBottom>
        Job Descriptions
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your target job descriptions here. Add a new job to start matching it against your resumes.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {jobs.length === 0 && !error ? (
        <Box sx={{ textAlign: 'center', mt: 5, p: 5, border: '1px dashed grey', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary">
            No jobs found. Click the + button to add one!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom noWrap>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {job.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', borderTop: '1px solid #eee' }}>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/jobs/${job.id}/match`)}
                  >
                    Match Resume
                  </Button>
                  <IconButton size="small" color="error" onClick={() => handleDelete(job.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
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