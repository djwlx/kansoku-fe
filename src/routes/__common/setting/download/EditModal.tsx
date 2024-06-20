import { SideSheet, Form } from '@douyinfe/semi-ui';
import FormContainer from '../components/FormContainer';
import { ModalHookProps } from '@/hooks/useModalHook';

const { Input, Select } = Form;

interface EditModalProps extends ModalHookProps {
  onAdd: (item: any) => Promise<void>;
  onEdit: (item: any) => Promise<void>;
  keyArray?: string[];
}
const EditModal = (props: EditModalProps) => {
  const { visible, closeModal, onAdd, onEdit, keyArray = [], data } = props;
  const isEdit = Boolean(data);
  const useKeyArray = keyArray.filter(item => item !== data?.name);

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
          rules={[
            { required: true },
            {
              validator: (rule, value) => !useKeyArray?.includes(value),
              message: '下载器名称不能重复',
            },
          ]}
        />
        <Select
          style={{ width: '100%' }}
          field="type"
          label="下载器类型"
          rules={[{ required: true }]}
          optionList={[{ label: 'qbittorrent', value: 'qbittorrent' }]}
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
