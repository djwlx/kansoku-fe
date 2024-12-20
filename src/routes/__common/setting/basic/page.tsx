import { Toast } from '@douyinfe/semi-ui';
import basicSchema from './schema';

import { updateCommonConfig } from '@/services/config';
import { useSettingConfig } from '@/hooks';
import { FormilyForm } from '@/components';

function BasicSetting() {
  const { setting } = useSettingConfig({ type: 'common' });

  const submitAction = async (values: any) => {
    const result = await updateCommonConfig(values);
    if (result.data?.code === 200) {
      Toast.success('保存成功');
    }
  };

  return (
    <div>
      <FormilyForm
        initValues={setting}
        schema={basicSchema}
        onSubmit={submitAction}
      />
    </div>
  );
}
export default BasicSetting;
