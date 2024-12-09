import { createProvider } from '@/services/provider';
import { v4 as UUID } from 'uuid';

export const parseData = (data: any) => {
  if (!data) {
    return {};
  }

  const result = {
    ...data,
    flows: data?.flows?.map((item: any) => {
      return {
        nodeType: 1,
        provider_type: item.metadata?.provider_type,
        nodeId: item.id,
      };
    }),
  };

  return result;
};

export const formatter = (type: string) => {};

export const formatterData = async (data: any, id?: string) => {
  const allFlows = data?.flows.map(item => {
    return {
      ...item,
      uuid: UUID(),
    };
  });

  const needNewProvider = allFlows.filter(
    (item: any) => item?.nodeType === 2 || item?.nodeType === 3,
  );

  const requests = needNewProvider?.map((item: any) => {
    return createProvider({
      data: {
        ...item?.nodeConfig,
        id: undefined,
      },
    });
  });

  try {
    const res = await Promise.all(requests);

    const flowsResult = allFlows.map((item: any) => {
      const findIndex = needNewProvider?.findIndex(
        (needItem: any) => needItem.uuid === item?.uuid,
      );

      if (findIndex !== -1) {
        return {
          provider_type: item?.provider_type,
          id: res[findIndex]?.data?.data?.data?.id,
        };
      }

      return {
        provider_type: item?.provider_type,
        id: item?.nodeId,
      };
    });

    return {
      data: {
        enable: data?.enable ?? false,
        flows: flowsResult,
        name: data?.name,
        type: data?.type,
        task: data?.task,
        id,
      },
    };
  } catch (e) {
    return {
      data: {},
    };
  } finally {
  }
};
