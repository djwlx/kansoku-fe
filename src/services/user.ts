import request from '@/utils/request';

export const login = (data: any) => {
  return request.post('/api/v1/auth', data);
};
