import { isString } from 'es-toolkit';
import { isNumber } from 'es-toolkit/compat';
import { CSSProperties, ReactNode, useMemo } from 'react';

interface PageContainerProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  title?: ReactNode;
}

function PageContainer(props: PageContainerProps) {
  const { children, className, style = {}, title } = props;

  const useTitle = useMemo(() => {
    if (!isNumber(title) && !title) {
      return null;
    }
    if (isString(title)) {
      return <h3>{title}</h3>;
    }
    return title;
  }, [title]);
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        ...style,
      }}
    >
      <>
        <header style={{ position: 'sticky', top: 0 }}>{useTitle}</header>
        {children}
      </>
    </div>
  );
}
export default PageContainer;
