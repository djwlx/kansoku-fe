import { Form, Button, Toast } from '@douyinfe/semi-ui';
import type { FormApi as SFormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useState } from 'react';
import { useNavigate } from '@modern-js/runtime/router';
import { login } from '@/services/user';

const { Input } = Form;
function Login() {
  const [formApi, setFormApi] = useState<SFormApi>();
  const navigate = useNavigate();
  const redirect = new URLSearchParams(window.location.search)?.get('redirect');

  const submit = async () => {
    try {
      const res = await formApi?.validate();
      const result = await login(res);
      if (result.data?.code === 200) {
        const { token } = result.data?.data || {};
        localStorage.setItem('token', token);
        if (redirect) {
          navigate(redirect);
        } else {
          navigate('/');
        }
        Toast.success('登录成功');
      }
    } catch (e) {}
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        paddingTop: 50,
      }}
    >
      <Form getFormApi={setFormApi} style={{ width: 200 }}>
        <Input field="username" label="用户名" />
        <Input field="password" label="密码" />
      </Form>
      <Button onClick={submit} style={{ width: 200 }}>
        登录
      </Button>
    </div>
  );
}

export default Login;
