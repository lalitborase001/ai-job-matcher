import axiosInstance from '../api/axiosInstance';

// Uses the shared axiosInstance (same JWT-attach + 401-handling interceptor
// as every other service) instead of a standalone axios call with its own
// duplicated auth-header logic.
export const getUserPlatformsAPI = async () => {
  const response = await axiosInstance.get('/api/platforms');
  return response.data;
};

export const connectPlatformAPI = async (platformName) => {
  const response = await axiosInstance.post(`/api/platforms/${platformName}/connect`, {});
  return response.data;
};

export const disconnectPlatformAPI = async (platformName) => {
  const response = await axiosInstance.post(`/api/platforms/${platformName}/disconnect`, {});
  return response.data;
};