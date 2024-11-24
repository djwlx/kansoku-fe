import request from '@/utils/request';

export const login = (data: any) => {
  return request.post('/api/v2/auth', data);
};
