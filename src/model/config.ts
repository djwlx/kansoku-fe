import { model } from '@modern-js/runtime/model';

interface ConfigState {
  // 主题
  theme: 'light' | 'dark';
  // 配置是否发生了变动
  config: {
    changed: boolean;
  };
}

const defaultTheme = localStorage.getItem('kansoku-theme');

const configModel = model<ConfigState>('config').define({
  state: {
    theme: defaultTheme || 'light',
    config: {
      changed: false,
    },
  },

  actions: {
    setTheme: (state, payload: ConfigState['theme']) => {
      document.body.setAttribute('theme-mode', payload);
      localStorage.setItem('kansoku-theme', payload);
      state.theme = payload;
    },
    setConfig: (state, payload: ConfigState['config']) => {
      state.config = payload;
    },
  },
});

export default configModel;
