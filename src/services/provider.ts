import request from '@/utils/request';

export interface AllProviderParams {
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
export const updateProvider = (data: any) => {
  return request.put('/provider/', data);
};
// 新增节点预设
export const createProvider = (data: any) => {
  return request.post('/provider/', data);
};
// 获取节点预设
export const getProviderItem = (id: string) => {
  return request.get(`/provider/${id}`);
};
// 删除节点预设
export const deleteProvider = (ids: string) => {
  return request.delete(`/provider/`, { params: { ids } });
};
