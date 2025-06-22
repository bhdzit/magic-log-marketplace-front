import { type InternalAxiosRequestConfig, AxiosError } from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const requestError = (error: AxiosError) => {
  console.log("error");
  return Promise.reject(error);
};

export const responseError = (error: AxiosError) => {
  if (error.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  }
  return Promise.reject(error);
};
