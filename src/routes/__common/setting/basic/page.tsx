import { Form, Toast } from '@douyinfe/semi-ui';
import FormContainer from '../components/FormContainer';
import useSettingConfig from '@/hooks/useSettingConfig';
import { updateCommonConfig } from '@/services/setting';

const { Input, Section } = Form;
function BasicSetting() {
  const { setting } = useSettingConfig({ type: 'common' });

  const submitAction = async (values: any) => {
    const result = await updateCommonConfig(values);
    if (result.data?.code === 200) {
      Toast.success('修改成功');
    }
  };

  return (
    <FormContainer values={setting} submitAction={submitAction}>
      <Section text="Web">
        <Input field="web.username" label="用户名" />
        <Input field="web.password" label="密码" />
      </Section>
      <Section text="其他">
        <Input field="temp_path" label="临时目录" />
      </Section>
    </FormContainer>
  );
}
export default BasicSetting;
