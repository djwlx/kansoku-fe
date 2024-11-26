import request from '@/utils/request';

//应用配置变动
export const applyConfig = () => {
  return request.post('/config/apply');
};

// 获取常规设置
export const getCommonConfig = () => {
  return request.get('/config/common');
};

// 更新常规配置
export const updateCommonConfig = (config: Record<string, any>) => {
  return request.put('/config/common', {
    common: config,
  });
};
// 撤销配置
export const revertConfig = () => {
  return request.post('/config/revert');
};
// 获取配置变动状态
export const getConfigStatus = () => {
  return request.get('/config/status');
};
