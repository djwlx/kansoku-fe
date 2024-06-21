import { SideSheet, Form } from '@douyinfe/semi-ui';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { ModalHookProps } from '@/hooks/useModalHook';
import useConfigEnum from '@/hooks/useConfigEnum';

const { Input, Select } = Form;

export interface EditModalProps extends ModalHookProps {
  onAdd: (item: any) => Promise<void>;
  onEdit: (item: any) => Promise<void>;
  keyArray?: string[];
}
const EditModal = (props: EditModalProps) => {
  const { visible, closeModal, onAdd, onEdit, keyArray = [], data } = props;
  const isEdit = Boolean(data);
  const useKeyArray = keyArray.filter(item => item !== data?.name);
  const { configMap } = useConfigEnum();
  const [hasSameName, setHasSameName] = useState(false);

  return (
    <SideSheet
      title={isEdit ? '编辑下载器' : '新增下载器'}
      visible={visible}
      onCancel={closeModal}
    >
      <FormContainer submitAction={isEdit ? onEdit : onAdd} values={data}>
        <Input
          field="name"
          label="下载器名称"
          extraText={hasSameName ? '已有同名下载器' : undefined}
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
          label="下载器类型"
          rules={[{ required: true }]}
          optionList={configMap.download_type}
        />
        <Input
          field="addr"
          label="下载器连接地址"
          rules={[{ required: true }]}
        />
        <Input
          field="save_path"
          label="下载器保存路径"
          rules={[{ required: true }]}
        />
        <Input field="username" label="用户名" />
        <Input field="password" label="密码" />
        <Input field="mount_save_path" label="下载路径映射" />
        <Input field="category" label="分组名" />
      </FormContainer>
    </SideSheet>
  );
};
export default EditModal;
