import { Button, Form, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useEffect, useState } from 'react';
import useSettingConfig from '@/hooks/useSettingConfig';
import { updateConfig } from '@/services/setting';

interface FormContainerProps {
  children: React.ReactNode;
}

function FormContainer(props: FormContainerProps) {
  const { children } = props;
  const [formApi, setFormApi] = useState<FormApi>();
  const [loading, setLoading] = useState(false);
  const { setting } = useSettingConfig();

  const submit = async () => {
    try {
      const values = await formApi?.validate();
      const mergeValue = {
        config: {
          ...(setting || {}),
          ...values,
        },
      };
      const result = await updateConfig(mergeValue);
      if (result.data?.code === 200) {
        Toast.success('保存成功');
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (setting) {
      formApi?.setValues(setting);
    }
  }, [setting]);

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
