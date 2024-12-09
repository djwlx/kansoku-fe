import { useProviderType, useTaskFlowType } from '@/hooks';
import { Collapse, useFormState } from '@douyinfe/semi-ui';
import NodeForm from './NodeForm';

function FlowForm() {
  const { values } = useFormState();
  const { taskTypeList } = useTaskFlowType();
  const useFlows =
    taskTypeList.find(item => item.value === values.type)?.flows ?? [];
  const { getProviderTypeName } = useProviderType();

  return (
    <Collapse keepDOM>
      {useFlows?.map((item, index) => {
        const providerType = item.provider_type;
        return (
          <Collapse.Panel
            header={`${index + 1}、${getProviderTypeName(providerType)}`}
            key={index}
            itemKey={index.toString()}
          >
            <NodeForm index={index} type={providerType} />
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
}
export default FlowForm;
