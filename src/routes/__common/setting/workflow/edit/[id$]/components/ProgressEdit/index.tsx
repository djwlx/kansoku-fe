import { Graph } from '@antv/x6';
import { useEffect, useState } from 'react';
import { processSettingConfig, ProgressData } from '../../config';
import { getEdgesAndNodes } from '../../utils';
import GraphContainer from './components/GraphContainer';
import { FormilyForm } from '@/components';
import { Button } from '@douyinfe/semi-ui';
import { StepFuncType } from '../../page';

interface ProgressEditProps {
  next: StepFuncType;
  previous: StepFuncType;
  progressData?: ProgressData;
}
function ProgressEdit(props: ProgressEditProps) {
  const { next, previous, progressData } = props;
  const [graph, setGraph] = useState<Graph>();
  const [graphWidth, setGraphWidth] = useState<string | number>('100%');
  const [selectNode, setSelectNode] = useState(0);

  console.log(progressData, 'DDDD');
  const flows = progressData?.flows || [];

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
    graph.select(`node-${selectNode}`);
  }, [graph]);

  return (
    <>
      <div style={{ width: '100%', overflow: 'auto' }}>
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
              console.log(e, 'ee');
            }}
            getGarphApi={setGraph}
          />
        </div>
      </div>

      <div>
        <FormilyForm
          submitExtra={
            <Button
              theme="solid"
              onClick={() => previous('progress', undefined)}
            >
              上一步
            </Button>
          }
          submitText="下一步"
          schema={{
            name: {
              type: 'string',
              title: '任务名称',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          }}
          onSubmit={val => {
            console.log(val, 'nodeValue');
            graph?.unselect(`node-${selectNode}`);
            const nextNodeIndex = selectNode + 1;
            setSelectNode(nextNodeIndex);
            graph?.select(`node-${nextNodeIndex}`);
          }}
        />
      </div>
    </>
  );
}
export default ProgressEdit;
