import { Button, Form } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useState } from 'react';

interface FormContainerProps {
  children: React.ReactNode;
}

function FormContainer(props: FormContainerProps) {
  const { children } = props;
  const [formApi, setFormApi] = useState<FormApi>();
  const [loading, setLoading] = useState(false);

  const submit = () => {
    console.log(formApi?.getValues());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  return (
    <>
      <Form getFormApi={setFormApi}>{children}</Form>
      <Button loading={loading} onClick={submit}>
        保存
      </Button>
    </>
  );
}
export default FormContainer;
