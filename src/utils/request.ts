import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import { ENV } from './env';

const request = axios.create({
  baseURL: ENV.isProd ? undefined : 'http://127.0.0.1:8419',
});

request.interceptors.request.use(config => {
  const headers = cloneDeep(config.headers || {});
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = token;
  }
  config.headers = headers;
  return config;
});

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem('token');
      const path = window.location.pathname;
      window.location.href = `/login?redirect=${path}`;
    }
  },
);

export default request;
