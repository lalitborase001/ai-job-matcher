import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const JobCard = ({ job, onMatch, onView }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 400ms ease-in-out, box-shadow 400ms ease-in-out' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>{job.title}</Typography>
          {job.tags?.slice(0,3).map((t) => (<Chip key={t} label={t} size="small" sx={{ ml: 0.5 }} />))}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {job.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">{job.location || 'Remote'}</Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button size="small" variant="outlined" onClick={() => onView(job.id)}>View Details</Button>
        <Button size="small" variant="contained" onClick={() => onMatch(job.id)}>AI Match</Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
