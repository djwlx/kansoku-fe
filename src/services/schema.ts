import request from '@/utils/request';

export const getProviderSchema = (type: string) => {
  return request.get(`/schema/provider/${type}`, {});
};
