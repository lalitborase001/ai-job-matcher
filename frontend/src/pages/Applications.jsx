import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { getMyApplicationsAPI } from '../services/applicationService';
import { getScoreColor } from '../utils/matchScore';
import { getStatusColor } from '../utils/applicationStatus';
import PageHeader from '../components/common/PageHeader';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const Applications = () => {
  const navigate = useNavigate();
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
        setError("We couldn't load your applications.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loading message="Loading applications..." />;
  if (error) {
    return (
      <EmptyState title="Something went wrong" subtitle={error} actionLabel="Try Again" onAction={() => window.location.reload()} />
    );
  }

  return (
    <Box>
      <PageHeader title="My Applications" subtitle="Track all your job applications in one place." />

      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          subtitle="Browse jobs and save matches to track them here."
          actionLabel="Browse Jobs"
          onAction={() => navigate('/jobs')}
        />
      ) : (
        <Grid container spacing={2}>
          {applications.map((app) => (
            <Grid item xs={12} md={6} key={app.applicationId}>
              <Card>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>{app.jobTitle}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>{app.company}</Typography>
                      <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', mt: 0.5 }}>
                        {app.resumeFileName}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                      <Chip
                        label={app.matchScore != null ? `${app.matchScore}%` : '—'}
                        color={getScoreColor(app.matchScore)}
                        size="small"
                        sx={{ mb: 1, fontWeight: 700 }}
                      />
                      <Chip label={app.status || 'Applied'} color={getStatusColor(app.status)} size="small" sx={{ display: 'block', mb: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : '—'}
                      </Typography>
                    </Box>
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