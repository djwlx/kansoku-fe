import { Outlet, useNavigate } from '@modern-js/runtime/router';
import { IconExit } from '@douyinfe/semi-icons';
import styles from './index.module.scss';
import Menu from '@/components/Menu';

export default function Layout() {
  const navigate = useNavigate();
  const exit = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>
      <header className={styles.header}>
        <span className={styles.titleSpan} onClick={() => navigate('/')}>
          Kansoku
        </span>

        <IconExit style={{ cursor: 'pointer' }} onClick={exit} />
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
