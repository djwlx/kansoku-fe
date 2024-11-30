import cls from 'classnames';
import styles from '../index.module.scss';
import { ProcessNodeType } from '@/components/StepNode';
import { useProviderType } from '@/hooks';
import { renderMap } from '@/utils/render';
import { Card, Space, Tag } from '@douyinfe/semi-ui';
import { nodeStatus } from '../../../config';

interface ProcessNodeProps extends ProcessNodeType {
  className?: string;
  isSelected?: boolean;
  onClick?: (nodeData: any) => void;
}
function ProcessNode(props: ProcessNodeProps) {
  const { nodeData = {}, className, isSelected, onClick } = props;
  const { status } = nodeData;
  const { providerTypeList } = useProviderType();
  const providerType =
    nodeData?.provider_type || nodeData?.metadata?.provider_type;
  const statusOption = nodeStatus.find(item => item.value === status);

  const nodeName = renderMap.optionRender(providerType, providerTypeList);

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
        <Space vertical align="start">
          <span>{nodeName}</span>
          <Tag color={statusOption?.color as any}>{statusOption?.label}</Tag>
        </Space>
      </Card>
    </div>
  );
}
export default ProcessNode;
