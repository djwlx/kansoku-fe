import { CSSProperties, useEffect, useState, ReactNode, Fragment } from 'react';
import styles from './index.module.scss';
import cls from 'classnames';
import { stepConfig } from './config';
import ArrowLine from './ArrowLine';

export interface ProcessNodeType {
  nodeData: any;
}

export interface LineType {
  start: { x: number; y: number };
  end: { x: number; y: number };
}
export interface StepNodeType extends ProcessNodeType {
  x: number;
  y: number;
}
export interface StepNodeProps {
  style?: CSSProperties;
  className?: string;
  data: any[];
  nodeConfig: {
    width: number;
    height: number;
    renderComponent: (props: ProcessNodeType) => ReactNode;
  };
}

// 目前仅支持直接流程
function StepNode(props: StepNodeProps) {
  const {
    data = [],
    style,
    className,
    nodeConfig = {
      width: 200,
      height: 100,
      renderComponent: (props: ProcessNodeType) => {
        return <div>node{props.nodeData}</div>;
      },
    },
  } = props;

  const [canvasSize, setCanvasSize] = useState<{
    width: string | number;
    height: string | number;
  }>({
    width: '100%',
    height: '100%',
  });
  const [nodeList, setNodeList] = useState<StepNodeType[]>([]);
  const [lineList, setLineList] = useState<LineType[]>([]);

  const calculation = () => {
    // 计算画布总高度和宽邸
    const width =
      (data.length - 1) * (nodeConfig.width + stepConfig.horizontalPadding) +
      nodeConfig.width;
    const height = nodeConfig.height + stepConfig.verticalPadding * 2;
    setCanvasSize({
      width,
      height,
    });
    // 计算节点
    const nodeListTemp = data.map((item, index) => {
      return {
        nodeData: item,
        x: index * (nodeConfig.width + stepConfig.horizontalPadding),
        y: stepConfig.verticalPadding,
      };
    });
    setNodeList(nodeListTemp);
    // 计算边
    const lineListTemp: LineType[] = [];
    nodeListTemp?.forEach((item, index) => {
      if (index > 0) {
        const start = {
          x: item.x - stepConfig.horizontalPadding,
          y: item.y + nodeConfig.height / 2,
        };
        const end = {
          x: item.x - 8,
          y: item.y + nodeConfig.height / 2,
        };
        lineListTemp.push({
          start,
          end,
        });
      }
    });

    setLineList(lineListTemp);
  };

  // 根据数据计算内部的高度和宽度
  useEffect(() => {
    calculation();
    window.addEventListener('resize', calculation);
    return () => {
      window.removeEventListener('resize', calculation);
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
        {nodeList.map((item, index) => {
          return (
            <div
              key={index}
              style={{ position: 'absolute', left: item.x, top: item.y }}
            >
              {nodeConfig.renderComponent({
                nodeData: item.nodeData,
              })}
            </div>
          );
        })}

        {/* 再渲染边 */}
        {lineList.map((item, index) => {
          return (
            <Fragment key={index}>
              <ArrowLine start={item.start} end={item.end} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
export default StepNode;
