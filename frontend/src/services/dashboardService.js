import axiosInstance from '../api/axiosInstance';

export const getDashboardStatsAPI = async () => {
  const response = await axiosInstance.get('/dashboard/stats');
  return response.data;
};