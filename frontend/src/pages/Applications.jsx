import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Box, Grid,
} from '@mui/material';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import { getMyApplicationsAPI } from '../services/applicationService';
import { getDashboardStatsAPI } from '../services/dashboardService';
import { getScoreColor } from '../utils/matchScore';

import StatCard from '../components/dashboard/StatCard';
import PageHeader from '../components/common/PageHeader';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    averageMatchScore: 0,
    topMatchScore: 0,
    totalResumes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [historyData, statsData] = await Promise.all([
          getMyApplicationsAPI(),
          getDashboardStatsAPI(),
        ]);
        setHistory(
          Array.isArray(historyData)
            ? [...historyData].sort((a, b) => (b.applicationId || 0) - (a.applicationId || 0))
            : []
        );
        setStats(statsData || {});
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError("We couldn't load your dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading message="Loading dashboard..." />;
  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        subtitle={error}
        actionLabel="Try Again"
        onAction={() => window.location.reload()}
      />
    );
  }

  const greeting = new Date().getHours() < 12 ? 'morning' : 'afternoon';

  return (
    <Box>
      <PageHeader
        title={`Good ${greeting}, ${user?.name || 'User'} 👋`}
        subtitle="Track your applications, improve your resume, and find jobs that match your skills."
      />

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Applications"
            value={stats.totalApplications ?? '—'}
            subtitle={stats.totalThisMonth ? `+${stats.totalThisMonth} this month` : undefined}
            color="primary"
            icon={<AssignmentTurnedInOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Average Match"
            value={stats.averageMatchScore != null ? `${stats.averageMatchScore}%` : '—'}
            subtitle="Across recent applications"
            color="warning"
            icon={<TrendingUpOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Best Match"
            value={stats.topMatchScore != null ? `${stats.topMatchScore}%` : '—'}
            subtitle="Highest score"
            color="success"
            icon={<EmojiEventsOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Resumes"
            value={stats.totalResumes ?? '—'}
            subtitle="Uploaded"
            color="secondary"
            icon={<DescriptionOutlinedIcon />}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Recent Applications
      </Typography>

      {history.length === 0 ? (
        <EmptyState
          title="No applications yet"
          subtitle="Apply to jobs and save matches to see them here."
          actionLabel="Browse Jobs"
          onAction={() => navigate('/jobs')}
        />
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ borderRadius: 3, border: '1px solid rgba(15,23,42,0.08)', overflow: 'auto' }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                {['Company', 'Job', 'Resume', 'AI Match', 'Status', 'Date'].map((col, i) => (
                  <TableCell
                    key={col}
                    align={i === 3 ? 'center' : i === 5 ? 'right' : 'left'}
                    sx={{
                      color: '#64748B',
                      fontSize: '0.75rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      py: 1.75,
                      px: 3,
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow
                  hover
                  key={row.applicationId}
                  sx={{
                    '& td, & th': { borderBottom: '1px solid rgba(15,23,42,0.06)', py: 1.75, px: 3 },
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{row.company}</TableCell>
                  <TableCell>{row.jobTitle}</TableCell>
                  <TableCell>{row.resumeFileName}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.matchScore != null ? `${row.matchScore}%` : '—'}
                      color={getScoreColor(row.matchScore)}
                      variant={row.matchScore >= 80 ? 'filled' : 'outlined'}
                      size="small"
                      sx={{ fontWeight: 700, minWidth: 64 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={row.status || '—'} color="primary" size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="right">
                    {row.appliedDate ? new Date(row.appliedDate).toLocaleDateString() : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}