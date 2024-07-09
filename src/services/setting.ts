import request from '@/utils/request';

export type ConfigType = 'download' | 'source' | 'workflow';
// 获取常规配置
export const getCommonConfig = () => {
  return request.get('/api/v1/config/common');
};
// 更新常规配置
export const updateCommonConfig = (config: Record<string, any>) => {
  return request.put('/api/v1/config/common', {
    common: config,
  });
};

// 获取提供器配置
export const getProviderConfig = (type: ConfigType | ConfigType[]) => {
  const useType = Array.isArray(type) ? type.join(',') : type;
  return request.get('/api/v1/config/provider', {
    params: {
      types: useType,
    },
  });
};
// 新增提供器配置
export const addProviderConfig = (
  type: ConfigType,
  config: Record<string, any>,
) => {
  return request.post('/api/v1/config/provider', {
    config: {
      [type]: [config],
    },
  });
};
// 更新提供器配置
export const updateProviderConfig = (
  type: ConfigType,
  config: {
    id: string;
    [key: string]: any;
  },
) => {
  return request.put('/api/v1/config/provider', {
    config: {
      [type]: [config],
    },
  });
};
// 删除提供器配置
export const deleteProviderConfig = (
  type: ConfigType,
  ids: string | string[],
) => {
  const useIds = Array.isArray(ids) ? ids.join(',') : ids;
  return request.delete('/api/v1/config/provider', {
    params: {
      type,
      ids: useIds,
    },
  });
};

export const getConfigEnum = () => {
  return request.get('/api/v1/common/enum');
};

export const getInfo = () => {
  return request.get('/api/v1/common/info');
};
