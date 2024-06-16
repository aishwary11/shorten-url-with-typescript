import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import constant from '../common/constant';

const ProtectedRoutes: React.FC = () => {
  const user = localStorage.getItem(constant.token);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
