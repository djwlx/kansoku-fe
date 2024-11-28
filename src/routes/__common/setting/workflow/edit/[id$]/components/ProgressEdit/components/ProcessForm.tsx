import { FormilyForm } from '@/components';
import { useProviderSchema } from '@/hooks';
import { Button } from '@douyinfe/semi-ui';

interface ProcessFormProps {
  currentNode: any;
}
function ProcessForm(props: ProcessFormProps) {
  const { currentNode } = props;
  const { schema } = useProviderSchema({ type: currentNode?.provider_type });

  console.log(currentNode, 'currentNode');
  return (
    <FormilyForm
      submitExtra={
        <Button
          theme="solid"
          onClick={() => {
            // previous('flows', progressData?.flows);
          }}
        >
          上一步
        </Button>
      }
      submitText="下一步"
      schema={schema}
      onSubmit={val => {
        // console.log(val, 'nodeValue');
        // graph?.unselect(`node-${selectNode}`);
        // const nextNodeIndex = selectNode + 1;
        // setSelectNode(nextNodeIndex);
        // graph?.select(`node-${nextNodeIndex}`);
      }}
    />
  );
}
export default ProcessForm;
