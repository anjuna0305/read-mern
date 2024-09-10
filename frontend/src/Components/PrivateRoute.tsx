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
        console.log('Not authenticated');
      } else if (requiredRole && user.role !== requiredRole) {
        console.log('This is not for you :', user.role);
      }
      setAuthStateChecked(true);
    };
    
    checkAuth();
  }, [isAuthenticated, user, requiredRole]);

  if (!authStateChecked) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
