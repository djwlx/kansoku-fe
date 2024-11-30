import { connect, mapProps } from '@formily/react';
import { Select as SemiSelect } from '@douyinfe/semi-ui';

export const Select = connect(
  SemiSelect,
  mapProps(
    {
      loading: true,
      dataSource: 'optionList',
    },
    (props, field) => {
      const { style, ...rest } = props;
      return {
        style: {
          width: '100%',
          ...style,
        },
        ...rest,
      };
    },
  ),
);
