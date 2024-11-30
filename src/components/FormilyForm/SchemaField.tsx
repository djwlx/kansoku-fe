import { createSchemaField } from '@formily/react';
import { Form } from '@douyinfe/semi-ui';
import { Input } from './components/Input';
import { FormItem } from './components/FormItem';
import { Select } from './components/Select';
import { Switch } from './components/Switch';
import { InputNumber } from './components/InputNumber';

const { Section } = Form;

export const SchemaField = createSchemaField({
  components: {
    // 表单组件
    Input,
    InputNumber,
    Select,
    Switch,
    FormItem,
    // 布局组件
    Section,
  },
  scope: {},
});
