// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const useAuth = () => {
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setAuthStatus({ loading: false, isAuthenticated: false, user: null });
        return;
      }

      try {
        const res = await axios.get('/profile');
        setAuthStatus({
          loading: false,
          isAuthenticated: true,
          user: res.data.data.profile
        });
      } catch (err) {
        localStorage.removeItem('authToken');
        setAuthStatus({ loading: false, isAuthenticated: false, user: null });
      }
    };

    checkAuth();
  }, []);

  return authStatus;
};

export default useAuth;
