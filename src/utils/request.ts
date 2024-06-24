import axios from 'axios';
import { Toast } from '@douyinfe/semi-ui';
import cloneDeep from 'lodash-es/cloneDeep';
import { ENV } from './env';
// windows中这样使用lodash-es报错
// import { cloneDeep } from 'lodash-es';

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
    } else {
      const msg = response.data?.message;
      if (msg) {
        Toast.error(msg);
      }
    }
  },
);

export default request;
