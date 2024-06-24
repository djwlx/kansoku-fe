import { Button, Form, Toast } from '@douyinfe/semi-ui';
import { BaseFormProps, FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useEffect, useState } from 'react';
import { updateConfig } from '@/services/setting';

interface FormContainerProps {
  children?: React.ReactNode;
  values?: any;
  submitAction?: (values: any) => Promise<void>;
  render?: BaseFormProps['render'];
}

function FormContainer(props: FormContainerProps) {
  const { children, values, submitAction, render } = props;
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
      formApi?.setValues(values, { isOverride: true });
    }
  }, [values, formApi]);

  return (
    <div style={{ padding: 16 }}>
      <Form getFormApi={setFormApi} render={render}>
        {children}
      </Form>
      <Button type="secondary" theme="solid" loading={loading} onClick={submit}>
        保存
      </Button>
    </div>
  );
}
export default FormContainer;
