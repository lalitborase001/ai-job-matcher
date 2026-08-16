import axiosInstance from '../api/axiosInstance';

export const generateResumeIntelligence = async (resumeId) => {
  const response = await axiosInstance.post(`/api/ai/resume-intelligence/${resumeId}`, {});
  return response.data;
};

export const getResumeIntelligence = async (resumeId) => {
  const response = await axiosInstance.get(`/api/ai/resume-intelligence/${resumeId}`);
  return response.data;
};

export const analyzeResumeJobMatch = async (resumeId, jobId) => {
  const response = await axiosInstance.post(`/api/ai/analyze/${resumeId}/${jobId}`, {});
  return response.data;
};