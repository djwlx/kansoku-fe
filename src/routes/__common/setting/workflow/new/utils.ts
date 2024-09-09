import { Model } from '@antv/x6';
import { processSettingConfig } from './config';

export const getEdgesAndNodes = (data: any) => {
  const result: Model.FromJSONData = {
    nodes: [],
    edges: [],
  };
  data?.forEach((nodeItem: any, index: number) => {
    const useNode = {
      id: `node-${index}`,
      shape: processSettingConfig.node.shape,
      x: 0 + (200 + 50) * index,
      y: 100,
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
