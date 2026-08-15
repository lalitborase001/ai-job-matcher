export const getScoreColor = (score) => {
  const s = Number(score);
  if (!Number.isFinite(s)) return 'default';
  if (s >= 80) return 'success';
  if (s >= 50) return 'warning';
  return 'error';
};

export const getScoreLabel = (score) => {
  const s = Number(score);
  if (!Number.isFinite(s)) return 'No Score';
  if (s >= 85) return 'Excellent Match';
  if (s >= 70) return 'Good Match';
  if (s >= 40) return 'Moderate Match';
  return 'Weak Match';
};