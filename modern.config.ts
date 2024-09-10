import { appTools, defineConfig } from '@modern-js/app-tools';
import SemiWebpackPlugin from '@douyinfe/semi-webpack-plugin';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  html: {
    title: 'kansoku',
    favicon: './src/static/logo.svg',
  },
  runtime: {
    router: true,
    state: true,
  },
  plugins: [
    appTools({
      bundler: 'webpack', // Set to 'experimental-rspack' to enable rspack ⚡️🦀
    }),
  ],
  tools: {
    webpack: (config, { appendPlugins }) => {
      // 添加单个插件
      appendPlugins([
        new SemiWebpackPlugin({
          theme: '@semi-bot/semi-theme-kansoku',
        }),
      ]);
    },
  },
  output: {
    disableTsChecker: true,
  },
});
