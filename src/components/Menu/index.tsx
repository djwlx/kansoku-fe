import { Nav } from '@douyinfe/semi-ui';
import { IconConfig } from '@douyinfe/semi-icons-lab';
import { useMatches, useNavigate } from '@modern-js/runtime/router';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';

interface MenuProps {
  collapseButton?: boolean;
  border?: boolean;
  onSelect?: () => void;
  style?: React.CSSProperties;
}
function Menu(props: MenuProps) {
  const { collapseButton = true, border = true, onSelect, style } = props;
  const navigate = useNavigate();
  const matches = useMatches();
  const pathKey: string = matches[matches?.length - 1]?.pathname;
  const [selectKeys, setSelectKeys] = useState<string[]>([]);

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
            itemKey: '/setting/provider',
            text: '节点预设',
          },
          // {
          //   itemKey: '/setting/template',
          //   text: '配置模板',
          // },
          {
            itemKey: '/setting/workflow',
            text: '工作流',
          },
        ],
      },
    ];
  }, []);

  useEffect(() => {
    setSelectKeys([pathKey]);
  }, [pathKey]);

  return (
    <div>
      <Nav
        selectedKeys={selectKeys}
        className={!border ? styles.menu : ''}
        defaultSelectedKeys={[pathKey]}
        style={style}
        items={menuItems}
        footer={{
          collapseButton,
        }}
        onSelect={data => {
          navigate(data.itemKey as string);
          onSelect?.();
        }}
      />
    </div>
  );
}

export default Menu;
