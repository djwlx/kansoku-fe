import { model } from '@modern-js/runtime/model';

interface dataCacheState {
  // 主题
  theme: 'light' | 'dark';
  // 配置是否发生了变动
  config: {
    changed: boolean;
  };
}

const defaultTheme = localStorage.getItem('kansoku-theme');

const configModel = model<dataCacheState>('dataCache').define({
  state: {
    theme: defaultTheme || 'light',
    config: {
      changed: false,
    },
  },

  actions: {},
});

export default configModel;
