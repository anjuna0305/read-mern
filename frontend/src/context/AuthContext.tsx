import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const fetchCurrentUser = async () => {
        try {
          const response = await axiosInstance.get('/auth/me');
          if (response.data.user) {
            setIsAuthenticated(true);
            setUser(response.data.user);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setIsAuthenticated(false);
          setUser(null);
        }
      };
      fetchCurrentUser();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setIsAuthenticated(true);
      setUser(user);
    } catch (error: any) {
      console.error('Login failed', error.response?.data?.message);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('authToken');
      delete axiosInstance.defaults.headers.common['Authorization'];

      setIsAuthenticated(false);
      setUser(null);
    } catch (error: any) {
      console.error('Logout failed', error.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
