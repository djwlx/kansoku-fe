import axios from 'axios';
import { Toast } from '@douyinfe/semi-ui';
import { ENV } from './env';
import { cloneDeep } from 'es-toolkit';

const request = axios.create({
  baseURL: ENV.isProd ? '/api/v2' : 'http://127.0.0.1:8419/api/v2',
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
    const { response, message } = error;
    if (response?.status === 401) {
      localStorage.removeItem('token');
      const path = window.location.pathname;
      window.location.href = `/login?redirect=${path}`;
    } else if (message) {
      Toast.error(message);
    } else {
      const msg = response.data?.message;
      if (msg) {
        Toast.error(msg);
      }
    }
  },
);

export default request;
