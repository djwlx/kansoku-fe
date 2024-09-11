import { FC, useEffect, useState } from 'react';
import { Graph } from '@antv/x6';
import { Steps } from '@douyinfe/semi-ui';
import GraphContainer from './components/GraphContainer';
import { getEdgesAndNodes } from './utils';
import { processSettingConfig, stepConfig } from './config';
import BaseInfo from './components/BaseInfo';
import PageContainer from '@/components/PageContainer';
import { FormilyForm } from '@/components';

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
  {
    id: 4,
    data: 3,
  },
  {
    id: 5,
    data: 3,
  },
  {
    id: 6,
    data: 3,
  },
];

const WorkFlowEdit: FC = () => {
  const [graph, setGraph] = useState<Graph>();
  const [graphWidth, setGraphWidth] = useState<string | number>('100%');
  const [stepIndex, setStepIndex] = useState(0);
  const [selectNode, setSelectNode] = useState(0);

  // 计算
  const getWidth = () => {
    const len = testData.length;
    const useLen =
      processSettingConfig.padding * (len + 1) +
      processSettingConfig.node.width * len;
    setGraphWidth(useLen);
  };

  const nextStep = (value: any) => {
    console.log(value, 'vv');
    setStepIndex(stepIndex + 1);
  };

  useEffect(() => {
    getWidth();
  }, [testData]);

  useEffect(() => {
    if (!graph) {
      return;
    }
    const useData = getEdgesAndNodes(testData);
    graph.fromJSON(useData);
    graph.select(`node-${selectNode}`);
  }, [graph]);

  return (
    <PageContainer title="添加任务流">
      <Steps
        style={{ marginTop: 16 }}
        type="basic"
        current={stepIndex}
        onChange={setStepIndex}
      >
        {stepConfig.map(item => (
          <Steps.Step key={item.value} title={item.label} />
        ))}
      </Steps>
      {stepIndex === 0 && <BaseInfo next={nextStep} />}
      {stepIndex === 1 && (
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
      )}
    </PageContainer>
  );
};
export default WorkFlowEdit;
