import { getProviderTypeList } from '@/services/enum';
import { useEffect, useState } from 'react';

export interface ProviderType {
  label: string;
  value: string;
}
export function useProviderType() {
  const [providerTypeList, setProviderTypeList] = useState<ProviderType[]>([]);

  const getProviderTypeName = (value: string) => {
    const target = providerTypeList.find(item => item.value === value);
    return target?.label || value;
  };

  useEffect(() => {
    getProviderTypeList().then(res => {
      if (res.data?.code === 200) {
        const providerMap = res.data?.data || {};
        const useData = Object.keys(providerMap || {}).map(key => {
          return {
            label: providerMap[key].label,
            value: key,
          };
        });
        setProviderTypeList(useData);
      }
    });
  }, []);

  return {
    providerTypeList,
    getProviderTypeName,
  };
}
