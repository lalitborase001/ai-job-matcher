import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ai';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const generateResumeIntelligence = async (resumeId) => {
  const response = await axios.post(`${API_URL}/resume-intelligence/${resumeId}`, {}, getAuthHeader());
  return response.data;
};

export const getResumeIntelligence = async (resumeId) => {
  const response = await axios.get(`${API_URL}/resume-intelligence/${resumeId}`, getAuthHeader());
  return response.data;
};

export const analyzeResumeJobMatch = async (resumeId, jobId) => {
  const response = await axios.post(`${API_URL}/analyze/${resumeId}/${jobId}`, {}, getAuthHeader());
  return response.data;
};
