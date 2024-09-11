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
import { useNavigate } from '@modern-js/runtime/router';
import { useModalHook } from 'djwl-module';
import EditWorkFlow from './EditWorkFlow';
import useSettingConfig from '@/hooks/useSettingConfig';
import {
  addProviderConfig,
  deleteProviderConfig,
  updateProviderConfig,
} from '@/services/setting';
import { useConfigEnum } from '@/hooks';
import { renderMap } from '@/utils/render';

function WorkFlowSetting() {
  const { setting, fetchData } = useSettingConfig({ type: 'workflow' });
  const workflowList = setting?.workflow || [];
  const keyArray = workflowList.map((item: any) => item.name);
  const { setModalData, closeModal, ...rest } = useModalHook();
  const { configMap } = useConfigEnum();
  const navigate = useNavigate();

  const onDelete = async (item: any) => {
    const result = await deleteProviderConfig('workflow', item.id);
    if (result.data?.code === 200) {
      Toast.success('删除成功');
      fetchData();
      closeModal();
    }
  };

  const onEdit = async (id: string, item: any) => {
    const param = { id, ...item };
    const result = await updateProviderConfig('workflow', param);
    if (result.data?.code === 200) {
      Toast.success('修改成功');
      fetchData();
      closeModal();
    }
  };

  const onAdd = async (item: any) => {
    const result = await addProviderConfig('workflow', item);
    if (result.data?.code === 200) {
      Toast.success('添加成功');
      fetchData();
      closeModal();
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
      render: (text: string) => {
        return renderMap.optionRender(text, configMap.workflow_provider_type);
      },
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      width: 100,
      render: (text: boolean, record: any) => {
        return (
          <Switch
            checked={text}
            onChange={v => {
              const param = {
                ...record,
                enable: v,
              };
              onEdit(param.id, param);
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
                color: 'var(--semi-color-primary)',
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
              <IconDelete
                style={{
                  cursor: 'pointer',
                  color: 'var(--semi-color-danger)',
                }}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Button
        type="primary"
        theme="solid"
        onClick={() => {
          // setModalData('open')
          navigate('/setting/workflow/new');
        }}
      >
        添加工作流
      </Button>
      <Table
        style={{ marginTop: 16 }}
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
