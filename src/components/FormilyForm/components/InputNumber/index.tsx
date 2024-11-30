import { connect, mapProps } from '@formily/react';
import { InputNumber as SemiInputNumber } from '@douyinfe/semi-ui';

export const InputNumber = connect(
  SemiInputNumber,
  mapProps((props, field) => {
    const { style, ...rest } = props;
    return {
      style: {
        width: '100%',
        ...style,
      },
      ...rest,
    };
  }),
);
