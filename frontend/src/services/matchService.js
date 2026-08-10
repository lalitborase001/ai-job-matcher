import axiosInstance from '../api/axiosInstance';

export const generateMatchAPI = async (jobId, resumeId) => {
  const response = await axiosInstance.post('/api/match', {
    jobId: jobId,
    resumeId: resumeId
  });
  return response.data;
};