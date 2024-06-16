import axios from 'axios';
import CryptoJS from 'crypto-js';
import React from 'react';
import { toast } from 'react-toastify';
import constant from './constant';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  cancelToken: axios.CancelToken.source().token,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem(constant.token)}`
  }
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

export const encryptData = (data: string) => {
  const encrypted = CryptoJS.AES.encrypt(data, import.meta.env.VITE_ENSECRET_KEY).toString();
  return encrypted;
};
export const decryptData = (encryptData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptData, import.meta.env.VITE_ENSECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
