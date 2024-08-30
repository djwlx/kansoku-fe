import { Toast } from '@douyinfe/semi-ui';
import basicSchema from './schema';
import useSettingConfig from '@/hooks/useSettingConfig';
import { updateCommonConfig } from '@/services/setting';
import FormilyForm from '@/components/FormilyForm';

function BasicSetting() {
  const { setting } = useSettingConfig({ type: 'common' });

  const submitAction = async (values: any) => {
    const result = await updateCommonConfig(values);
    if (result.data?.code === 200) {
      Toast.success('修改成功');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <FormilyForm
        initValues={setting}
        schema={basicSchema}
        onSubmit={submitAction}
      />
    </div>
  );
}
export default BasicSetting;
