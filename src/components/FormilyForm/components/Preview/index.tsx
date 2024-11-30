import React, { createContext, useContext } from 'react';
import { Field } from '@formily/core';
import { observer, useField } from '@formily/react';
import { InputProps } from '@douyinfe/semi-ui/lib/es/input';
import { SelectProps } from '@douyinfe/semi-ui/lib/es/select';
import { TreeSelectProps } from '@douyinfe/semi-ui/lib/es/treeSelect';
import { CascaderProps } from '@douyinfe/semi-ui/lib/es/cascader';
import { DatePickerProps } from '@douyinfe/semi-ui/lib/es/datePicker';
import { TimePickerProps } from '@douyinfe/semi-ui/lib/es/timePicker';
import { Tag, Space } from '@douyinfe/semi-ui';
import { isArray, isFunction, isObject } from 'es-toolkit/compat';
import cls from 'classnames';
import './index.css';

const PlaceholderContext = createContext<React.ReactNode>('N/A');

const Placeholder = PlaceholderContext.Provider;

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A';
  return value !== null && value !== undefined && value !== ''
    ? value
    : placeholder;
};
const usePrefixCls = (name?: string) => {
  return 'formily-semi-text';
};

export const formatMomentValue = (
  value: any,
  format: any,
  placeholder?: string,
): string | string[] => {
  const formatDate = (date: any, format: any, i = 0) => {
    if (!date) return placeholder;
    if (isArray(format)) {
      const _format = format[i];
      if (isFunction(_format)) {
        return _format(date);
      }
      return date?.format ? date.format(_format) : date;
    } else {
      if (isFunction(format)) {
        return format(date);
      }
      return date?.format ? date.format(format) : date;
    }
  };
  if (isArray(value)) {
    return value.map((val, index) => {
      return formatDate(val, format, index);
    });
  } else {
    return value ? formatDate(value, format) : value || placeholder;
  }
};

const Input: React.FC<InputProps> = props => {
  const prefixCls = usePrefixCls('text');
  return (
    <Space className={cls(prefixCls, props.className)} style={props.style}>
      {props.addonBefore}
      {props.prefix}
      {usePlaceholder(props.value)}
      {props.suffix}
      {props.addonAfter}
    </Space>
  );
};

const Select: React.FC<SelectProps> = observer(props => {
  const field = useField<Field>();
  const prefixCls = usePrefixCls('text');
  const dataSource: any[] = field?.dataSource?.length ? field.dataSource : [];
  const placeholder = usePlaceholder();
  const getSelected = () => {
    const { value, onChangeWithObject } = props;
    if (props.multiple) {
      return isArray(value)
        ? value.map(val =>
            onChangeWithObject ? val : { label: val, value: val },
          )
        : [];
    } else {
      return onChangeWithObject && isObject(value)
        ? [value]
        : // 保护value可能为0的情况
        value !== undefined && value !== null
        ? [{ label: value, value }]
        : [];
    }
  };

  const getLabels = () => {
    const selected = getSelected();
    if (!selected.length) return <Tag>{placeholder}</Tag>;
    return selected.map(({ value, label }, key) => {
      const text =
        dataSource?.find(item => item.value === value)?.label || label;
      return <Tag key={key}>{text || placeholder}</Tag>;
    });
  };
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      <Space>{getLabels()}</Space>
    </div>
  );
});

const TreeSelect: React.FC<TreeSelectProps> = observer(props => {
  const field = useField<Field>();
  const placeholder = usePlaceholder();
  const prefixCls = usePrefixCls('text');
  const dataSource = field?.dataSource?.length ? field.dataSource : [];
  const getSelected = () => {
    const value = props.value;
    if (props.multiple) {
      return isArray(value)
        ? value.map(val => ({ label: val, value: val }))
        : [];
    } else {
      return value ? [{ label: value, value }] : [];
    }
  };

  const findLabel: any = (value: any, dataSource: any[]) => {
    for (let i = 0; i < dataSource?.length; i++) {
      const item = dataSource[i];
      if (item?.value === value) {
        return item?.label;
      } else {
        const childLabel = findLabel(value, item?.children);
        if (childLabel) return childLabel;
      }
    }
  };

  const getLabels = () => {
    const selected = getSelected();
    if (!selected?.length) return <Tag>{placeholder}</Tag>;
    return selected.map(({ value, label }, key) => {
      return (
        <Tag key={key}>
          {findLabel(value, dataSource) || label || placeholder}
        </Tag>
      );
    });
  };
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  );
});

const Cascader: React.FC<CascaderProps> = observer(props => {
  const field = useField<Field>();
  const placeholder = usePlaceholder();
  const prefixCls = usePrefixCls('text');
  const dataSource: any[] = field?.dataSource?.length ? field.dataSource : [];
  const getSelected = () => {
    return isArray(props.value) ? props.value : [];
  };
  const findLabel = (value: any, dataSource: any[]) => {
    for (let i = 0; i < dataSource?.length; i++) {
      const item = dataSource[i];
      if (item?.value === value) {
        return item?.label;
      } else {
        const childLabel: any = findLabel(value, item?.children);
        if (childLabel) return childLabel;
      }
    }
  };
  const getLabels = () => {
    const selected = getSelected();
    if (!selected?.length) {
      return placeholder;
    }
    return selected
      .map(value => {
        return findLabel(value, dataSource) || placeholder;
      })
      .join('/');
  };
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  );
});

const DatePicker: React.FC<DatePickerProps> = props => {
  const placeholder = usePlaceholder();
  const prefixCls = usePrefixCls('text');
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder);
    return isArray(labels) ? labels.join('~') : labels;
  };
  return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>;
};

const DateRangePicker: React.FC<DatePickerProps> = props => {
  const placeholder = usePlaceholder();
  const prefixCls = usePrefixCls('text');
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder);
    return isArray(labels) ? labels.join('~') : labels;
  };
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  );
};

const TimePicker: React.FC<TimePickerProps> = props => {
  const placeholder = usePlaceholder();
  const prefixCls = usePrefixCls('text');
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder);
    return isArray(labels) ? labels.join('~') : labels;
  };
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  );
};

const TimeRangePicker: React.FC<TimePickerProps> = props => {
  const placeholder = usePlaceholder();
  const prefixCls = usePrefixCls('text');
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder);
    return isArray(labels) ? labels.join('~') : labels;
  };
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  );
};

const Text = (props: React.PropsWithChildren<any>) => {
  const prefixCls = usePrefixCls('text');

  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {usePlaceholder(props.value)}
    </div>
  );
};

Text.Input = Input;
Text.Select = Select;
Text.TreeSelect = TreeSelect;
Text.Cascader = Cascader;
Text.DatePicker = DatePicker;
Text.DateRangePicker = DateRangePicker;
Text.TimePicker = TimePicker;
Text.TimeRangePicker = TimeRangePicker;
Text.Placeholder = Placeholder;
Text.usePlaceholder = usePlaceholder;

export const PreviewText = Text;

export default PreviewText;
