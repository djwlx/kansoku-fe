import { Graph } from '@antv/x6';
import { useEffect, useState } from 'react';
import { processSettingConfig, ProgressData } from '../../config';
import { getEdgesAndNodes } from '../../utils';
import GraphContainer from './components/GraphContainer';
import { FormilyForm, StepNode } from '@/components';
import { Button } from '@douyinfe/semi-ui';
import { StepFuncType } from '../../page';
import ProcessForm from './components/ProcessForm';

interface ProgressEditProps {
  next: StepFuncType;
  previous: StepFuncType;
  progressData?: ProgressData;
}
function ProgressEdit(props: ProgressEditProps) {
  const { next, previous, progressData } = props;
  const flows = progressData?.flows || [];
  const [graph, setGraph] = useState<Graph>();
  const [graphWidth, setGraphWidth] = useState<string | number>('100%');
  const [selectNode, setSelectNode] = useState();

  console.log(flows, 'flows');

  // 计算
  const getWidth = () => {
    const len = flows.length;
    const useLen =
      processSettingConfig.padding * (len + 1) +
      processSettingConfig.node.width * len;
    setGraphWidth(useLen);
  };

  useEffect(() => {
    getWidth();
  }, [flows]);

  useEffect(() => {
    if (!graph) {
      return;
    }
    const useData = getEdgesAndNodes(flows);
    graph.fromJSON(useData);
    graph.select('node-0');
  }, [graph]);

  return (
    <>
      {/* <div style={{ width: '100%', overflow: 'auto' }}>
        <div
          style={{
            height:
              processSettingConfig.node.height +
              processSettingConfig.padding * 2,
            width: graphWidth,
          }}
        >
          <GraphContainer
            onSelect={e => {
              if (e?.shape === processSettingConfig.node.shape) {
                setSelectNode(e.data);
              }
            }}
            getGarphApi={setGraph}
          />
        </div>
      </div> */}
      <StepNode />
      <ProcessForm currentNode={selectNode} />
    </>
  );
}
export default ProgressEdit;
