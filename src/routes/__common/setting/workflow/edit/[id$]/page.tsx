import { FC, useEffect, useState } from 'react';
import { Steps } from '@douyinfe/semi-ui';
import { ProgressData, ProgressType, stepConfig } from './config';
import PageContainer from '@/components/PageContainer';
import ProgressEdit from './components/ProgressEdit';
import BaseInfo from './components/BaseInfo';
import { useParams } from '@modern-js/runtime/router';
import { getTaskFlowItem } from '@/services/taskflow';
import { parseData } from './utils';
import { useModel } from '@modern-js/runtime/model';
import workFlowModel from './model';

export type StepFuncType = (type: ProgressType, value: any) => void;

const WorkFlowEdit: FC = () => {
  const { id } = useParams();
  const [{ currentStep }, { setCurrentStep, setWorkFlowData }] =
    useModel(workFlowModel);
  const [progressData, setProgressData] = useState<ProgressData>({});
  const message = Boolean(id) ? '编辑任务流' : '添加任务流';

  const saveData = (type: ProgressType, value: any) => {
    if (type === 'basic') {
      setProgressData({
        ...progressData,
        basic: value,
      });
    }
    if (type === 'flows') {
      setProgressData({
        ...progressData,
        flows: value,
      });
    }
  };

  const nextStep = (type: ProgressType, value: any) => {
    saveData(type, value);
  };

  const preStep = (type: ProgressType, value: any) => {
    saveData(type, value);
  };

  useEffect(() => {
    if (id) {
      getTaskFlowItem(id).then(res => {
        if (res.data?.code === 200) {
          const useData = parseData(res.data?.data?.data);
          setWorkFlowData(useData);
          setProgressData(useData);
        }
      });
    }
  }, [id]);

  return (
    <PageContainer title={message}>
      <Steps
        style={{ marginTop: 16 }}
        type="basic"
        current={0}
        onChange={setCurrentStep}
      >
        {stepConfig.map(item => (
          <Steps.Step key={item.value} title={item.label} />
        ))}
      </Steps>
      {currentStep === 0 && (
        <BaseInfo
        // initValue={progressData.basic}
        // next={nextStep}
        // saveData={saveData}
        />
      )}
      {currentStep === 1 && (
        <ProgressEdit
          progressData={progressData}
          next={nextStep}
          previous={preStep}
          saveData={saveData}
        />
      )}
    </PageContainer>
  );
};
export default WorkFlowEdit;
