import axiosInstance from '../api/axiosInstance';

export const applyForJobAPI = async (userId, jobId, resumeId, matchScore) => {
  const response = await axiosInstance.post('/api/applications/apply', null, {
    params: {
      userId: userId,
      jobId: jobId,
      resumeId: resumeId,
      matchScore: matchScore
    }
  });
  return response.data;
};