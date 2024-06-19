import React from 'react';
import { Navigate } from 'react-router-dom';
import constant from '../common/constant';

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => (localStorage.getItem(constant.token) ? <>{children}</> : <Navigate to="/login" />);

export default ProtectedRoutes;
