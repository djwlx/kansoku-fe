import { Steps, Form } from '@douyinfe/semi-ui';
import FormContainer from '../components/FormContainer';

const { Select } = Form;
function EditWorkFlow() {
  return (
    <div style={{ padding: 16 }}>
      <Steps
        type="basic"
        direction="vertical"
        style={{ width: '100%' }}
        onChange={i => console.log(i)}
      >
        <Steps.Step
          style={{ width: '100%' }}
          description={
            <FormContainer
              submitAction={async val => {
                console.log(val, 'vv');
              }}
            >
              <Select
                style={{ width: '100%' }}
                field="download_porvider"
                label="源设置"
              />
            </FormContainer>
          }
          status="finish"
          title="获取源数据"
        />
        <Steps.Step status="error" title="下载器下载" />
      </Steps>
    </div>
  );
}

export default EditWorkFlow;
