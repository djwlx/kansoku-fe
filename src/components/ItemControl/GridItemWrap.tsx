import styles from './index.module.scss';

interface GridItemWrapProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
function GridItemWrap(props: GridItemWrapProps) {
  const { children, style } = props;
  return (
    <div className={styles.itemWrap} style={style}>
      {children}
    </div>
  );
}
export default GridItemWrap;
