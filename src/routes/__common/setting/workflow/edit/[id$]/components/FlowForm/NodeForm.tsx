import { Form, Spin, useFieldState, useFormApi } from '@douyinfe/semi-ui';
import { nodeTypeList } from '../../config';
import useFlowConfig from '../../../../hooks/useFlowConfig';
import { useProvider, useProviderList } from '@/hooks';
import { ProviderSemiForm } from '@/components';
import { useContext, useEffect, useState } from 'react';
import { FlowContext } from '../../page';

interface NodeFormProps {
  type: string;
  index: number;
}
const { Input, Select } = Form;

function NodeForm(props: NodeFormProps) {
  const { type, index } = props;
  const [mainInstance, setMainInstance] = useState<any>();
  const { nodeFormInstances, setNodeFormInstances } = useContext(FlowContext);
  const { getFlowNodeField } = useFlowConfig();
  const formApi = useFormApi();
  const { providerOptionList } = useProviderList({ type });
  const { getProvider, loading } = useProvider();
  const { value: nodeTypeValue } = useFieldState(
    getFlowNodeField('nodeType', index),
  );
  const { value: nodeIdValue } = useFieldState(
    getFlowNodeField('nodeId', index),
  );

  const showNodeMainInfo = nodeIdValue || nodeTypeValue === 3;
  const showNodeId = nodeTypeValue === 1 || nodeTypeValue === 2;
  const nodeMainReadOnly = nodeTypeValue === 1 && nodeIdValue;

  const onNodeIdChange = async (nodeId: string) => {
    const configValue = await getProvider({ id: nodeId });
    if (configValue) {
      formApi.setValue(`${getFlowNodeField('nodeConfig', index)}`, configValue);
    } else {
      formApi.setValue(`${getFlowNodeField('nodeConfig', index)}`, undefined);
    }
  };

  //将节点表单储存
  useEffect(() => {
    const newNodeFormInstances = nodeFormInstances?.filter(
      (item: any) => item.id !== index,
    );
    if (showNodeMainInfo) {
      setNodeFormInstances?.([
        ...(newNodeFormInstances || []),
        {
          id: index,
          instance: mainInstance,
        },
      ]);
    } else {
      setNodeFormInstances?.(newNodeFormInstances);
    }
  }, [mainInstance, showNodeMainInfo]);

  return (
    <div>
      {/* 只读 */}
      <Input
        initValue={type}
        field={getFlowNodeField('provider_type', index)}
        fieldStyle={{
          visibility: 'hidden',
          height: 0,
          padding: 0,
        }}
      />

      <Select
        label="节点类型"
        field={getFlowNodeField('nodeType', index)}
        showClear
        style={{ width: '100%' }}
        optionList={nodeTypeList}
        rules={[{ required: true, message: '该字段是必填字段' }]}
      />

      {showNodeId && (
        <Select
          label="节点预设"
          field={getFlowNodeField('nodeId', index)}
          showClear
          style={{ width: '100%' }}
          optionList={providerOptionList}
          onChange={onNodeIdChange as any}
          rules={[{ required: true, message: '该字段是必填字段' }]}
        />
      )}
      {showNodeMainInfo && (
        <Spin spinning={loading}>
          <ProviderSemiForm
            getInstance={setMainInstance}
            readOnly={nodeMainReadOnly}
            type={type}
            noLabel
            field={getFlowNodeField('nodeConfig', index)}
          />
        </Spin>
      )}
    </div>
  );
}
export default NodeForm;
