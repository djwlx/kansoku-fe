import { getTaskFlowEnum } from '@/services/enum';
import { useEffect, useState } from 'react';

export interface TaskFlowType {
  label: string;
  value: string;
  flows: {
    provider_type: string;
  }[];
}
export function useTaskFlowType() {
  const [taskTypeList, setTaskTypeList] = useState<TaskFlowType[]>([]);

  useEffect(() => {
    getTaskFlowEnum().then(res => {
      if (res.data?.code === 200) {
        const providerMap = res.data?.data || {};
        const useData = Object.keys(providerMap || {}).map(key => {
          return {
            label: providerMap[key].label,
            value: key,
            flows: providerMap[key].flows,
          };
        });
        setTaskTypeList(useData);
      }
    });
  }, []);

  return {
    taskTypeList,
  };
}
