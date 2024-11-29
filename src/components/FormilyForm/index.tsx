import { FormProvider, ISchema, useFormEffects } from '@formily/react';
import { useEffect, useMemo, ReactNode } from 'react';
import { createForm } from '@formily/core';
import { SchemaField, Space, Submit } from '@formily/semi';
import { DSchema } from '@/utils/formily';

interface FormilyFormProps {
  schema: DSchema;
  getFormInstance?: (form: any) => void;
  onSubmit?: (values: any) => void;
  initValues?: any;
  submitText?: string;
  submitLoading?: boolean;
  submitExtra?: ReactNode;
}
function FormilyForm(props: FormilyFormProps) {
  const {
    schema,
    getFormInstance,
    onSubmit,
    initValues,
    submitText = '保存',
    submitLoading,
    submitExtra,
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
    }
  }, [form]);

  useEffect(() => {
    if (initValues) {
      form.setValues(initValues);
    }
  }, [initValues]);

  return (
    <FormProvider form={form}>
      <SchemaField schema={useSchema} />
      <Space>
        {submitExtra}
        {onSubmit && (
          <Submit theme="solid" loading={submitLoading} onSubmit={onSubmit}>
            <span>{submitText}</span>
          </Submit>
        )}
      </Space>
    </FormProvider>
  );
}
export default FormilyForm;
