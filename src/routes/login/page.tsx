import { Form, Button, Toast } from '@douyinfe/semi-ui';
import type { FormApi as SFormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useState } from 'react';
import { useNavigate } from '@modern-js/runtime/router';
import { login } from '@/services/user';
import { ENV } from '@/utils/env';

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
        backgroundColor: 'var(--semi-color-fill-1)',
        justifyContent: 'center',
      }}
    >
      <main
        style={{
          width: 400,
          maxWidth: '100%',
          minWidth: ENV.maxWidth,
          textAlign: 'center',
          padding: 16,
          margin: 16,
          backgroundColor: 'var(--semi-color-bg-0)',
          boxShadow: 'var(--semi-color-shadow) 0px 0.5rem 2rem',
        }}
      >
        <header
          style={{
            fontSize: 20,
            fontWeight: 'bolder',
            color: 'var(--semi-color-primary)',
          }}
        >
          kansoku
        </header>
        <Form
          labelPosition="inset"
          getFormApi={setFormApi}
          style={{ width: '100%' }}
        >
          <Input rules={[{ required: true }]} field="username" label="用户名" />
          <Input
            rules={[{ required: true }]}
            field="password"
            mode="password"
            label="密码"
          />
        </Form>
        <Button theme="solid" onClick={submit} style={{ width: '100%' }}>
          登录
        </Button>
      </main>
    </div>
  );
}

export default Login;
