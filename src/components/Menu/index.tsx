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
    return [
      {
        itemKey: '/setting',
        text: '设置',
        icon: <IconConfig />,
        items: [
          {
            itemKey: '/setting/basic',
            text: '基本设置',
          },
          {
            itemKey: '/setting/download',
            text: '下载器设置',
          },
          {
            itemKey: '/setting/source',
            text: '源设置',
          },
          {
            itemKey: '/setting/workflow',
            text: '工作流设置',
          },
        ],
      },
    ];
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
        onSelect={data => {
          navigate(data.itemKey as string);
        }}
      />
    </div>
  );
}

export default Menu;