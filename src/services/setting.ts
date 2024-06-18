import request from '@/utils/request';

export const getConfig = () => {
  return request.get('/api/v1/config');
};

export const updateConfig = (config: Record<string, any>) => {
  return request.put('/api/v1/config', config);
};
