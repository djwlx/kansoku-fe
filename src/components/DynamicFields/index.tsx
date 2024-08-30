import { ISchema } from '@formily/react';
import { FC } from 'react';

const DynamicFields: FC = () => {
  return <div></div>;
};
export default DynamicFields;

// <Input field="addr" label="下载器连接地址" rules={[{ required: true }]} />
//     <Input
//       field="save_path"
//       label="下载器保存路径"
//       rules={[{ required: true }]}
//     />
//     <Input field="username" label="用户名" />
//     <Input field="password" label="密码" />
//     <Input field="mount_save_path" label="下载路径映射" />
//     <Input field="category" label="分组名" />

export const schema: ISchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '下载器名称',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    type: {
      type: 'string',
      title: '下载器类型',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    addr: {
      type: 'string',
      title: '下载器连接地址',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': {
        dependencies: ['.type'],
        fulfill: {
          state: {
            visible: '{{$deps[0]==="qbittorrent"}}',
          },
        },
      },
    },
    username: {
      type: 'string',
      title: '用户名',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': {
        dependencies: ['.type'],
        fulfill: {
          state: {
            visible: '{{$deps[0]==="qbittorrent"}}',
          },
        },
      },
    },
    password: {
      type: 'string',
      title: '密码',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': {
        dependencies: ['.type'],
        fulfill: {
          state: {
            visible: '{{$deps[0]==="qbittorrent"}}',
          },
        },
      },
    },
  },
};
