import { model } from '@modern-js/runtime/model';

interface ConfigState {
  theme: 'light' | 'dark';
}

const configModel = model<ConfigState>('config').define({
  state: {
    theme: 'light',
  },
  actions: {
    setTheme: (state, payload: ConfigState['theme']) => {
      document.body.setAttribute('theme-mode', payload);
      state.theme = payload;
    },
  },
});

export default configModel;
