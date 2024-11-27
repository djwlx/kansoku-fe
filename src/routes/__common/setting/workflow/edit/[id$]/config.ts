export const processSettingConfig = {
  node: {
    width: 200,
    height: 100,
    shape: 'process-node',
  },
  padding: 20,
  edgeShape: 'process-edge',
  connectorShape: 'process-connector',
};
export type ProgressType = 'basic' | 'progress';
export interface ProgressData {
  basic?: {
    type?: string;
    enable?: string;
    name?: string;
  };
  flows?: any[];
}
// 按照顺序
export const stepConfig = [
  {
    label: '基础信息填写',
    value: 0,
  },
  {
    label: '流程配置',
    value: 1,
  },
];
