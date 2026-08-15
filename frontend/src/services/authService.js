import axiosInstance from '../api/axiosInstance';
import { getEmailFromToken } from '../utils/jwt';

export const loginAPI = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

// Backend has no /api/users/me, so we decode the JWT for the email claim
// and match it against the user list. Centralized here so Login and
// MainLayout don't each re-implement this.
export const getCurrentUserAPI = async (token) => {
  const email = await getEmailFromToken(token);
  if (!email) return null;

  try {
    const usersResp = await axiosInstance.get('/api/users');
    const users = usersResp.data || [];
    return users.find((u) => String(u.email).toLowerCase() === email.toLowerCase()) || null;
  } catch (err) {
    return null;
  }
};