import axios from 'axios';
import { ENV } from './env';

const request = axios.create({
  baseURL: ENV.isProd ? undefined : 'http://127.0.0.1:8419',
  headers: {
    Authorization: 'Basic a2Fuc29rdToxMjM0NTY=',
  },
});

export default request;
