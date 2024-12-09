import { useFieldState, useFormState, withField } from '@douyinfe/semi-ui';
import { FormilyForm } from '../FormilyForm';
import { useProviderSchema } from '@/hooks';
import { useEffect, useState } from 'react';
import { Form, onFormInputChange, onFormValuesChange } from '@formily/core';

interface ProviderFormProps {
  type: string;
  value?: any;
  readOnly?: boolean;
  onChange?: (value: any) => void;
}
function ProviderForm(props: ProviderFormProps) {
  const { value, onChange, type, readOnly } = props;
  const { schema } = useProviderSchema({ type });
  const [form, setForm] = useState<Form>();

  useEffect(() => {
    if (!form) {
      return;
    }
    form.addEffects('onValueChange', form => {
      onFormInputChange(form => {
        const values = form.getFormState().values;
        onChange?.(values);
      });
    });
    return () => {
      form.removeEffects('onValueChange');
    };
  }, [form]);

  useEffect(() => {
    if (!form) {
      return;
    }
    if (readOnly) {
      form.setFormState({ readPretty: true });
    } else {
      form.setFormState({ readPretty: false });
    }
  }, [form, readOnly]);

  useEffect(() => {
    if (value && form) {
      form?.setValues(value);
    }
  }, [form, value]);

  return <FormilyForm getFormInstance={setForm} schema={schema} />;
}

const ProviderSemiForm = withField(ProviderForm);
export default ProviderSemiForm;
