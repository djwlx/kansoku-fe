import { Cell, Graph, Path } from '@antv/x6';
import { FC, useEffect, useRef } from 'react';
import { register } from '@antv/x6-react-shape';
import { Selection } from '@antv/x6-plugin-selection';
import ProcessNode from './ProcessNode';
import { processSettingConfig } from './config';

// 需要注册的元素
// 节点组件
register({
  shape: processSettingConfig.node.shape,
  width: processSettingConfig.node.width,
  heigit: processSettingConfig.node.height,
  component: ProcessNode,
  ports: {
    groups: {
      in: {
        position: {
          name: 'left',
          args: {
            dy: processSettingConfig.node.height / 2,
          },
        },
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'transparent',
            strokeWidth: 1,
            fill: 'red',
          },
        },
      },
      out: {
        position: {
          name: 'right',
          args: {
            dy: processSettingConfig.node.height / 2,
          },
        },
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'transparent',
            strokeWidth: 1,
            fill: 'blue',
          },
        },
      },
    },
  },
});
Graph.registerConnector(
  processSettingConfig.connectorShape,
  (sourcePoint, targetPoint) => {
    const hgap = Math.abs(targetPoint.x - sourcePoint.x);
    const path = new Path();
    path.appendSegment(
      Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y),
    );
    path.appendSegment(
      Path.createSegment('L', sourcePoint.x + 12, sourcePoint.y),
    );
    // 水平三阶贝塞尔曲线
    path.appendSegment(
      Path.createSegment(
        'C',
        sourcePoint.x < targetPoint.x
          ? sourcePoint.x + hgap / 2
          : sourcePoint.x - hgap / 2,
        sourcePoint.y,
        sourcePoint.x < targetPoint.x
          ? targetPoint.x - hgap / 2
          : targetPoint.x + hgap / 2,
        targetPoint.y,
        targetPoint.x - 6,
        targetPoint.y,
      ),
    );
    path.appendSegment(
      Path.createSegment('L', targetPoint.x + 2, targetPoint.y),
    );

    return path.serialize();
  },
  true,
);
Graph.registerEdge(
  processSettingConfig.edgeShape,
  {
    markup: [
      {
        tagName: 'path',
        selector: 'wrap',
        attrs: {
          fill: 'none',
          cursor: 'pointer',
          stroke: 'transparent',
          strokeLinecap: 'round',
        },
      },
      {
        tagName: 'path',
        selector: 'line',
        attrs: {
          fill: 'none',
          pointerEvents: 'none',
        },
      },
    ],
    connector: { name: processSettingConfig.connectorShape },
    attrs: {
      wrap: {
        connection: true,
        strokeWidth: 10,
        strokeLinejoin: 'round',
      },
      line: {
        connection: true,
        stroke: '#A2B1C3',
        strokeWidth: 1,
        targetMarker: {
          name: 'classic',
          size: 6,
        },
      },
    },
  },
  true,
);

interface GraphContainerProps {
  getGarphApi?: (graph: Graph) => void;
  style?: React.CSSProperties;
  onSelect?: (cell: Cell) => void;
}

const GraphContainer: FC<GraphContainerProps> = props => {
  const { getGarphApi, style, onSelect } = props;
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph: Graph = new Graph({
      container: divRef.current!,
      // panning: {
      //   enabled: true,
      //   eventTypes: ['leftMouseDown', 'mouseWheel'],
      // },
      autoResize: true,
      // preventDefaultContextMenu: false,
      // 节点可拖拽
      // interacting: false,
      // mousewheel: {
      //   enabled: true,
      //   modifiers: 'ctrl',
      //   factor: 1.1,
      //   maxScale: 1.5,
      //   minScale: 0.5,
      // },
      // highlighting: {
      //   magnetAdsorbed: {
      //     name: 'stroke',
      //     args: {
      //       attrs: {
      //         fill: '#fff',
      //         stroke: '#31d0c6',
      //         strokeWidth: 4,
      //       },
      //     },
      //   },
      // },
      // connecting: {
      //   snap: true,
      //   allowBlank: false,
      //   allowLoop: false,
      //   highlight: true,
      //   sourceAnchor: {
      //     name: 'left',
      //     args: {
      //       dx: Platform.IS_SAFARI ? 4 : 8,
      //     },
      //   },
      //   targetAnchor: {
      //     name: 'right',
      //     args: {
      //       dx: Platform.IS_SAFARI ? 4 : -8,
      //     },
      //   },
      //   createEdge() {
      //     return graph.createEdge({
      //       shape: 'data-processing-curve',
      //       attrs: {
      //         line: {
      //           strokeDasharray: '5 5',
      //         },
      //       },
      //       zIndex: -1,
      //     });
      //   },
      //   // 连接桩校验
      //   validateConnection({ sourceMagnet, targetMagnet }) {
      //     // 只能从输出链接桩创建连接
      //     if (
      //       !sourceMagnet ||
      //       sourceMagnet.getAttribute('port-group') === 'in'
      //     ) {
      //       return false;
      //     }
      //     // 只能连接到输入链接桩
      //     if (
      //       !targetMagnet ||
      //       targetMagnet.getAttribute('port-group') !== 'in'
      //     ) {
      //       return false;
      //     }
      //     return true;
      //   },
      // },
    });
    graph.use(
      new Selection({
        multiple: true,
        rubberEdge: true,
        rubberNode: true,
        modifiers: 'shift',
        rubberband: true,
      }),
    );
    graph.on('selection:changed', e => {
      onSelect?.(e.selected[0]);
    });
    getGarphApi?.(graph);

    return () => {
      graph.removeCells(graph.getCells());
      graph.off();
      graph.dispose();
    };
  }, [getGarphApi]);

  return (
    <div style={{ height: 300, ...style }}>
      <div ref={divRef} />
    </div>
  );
};
export default GraphContainer;
