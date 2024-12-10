import {
  IconExit,
  IconGithubLogo,
  IconList,
  IconMoon,
  IconSun,
} from '@douyinfe/semi-icons';
import { SideSheet, Space } from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';
import styles from './index.module.scss';
import { useModalHook } from 'djwl-module';
import { Menu } from '@/components';
import { useModel } from '@modern-js/runtime/model';
import configModel from '@/model/config';

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
