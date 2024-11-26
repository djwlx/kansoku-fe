import { Table } from '@douyinfe/semi-ui';
import { TableProps } from '@douyinfe/semi-ui/lib/es/table';
import { useEffect, ReactNode } from 'react';
import Filter, { FilterProps } from './Filter';

interface ProTableProps extends TableProps {
  request?: (params: any) => Promise<{
    data: any;
    total: number;
  }>;
  filter?: {
    config: FilterProps['config'];
  };
  headerExtra?: ReactNode;
}

function ProTable(props: ProTableProps) {
  const { request, filter, headerExtra, ...rest } = props;

  const fetchData = async () => {
    const result = await request?.();
  };

  useEffect(() => {
    // if(request)
  }, [request]);

  return (
    <>
      {filter && <Filter config={filter.config} />}
      {headerExtra && headerExtra}
      <Table {...rest} />
    </>
  );
}
export default ProTable;
