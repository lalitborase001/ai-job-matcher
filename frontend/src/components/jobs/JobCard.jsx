import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip, CircularProgress } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessIcon from '@mui/icons-material/Business';

const JobCard = ({ job, onMatch, onView, matchScore = null }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.25 }} noWrap title={job.title}>
            {job.title}
          </Typography>
          {matchScore !== null && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'primary.50', color: 'primary.main', px: 1, py: 0.5, borderRadius: 1, ml: 1 }}>
              <AutoAwesomeIcon fontSize="small" />
              <Typography variant="caption" sx={{ fontWeight: 800 }}>{matchScore}%</Typography>
            </Box>
          )}
        </Box>
        {job.company && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BusinessIcon fontSize="small" /> {job.company}
          </Typography>
        )}

        {job.tags?.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
            {job.tags.slice(0, 3).map((t) => (
              <Chip key={t} label={t} size="small" />
            ))}
          </Box>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {job.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOnOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">{job.location || 'Remote'}</Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Button size="small" variant="outlined" onClick={() => onView(job.id)}>View Details</Button>
        <Button size="small" variant="contained" startIcon={<AutoAwesomeIcon fontSize="small" />} onClick={() => onMatch(job.id)}>
          {matchScore !== null ? 'Prepare Application' : 'AI Match'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;