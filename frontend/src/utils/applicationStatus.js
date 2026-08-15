const STATUS_COLORS = {
  applied: 'info',
  reviewing: 'warning',
  shortlisted: 'primary',
  accepted: 'success',
  rejected: 'error',
};

export const getStatusColor = (status) => STATUS_COLORS[(status || '').toLowerCase()] || 'default';