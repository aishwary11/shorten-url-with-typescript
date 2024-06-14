import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  cancelToken: axios.CancelToken.source().token,
});
axiosInstance.interceptors.response.use(
  response => response,
  error => toastError(error.response.data.msg),
);
export const toastSuccess = (msg: string): React.ReactNode => toast.success(msg);
export const toastError = (msg: string): React.ReactNode => toast.error(msg);

export const formattedDate = (dateString: string) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(new Date(dateString));
