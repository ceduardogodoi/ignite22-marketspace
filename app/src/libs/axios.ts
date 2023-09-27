import axios from 'axios';

import { AppError } from '../utils/AppError';

export const http = axios.create({
  baseURL: 'http://192.168.1.8:3333',
});

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.data) {
      const message = error.response.data.message;

      return Promise.reject(new AppError(message));
    }

    return Promise.reject(error);
  }
);
