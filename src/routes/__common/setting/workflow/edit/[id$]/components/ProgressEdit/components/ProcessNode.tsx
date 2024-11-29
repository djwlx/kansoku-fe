import cls from 'classnames';
import styles from '../index.module.scss';
import { ProcessNodeType } from '@/components/StepNode';
import { useProviderType } from '@/hooks';
import { renderMap } from '@/utils/render';
import { Card } from '@douyinfe/semi-ui';

interface ProcessNodeProps extends ProcessNodeType {
  className?: string;
  isSelected?: boolean;
  onClick?: (nodeData: any) => void;
}
function ProcessNode(props: ProcessNodeProps) {
  const { nodeData, className, isSelected, onClick } = props;
  const { providerTypeList } = useProviderType();
  const nodeName = renderMap.optionRender(
    nodeData?.provider_type,
    providerTypeList,
  );

  return (
    <div style={{}} onClick={() => onClick?.(nodeData)}>
      <Card
        shadows="hover"
        style={{
          width: 198,
          height: 98,
          cursor: 'pointer',
          border: isSelected ? '2px solid var(--semi-color-primary)' : '',
          boxSizing: 'border-box',
        }}
        className={className}
      >
        {nodeName}
      </Card>
    </div>
  );
}
export default ProcessNode;
