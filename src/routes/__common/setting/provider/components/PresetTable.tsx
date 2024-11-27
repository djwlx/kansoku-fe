import { useEffect, useState } from 'react';
import { Button, Space } from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';
import useProviderListColumns from '../hooks/useProviderListColumns';
import { getAllProvider } from '@/services/provider';
import { ProTable } from '@/components';

interface PresetTableProps {
  type: string;
  name: string;
}
function PresetTable(props: PresetTableProps) {
  const { type, name } = props;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadData = () => {
    const params = { provider_type: type };
    setLoading(true);
    getAllProvider(params)
      .then(res => {
        if (res.data?.code === 200) {
          setDataSource(res.data?.data?.data || []);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { columns } = useProviderListColumns({ reload: loadData });

  useEffect(() => {
    if (!type) {
      return;
    }
    loadData();
  }, [type]);

  const onNew = () => {
    navigate(`/setting/provider/edit?type=${type}`);
  };

  return (
    <ProTable
      headerExtra={
        <Space style={{ marginBottom: 8 }}>
          <Button theme="solid" onClick={onNew}>{`新增${name}`}</Button>
        </Space>
      }
      loading={loading}
      dataSource={dataSource}
      columns={columns}
    />
  );
}
export default PresetTable;
