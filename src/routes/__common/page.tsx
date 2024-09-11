import { useEffect, useState } from 'react';
import { getInfo } from '@/services/setting';

const Index = () => {
  const [version, setVersion] = useState('');
  useEffect(() => {
    getInfo().then(res => {
      if (res.data?.code === 200) {
        const { data } = res.data;
        setVersion(data.version);
      }
    });
  }, []);
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: 50,
        height: 'calc(100% - 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <h3 style={{ marginBottom: 6 }}>
          Welcome to
          <span style={{ color: 'var(--semi-color-primary)' }}>
            &nbsp;Kansoku
          </span>
        </h3>
        <div style={{ color: 'var(--semi-color-text-2)' }}>{version}</div>
      </div>
      <footer style={{ color: 'var(--semi-color-text-2)' }}>
        此软件仅供学习和交流使用
      </footer>
    </div>
  );
};

export default Index;
