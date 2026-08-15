import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const JobCard = ({ job, onMatch, onView }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.25 }} noWrap>
          {job.title}
        </Typography>
        {job.company && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {job.company}
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
          AI Match
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;