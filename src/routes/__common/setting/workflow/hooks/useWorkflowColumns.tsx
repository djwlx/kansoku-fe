import { useTaskFlowType } from '@/hooks';
import { deleteTaskFlow } from '@/services/taskflow';
import { renderMap } from '@/utils/render';
import { IconDelete, IconEdit } from '@douyinfe/semi-icons';
import { Popconfirm, Space, Toast } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { useNavigate } from '@modern-js/runtime/router';
import { ColumnParams } from '../../provider/hooks/useProviderListColumns';

function useWorkflowColumns(params: ColumnParams) {
  const { reload } = params;
  const { taskTypeList } = useTaskFlowType();
  const navigate = useNavigate();

  const deleteItem = async (record: any) => {
    try {
      const res = await deleteTaskFlow(record.id);
      if (res.data?.code === 200) {
        Toast.success('删除成功');
        reload?.();
      }
    } catch (e) {}
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
        return renderMap.optionRender(text, taskTypeList);
      },
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      width: 100,
      render: (text: boolean) => {
        return text ? '是' : '否';
      },
    },
    {
      title: '操作',
      dataIndex: 'operator',
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
              onClick={() => navigate(`/setting/workflow/edit/${record.id}`)}
            />
            <Popconfirm
              trigger="click"
              title="确定要删除这个工作流吗？"
              content="此删除将不可逆"
              okType="danger"
              onConfirm={() => deleteItem(record)}
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
  return { columns };
}
export default useWorkflowColumns;
