import { Form } from '@douyinfe/semi-ui';
import FormItemWrap from '@/components/FormControl/FormItemWrap';

const { Input, Section } = Form;
function BasicFormFields() {
  return (
    <div style={{ marginTop: 16 }}>
      <Section text="Web">
        <FormItemWrap>
          <Input field="common.web.username" label="用户名" />
          <Input field="common.web.password" label="密码" />
          <Input field="common.web.password" label="密码" />
          <Input field="common.web.password" label="密码" />
          <Input field="common.web.password" label="密码" />
          <Input field="common.web.password" label="密码" />
        </FormItemWrap>
      </Section>
      <Section text="其他">
        <Input field="common.temp_path" label="临时目录" />
      </Section>
    </div>
  );
}
export default BasicFormFields;
