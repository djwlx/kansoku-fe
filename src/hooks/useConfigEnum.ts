import { useEffect, useState } from 'react';
import { getConfigEnum } from '@/services/setting';

interface OptionItem {
  label: string;
  value: string;
  [s: string]: any;
}
interface ConfigMap {
  // 下载器
  download_type: OptionItem[];
  download_provider: OptionItem[];
  // 源
  source_type: OptionItem[];
  source_provider: OptionItem[];
  // 工作流
  workflow_type: OptionItem[];
  workflow_provider: OptionItem[];
  // 解析
  parser_type: OptionItem[];
  parser_provider: OptionItem[];
  // 重命名
  rename_type: OptionItem[];
  rename_provider: OptionItem[];
  // 执行
  runner_type: OptionItem[];
  runner_provider: OptionItem[];
}
const useConfigEnum = () => {
  const [configMap, setConfigMap] = useState<ConfigMap>({} as ConfigMap);

  useEffect(() => {
    getConfigEnum().then(res => {
      if (res.data?.code === 200) {
        const { enum: enumData } = res.data?.data || {};
        const mapValue = {
          download_type: enumData.download_provider_type,
          download_provider: enumData.download_type_provider,
          source_type: [],
          source_provider: [],
          workflow_type: [],
        };

        setConfigMap(mapValue);
      }
    });
  }, []);
  return {
    configMap,
  };
};

export default useConfigEnum;
