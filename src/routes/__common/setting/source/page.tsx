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
import { updateConfig } from '@/services/setting';

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

  const updateSource = async (
    list: any,
    successMsg?: string,
    errorMsg?: string,
  ) => {
    try {
      const mergeValue = {
        config: {
          source: list,
        },
      };
      const result = await updateConfig(mergeValue);
      if (successMsg && result.data?.code === 200) {
        Toast.success(successMsg);
        fetchData();
      }
    } catch (e) {
      if (errorMsg) {
        Toast.error(errorMsg);
      }
    }
  };

  const onDelete = async (item: any) => {
    const list = sourceList.filter((sourceItem: any) => {
      return sourceItem.name !== item.name;
    });
    await updateSource(list, '删除成功');
  };

  const onEdit = async (item: any) => {
    const list = sourceList.map((sourceItem: any) => {
      if (sourceItem.name === item.name) {
        return {
          ...sourceItem,
          ...item,
        };
      } else {
        return sourceItem;
      }
    });

    await updateSource(list, '修改成功');
    closeModal();
  };

  const onAdd = async (item: any) => {
    const list = [
      {
        ...item,
        enable: true,
      },
      ...sourceList,
    ];
    await updateSource(list, '添加成功');
    closeModal();
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
