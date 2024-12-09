import request from '@/utils/request';

export const getProviderSchema = (type: string) => {
  return request.get(`/schema/provider/${type}`, {});
};
// 获取任务流执行schema
export const getTaskFlowSchema = (type?: string) => {
  return request.get(`/schema/taskflow/task`, {});
};
