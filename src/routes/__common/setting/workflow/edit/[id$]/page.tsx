import { FC, useEffect, useState } from 'react';
import { Button, Form, Space } from '@douyinfe/semi-ui';
import PageContainer from '@/components/PageContainer';
import { useParams } from '@modern-js/runtime/router';
import { getTaskFlowItem } from '@/services/taskflow';
import { parseData } from './utils';
import { useTaskFlowType } from '@/hooks';
import FlowForm from './components/FlowForm';
import { FormApi as SFormApi } from '@douyinfe/semi-ui/lib/es/form';

const { Input, Switch, Select, Section } = Form;

const WorkFlowEdit: FC = () => {
  const { id } = useParams();
  const { taskTypeList } = useTaskFlowType();
  const [progressData, setProgressData] = useState({});
  const [formApi, setFormApi] = useState<SFormApi>();
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
    <>
      <Space>
        <Button
          type="primary"
          theme="solid"
          onClick={() => {
            console.log(formApi?.getValues());
          }}
        >
          保存
        </Button>
      </Space>
      <h2>{message}</h2>
      <Form
        getFormApi={setFormApi}
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
                  rules={[{ required: true, message: '任务流预设必填' }]}
                  optionList={taskTypeList}
                />
              </Section>
              {values.type && (
                <Section text="流程信息">
                  <FlowForm />
                </Section>
              )}
            </>
          );
        }}
      />
    </>
  );
};
export default WorkFlowEdit;
