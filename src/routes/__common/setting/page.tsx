import { Tabs, TabPane, Form } from '@douyinfe/semi-ui';
import BasicFormFields from './components/BasicFormFields';
import WorkflowFormFields from './components/WorkflowFormFields';
import SourceFormFields from './components/SourceFormFields';
import DownloadFormFields from './components/DownloadFormFields';

const Setting = () => {
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

  return (
    <div>
      <Form>
        <Tabs type="line">
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
