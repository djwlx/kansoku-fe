import { getProviderItem } from '@/services/provider';

export const useProvider = () => {
  const getProvider = async (params: { id: string }) => {
    try {
      const result = await getProviderItem(params.id);
      if (result.data?.code === 200) {
        return result.data?.data?.data || {};
      } else {
        return undefined;
      }
    } catch (e) {}
  };

  return {
    getProvider,
  };
};
