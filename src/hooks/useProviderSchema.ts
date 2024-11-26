import { getProviderSchema } from '@/services/schema';
import { DSchema } from '@/utils/formily';
import { useEffect, useState } from 'react';

export function useProviderSchema(params: { type: string }) {
  const { type } = params;
  const [schema, setSchema] = useState<DSchema>({});

  useEffect(() => {
    if (!type) {
      return;
    }
    getProviderSchema(type).then(res => {
      if (res.data?.code === 200) {
        setSchema(res.data?.data?.schema || {});
      }
    });
  }, [type]);

  return {
    schema,
  };
}
