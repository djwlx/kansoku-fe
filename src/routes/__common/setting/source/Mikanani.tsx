import { Form } from '@douyinfe/semi-ui';

const { Input } = Form;
function Mikanani() {
  return (
    <>
      <Input field="rss_url" label="RSS地址" rules={[{ required: true }]} />
      <Input field="title_regexp" label="过滤" />
    </>
  );
}

export default Mikanani;
