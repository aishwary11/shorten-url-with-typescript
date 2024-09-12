import constant from '@/common/constant.js';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem(constant.token);
  if (!token)
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  return <>{children}</>;
};

export default ProtectedRoutes;
