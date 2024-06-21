import { useEffect, useState } from 'react';
import { getConfigEnum } from '@/services/setting';

const useConfigEnum = () => {
  const [configMap, setConfigMap] = useState<
    Record<
      string,
      {
        label: string;
        value: string;
        [s: string]: any;
      }[]
    >
  >({});

  useEffect(() => {
    getConfigEnum().then(res => {
      if (res.data?.code === 200) {
        const { enum: enumData } = res.data?.data || {};
        setConfigMap(enumData);
      }
    });
  }, []);
  return {
    configMap,
  };
};

export default useConfigEnum;
