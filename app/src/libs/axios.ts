import axios from 'axios';

import { AppError } from '../utils/AppError';

export const http = axios.create({
  // baseURL: 'http://192.168.1.21:3333',
  baseURL: 'http://192.168.1.106:3333',
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }

    return Promise.reject(error);
  }
)
