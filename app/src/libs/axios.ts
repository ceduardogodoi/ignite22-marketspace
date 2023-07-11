import axios from 'axios';

import { AppError } from '../utils/AppError';

export const http = axios.create({
  baseURL: 'http://192.168.1.106:3333',
});

http.interceptors.response.use(
  response => response,
  error => {
    console.log(JSON.stringify(error, null, 2));
    if (error.response?.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }

    return Promise.reject(error);
  }
)
