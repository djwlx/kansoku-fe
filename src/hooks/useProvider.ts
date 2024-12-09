import { getProviderItem } from '@/services/provider';
import { useState } from 'react';

export const useProvider = () => {
  const [loading, setLoading] = useState(false);
  const getProvider = async (params: { id: string }) => {
    try {
      setLoading(true);
      const result = await getProviderItem(params.id);
      if (result.data?.code === 200) {
        return result.data?.data?.data || {};
      } else {
        return undefined;
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return {
    getProvider,
    loading,
  };
};
