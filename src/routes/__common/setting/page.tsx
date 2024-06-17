import { Tabs, TabPane, Form, Button, Toast } from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import BasicFormFields from './components/BasicFormFields';
import WorkflowFormFields from './components/WorkflowFormFields';
import SourceFormFields from './components/SourceFormFields';
import DownloadFormFields from './components/DownloadFormFields';
import { getConfig } from '@/services/setting';

const Setting = () => {
  const [formApi, setFormApi] = useState<FormApi>();
  const [loading, setLoading] = useState(false);
  const tabConfig = [
    {
      key: '1',
      name: '基本设置',
      component: <BasicFormFields />,
    },
    {
      key: '2',
      name: '下载器设置',
      component: <DownloadFormFields />,
    },
    {
      key: '3',
      name: '源设置',
      component: <SourceFormFields />,
    },
    {
      key: '4',
      name: '工作流设置',
      component: <WorkflowFormFields />,
    },
  ];

  useEffect(() => {
    getConfig().then(res => {
      console.log(res, 'res');
    });
  }, []);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      Toast.success('修改成功');
      setLoading(false);
    }, 300);
    console.log(formApi?.getValues());
  };

  return (
    <div
      style={{
        padding: '0 16px 16px 16px',
        height: 3000,
      }}
    >
      <Form getFormApi={setFormApi}>
        <Tabs
          type="line"
          tabBarExtraContent={
            <Button
              style={{ color: 'var(--kansoku-primary-color)' }}
              theme="light"
              loading={loading}
              onClick={submit}
            >
              提交
            </Button>
          }
        >
          {tabConfig.map(item => (
            <TabPane tab={item.name} itemKey={item.key} key={item.key}>
              {item.component}
            </TabPane>
          ))}
        </Tabs>
      </Form>
    </div>
  );
};
export default Setting;
