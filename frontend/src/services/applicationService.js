import axiosInstance from '../api/axiosInstance';

// Removed userId from parameters
export const applyForJobAPI = async (jobId, resumeId, matchScore) => {
  const response = await axiosInstance.post('/api/applications/apply', null, {
    params: {
      jobId: jobId,
      resumeId: resumeId,
      matchScore: matchScore
    }
  });
  return response.data;
};

// Changed endpoint to /my-history and removed userId parameter
export const getMyApplicationsAPI = async () => {
  const response = await axiosInstance.get('/api/applications/my-history');
  return response.data;
};