import { useEffect, useState } from 'react';
import { ProgressData } from '../../config';
import { StepNode } from '@/components';
import { StepFuncType } from '../../page';
import ProcessForm from './components/ProcessForm';
import ProcessNode from './components/ProcessNode';

interface ProgressEditProps {
  next: StepFuncType;
  previous: StepFuncType;
  progressData?: ProgressData;
}
function ProgressEdit(props: ProgressEditProps) {
  const { next, previous, progressData } = props;
  const flows = progressData?.flows || [];
  const [selectNode, setSelectNode] = useState(flows[0]);

  const changeNode = (nodeData: any) => {
    setSelectNode(nodeData);
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
      <ProcessForm currentNode={selectNode} />
    </>
  );
}
export default ProgressEdit;
