import { Form } from '@douyinfe/semi-ui';
import FormContainer from '../components/FormContainer';

const { Input, Section } = Form;
function BasicSetting() {
  return (
    <FormContainer>
      <Input field="name" label="名称" />
      <Input field="description" label="描述" />
    </FormContainer>
  );
}
export default BasicSetting;
