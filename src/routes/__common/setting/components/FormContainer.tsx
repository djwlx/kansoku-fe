import { Button, Form, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useEffect, useState } from 'react';
import { updateConfig } from '@/services/setting';

interface FormContainerProps {
  children: React.ReactNode;
  values?: any;
  submitAction?: (values: any) => Promise<void>;
}

function FormContainer(props: FormContainerProps) {
  const { children, values, submitAction } = props;
  const [formApi, setFormApi] = useState<FormApi>();
  const [loading, setLoading] = useState(false);

  const defaultSubmit = async (formValues: any) => {
    const mergeValue = {
      config: {
        ...formValues,
      },
    };
    const result = await updateConfig(mergeValue);
    if (result.data?.code === 200) {
      Toast.success('保存成功');
    }
  };

  const submit = async () => {
    try {
      const formValues = await formApi?.validate();
      setLoading(true);
      if (submitAction) {
        await submitAction(formValues);
      } else {
        await defaultSubmit(formValues);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (values && formApi) {
      formApi?.setValues(values);
    }
  }, [values, formApi]);

  return (
    <div style={{ padding: 16 }}>
      <Form getFormApi={setFormApi}>{children}</Form>
      <Button loading={loading} onClick={submit}>
        保存
      </Button>
    </div>
  );
}
export default FormContainer;
