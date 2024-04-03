import apiClient from '../services/apiClient';

const checkAuth = async (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>) => {
    try {
      const response = await apiClient.get('/auth/check-auth');
      console.log('checkAuth response:', response);
      if (response.data.message === 'Authenticated') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

export default checkAuth;