import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
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
        padding: 16,
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
