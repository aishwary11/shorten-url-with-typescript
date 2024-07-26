import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import constant from '../common/constant';
import { RootState } from '../common/types';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem(constant.token);
  const userData: any = useSelector<RootState>(state => state.user);
  if (!token && !userData.isLoggedIn)
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
