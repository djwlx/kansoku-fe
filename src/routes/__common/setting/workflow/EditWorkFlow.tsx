import { Form, SideSheet, Button } from '@douyinfe/semi-ui';
import type { FormApi as SFormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useEffect, useState } from 'react';
import { ModalHookProps } from 'djwl-module';
import SourceDownalod from './SourceDownalod';
import { useConfigEnum } from '@/hooks';
import { ENV } from '@/utils/env';

const { Select, Input, Switch } = Form;
function EditWorkFlow(props: ModalHookProps & any) {
  const { visible, closeModal, data, onAdd, onEdit, keyArray = [] } = props;
  const useKeyArray = keyArray.filter(item => item !== data?.name);
  const [formApi, setFormApi] = useState<SFormApi>();
  const { configMap } = useConfigEnum();
  const isEdit = Boolean(data);
  const [hasSameName, setHasSameName] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      const values = await formApi?.validate();
      setLoading(true);
      if (isEdit) {
        await onEdit(data?.id, values);
      } else {
        await onAdd(values);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && formApi) {
      formApi?.setValues(data, { isOverride: true });
    }
  }, [data, formApi]);

  return (
    <SideSheet
      visible={visible}
      onCancel={closeModal}
      title={isEdit ? '编辑工作流' : '添加工作流'}
      style={{ padding: 16, maxWidth: ENV.maxWidth }}
    >
      <Form
        getFormApi={setFormApi}
        render={({ values }) => {
          return (
            <>
              <Input
                field="name"
                label="工作流名称"
                rules={[{ required: true }]}
                extraText={hasSameName ? '已有同名工作流' : undefined}
                onChange={v => {
                  if (useKeyArray.includes(v)) {
                    setHasSameName(true);
                  } else {
                    setHasSameName(false);
                  }
                }}
              />
              <Select
                style={{ width: '100%' }}
                field="type"
                label="工作流类型"
                showClear
                rules={[{ required: true }]}
                optionList={configMap.workflow_type}
              />
              {values.type === 'source_download' && <SourceDownalod />}
              <Switch initValue={true} field="enable" label="是否启用" />
              <Button
                type="secondary"
                theme="solid"
                loading={loading}
                onClick={onSubmit}
              >
                保存
              </Button>
            </>
          );
        }}
      />
    </SideSheet>
  );
}

export default EditWorkFlow;
