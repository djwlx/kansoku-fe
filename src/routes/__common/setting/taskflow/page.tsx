import { Button, Space } from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';
import { ProTable } from '@/components';
import { useEffect, useState } from 'react';
import { getTaskFlowList } from '@/services/taskflow';
import useTaskflowColumns from './hooks/useTaskflowColumns';
import styles from './index.module.scss';

function TaskFlowSetting() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

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
  const { columns } = useTaskflowColumns({ reload: loadData });

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: 16 }} className={styles.taskList}>
      <ProTable
        headerExtra={
          <Space style={{ marginBottom: 8 }}>
            <Button
              type="primary"
              theme="solid"
              onClick={() => {
                navigate('/setting/taskflow/edit');
              }}
            >
              新增任务流
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
export default TaskFlowSetting;
