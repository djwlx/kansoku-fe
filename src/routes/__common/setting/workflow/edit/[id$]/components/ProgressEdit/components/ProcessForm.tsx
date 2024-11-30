import { FormilyForm } from '@/components';
import { useProvider, useProviderList, useProviderSchema } from '@/hooks';
import { DSchema } from '@/utils/formily';
import { Button } from '@douyinfe/semi-ui';
import { Form, onFieldValueChange } from '@formily/core';
import { useEffect, useMemo, useState } from 'react';

interface ProcessFormProps {
  currentNode: any;
}
function ProcessForm(props: ProcessFormProps) {
  const { currentNode } = props;
  const [baseForm, setBaseForm] = useState<Form>();
  const [mainForm, setMainForm] = useState<Form>();
  const { schema } = useProviderSchema({ type: currentNode?.provider_type });
  const { getProvider } = useProvider();
  const { providerOptionList } = useProviderList({
    type: currentNode?.provider_type,
  });

  const baseSchema = useMemo<DSchema>(() => {
    const base = {
      nodeType: {
        type: 'string',
        title: '节点类型',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        default: 1,
        enum: [
          { label: '使用现有预设', value: 1 },
          { label: '复制已有预设', value: 2 },
          { label: '新增预设', value: 3 },
        ],
      },
      now: {
        type: 'void',
        'x-reactions': {
          dependencies: ['.nodeType'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === 1}}',
            },
          },
        },
        properties: {
          id: {
            type: 'string',
            title: '预设列表',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            required: true,
            'x-component-props': {
              showClear: true,
            },
          },
        },
      },
      copy: {
        type: 'void',
        'x-reactions': {
          dependencies: ['.nodeType'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === 2}}',
            },
          },
        },
        properties: {
          copyId: {
            type: 'string',
            title: '复制的预设',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            required: true,
          },
        },
      },
    };
    return base;
  }, []);

  const mainSchema = useMemo<DSchema>(() => {
    const main: DSchema = schema;
    return main;
  }, [schema]);

  // 基础选项添加联动
  useEffect(() => {
    if (!(baseForm && mainForm)) {
      return;
    }
    baseForm.addEffects('nodeTypeChange', form => {
      onFieldValueChange('nodeType', field => {
        const type = field.value;
        if (type === 3) {
          mainForm.setFormState({
            display: 'visible',
            values: {},
          });
        } else {
          mainForm.setFormState({
            display: 'hidden',
            values: {},
          });
        }
      });
    });
    baseForm.addEffects('idChange', form => {
      onFieldValueChange('id', async field => {
        const id = field.value;
        if (id) {
          const res = await getProvider({ id });
          if (res) {
            mainForm.setFormState({
              display: 'visible',
              readPretty: true,
              values: res,
            });
          }
        } else {
          mainForm.setFormState({
            display: 'hidden',
            readPretty: false,
            values: {},
          });
        }
      });
      onFieldValueChange('copyId', async field => {
        const id = field.value;
        if (id) {
          const res = await getProvider({ id });
          if (res) {
            mainForm.setFormState({
              display: 'visible',
              readPretty: false,
              values: res,
            });
          }
        } else {
          mainForm.setFormState({
            display: 'hidden',
            readPretty: false,
            values: {},
          });
        }
      });
    });
  }, [baseForm, mainForm]);
  // 基础添加数据
  useEffect(() => {
    if (!baseForm || providerOptionList.length === 0) {
      return;
    }
    baseForm.setFieldState('id', field => {
      field.dataSource = providerOptionList;
    });
    baseForm.setFieldState('copyId', field => {
      field.dataSource = providerOptionList;
    });
  }, [baseForm, providerOptionList]);

  return (
    <>
      <FormilyForm getFormInstance={setBaseForm} schema={baseSchema} />
      <FormilyForm
        initConfig={{ display: 'hidden' }}
        getFormInstance={setMainForm}
        schema={mainSchema}
      />
    </>
  );
}
export default ProcessForm;
