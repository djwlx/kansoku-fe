import { Outlet } from '@modern-js/runtime/router';
import { useEffect, useState } from 'react';
import Menu from '@/components/Menu';
import { ENV } from '@/utils/env';
import Header from './components/header';

export default function Layout() {
  const [device, setDevice] = useState<'ph' | 'pc'>('pc');

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
    <div style={{ minWidth: 400 }}>
      <Header device={device} />
      <div style={{ display: 'flex' }}>
        {device === 'pc' && <Menu style={{ height: 'calc(100vh - 60px)' }} />}
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            height: 'calc(100vh - 60px)',
            padding: 16,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
