import request from '@/utils/request';

export const getConfig = (types?: string) => {
  return request.get('/api/v1/config', {
    params: {
      types,
    },
  });
};

// 增量更新
export const updateConfig = (config: Record<string, any>) => {
  return request.put('/api/v1/config', config);
};

export const deleteConfig = (type: string, ids: string) => {
  return request.delete('/api/v1/config', {
    params: {
      type,
      ids,
    },
  });
};

export const addConfig = (config: Record<string, any>) => {
  return request.post('/api/v1/config', config);
};

export const getConfigEnum = () => {
  return request.get('/api/v1/enum');
};
