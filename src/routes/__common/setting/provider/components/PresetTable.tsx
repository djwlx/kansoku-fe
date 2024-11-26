import { ProTable } from '@/components';
import useProviderListColumns from '../hooks/useProviderListColumns';
import { useEffect, useState } from 'react';
import { getAllProvider } from '@/services/provider';
import { Button, Space } from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';

interface PresetTableProps {
  type: string;
  name: string;
}
function PresetTable(props: PresetTableProps) {
  const { type, name } = props;
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const { columns } = useProviderListColumns();

  useEffect(() => {
    if (!type) {
      return;
    }
    const params = { provider_type: type };
    getAllProvider(params).then(res => {
      if (res.data?.code === 200) {
        setDataSource(res.data?.data?.data || []);
      }
    });
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
      dataSource={dataSource}
      columns={columns}
    />
  );
}
export default PresetTable;
