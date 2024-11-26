import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';

function useProviderListColumns() {
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
    },
  ];
  return {
    columns: commonColumns,
  };
}
export default useProviderListColumns;
