import { useEffect, useState } from 'react';
import { getConfig } from '@/services/setting';

const useSettingConfig = () => {
  const [setting, setSetting] = useState<Record<string, any>>();

  useEffect(() => {
    getConfig().then(res => {
      if (res.data?.code === 200) {
        const { config } = res.data?.data || {};
        setSetting(config);
      }
    });
  }, []);

  return {
    setting,
  };
};
export default useSettingConfig;
