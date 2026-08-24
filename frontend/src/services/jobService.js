import axiosInstance from '../api/axiosInstance';

export const getJobsAPI = async () => {
  const response = await axiosInstance.get('/api/jobs');
  return response.data;
};

export const getJobByIdAPI = async (id) => {
  const response = await axiosInstance.get(`/api/jobs/${id}`);
  return response.data;
};

export const createJobAPI = async (jobData) => {
  const response = await axiosInstance.post('/api/jobs', jobData);
  return response.data;
};

export const deleteJobAPI = async (id) => {
  const response = await axiosInstance.delete(`/api/jobs/${id}`);
  return response.data;
};

export const getRecommendedJobsAPI = async () => {
  const response = await axiosInstance.get('/api/jobs/recommended');
  return response.data;
};

export const searchLiveJobsAPI = async (title, location) => {
  const response = await axiosInstance.get('/api/jobs/live-search', {
    params: { title, location }
  });
  return response.data;
};