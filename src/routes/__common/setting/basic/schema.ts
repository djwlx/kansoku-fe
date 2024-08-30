import { DSchema } from '@/utils/formily';

const basicSchema: DSchema = {
  web: {
    type: 'object',
    'x-component': 'Section',
    'x-component-props': {
      text: 'Web',
    },
    properties: {
      host: {
        type: 'string',
        title: '地址',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      port: {
        type: 'string',
        title: '端口',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      username: {
        type: 'string',
        title: '用户名',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      password: {
        type: 'string',
        title: '密码',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
  other: {
    type: 'void',
    'x-component': 'Section',
    'x-component-props': {
      text: '其他',
    },
    properties: {
      temp_path: {
        type: 'string',
        title: '临时目录',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
};

export default basicSchema;
