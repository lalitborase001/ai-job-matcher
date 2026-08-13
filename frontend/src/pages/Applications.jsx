import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, CircularProgress } from '@mui/material';
import { getMyApplicationsAPI } from '../services/applicationService';
import PageHeader from '../components/common/PageHeader';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getMyApplicationsAPI();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load applications', err);
        setError('Unable to load applications.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loading message="Loading applications..." />;
  if (error) return <EmptyState title="Error" subtitle={error} actionLabel="Try Again" onAction={() => window.location.reload()} />;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader title="My Applications" subtitle="Track all your job applications in one place." />

      {applications.length === 0 ? (
        <EmptyState title="No applications yet" subtitle="Browse jobs and save matches to track them here." actionLabel="Browse Jobs" onAction={() => window.location.assign('/jobs')} />
      ) : (
        <Grid container spacing={2}>
          {applications.map((app) => (
            <Grid item xs={12} md={6} key={app.applicationId}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{app.jobTitle}</Typography>
                      <Typography variant="body2" color="text.secondary">{app.company}</Typography>
                      <Typography variant="caption" color="text.secondary">{app.resumeFileName}</Typography>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <Chip label={`${app.matchScore ?? '—'}%`} color={app.matchScore >= 80 ? 'success' : (app.matchScore >= 50 ? 'warning' : 'default')} sx={{ mb: 1, fontWeight: 700 }} />
                      <Typography variant="caption" display="block">{app.status}</Typography>
                      <Typography variant="caption" color="text.secondary">{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : '—'}</Typography>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Applications;
