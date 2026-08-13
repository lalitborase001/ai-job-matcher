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