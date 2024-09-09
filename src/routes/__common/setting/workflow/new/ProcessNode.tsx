import { FC } from 'react';
import { Graph, Node } from '@antv/x6';

interface ProcessNodeProps {
  node: Node;
  graph: Graph;
}
const ProcessNode: FC<ProcessNodeProps> = props => {
  const { node, graph } = props;

  console.log(graph, 'graph');

  return (
    <div style={{ width: 200, height: 100, backgroundColor: 'green' }}>
      node{node.data?.id}
    </div>
  );
};
export default ProcessNode;
