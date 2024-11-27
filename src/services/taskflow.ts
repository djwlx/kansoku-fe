import request from '@/utils/request';

// 获取任务流列表
export const getTaskFlowList = (params?: any) => {
  return request.get('/taskflow/', {
    params,
  });
};
// 获取单个任务流
export const getTaskFlowItem = (id: string) => {
  return request.get(`/taskflow/${id}`);
};
