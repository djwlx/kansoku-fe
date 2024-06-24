import { Outlet } from '@modern-js/runtime/router';
import '@/styles/index.css';
import { ConfigProvider } from '@douyinfe/semi-ui';
import { useEffect } from 'react';
import { useModel } from '@modern-js/runtime/model';
import configModel from '@/model/config';

function Layout() {
  const [{ theme }] = useModel(configModel);

  useEffect(() => {
    document.body.setAttribute('theme-mode', theme);
  }, []);

  return (
    <ConfigProvider>
      <Outlet />
    </ConfigProvider>
  );
}

export default Layout;
