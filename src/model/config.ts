import { model } from '@modern-js/runtime/model';

interface ConfigState {
  theme: 'light' | 'dark';
}

const defaultTheme = localStorage.getItem('kansoku-theme');

const configModel = model<ConfigState>('config').define({
  state: {
    theme: defaultTheme || 'light',
  },

  actions: {
    setTheme: (state, payload: ConfigState['theme']) => {
      document.body.setAttribute('theme-mode', payload);
      localStorage.setItem('kansoku-theme', payload);
      state.theme = payload;
    },
  },
});

export default configModel;
