import request from '@/utils/request';

interface AllProviderParams {
  enable?: boolean;
  provider_type?: string;
  query?: string;
  type?: string;
}
// 获取节点预设列表
export const getAllProvider = (params?: AllProviderParams) => {
  return request.get('/provider/', {
    params,
  });
};

// 修改节点预设
export const updateProvider = (params: any) => {
  return request.put('/provider', params);
};
