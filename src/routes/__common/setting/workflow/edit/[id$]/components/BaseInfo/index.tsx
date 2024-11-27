import { useEffect, useState } from 'react';
import { Form } from '@formily/core';
import { FormilyForm } from '@/components';
import { useTaskFlowType } from '@/hooks';
import { StepFuncType } from '../page';
import { DSchema } from '@/utils/formily';

const schema: DSchema = {
  name: {
    type: 'string',
    title: '任务名称',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  enable: {
    type: 'boolean',
    title: '启用',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  type: {
    type: 'string',
    title: '任务流预设',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Select',
  },
};
interface BaseInfoProps {
  next: StepFuncType;
  initValue?: any;
}
function BaseInfo(props: BaseInfoProps) {
  const { next, initValue } = props;
  const [form, setForm] = useState<Form>();
  const { taskTypeList } = useTaskFlowType();

  useEffect(() => {
    if (form) {
      if (taskTypeList.length) {
        form.setFieldState('type', {
          dataSource: taskTypeList,
        });
      }
    }
  }, [form, taskTypeList]);

  return (
    <div style={{ marginTop: 16 }}>
      <FormilyForm
        initValues={initValue}
        getFormInstance={setForm}
        submitText="下一步"
        schema={schema}
        onSubmit={val => next('basic', val)}
      />
    </div>
  );
}
export default BaseInfo;
