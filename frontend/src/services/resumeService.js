import axiosInstance from '../api/axiosInstance';

export const uploadResumeAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axiosInstance.post('/api/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

export const getResumesAPI = async () => {
  const response = await axiosInstance.get('/api/resume');
  return response.data;
};

export const deleteResumeAPI = async (id) => {
  const response = await axiosInstance.delete(`/api/resume/${id}`);
  return response.data;
};