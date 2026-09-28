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

export const downloadResumeAPI = async (id, filename) => {
  const response = await axiosInstance.get(`/api/resume/${id}/download`, {
    responseType: 'blob'
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename || `resume_${id}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const viewResumeAPI = async (id) => {
  const response = await axiosInstance.get(`/api/resume/${id}/view`, {
    responseType: 'blob'
  });
  
  const file = new Blob([response.data], { type: response.headers['content-type'] });
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL, '_blank');
  
  setTimeout(() => {
    URL.revokeObjectURL(fileURL);
  }, 1000);
};