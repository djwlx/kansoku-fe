import { Button, Space } from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';
import { ProTable } from '@/components';
import { useEffect, useState } from 'react';
import { getTaskFlowList } from '@/services/taskflow';
import useWorkflowColumns from './hooks/useWorkflowColumns';

function WorkFlowSetting() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const { columns } = useWorkflowColumns();

  const loadData = () => {
    setLoading(true);
    getTaskFlowList()
      .then(res => {
        if (res.data?.code === 200) {
          setDataSource(res.data?.data?.data || []);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <ProTable
        headerExtra={
          <Space style={{ marginBottom: 8 }}>
            <Button
              type="primary"
              theme="solid"
              onClick={() => {
                navigate('/setting/workflow/edit');
              }}
            >
              新增工作流
            </Button>
          </Space>
        }
        loading={loading}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}
export default WorkFlowSetting;
