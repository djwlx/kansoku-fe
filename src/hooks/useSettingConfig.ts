import { useEffect, useState } from 'react';
import {
  ConfigType,
  getCommonConfig,
  getProviderConfig,
} from '@/services/setting';

type SettingType = ConfigType | 'common';

const useSettingConfig = (param: { type: SettingType }) => {
  const { type } = param;
  const [setting, setSetting] = useState<Record<string, any>>();

  const fetchData = async () => {
    try {
      let result;
      if (type === 'common') {
        result = await getCommonConfig();
      } else {
        result = await getProviderConfig(type);
      }
      if (result.data?.code === 200) {
        const res = result.data?.data;
        setSetting(res?.common || res?.config);
      }
    } catch (e) {
      console.log(e);
    }
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
