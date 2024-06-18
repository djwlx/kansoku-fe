import { IconMinusCircle, IconPlusCircle } from '@douyinfe/semi-icons';
import { ArrayField, Button, Form } from '@douyinfe/semi-ui';
import React from 'react';
import FormContainer from '../components/FormContainer';

const { Select } = Form;
function DownloadSetting() {
  return (
    <FormContainer>
      <ArrayField field="@download">
        {({ add, arrayFields }) => {
          console.log('field');
          return (
            <React.Fragment>
              {/* <Button onClick={add} icon={<IconPlusCircle />} theme="light">
            Add new line
          </Button> */}
              {/* <Button
            icon={<IconPlusCircle />}
            onClick={() => {
              addWithInitValue({ name: 'Semi DSM', type: 'Designer' });
            }}
            style={{ marginLeft: 8 }}
          >
            Add new line with init value
          </Button> */}
              {arrayFields.map(({ field, key, remove }, i) => (
                <div key={key} style={{ width: 1000, display: 'flex' }}>
                  <Select
                    field={`${field}[type]`}
                    label={`${field}.name`}
                    style={{ width: 200, marginRight: 16 }}
                  />
                  <Form.Select
                    field={`${field}[role]`}
                    label={`${field}.role`}
                    style={{ width: 120 }}
                    optionList={[
                      { label: 'Engineer', value: 'Engineer' },
                      { label: 'Designer', value: 'Designer' },
                    ]}
                  />
                  <Button
                    type="danger"
                    theme="borderless"
                    icon={<IconMinusCircle />}
                    onClick={remove}
                    style={{ margin: 12 }}
                  />
                </div>
              ))}
            </React.Fragment>
          );
        }}
      </ArrayField>
    </FormContainer>
  );
}
export default DownloadSetting;

// const result = {
//   download_type: [
//     {
//       label: 'qbit',
//       value: 'qbit',
//     },
//   ],
// };
