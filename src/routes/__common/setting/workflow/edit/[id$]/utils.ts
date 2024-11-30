import { ProgressData } from './config';
import { v4 as UUID } from 'uuid';

export type FlowData = {
  front_id: string;
  [s: string]: any;
}[];

export const parseData: ProgressData | any = (data: any) => {
  if (!data) {
    return {};
  }
  const { type, enable, name, flows } = data;

  const result = {
    basic: {
      type,
      enable,
      name,
    },
    flows: flows?.map((item: any) => {
      return {
        ...item,
        front_uid: UUID(),
        status: 'finished',
      };
    }),
  };

  return result;
};
