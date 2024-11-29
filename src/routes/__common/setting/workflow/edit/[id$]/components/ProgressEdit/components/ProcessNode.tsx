import classNames from 'classnames';
import styles from '../index.module.scss';
import { ProcessNodeType } from '@/components/StepNode';

interface ProcessNodeProps extends ProcessNodeType {}
function ProcessNode(props: ProcessNodeType) {
  const {} = props;

  return (
    <div
      style={{ width: 200, height: 100 }}
      className={classNames(styles.node, 'graph-node')}
    >
      node
    </div>
  );
}
export default ProcessNode;
