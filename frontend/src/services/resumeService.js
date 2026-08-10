import axiosInstance from '../api/axiosInstance';

export const uploadResumeAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // We MUST override the global application/json header here
  const response = await axiosInstance.post('/api/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};