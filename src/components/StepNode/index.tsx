import { CSSProperties, useEffect, useState, ReactNode } from 'react';
import styles from './index.module.scss';
import cls from 'classnames';

export interface ProcessNodeType {
  nodeData: any;
}
interface StepNodeProps {
  style?: CSSProperties;
  className?: string;
  data: any[];
  nodeConfig?: {
    width: number;
    height: number;
    renderComponent: (props: ProcessNodeType) => ReactNode;
  };
}

// 目前仅支持直接流程
function StepNode(props: StepNodeProps) {
  const { data, style, className } = props;
  const [canvasSize, setCanvasSize] = useState<{
    width: string | number;
    height: string | number;
  }>({
    width: '100%',
    height: '100%',
  });

  const getCanvasSize = () => {
    console.log('data');
    const width = document.body.clientWidth - 240;
    const height = document.body.clientHeight - 100;
    setCanvasSize({
      width,
      height,
    });
  };

  // 根据数据计算内部的高度和宽度
  useEffect(() => {
    getCanvasSize();
    window.addEventListener('resize', getCanvasSize);
    return () => {
      window.removeEventListener('resize', getCanvasSize);
    };
  }, [data]);

  return (
    <div className={cls(styles['step-container'], className)} style={style}>
      <div
        className={styles['canvas-container']}
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      >
        {/* 先渲染节点 */}
        {/* 再渲染边 */}
        canvas
      </div>
    </div>
  );
}
export default StepNode;
