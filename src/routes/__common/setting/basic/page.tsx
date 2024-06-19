import { Form } from '@douyinfe/semi-ui';
import FormContainer from '../components/FormContainer';
import useSettingConfig from '@/hooks/useSettingConfig';

const { Input, Section } = Form;
function BasicSetting() {
  const { setting } = useSettingConfig({ type: 'common' });
  return (
    <FormContainer values={setting}>
      <Section text="Web">
        <Input field="common.web.username" label="用户名" />
        <Input field="common.web.password" label="密码" />
      </Section>
      <Section text="其他">
        <Input field="common.temp_path" label="临时目录" />
      </Section>
    </FormContainer>
  );
}
export default BasicSetting;
