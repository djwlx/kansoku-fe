import { SideSheet, Form } from '@douyinfe/semi-ui';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { EditModalProps } from '../download/EditModal';
import useConfigEnum from '@/hooks/useConfigEnum';

const { Input, Select } = Form;

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
      onCancel={closeModal}
    >
      <FormContainer submitAction={isEdit ? onEdit : onAdd} values={data}>
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
        <Input field="rss_url" label="RSS地址" rules={[{ required: true }]} />
        <Input field="name_regexp" label="过滤" />
      </FormContainer>
    </SideSheet>
  );
};
export default EditModal;
