import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ResumeSelector = ({ resumes, value, onChange }) => (
  <FormControl fullWidth>
    <InputLabel id="resume-select-label">Select Resume</InputLabel>
    <Select labelId="resume-select-label" value={value} label="Select Resume" onChange={(e) => onChange(e.target.value)}>
      {resumes.length === 0 ? (
        <MenuItem value="">No resumes available</MenuItem>
      ) : (
        resumes.map((r) => <MenuItem key={r.id} value={r.id}>{r.fileName}</MenuItem>)
      )}
    </Select>
  </FormControl>
);

export default ResumeSelector;
