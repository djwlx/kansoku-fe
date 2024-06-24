import { Outlet } from '@modern-js/runtime/router';
import '@/styles/index.css';
import './index.css';
import { ConfigProvider } from '@douyinfe/semi-ui';

function Layout() {
  // document.body.setAttribute('theme-mode', 'dark');
  return (
    <ConfigProvider>
      <Outlet />
    </ConfigProvider>
  );
}

export default Layout;
