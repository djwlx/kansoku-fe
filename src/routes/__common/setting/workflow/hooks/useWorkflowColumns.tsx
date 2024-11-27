import { useTaskFlowType } from '@/hooks';
import { renderMap } from '@/utils/render';
import { IconDelete, IconEdit } from '@douyinfe/semi-icons';
import { Popconfirm, Space } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { useNavigate } from '@modern-js/runtime/router';

function useWorkflowColumns() {
  const { taskTypeList } = useTaskFlowType();
  const navigate = useNavigate();

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
              onConfirm={() => console.log('eee')}
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
