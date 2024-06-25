import { SideSheet, Form } from '@douyinfe/semi-ui';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { EditModalProps } from '../download/EditModal';
import Mikanani from './Mikanani';
import useConfigEnum from '@/hooks/useConfigEnum';
import { ENV } from '@/utils/env';

const { Input, Select, Switch } = Form;

const EditModal = (props: EditModalProps) => {
  const { visible, closeModal, onAdd, onEdit, keyArray = [], data } = props;
  const isEdit = Boolean(data);
  const useKeyArray = keyArray.filter(item => item !== data?.name);
  const { configMap } = useConfigEnum();
  const [hasSameName, setHasSameName] = useState(false);

  return (
    <SideSheet
      title={isEdit ? '编辑源' : '新增源'}
      visible={visible}
      style={{
        maxWidth: ENV.maxWidth,
      }}
      onCancel={closeModal}
    >
      <FormContainer
        submitAction={isEdit ? values => onEdit(data.id, values) : onAdd}
        values={data}
        render={({ values }) => {
          return (
            <>
              <Input
                field="name"
                label="源名称"
                extraText={hasSameName ? '已有同名源' : undefined}
                onChange={v => {
                  if (useKeyArray.includes(v)) {
                    setHasSameName(true);
                  } else {
                    setHasSameName(false);
                  }
                }}
                rules={[{ required: true }]}
              />
              <Select
                style={{ width: '100%' }}
                field="type"
                label="类型"
                rules={[{ required: true }]}
                optionList={configMap.source_type}
              />
              {values.type === 'mikanani' && <Mikanani />}
              <Switch
                disabled
                field="enable"
                initValue={true}
                label="是否启用"
              />
            </>
          );
        }}
      />
    </SideSheet>
  );
};
export default EditModal;
