import { useEffect, useState } from 'react';
import { ProgressData } from '../../config';
import { StepNode } from '@/components';
import { StepFuncType } from '../../page';
import ProcessForm from './components/ProcessForm';
import ProcessNode from './components/ProcessNode';
import { Button, Space, Tooltip } from '@douyinfe/semi-ui';

interface ProgressEditProps {
  next: StepFuncType;
  previous: StepFuncType;
  progressData?: ProgressData;
  saveData: StepFuncType;
}
function ProgressEdit(props: ProgressEditProps) {
  const { next, previous, progressData, saveData } = props;
  const flows = progressData?.flows || [];
  const isFinished = flows.every(item => item.status === 'finished');
  const [selectNode, setSelectNode] = useState(flows[0]);
  const isFirstNode = selectNode.front_uid === flows[0].front_uid;
  const isLastNode = selectNode.front_uid === flows[flows.length - 1].front_uid;

  const getNodeIndex = () => {
    const nodeIndex = flows.findIndex(
      item => item.front_uid === selectNode.front_uid,
    );
    return nodeIndex;
  };

  const changeNode = (nodeData: any) => {
    setSelectNode(nodeData);
  };

  const onNodeChange = () => {};

  const onNextStep = () => {
    const findIndex = getNodeIndex();
    const nextNode = flows[findIndex + 1];
    setSelectNode(nextNode);
  };
  const onPreviousStep = () => {
    const findIndex = getNodeIndex();
    const nextNode = flows[findIndex - 1];
    setSelectNode(nextNode);
  };

  return (
    <>
      <StepNode
        data={flows}
        nodeConfig={{
          width: 200,
          height: 100,
          renderComponent: props => {
            const { nodeData } = props;
            const isSelected =
              selectNode && selectNode.front_uid === nodeData.front_uid;
            return (
              <ProcessNode
                isSelected={isSelected}
                onClick={changeNode}
                {...props}
              />
            );
          },
        }}
      />
      <ProcessForm
        saveData={saveData}
        flows={flows}
        currentNode={selectNode}
        setCurrentNode={setSelectNode}
      />
    </>
  );
}
export default ProgressEdit;
