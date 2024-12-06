import { Tabs } from '@douyinfe/semi-ui';
import PresetTable from './components/PresetTable';
import { useProviderType } from '@/hooks';
import { useEffect, useState } from 'react';
import { useQuery } from 'djwl-module';

function ProviderList() {
  const { providerTypeList } = useProviderType();
  const { query, updateQuery } = useQuery();
  const [hasInit, setHasInit] = useState(false);
  const [activeKey, setActiveKey] = useState<string>();

  useEffect(() => {
    if (hasInit) {
      return;
    }

    if (query?.provider_type) {
      setActiveKey(query?.provider_type);
      setHasInit(true);
    }
  }, [query?.provider_type, hasInit]);

  useEffect(() => {
    if (hasInit) {
      return;
    }
    if (providerTypeList.length) {
      setActiveKey(providerTypeList[0]?.value);
      updateQuery({
        provider_type: providerTypeList[0]?.value,
      });
      setHasInit(true);
    }
  }, [providerTypeList, hasInit]);

  return (
    <Tabs
      activeKey={activeKey}
      onChange={key => {
        setActiveKey(key);
        updateQuery({
          provider_type: key,
        });
      }}
      style={{ width: '100%' }}
      collapsible
      lazyRender
    >
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
