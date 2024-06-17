import { Outlet, useNavigate } from '@modern-js/runtime/router';
import styles from './index.module.scss';
import Menu from '@/components/Menu';

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div>
      <header className={styles.header}>
        <span className={styles.titleSpan} onClick={() => navigate('/')}>
          Kansoku
        </span>
      </header>
      <div style={{ display: 'flex' }}>
        <Menu />
        <main
          style={{ flex: 1, overflow: 'auto', height: 'calc(100vh - 60px)' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
