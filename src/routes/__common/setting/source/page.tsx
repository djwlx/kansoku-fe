import {
  Typography,
  Button,
  Space,
  Table,
  Toast,
  Popconfirm,
} from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { IconDelete, IconEdit } from '@douyinfe/semi-icons';
import EditModal from './EditModal';
import useModalHook from '@/hooks/useModalHook';
import useSettingConfig from '@/hooks/useSettingConfig';
import {
  addProviderConfig,
  deleteProviderConfig,
  updateProviderConfig,
} from '@/services/setting';

const { Text } = Typography;
function SourceSetting() {
  const { setting, fetchData } = useSettingConfig({ type: 'source' });
  const sourceList = setting?.source || [];
  const keyArray = sourceList.map((item: any) => item.name);
  const { setModalData, closeModal, ...rest } = useModalHook();
  const columns: ColumnProps[] = [
    {
      title: '源名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
    },
    {
      title: 'RSS链接',
      dataIndex: 'rss_url',
      width: 300,
      render: text => {
        return (
          <Text ellipsis={{ showTooltip: true }} style={{ width: '100%' }}>
            {text}
          </Text>
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
              title="确定要删除这个源吗？"
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

  const onDelete = async (item: any) => {
    const result = await deleteProviderConfig('source', item.id);
    if (result.data?.code === 200) {
      Toast.success('删除成功');
      fetchData();
      closeModal();
    }
  };

  const onEdit = async (id: string, item: any) => {
    const param = { id, ...item };
    const result = await updateProviderConfig('source', param);
    if (result.data?.code === 200) {
      Toast.success('修改成功');
      fetchData();
      closeModal();
    }
  };

  const onAdd = async (item: any) => {
    const result = await addProviderConfig('source', item);
    if (result.data?.code === 200) {
      Toast.success('添加成功');
      fetchData();
      closeModal();
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Space>
        <Button type="secondary" onClick={() => setModalData('open')}>
          添加源
        </Button>
      </Space>
      <Table
        scroll={{ x: '100%' }}
        columns={columns}
        rowKey="id"
        dataSource={sourceList}
        pagination={false}
      />
      <EditModal
        keyArray={keyArray}
        onAdd={onAdd}
        onEdit={onEdit}
        closeModal={closeModal}
        {...rest}
      />
    </div>
  );
}
export default SourceSetting;
