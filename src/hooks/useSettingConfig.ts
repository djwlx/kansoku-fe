import { useEffect, useState } from 'react';
import { getCommonConfig } from '@/services/config';

type SettingType = 'common';

export const useSettingConfig = (param: { type: SettingType }) => {
  const { type } = param;
  const [setting, setSetting] = useState<Record<string, any>>();

  const fetchData = async () => {
    try {
      const result = await getCommonConfig();
      if (result.data?.code === 200) {
        const res = result.data?.data;
        setSetting(res?.common || res?.config);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    setting,
    fetchData,
  };
};
