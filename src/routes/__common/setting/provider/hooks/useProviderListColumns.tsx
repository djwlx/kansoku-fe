import { IconDelete, IconEdit } from '@douyinfe/semi-icons';
import { Popconfirm, Space, Toast } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { useNavigate } from '@modern-js/runtime/router';
import { deleteProvider } from '@/services/provider';

interface ColumnParams {
  reload?: () => void;
}
function useProviderListColumns(params: ColumnParams) {
  const { reload } = params;
  const navigate = useNavigate();
  const deleteItem = async (record: any) => {
    try {
      const res = await deleteProvider(record.id);
      if (res.data?.code === 200) {
        Toast.success('删除成功');
        reload?.();
      }
    } catch (e) {}
  };

  const commonColumns: ColumnProps[] = [
    {
      title: '预设名称',
      dataIndex: 'metadata.name',
    },
    {
      title: '预设类型',
      dataIndex: 'metadata.type',
    },
    {
      title: '是否启用',
      dataIndex: 'metadata.enable',
      render: (text: boolean) => {
        return text ? '是' : '否';
      },
    },
    {
      title: '操作',
      dataIndex: 'operator',
      fixed: 'right',
      render: (text: boolean, record) => {
        return (
          <Space>
            <IconEdit
              style={{ color: 'var(--semi-color-primary)', cursor: 'pointer' }}
              onClick={() => {
                navigate(
                  `/setting/provider/edit/${record.id}?type=${record.metadata?.provider_type}`,
                );
              }}
            />
            <Popconfirm
              title="确定是否要删除此预设？"
              content="此修改将不可逆"
              onConfirm={() => deleteItem(record)}
            >
              <IconDelete style={{ color: 'red', cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return {
    columns: commonColumns,
  };
}
export default useProviderListColumns;
