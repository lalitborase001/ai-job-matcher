import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, Grid } from '@mui/material';
import { getMyApplicationsAPI } from '../services/applicationService';
import axiosInstance from '../api/axiosInstance'; 
import MatchHistoryChart from '../components/charts/MatchHistoryChart';
import StatCard from '../components/dashboard/StatCard';
import PageHeader from '../components/common/PageHeader';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InsightsIcon from '@mui/icons-material/Insights';
import RecommendIcon from '@mui/icons-material/Recommend';
import LinkIcon from '@mui/icons-material/Link';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalApplications: 0, averageMatchScore: 0, topMatchScore: 0, pendingApplications: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
        subtitle="Your AI job search is ready."
      />

      {loading ? (
        <Loading message="Loading dashboard..." />
      ) : error ? (
        <EmptyState title="Something went wrong" subtitle={error} actionLabel="Try Again" onAction={() => window.location.reload()} />
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Resume Score" value={stats.resumeScore ?? '85/100'} subtitle="AI evaluated" icon={<svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#E8F8F5"/></svg>} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Jobs Matched" value={stats.jobsMatched ?? '12'} subtitle="High compatibility" icon={<svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#E8F0FE"/></svg>} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Applications" value={stats.totalApplications ?? '0'} subtitle="Tracked" icon={<svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#FFF4E5"/></svg>} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard label="Interviews" value={stats.interviews ?? '0'} subtitle="Scheduled" icon={<svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#F5F3FF"/></svg>} />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(15,23,42,0.06)', height: '100%', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.1)' } }} onClick={() => navigate('/jobs/recommended')}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}><RecommendIcon color="primary" /> Recommended Jobs</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Discover jobs matched specifically to your extracted skills and experience.</Typography>
                <Chip label="12 New Matches" color="primary" size="small" />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(15,23,42,0.06)', height: '100%', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.1)' } }} onClick={() => navigate('/resume-intelligence')}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}><InsightsIcon color="primary" /> Resume Insights</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>View your AI candidate profile and improve missing keywords.</Typography>
                <Chip label="Score: 85/100" color="success" size="small" variant="outlined" />
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Application Activity</Typography>
          </Box>

          {history.length === 0 ? (
            <EmptyState title="No applications yet" subtitle="Apply to jobs and save matches to see them here." actionLabel="Browse Jobs" onAction={() => window.location.assign('/jobs')} />
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid rgba(15,23,42,0.06)', overflow: 'hidden' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: '#F1F5F9' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#64748B', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, py: 2, px: 3 }}>Company</TableCell>
                    <TableCell sx={{ color: '#64748B', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, py: 2, px: 3 }}>Job</TableCell>
                    <TableCell sx={{ color: '#64748B', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, py: 2, px: 3 }}>Resume</TableCell>
                    <TableCell align="center" sx={{ color: '#64748B', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, py: 2, px: 3 }}>AI Match</TableCell>
                    <TableCell align="center" sx={{ color: '#64748B', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, py: 2, px: 3 }}>Status</TableCell>
                    <TableCell align="right" sx={{ color: '#64748B', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, py: 2, px: 3 }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((row) => (
                    <TableRow hover key={row.applicationId} sx={{ '& td, & th': { borderBottom: '1px solid rgba(15,23,42,0.04)', py: 2, px: 3 }, '&:last-child td, &:last-child th': { border: 0 } }}>
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

          <Grid container spacing={4} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(15,23,42,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.1)' } }} onClick={() => navigate('/platforms')}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}><LinkIcon color="primary" /> Connected Platforms</Typography>
                  <Typography variant="body2" color="text.secondary">Connect LinkedIn, Indeed, and more to unify your job search.</Typography>
                </Box>
                <Chip label="Manage" variant="outlined" />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}