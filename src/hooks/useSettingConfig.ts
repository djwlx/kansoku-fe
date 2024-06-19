import { useEffect, useState } from 'react';
import { getConfig } from '@/services/setting';

const useSettingConfig = (param: {
  type: 'common' | 'download' | 'source' | 'workflow';
}) => {
  const { type } = param;
  const [setting, setSetting] = useState<Record<string, any>>();

  const fetchData = () => {
    getConfig(type).then(res => {
      if (res.data?.code === 200) {
        const { config } = res.data?.data || {};
        setSetting(config);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    setting,
    fetchData,
  };
};
export default useSettingConfig;
