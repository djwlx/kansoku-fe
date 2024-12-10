import { AllProviderParams, getAllProvider } from '@/services/provider';
import { useEffect, useState } from 'react';

interface ProviderListParams {
  type?: string;
}
export function useProviderList(params: ProviderListParams) {
  const { type } = params;

  const [providerList, setProviderList] = useState([]);
  const [providerOptionList, setProviderOptionList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = (requestParam?: AllProviderParams) => {
    setLoading(true);
    const defaultParam = {
      provider_type: type,
    };

    const useParam = requestParam || defaultParam;

    getAllProvider(useParam)
      .then(res => {
        if (res.data?.code === 200) {
          setProviderList(res.data?.data?.data || []);
          setProviderOptionList(
            res.data?.data?.data?.map((item: any) => {
              return {
                label: item.metadata?.name,
                value: item.id,
              };
            }) || [],
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!type) {
      return;
    }
    loadData();
  }, [type]);

  return {
    providerList,
    providerOptionList,
    loading,
    loadData,
  };
}
