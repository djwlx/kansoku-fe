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
export type ProgressType = 'basic' | 'flows';
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
export const nodeStatus = [
  {
    label: '未配置',
    color: 'grey',
    value: 'unstart',
  },
  {
    label: '缺失配置',
    color: 'amber',
    value: 'cyan',
  },
  {
    label: '已完成',
    color: 'green',
    value: 'finished',
  },
];
export const nodeTypeList = [
  { label: '使用现有预设', value: 1 },
  { label: '复制已有预设', value: 2 },
  { label: '新增预设', value: 3 },
];
