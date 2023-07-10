import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://192.168.1.106:3333',
});
