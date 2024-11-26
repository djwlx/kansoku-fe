import request from '@/utils/request';

// 获取节点枚举值
export const getProviderTypeList = () => {
  return request.get('/enum/provider');
};
// 获取任务流枚举值
export const getTaskFlowEnum = () => {
  return request.get('/enum/taskflow');
};
