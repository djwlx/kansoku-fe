interface ArrowLineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
}
function ArrowLine(props: ArrowLineProps) {
  const { start, end } = props;
  const pathString = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99,
        width: '100%',
        height: '100%',
      }}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          fill="var(--semi-color-primary)"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <path
        d={pathString}
        stroke="var(--semi-color-primary)"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrow)"
      />
    </svg>
  );
}
export default ArrowLine;
