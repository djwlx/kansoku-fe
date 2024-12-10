import { useEffect, useState } from 'react';
import { Button, Space } from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';
import useProviderListColumns from '../hooks/useProviderListColumns';
import { ProTable } from '@/components';
import { useProviderList } from '@/hooks';

interface PresetTableProps {
  type: string;
  name: string;
}
function PresetTable(props: PresetTableProps) {
  const { type, name } = props;
  const { providerList, loadData, loading } = useProviderList({ type });
  const navigate = useNavigate();
  const { columns } = useProviderListColumns({ reload: loadData });

  const onNew = () => {
    navigate(`/setting/provider/edit?type=${type}`);
  };

  useEffect(() => {
    if (!type) {
      return;
    }
    loadData();
  }, [type]);

  return (
    <ProTable
      headerExtra={
        <Space style={{ marginBottom: 8 }}>
          <Button theme="solid" onClick={onNew}>{`新增${name}`}</Button>
        </Space>
      }
      loading={loading}
      dataSource={providerList}
      columns={columns}
    />
  );
}
export default PresetTable;
