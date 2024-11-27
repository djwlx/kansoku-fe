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
        ...style,
      }}
    >
      <>
        {useTitle}
        {children}
      </>
    </div>
  );
}
export default PageContainer;
