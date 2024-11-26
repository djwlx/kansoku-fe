import { useEffect, useState } from 'react';
import { Form } from '@formily/core';
import { FormilyForm } from '@/components';

const schema = {
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
  next: (val: any) => void;
}
function BaseInfo(props: BaseInfoProps) {
  const { next } = props;
  const [form, setForm] = useState<Form>();

  useEffect(() => {
    if (form) {
      // getTaskFlowEnum().then(res => {
      //   form.setFieldState('type', state => {
      //     state.dataSource = res;
      //   });
      // });
    }
  }, [form]);
  return (
    <div style={{ marginTop: 16 }}>
      <FormilyForm
        getFormInstance={setForm}
        submitText="下一步"
        schema={schema}
        onSubmit={val => next(val)}
      />
    </div>
  );
}
export default BaseInfo;
