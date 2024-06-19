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
    <SideSheet title="新增源" visible={visible} onCancel={closeModal}>
      <FormContainer submitAction={isEdit ? onEdit : onAdd} values={data}>
        <Input
          field="name"
          label="源名称"
          rules={[
            { required: true },
            {
              validator: (rule, value) => !useKeyArray?.includes(value),
              message: '源名称不能重复',
            },
          ]}
        />
        <Select
          style={{ width: '100%' }}
          field="type"
          label="类型"
          rules={[{ required: true }]}
          optionList={[{ label: 'mikanani', value: 'mikanani' }]}
        />
        <Input field="rss_url" label="RSS地址" rules={[{ required: true }]} />
        <Input field="name_regexp" label="过滤" />
      </FormContainer>
    </SideSheet>
  );
};
export default EditModal;
