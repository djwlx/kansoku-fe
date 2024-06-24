import { Form } from '@douyinfe/semi-ui';

const { Input } = Form;

function QbitTorrent() {
  return (
    <>
      <Input field="addr" label="下载器连接地址" rules={[{ required: true }]} />
      <Input
        field="save_path"
        label="下载器保存路径"
        rules={[{ required: true }]}
      />
      <Input field="username" label="用户名" />
      <Input field="password" label="密码" />
      <Input field="mount_save_path" label="下载路径映射" />
      <Input field="category" label="分组名" />
    </>
  );
}
export default QbitTorrent;
