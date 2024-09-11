import { FormProvider, ISchema } from '@formily/react';
import { useEffect, useMemo } from 'react';
import { createForm } from '@formily/core';
import { SchemaField, Submit } from '@formily/semi';
import { DSchema } from '@/utils/formily';

interface FormilyFormProps {
  schema: DSchema;
  getFormInstance?: (form: any) => void;
  onSubmit?: (values: any) => void;
  initValues?: any;
  submitText?: string;
}
function FormilyForm(props: FormilyFormProps) {
  const {
    schema,
    getFormInstance,
    onSubmit,
    initValues,
    submitText = '保存',
  } = props;
  const form = useMemo(() => createForm(), []);

  const useSchema = useMemo(() => {
    const layoutSchema: ISchema = {
      type: 'object',
      properties: {
        formLayout: {
          type: 'void',
          'x-decorator': 'FormLayout',
          'x-decorator-props': {
            layout: 'vertical',
          },
          'x-component': 'FormGrid',
          'x-component-props': {
            maxColumns: 1,
            minColumns: 1,
          },
          properties: schema,
        },
      },
    };

    return layoutSchema;
  }, [schema]);

  useEffect(() => {
    if (form) {
      getFormInstance?.(form);
      form.setValues(initValues);
    }
  }, [form, initValues]);

  return (
    <FormProvider form={form}>
      <SchemaField schema={useSchema} />
      {onSubmit && (
        <Submit theme="solid" onSubmit={onSubmit}>
          <span>{submitText}</span>
        </Submit>
      )}
    </FormProvider>
  );
}
export default FormilyForm;
