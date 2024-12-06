import { FC, useEffect, useState } from 'react';
import { Form, Steps } from '@douyinfe/semi-ui';
import { ProgressData, ProgressType, stepConfig } from './config';
import PageContainer from '@/components/PageContainer';
import ProgressEdit from './components/ProgressEdit';
import BaseInfo from './components/BaseInfo';
import { useParams } from '@modern-js/runtime/router';
import { getTaskFlowItem } from '@/services/taskflow';
import { parseData } from './utils';
import { useTaskFlowType } from '@/hooks';

export type StepFuncType = (type: ProgressType, value: any) => void;

const { Input, Switch, Select, Section } = Form;

const WorkFlowEdit: FC = () => {
  const { id } = useParams();
  const { taskTypeList } = useTaskFlowType();
  const [progressData, setProgressData] = useState<ProgressData>({});
  const message = Boolean(id) ? '编辑任务流' : '添加任务流';

  useEffect(() => {
    if (id) {
      getTaskFlowItem(id).then(res => {
        if (res.data?.code === 200) {
          const useData = parseData(res.data?.data?.data);
          setProgressData(useData);
        }
      });
    }
  }, [id]);

  return (
    <PageContainer title={message}>
      <Form
        style={{ marginTop: 16 }}
        render={({ values }) => {
          return (
            <>
              <Section text="基本信息">
                <Input label="任务流名称" field="name" />
                <Switch label="是否启用" field="enable" />
                <Select
                  style={{ width: '100%' }}
                  label="任务流预设"
                  field="type"
                  optionList={taskTypeList}
                />
              </Section>
              {values.type && <Section text="流程信息"></Section>}
            </>
          );
        }}
      />
    </PageContainer>
  );
};
export default WorkFlowEdit;
