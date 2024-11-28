import { Model } from '@antv/x6';
import { processSettingConfig, ProgressData } from './config';
import { v4 as UUID } from 'uuid';

export type FlowData = {
  front_id: string;
  [s: string]: any;
}[];

export const getEdgesAndNodes = (data: FlowData) => {
  const result: Model.FromJSONData = {
    nodes: [],
    edges: [],
  };
  data?.forEach((nodeItem, index: number) => {
    const useNode = {
      id: `node-${index}`,
      shape: processSettingConfig.node.shape,
      x:
        2 +
        (processSettingConfig.node.width + processSettingConfig.padding) *
          index,
      y: processSettingConfig.padding,
      data: nodeItem,
      ports: [
        {
          id: `node-${index}-out`,
          group: 'out',
        },
      ],
    };

    if (index > 0) {
      useNode.ports.push({
        id: `node-${index}-in`,
        group: 'in',
      });

      const preIndex = index - 1;

      const useEdge = {
        id: `edge-${index}`,
        shape: processSettingConfig.edgeShape,
        source: {
          cell: `node-${preIndex}`,
          port: `node-${preIndex}-out`,
        },
        target: {
          cell: `node-${index}`,
          port: `node-${index}-in`,
        },
        // zIndex: -1,
        data: {
          source: `node-${preIndex}`,
          target: `node-${index}`,
        },
      };
      result.edges!.push(useEdge);
    }
    result.nodes!.push(useNode);
  });

  return result;
};

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
      };
    }),
  };

  return result;
};
