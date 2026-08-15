import axios from 'axios';

const API_URL = 'http://localhost:8080/api/platforms';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getUserPlatformsAPI = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

export const connectPlatformAPI = async (platformName) => {
  const response = await axios.post(`${API_URL}/${platformName}/connect`, {}, getAuthHeader());
  return response.data;
};

export const disconnectPlatformAPI = async (platformName) => {
  const response = await axios.post(`${API_URL}/${platformName}/disconnect`, {}, getAuthHeader());
  return response.data;
};
