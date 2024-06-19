import request from '@/utils/request';

export const getConfig = (types?: string) => {
  return request.get('/api/v1/config', {
    params: {
      types,
    },
  });
};

export const updateConfig = (config: Record<string, any>) => {
  return request.put('/api/v1/config', config);
};
