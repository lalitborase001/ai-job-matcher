import React from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

const JobFilters = ({ filters, setFilters, onSearch }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <TextField size="small" label="Search jobs..." value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} sx={{ minWidth: 220 }} />
      <TextField size="small" label="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} sx={{ minWidth: 160 }} />
      <TextField size="small" select label="Sort" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} sx={{ minWidth: 160 }}>
        <MenuItem value="relevance">Relevance</MenuItem>
        <MenuItem value="recent">Most Recent</MenuItem>
      </TextField>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" onClick={onSearch}>Search</Button>
      </Box>
    </Box>
  );
};

export default JobFilters;
