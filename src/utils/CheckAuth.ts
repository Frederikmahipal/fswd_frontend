import apiClient from '../services/apiClient';

const checkAuth = async (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>) => {
  let user = null;

  try {
    const response = await apiClient.get('/auth/check-auth');
    if (response.data.user) {
      setIsAuthenticated(true);
      user = response.data.user;
    } else {
      setIsAuthenticated(false);
    }
  } catch (error) {
    setIsAuthenticated(false);
  }

  return user;
};

export default checkAuth;