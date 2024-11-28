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

// 新增任务流
export const createTaskFlow = (data: any) => {
  return request.post('/taskflow/', data);
};
// 修改任务流
export const updateTaskFlow = (data: any) => {
  return request.put('/taskflow/', data);
};
// 批量删除任务流
export const deleteTaskFlow = (ids: string) => {
  return request.delete(`/taskflow/`, { params: { ids } });
};
