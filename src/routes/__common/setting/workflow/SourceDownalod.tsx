import { Steps, Form } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
import useConfigEnum from '@/hooks/useConfigEnum';

const { Select, InputNumber } = Form;
function SourceDownalod() {
  const { configMap } = useConfigEnum();
  return (
    <>
      <Steps
        className={styles.step}
        type="basic"
        direction="vertical"
        style={{ width: '100%' }}
      >
        <Steps.Step
          style={{ width: '100%' }}
          description={
            <Select
              style={{ width: '100%' }}
              rules={[{ required: true }]}
              optionList={configMap.source_provider}
              field="source_provider"
              label="源设置"
            />
          }
          status="process"
          title="获取源数据"
        />
        <Steps.Step
          status="process"
          title="下载器下载"
          description={
            <Select
              style={{ width: '100%' }}
              rules={[{ required: true }]}
              field="download_provider"
              optionList={configMap.download_provider}
              label="下载器设置"
            />
          }
        />
        <Steps.Step status="process" title="结束" />
      </Steps>
      <InputNumber
        style={{ width: '100%' }}
        field="period_time_second"
        label="RSS刷新时间"
        hideButtons
        suffix={'秒'}
      />
    </>
  );
}

export default SourceDownalod;
