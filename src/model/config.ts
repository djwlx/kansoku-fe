import {
  applyConfig as applyConfigService,
  getConfigStatus as getConfigStatusService,
  revertConfig as revertConfigService,
} from '@/services/config';
import { Toast } from '@douyinfe/semi-ui';
import { handleEffect, model } from '@modern-js/runtime/model';

interface ConfigState {
  // 主题
  theme: 'light' | 'dark';
  // 配置是否发生了变动
  config: {
    changed: boolean;
    loading: boolean;
  };
}

const defaultTheme = localStorage.getItem('kansoku-theme');

const configModel = model<ConfigState>('config').define({
  state: {
    theme: defaultTheme || 'light',
    config: {
      changed: false,
      loading: false,
    },
  },

  actions: {
    setTheme: (state, payload: ConfigState['theme']) => {
      document.body.setAttribute('theme-mode', payload);
      localStorage.setItem('kansoku-theme', payload);
      state.theme = payload;
    },
    getConfigStatus: {
      ...handleEffect(),
      fulfilled(state, res) {
        state.config.changed = Boolean(res.data?.data.count);
      },
    },
    applyConfig: {
      ...handleEffect(),
      pending(state) {
        state.config.loading = true;
      },
      fulfilled(state, res) {
        Toast.success('应用成功');
        state.config.loading = false;
      },
    },
    revokeConfig: {
      ...handleEffect(),
      pending(state) {
        Toast.success('撤销成功');
        state.config.loading = true;
      },
      fulfilled(state, res) {
        state.config.loading = false;
      },
    },
  },

  effects: {
    // 获取配置变更状态
    async getConfigStatus() {
      return getConfigStatusService();
    },
    // 应用配置
    async applyConfig() {
      return applyConfigService();
    },
    // 撤销配置
    async revokeConfig() {
      return revertConfigService();
    },
  },
});

export default configModel;
