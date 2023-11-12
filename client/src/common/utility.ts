import axios from "axios";
import React from "react";
import { toast, ToastOptions } from "react-toastify";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    cancelToken: axios.CancelToken.source().token
});

const toastConfig: ToastOptions = {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "colored"
};

export const toastSuccess = (msg: string): React.ReactText => toast.success(msg, toastConfig);
export const toastError = (msg: string): React.ReactText => toast.error(msg, toastConfig);

export const formattedDate = (dateString: string) => new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
}).format(new Date(dateString));