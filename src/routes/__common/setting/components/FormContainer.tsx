import { Button, Form } from '@douyinfe/semi-ui';
import { BaseFormProps, FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useEffect, useState } from 'react';

interface FormContainerProps {
  children?: React.ReactNode;
  values?: any;
  submitAction: (values: any) => Promise<void>;
  render?: BaseFormProps['render'];
  style?: React.CSSProperties;
}

function FormContainer(props: FormContainerProps) {
  const { children, values, submitAction, render, style } = props;
  const [formApi, setFormApi] = useState<FormApi>();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      const formValues = await formApi?.validate();
      setLoading(true);
      if (submitAction) {
        await submitAction(formValues);
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
    <div style={{ padding: 16, ...style }}>
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
