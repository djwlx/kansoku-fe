import styles from './index.module.scss';

interface FormItemWrapProps {
  children: React.ReactNode;
}
function FormItemWrap(props: FormItemWrapProps) {
  const { children } = props;
  return <div className={styles.formItemWrap}>{children}</div>;
}
export default FormItemWrap;
