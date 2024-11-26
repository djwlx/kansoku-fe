import { FormilyForm } from '@/components';
import { useProviderSchema, useProviderType } from '@/hooks';
import { renderMap } from '@/utils/render';

interface ProviderEditProps {
  type: string;
}
function ProviderEdit(props: ProviderEditProps) {
  const { type } = props;
  const { schema } = useProviderSchema({ type });
  const { providerTypeList } = useProviderType();
  const providerName = renderMap.optionRender(type, providerTypeList);

  const submitAction = (values: any) => {
    console.log(values);
  };

  if (!type) {
    return <h2>请选择节点类型</h2>;
  }

  return (
    <>
      <h2>{`新增${providerName}`}</h2>
      <FormilyForm schema={schema} onSubmit={submitAction} />
    </>
  );
}
export default ProviderEdit;
