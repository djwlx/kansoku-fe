import { FormilyForm } from '@/components';
import { getTaskFlowSchema } from '@/services/schema';
import { withField } from '@douyinfe/semi-ui';
import { useContext, useEffect, useState } from 'react';
import { FlowContext } from '../../page';
import { Form, onFormInputChange } from '@formily/core';

interface RunItemProps {
  value?: any;
  readOnly?: boolean;
  onChange?: (value: any) => void;
}
function RunItem(props: RunItemProps) {
  const { value, onChange } = props;
  const [schema, setSchema] = useState<any>({});
  const [mainInstance, setMainInstance] = useState<Form>();
  const { nodeFormInstances, setNodeFormInstances } = useContext(FlowContext);

  useEffect(() => {
    getTaskFlowSchema().then(res => {
      if (res.data?.code === 200) {
        setSchema(res.data?.data?.schema);
      }
    });
  }, []);
  useEffect(() => {
    if (!mainInstance) {
      return;
    }
    const newInstances = [
      ...(nodeFormInstances ?? []),
      {
        id: 'task',
        instance: mainInstance,
      },
    ];
    setNodeFormInstances?.(newInstances);
    mainInstance.addEffects('onValueChange', form => {
      onFormInputChange(form => {
        const values = form.getFormState().values;
        onChange?.(values);
      });
    });
    return () => {
      mainInstance.removeEffects('onValueChange');
    };
  }, [mainInstance]);

  useEffect(() => {
    if (value && mainInstance) {
      mainInstance?.setValues(value);
    }
  }, [mainInstance, value]);

  return <FormilyForm getFormInstance={setMainInstance} schema={schema} />;
}
const RunForm = withField(RunItem);
export default RunForm;
