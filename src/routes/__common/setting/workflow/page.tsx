import {
  Button,
  Popconfirm,
  Space,
  Switch,
  Table,
  Toast,
} from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { IconDelete, IconEdit } from '@douyinfe/semi-icons';
import EditWorkFlow from './EditWorkFlow';
import useSettingConfig from '@/hooks/useSettingConfig';
import useModalHook from '@/hooks/useModalHook';
import { addConfig, deleteConfig, updateConfig } from '@/services/setting';

function WorkFlowSetting() {
  const { setting, fetchData } = useSettingConfig({ type: 'workflow' });
  const workflowList = setting?.workflow || [];
  const keyArray = workflowList.map((item: any) => item.name);
  const { setModalData, closeModal, ...rest } = useModalHook();

  const onDelete = async (item: any) => {
    const res = await deleteConfig('workflow', item.id);
    if (res.data?.code === 200) {
      Toast.success('已删除');
      fetchData();
    }
  };

  const onEdit = async (item: any, onSuccess?: () => void) => {
    const res = await updateConfig({
      config: {
        workflow: [item],
      },
    });
    if (res.data?.code === 200) {
      if (onSuccess) {
        onSuccess();
      } else {
        Toast.success('编辑成功');
        closeModal();
        fetchData();
      }
    }
  };

  const onAdd = async (item: any) => {
    const res = await addConfig({
      config: {
        workflow: item,
      },
    });
    if (res) {
      Toast.success('添加成功');
      closeModal();
      fetchData();
    }
  };

  const columns: ColumnProps[] = [
    {
      title: '工作流名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '工作流类型',
      dataIndex: 'type',
      width: 200,
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      width: 50,
      render: (text: boolean, record: any) => {
        return (
          <Switch
            defaultChecked={text}
            onChange={v => {
              const param = {
                ...record,
                enable: v,
              };
              onEdit(param, () => Toast.success('修改成功'));
            }}
            aria-label="a switch for semi demo"
          />
        );
      },
    },
    {
      title: '',
      dataIndex: 'operate',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return (
          <Space>
            <IconEdit
              style={{
                cursor: 'pointer',
                color: 'var(--kansoku-primary-color)',
              }}
              onClick={() => setModalData('open', record)}
            />
            <Popconfirm
              trigger="click"
              title="确定要删除这个工作流吗？"
              content="此删除将不可逆"
              okType="danger"
              onConfirm={() => onDelete(record)}
            >
              <IconDelete style={{ cursor: 'pointer', color: 'red' }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Button type="secondary" onClick={() => setModalData('open')}>
        添加工作流
      </Button>
      <Table
        scroll={{ x: '100%' }}
        columns={columns}
        rowKey="id"
        dataSource={workflowList}
        pagination={false}
      />
      <EditWorkFlow
        keyArray={keyArray}
        onAdd={onAdd}
        onEdit={onEdit}
        closeModal={closeModal}
        {...rest}
      />
    </div>
  );
}
export default WorkFlowSetting;
