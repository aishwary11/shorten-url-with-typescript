import axios from "axios";
import { toast, ToastOptions } from "react-toastify";

export const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

const toastConfig = {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "colored"
} as ToastOptions;
export const toastSuccess = (msg: string) => toast.success(msg, toastConfig);
export const toastError = (msg: string) => toast.error(msg, toastConfig);