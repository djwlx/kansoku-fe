import { FormProvider, ISchema } from '@formily/react';
import { useEffect, useMemo, ReactNode } from 'react';
import { createForm, Form, IFormProps } from '@formily/core';
import { Space, Submit } from '@formily/semi';
import { DSchema } from '@/utils/formily';
import { SchemaField } from './SchemaField';

export interface FormilyFormProps {
  schema: DSchema;
  getFormInstance?: (form: Form) => void;
  onSubmit?: (values: any) => void;
  initValues?: any;
  submitText?: string;
  submitLoading?: boolean;
  submitExtra?: ReactNode;
  initConfig?: IFormProps;
}
export function FormilyForm(props: FormilyFormProps) {
  const {
    schema,
    getFormInstance,
    onSubmit,
    initValues,
    submitText = '保存',
    submitLoading,
    submitExtra,
    initConfig,
  } = props;
  const form = useMemo(() => createForm(initConfig), []);

  const useSchema = useMemo(() => {
    const layoutSchema: ISchema = {
      type: 'object',
      properties: schema,
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
