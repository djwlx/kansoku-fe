import { Toast } from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';
import { useState } from 'react';
import { FormilyForm } from '@/components';
import { useProviderSchema, useProviderType } from '@/hooks';
import { createProvider, updateProvider } from '@/services/provider';
import { renderMap } from '@/utils/render';

interface ProviderEditProps {
  type: string;
  mode: 'edit' | 'create';
  initValue?: any;
}
function ProviderEdit(props: ProviderEditProps) {
  const { type, mode, initValue } = props;
  const navigate = useNavigate();
  const { schema } = useProviderSchema({ type });
  const { providerTypeList } = useProviderType();
  const [loading, setLoading] = useState(false);
  const providerName = renderMap.optionRender(type, providerTypeList);
  const isEdit = mode === 'edit';
  const message = isEdit ? `编辑${providerName}` : `新增${providerName}`;

  const submitAction = async (values: any) => {
    try {
      const request = isEdit ? updateProvider : createProvider;
      setLoading(true);
      const res = await request({ data: values });
      if (res.data?.code === 200) {
        Toast.success(`${message}成功`);
        navigate('/setting/provider');
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  if (!type) {
    return <h2>请选择节点类型</h2>;
  }

  return (
    <>
      <h2>{message}</h2>
      <FormilyForm
        initValues={initValue}
        schema={schema}
        onSubmit={submitAction}
        submitLoading={loading}
      />
    </>
  );
}
export default ProviderEdit;
