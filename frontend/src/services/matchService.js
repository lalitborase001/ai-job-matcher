import axiosInstance from '../api/axiosInstance';

export const generateMatchAPI = async (jobId, resumeId) => {
  const response = await axiosInstance.post(`/api/ai/analyze/${resumeId}/${jobId}`);
  
  return response.data;
};