import { FC, useEffect, useState } from 'react';
import { Graph } from '@antv/x6';
import GraphContainer from './GraphContainer';
import { getEdgesAndNodes } from './utils';

const testData = [
  {
    id: 1,
    data: 1,
  },
  {
    id: 2,
    data: 2,
  },
  {
    id: 3,
    data: 3,
  },
];

const WorkFlowEdit: FC = () => {
  const [graph, setGraph] = useState<Graph>();
  useEffect(() => {
    if (!graph) {
      return;
    }
    const useData = getEdgesAndNodes(testData);
    graph.fromJSON(useData);
  }, [graph]);

  return (
    <div style={{ height: 500 }}>
      <GraphContainer
        onSelect={e => {
          console.log(e, 'ee');
        }}
        getGarphApi={setGraph}
      />
    </div>
  );
};
export default WorkFlowEdit;
