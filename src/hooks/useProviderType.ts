import { getProviderTypeList } from '@/services/enum';
import { useEffect, useState } from 'react';

export interface ProviderType {
  label: string;
  value: string;
}
export function useProviderType() {
  const [providerTypeList, setProviderTypeList] = useState<ProviderType[]>([]);

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
  };
}
