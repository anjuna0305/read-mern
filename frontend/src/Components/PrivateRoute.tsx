import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: 'admin' | 'cashier' | 'stock_manager';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  const [authStateChecked, setAuthStateChecked] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        return <Navigate to="/login" />;
      } else if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
      }
      setAuthStateChecked(true);
    };
    checkAuth();
  }, [isAuthenticated, user, requiredRole]);

  if (!authStateChecked) {
    return null; 
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
