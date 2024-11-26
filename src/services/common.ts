import request from '@/utils/request';

export const getInfo = () => {
  return request.get('/api/v2/info');
};
export const login = (data: any) => {
  return request.post('/auth', data);
};
