import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';
import { Form } from '@douyinfe/semi-ui';

const { Label, ErrorMessage } = Form;

interface BaseItemProps {
  label?: React.ReactNode;
  required?: boolean;
  children?: React.ReactNode;
  feedbackText?: React.ReactNode;
  asterisk?: boolean;
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {});
  extra?: React.ReactNode;
}

function BaseItem(props: BaseItemProps) {
  const { children, label, asterisk, extra, feedbackText, feedbackStatus } =
    props;

  return (
    <div className="semi-form-field" style={{ margin: '12px 0' }}>
      <Label text={label} required={asterisk} />
      <div className="semi-form-field-main">{children}</div>
      <ErrorMessage
        showValidateIcon
        error={feedbackText}
        validateStatus={feedbackStatus}
      />
      {extra && <div className="extra">{extra}</div>}
    </div>
  );
}

export const FormItem = connect(
  BaseItem,
  mapProps(
    { validateStatus: true, title: 'label', required: true },
    (props, field) => {
      if (isVoidField(field)) return props;
      if (!field) return props;
      const takeMessage = () => {
        const split = (messages: any[]) => {
          return messages.reduce((buf, text, index) => {
            if (!text) return buf;
            return index < messages.length - 1
              ? buf.concat([text, ', '])
              : buf.concat([text]);
          }, []);
        };
        if (field.validating) return;
        if (props.feedbackText) return props.feedbackText;
        if (field.selfErrors.length) return split(field.selfErrors);
        if (field.selfWarnings.length) return split(field.selfWarnings);
        if (field.selfSuccesses.length) return split(field.selfSuccesses);
      };

      return {
        feedbackText: takeMessage(),
        extra: props.extra || field.description,
      };
    },
    (props, field: any) => {
      if (isVoidField(field)) return props;
      if (!field) return props;
      return {
        feedbackStatus:
          field.validateStatus === 'validating'
            ? 'pending'
            : field.decorator[1]?.feedbackStatus || field.validateStatus,
      };
    },
    (props, field) => {
      if (isVoidField(field)) return props;
      if (!field) return props;
      let asterisk = false;
      if (field.required && field.pattern !== 'readPretty') {
        asterisk = true;
      }
      if ('asterisk' in props) {
        asterisk = props.asterisk ?? false;
      }
      return {
        asterisk,
      };
    },
  ),
);
