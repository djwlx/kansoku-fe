import { Form } from '@douyinfe/semi-ui';
import { FormApi as SFormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useState, useImperativeHandle, forwardRef } from 'react';

export interface FilterItem {
  name: string;
  field: string;
}

export interface FilterProps {
  onReset?: () => void;
  onSearch?: () => void;
  config: FilterItem[];
}

function Filter(props: FilterProps) {
  const { onReset, onSearch, config } = props;
  const [formApi, setFormApi] = useState<SFormApi<any>>();

  return <Form getFormApi={setFormApi}>Filter</Form>;
}
export default Filter;
