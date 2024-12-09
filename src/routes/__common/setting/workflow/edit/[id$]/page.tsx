import { FC, useEffect, useState, createContext } from 'react';
import { Button, Space, Form, Toast } from '@douyinfe/semi-ui';
import { useNavigate, useParams } from '@modern-js/runtime/router';
import { createTaskFlow, getTaskFlowItem } from '@/services/taskflow';
import { formatterData, parseData } from './utils';
import { useTaskFlowType } from '@/hooks';
import FlowForm from './components/FlowForm';
import { FormApi as SFormApi } from '@douyinfe/semi-ui/lib/es/form';
import { Form as FForm } from '@formily/core';
import RunForm from './components/FlowForm/RunForm';

export type NodeInstance = {
  id: number | 'task';
  instance?: FForm;
};
export const FlowContext = createContext<{
  nodeFormInstances?: NodeInstance[];
  setNodeFormInstances?: (v: any) => void;
}>({});

const { Input, Switch, Select, Section } = Form;

const WorkFlowEdit: FC = () => {
  const { id } = useParams();
  const { taskTypeList } = useTaskFlowType();
  const [progressData, setProgressData] = useState({});
  const [formApi, setFormApi] = useState<SFormApi>();
  const message = Boolean(id) ? '编辑任务流' : '添加任务流';
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [nodeFormInstances, setNodeFormInstances] = useState<NodeInstance[]>(
    [],
  );

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

  const submit = async () => {
    try {
      const values = await formApi?.validate();
      const instanceValidates = nodeFormInstances?.map(item =>
        item.instance?.validate(),
      );
      await Promise.all(instanceValidates);

      const result = await formatterData(values);

      const res = await createTaskFlow(result);
      if (res.data?.code === 200) {
        Toast.success('保存成功');
        navigate(`/setting/workflow`);
      }
    } catch (e) {
      console.log(e, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlowContext.Provider value={{ nodeFormInstances, setNodeFormInstances }}>
      <h2>{message}</h2>
      <Form
        autoComplete="off"
        getFormApi={setFormApi}
        style={{ marginTop: 16 }}
        render={({ values }) => {
          return (
            <>
              <Section text="基本信息">
                <Input
                  label="任务流名称"
                  rules={[{ required: true, message: '任务名称必填' }]}
                  field="name"
                />
                <Switch label="是否启用" field="enable" />
                <Select
                  style={{ width: '100%' }}
                  label="任务流预设"
                  field="type"
                  rules={[{ required: true, message: '任务流预设必填' }]}
                  optionList={taskTypeList}
                />
              </Section>
              <Section text="执行信息">
                <RunForm field="task" noLabel />
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
      <Space>
        <Button loading={loading} type="primary" theme="solid" onClick={submit}>
          保存
        </Button>
      </Space>
    </FlowContext.Provider>
  );
};
export default WorkFlowEdit;
