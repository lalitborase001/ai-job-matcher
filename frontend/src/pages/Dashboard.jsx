import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, Grid } from '@mui/material';
import { getMyApplicationsAPI } from '../services/applicationService';
import { getDashboardStatsAPI } from '../services/dashboardService';
import { getScoreColor } from '../utils/matchScore';
import MatchHistoryChart from '../components/charts/MatchHistoryChart';
import StatCard from '../components/dashboard/StatCard';
import PageHeader from '../components/common/PageHeader';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import InsightsIcon from '@mui/icons-material/Insights';
import RecommendIcon from '@mui/icons-material/Recommend';
import LinkIcon from '@mui/icons-material/Link';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    averageMatchScore: 0,
    topMatchScore: 0,
    pendingApplications: 0,
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
        setStats(statsData || { totalApplications: 0, averageMatchScore: 0, topMatchScore: 0, pendingApplications: 0 });
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
      <EmptyState title="Something went wrong" subtitle={error} actionLabel="Try Again" onAction={() => window.location.reload()} />
    );
  }

  const greeting = new Date().getHours() < 12 ? 'morning' : 'afternoon';

  return (
    <Box>
      <PageHeader
        title={`Good ${greeting}, ${user?.name || 'User'} 👋`}
        subtitle="Turn your resume into your career advantage — track matches, applications, and insights in one place."
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Average Match"
            value={`${stats.averageMatchScore ?? 0}%`}
            subtitle="Across applications"
            color="warning"
            icon={<TrendingUpOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Top Score"
            value={`${stats.topMatchScore ?? 0}%`}
            subtitle="Your best fit so far"
            color="success"
            icon={<EmojiEventsOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Applications"
            value={stats.totalApplications ?? 0}
            subtitle="Tracked so far"
            color="primary"
            icon={<AssignmentTurnedInOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Pending Reviews"
            value={stats.pendingApplications ?? 0}
            subtitle="Awaiting response"
            color="secondary"
            icon={<HourglassEmptyOutlinedIcon />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3, borderRadius: 4, border: '1px solid rgba(15,23,42,0.06)', height: '100%',
              cursor: 'pointer', transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.1)' },
            }}
            onClick={() => navigate('/jobs/recommended')}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <RecommendIcon color="primary" /> Recommended Jobs
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Discover roles matched to your extracted skills and experience.
            </Typography>
            <Chip label={`${history.length} Saved Matches`} color="primary" size="small" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3, borderRadius: 4, border: '1px solid rgba(15,23,42,0.06)', height: '100%',
              cursor: 'pointer', transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.1)' },
            }}
            onClick={() => navigate('/resume-intelligence')}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <InsightsIcon color="primary" /> Resume Insights
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              See where your experience stands out, and close the gaps that matter.
            </Typography>
            <Chip
              label={stats.topMatchScore ? `Top Score: ${stats.topMatchScore}%` : 'No score yet'}
              color="success"
              size="small"
              variant="outlined"
            />
          </Paper>
        </Grid>
      </Grid>

      {history.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <MatchHistoryChart data={history} />
        </Box>
      )}

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Application Activity</Typography>

      {history.length === 0 ? (
        <EmptyState
          title="No applications yet"
          subtitle="Apply to jobs and save matches to see your activity here."
          actionLabel="Discover Your Next Opportunity"
          onAction={() => navigate('/jobs')}
        />
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid rgba(15,23,42,0.06)', overflow: 'auto', mb: 4 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#F1F5F9' }}>
              <TableRow>
                {['Company', 'Job', 'Resume', 'AI Match', 'Status', 'Date'].map((col, i) => (
                  <TableCell
                    key={col}
                    align={i === 3 || i === 4 ? 'center' : i === 5 ? 'right' : 'left'}
                    sx={{ color: '#64748B', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, py: 2, px: 3 }}
                  >
                    {col}
                  </TableCell>
                ))}
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
                    <Chip label={row.status || 'Applied'} color="primary" size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="right">{row.appliedDate ? new Date(row.appliedDate).toLocaleDateString() : '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Paper
        elevation={0}
        sx={{
          p: 3, borderRadius: 4, border: '1px solid rgba(15,23,42,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', transition: 'all 0.2s',
          '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.1)' },
        }}
        onClick={() => navigate('/platforms')}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinkIcon color="primary" /> Connected Platforms
          </Typography>
          <Typography variant="body2" color="text.secondary">Unify your job search as platform integrations become available.</Typography>
        </Box>
        <Chip label="Manage" variant="outlined" />
      </Paper>
    </Box>
  );
}