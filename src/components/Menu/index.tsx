import { Nav } from '@douyinfe/semi-ui';
import { IconConfig } from '@douyinfe/semi-icons-lab';
import { useMatches, useNavigate } from '@modern-js/runtime/router';
import { useMemo } from 'react';
import styles from './index.module.scss';

function Menu() {
  const navigate = useNavigate();
  const matches = useMatches();
  const pathKey = matches[matches?.length - 1]?.pathname;
  const menuItems = useMemo(() => {
    return [{ itemKey: '/setting', text: '设置', icon: <IconConfig /> }];
  }, []);

  return (
    <div className={styles.menu}>
      <Nav
        defaultSelectedKeys={[pathKey]}
        style={{ height: 'calc(100vh - 60px)' }}
        items={menuItems}
        footer={{
          collapseButton: true,
        }}
        onClick={data => {
          navigate(data.itemKey as string);
        }}
      />
    </div>
  );
}

export default Menu;
