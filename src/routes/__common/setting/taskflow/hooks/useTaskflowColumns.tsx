import { useTaskFlowType } from '@/hooks';
import { deleteTaskFlow } from '@/services/taskflow';
import { renderMap } from '@/utils/render';
import { IconDelete, IconEdit } from '@douyinfe/semi-icons';
import { Popconfirm, Space, Timeline, Toast } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { useNavigate } from '@modern-js/runtime/router';
import { ColumnParams } from '../../provider/hooks/useProviderListColumns';
import dayjs from 'dayjs';

function useTaskflowColumns(params: ColumnParams) {
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
      title: '任务流名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '运行信息',
      dataIndex: 'task',
      width: 200,
      render: text => {
        if (!text.next_time) {
          return renderMap.emptyRender();
        }
        return (
          <Timeline>
            {/* <Timeline.Item time="2019-07-14 10:35" type="success">
              上次运行时间
            </Timeline.Item> */}
            <Timeline.Item
              time={dayjs(text.next_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
            >
              下次运行时间
            </Timeline.Item>
          </Timeline>
        );
      },
    },
    {
      title: '任务流类型',
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
              onClick={() => navigate(`/setting/taskflow/edit/${record.id}`)}
            />
            <Popconfirm
              trigger="click"
              title="确定要删除这个任务流吗？"
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
export default useTaskflowColumns;
