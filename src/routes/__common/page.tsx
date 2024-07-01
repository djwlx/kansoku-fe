import { useEffect } from 'react';
import { getInfo } from '@/services/setting';

const Index = () => {
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <h3
      style={{
        textAlign: 'center',
        marginTop: 50,
      }}
    >
      Welcome to Kansoku
    </h3>
  );
};

export default Index;
