import React, { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Provider/AuthProvider';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
