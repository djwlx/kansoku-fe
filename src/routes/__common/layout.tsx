import { Outlet, useNavigate } from '@modern-js/runtime/router';
import { IconExit, IconList } from '@douyinfe/semi-icons';
import { useEffect, useState } from 'react';
import { SideSheet } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
import Menu from '@/components/Menu';
import { ENV } from '@/utils/env';
import useModalHook from '@/hooks/useModalHook';

export default function Layout() {
  const [device, setDevice] = useState<'ph' | 'pc'>('pc');
  const navigate = useNavigate();
  const { setModalData, visible, closeModal } = useModalHook();

  const exit = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const setPosition = () => {
      if (ENV.isMobile()) {
        setDevice('ph');
      } else {
        setDevice('pc');
      }
    };
    setTimeout(() => {
      setPosition();
    });
    window.addEventListener('resize', setPosition);
    return () => window.removeEventListener('resize', setPosition);
  }, []);

  return (
    <div style={{ minWidth: 500 }}>
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
        <IconExit style={{ cursor: 'pointer' }} onClick={exit} />
      </header>

      <div style={{ display: 'flex' }}>
        {device === 'pc' && <Menu style={{ height: 'calc(100vh - 60px)' }} />}
        <main
          style={{ flex: 1, overflow: 'auto', height: 'calc(100vh - 60px)' }}
        >
          <Outlet />
        </main>
      </div>

      <SideSheet
        placement="left"
        title="菜单"
        visible={visible}
        onCancel={closeModal}
        width={300}
      >
        <Menu border={false} collapseButton={false} onSelect={closeModal} />
      </SideSheet>
    </div>
  );
}
