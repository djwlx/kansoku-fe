import { SideSheet, Form } from '@douyinfe/semi-ui';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import QbitTorrent from './QbitTorrent';
import { ModalHookProps } from '@/hooks/useModalHook';
import useConfigEnum from '@/hooks/useConfigEnum';

const { Input, Select, Switch } = Form;

export interface EditModalProps extends ModalHookProps {
  onAdd: (item: any) => Promise<void>;
  onEdit: (id: string, item: any) => Promise<void>;
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
      <FormContainer
        submitAction={isEdit ? values => onEdit(data.id, values) : onAdd}
        values={data}
        render={({ values }) => {
          return (
            <>
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
              {values.type === 'qbittorrent' && <QbitTorrent />}
              <Switch field="enable" initValue={true} label="是否启用" />
            </>
          );
        }}
      />
    </SideSheet>
  );
};
export default EditModal;
