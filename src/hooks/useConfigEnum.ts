import { useEffect, useState } from 'react';
import { getConfigEnum } from '@/services/setting';

interface OptionItem {
  label: string;
  value: string;
  [s: string]: any;
}

interface ConfigMap {
  [key: string]: OptionItem[];
}
const useConfigEnum = () => {
  const [configMap, setConfigMap] = useState<ConfigMap>({} as ConfigMap);

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
