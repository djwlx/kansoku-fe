import {
  IconAlertCircle,
  IconExit,
  IconGithubLogo,
  IconInfoCircle,
  IconList,
  IconMoon,
  IconSun,
} from '@douyinfe/semi-icons';
import {
  Button,
  Popconfirm,
  Popover,
  SideSheet,
  Space,
  Spin,
  Tag,
} from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';
import styles from './index.module.scss';
import { useModalHook } from 'djwl-module';
import { Menu } from '@/components';
import { useModel } from '@modern-js/runtime/model';
import configModel from '@/model/config';
import { useEffect } from 'react';

interface HeaderProps {
  device: 'pc' | 'ph';
}
function Header(props: HeaderProps) {
  const { device } = props;
  const { setModalData, visible, closeModal } = useModalHook();
  const navigate = useNavigate();
  const [{ theme, config }, actions] = useModel(configModel);

  const exit = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const revoke = async () => {
    await actions.revokeConfig();
    actions.getConfigStatus();
  };

  const apply = async () => {
    await actions.applyConfig();
    actions.getConfigStatus();
  };

  useEffect(() => {
    actions.getConfigStatus();
  }, []);

  return (
    <header className={styles.header}>
      {device === 'ph' && (
        <IconList
          style={{ cursor: 'pointer' }}
          onClick={() => setModalData('open')}
        />
      )}
      <span className={styles.titleSpan} onClick={() => navigate('/')}>
        Kansoku
      </span>
      <Space spacing={20}>
        {config.changed && !config.loading && (
          <Popover
            clickToHide
            content={
              <div style={{ padding: 16, width: 220 }}>
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    margin: '6px 0',
                    marginBottom: 16,
                  }}
                >
                  <IconAlertCircle
                    size="large"
                    style={{ color: 'var(--semi-color-warning)' }}
                  />
                  配置发生变动，是否应用变更?
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button size="small">取消</Button>
                  <Space>
                    <Button
                      size="small"
                      type="secondary"
                      theme="solid"
                      onClick={revoke}
                    >
                      撤销
                    </Button>
                    <Button onClick={apply} size="small" theme="solid">
                      应用
                    </Button>
                  </Space>
                </div>
              </div>
            }
          >
            <IconInfoCircle style={{ color: 'red' }} />
          </Popover>
        )}
        {config.loading && <Spin />}
        <IconGithubLogo
          style={{ cursor: 'pointer' }}
          onClick={() => window.open('https://github.com/wetor/kansoku')}
        />
        {theme === 'dark' && (
          <IconSun
            style={{ cursor: 'pointer' }}
            onClick={() => actions.setTheme('light')}
          />
        )}
        {theme === 'light' && (
          <IconMoon
            style={{ cursor: 'pointer' }}
            onClick={() => actions.setTheme('dark')}
          />
        )}
        <IconExit style={{ cursor: 'pointer' }} onClick={exit} />
      </Space>
      <SideSheet
        placement="left"
        title="菜单"
        visible={visible}
        onCancel={closeModal}
        width={300}
      >
        <Menu
          border={false}
          collapseButton={false}
          style={{ height: 'calc(100vh - 136px)' }}
          onSelect={closeModal}
        />
      </SideSheet>
    </header>
  );
}

export default Header;
