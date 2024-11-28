import { useEffect, useState } from 'react';
import { Form, onFieldInputValueChange } from '@formily/core';
import { FormilyForm } from '@/components';
import { useTaskFlowType } from '@/hooks';
import { v4 as UUID } from 'uuid';

import { DSchema } from '@/utils/formily';
import { StepFuncType } from '../../page';

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
  saveData?: StepFuncType;
  initValue?: any;
}
function BaseInfo(props: BaseInfoProps) {
  const { next, initValue, saveData } = props;
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

  useEffect(() => {
    if (form) {
      form.addEffects('typeChange', () => {
        onFieldInputValueChange('type', field => {
          const sourceList = field.dataSource || [];
          const flowList =
            sourceList.find(item => item.value === field.value)?.flows || [];
          const useFlow = flowList.map((item: any) => {
            return {
              ...item,
              front_uid: UUID(),
            };
          });
          saveData?.('flows', useFlow);
        });
      });
    }
    return () => {
      if (form) {
        form.removeEffects('typeChange');
      }
    };
  }, [form]);

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
