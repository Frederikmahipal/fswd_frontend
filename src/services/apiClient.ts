import axios from 'axios';

const apiClient = axios.create({
 baseURL: 'http://localhost:8000',
 withCredentials: false,
 headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
 },
});


apiClient.interceptors.response.use(
   response => {
      return response;
   },
   async (error) => { 
      const status = error.response?.status;
      if (status >= 500 && status <= 599) {
        console.error('Server error:', error);
      } else {
        return Promise.reject(error);
      }
   },
  );
  
export default apiClient;
