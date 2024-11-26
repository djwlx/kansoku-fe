import { Tabs } from '@douyinfe/semi-ui';
import PresetTable from './components/PresetTable';
import { useProviderType } from '@/hooks';

function ProviderList() {
  const { providerTypeList } = useProviderType();

  return (
    <Tabs style={{ width: '100%' }} collapsible lazyRender>
      {providerTypeList.map(item => {
        return (
          <Tabs.TabPane
            style={{ marginTop: 8 }}
            tab={item.label}
            itemKey={item.value}
            key={item.value}
          >
            <PresetTable type={item.value} name={item.label} />
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
}
export default ProviderList;
