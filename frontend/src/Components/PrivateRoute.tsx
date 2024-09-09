import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: 'admin' | 'cashier' | 'stock_manager';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    console.log('User is not authenticated');
    return <Navigate to="/login" />;
  }

  else if (requiredRole && user.role !== requiredRole) {
    console.log('User is not authorized');
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
