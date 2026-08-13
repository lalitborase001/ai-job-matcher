import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, Grid } from '@mui/material';
import { getMyApplicationsAPI } from '../services/applicationService';
import axiosInstance from '../api/axiosInstance'; 

import StatCard from '../components/dashboard/StatCard';
import PageHeader from '../components/common/PageHeader';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalApplications: 0, averageMatchScore: 0, topMatchScore: 0, pendingApplications: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [historyData, statsResponse] = await Promise.all([
          getMyApplicationsAPI(),
          axiosInstance.get('/dashboard/stats')
        ]);
        setHistory(Array.isArray(historyData) ? historyData.sort((a, b) => (b.applicationId || 0) - (a.applicationId || 0)) : []);
        setStats(statsResponse?.data || {});
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError('Unable to load dashboard. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <PageHeader
        title={`Good ${new Date().getHours() < 12 ? 'morning' : 'afternoon'}, ${user?.name || 'User'} 👋` }
        subtitle="Track your applications, improve your resume, and find jobs that match your skills."
      />

      {loading ? (
        <Loading message="Loading dashboard..." />
      ) : error ? (
        <EmptyState title="Something went wrong" subtitle={error} actionLabel="Try Again" onAction={() => window.location.reload()} />
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Total Applications" value={stats.totalApplications ?? '—'} subtitle={stats.totalThisMonth ? `+${stats.totalThisMonth} this month` : ''} icon={<svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#E8F0FE"/></svg>} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Average Match" value={stats.averageMatchScore ? `${stats.averageMatchScore}%` : '—'} subtitle="Across recent applications" icon={<svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#FFF4E5"/></svg>} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Best Match" value={stats.topMatchScore ? `${stats.topMatchScore}%` : '—'} subtitle="Highest score" icon={<svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#E8F8F5"/></svg>} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Resumes" value={stats.totalResumes ?? '—'} subtitle="Uploaded" icon={<svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#F5F3FF"/></svg>} />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Recent Applications</Typography>

          {history.length === 0 ? (
            <EmptyState title="No applications yet" subtitle="Apply to jobs and save matches to see them here." actionLabel="Browse Jobs" onAction={() => window.location.assign('/jobs')} />
          ) : (
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell><strong>Company</strong></TableCell>
                    <TableCell><strong>Job</strong></TableCell>
                    <TableCell><strong>Resume</strong></TableCell>
                    <TableCell align="center"><strong>AI Match</strong></TableCell>
                    <TableCell align="center"><strong>Status</strong></TableCell>
                    <TableCell align="right"><strong>Date</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((row) => (
                    <TableRow key={row.applicationId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ fontWeight: 600 }}>{row.company}</TableCell>
                      <TableCell>{row.jobTitle}</TableCell>
                      <TableCell>{row.resumeFileName}</TableCell>
                      <TableCell align="center">
                        <Chip label={`${row.matchScore ?? '—'}%`} color={getScoreColor(row.matchScore)} variant={row.matchScore >= 80 ? 'filled' : 'outlined'} sx={{ fontWeight: 700, minWidth: 76 }} />
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={row.status || '—'} color="primary" size="small" variant="outlined" />
                      </TableCell>
                      <TableCell align="right">{row.appliedDate ? new Date(row.appliedDate).toLocaleDateString() : '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Box>
  );
}