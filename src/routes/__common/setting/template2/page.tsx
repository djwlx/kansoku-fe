import { FC, useEffect, useState } from 'react';
import FormilyForm from '@/components/FormilyForm';
import { testSchema2 } from '@/services/setting';

const Template: FC = () => {
  const [schema, setSchema] = useState();
  const [initValues, setInitValues] = useState();

  useEffect(() => {
    testSchema2().then(res => {
      if (res.data?.code === 200) {
        const result = res.data?.data;
        setSchema(result.schema);
        setInitValues(result.initValues);
      }
    });
  }, []);

  const submitAction = async (values: any) => {
    console.log(values);
  };

  return (
    <div style={{ padding: 16 }}>
      <FormilyForm
        initValues={initValues}
        schema={schema}
        onSubmit={submitAction}
      />
    </div>
  );
};
export default Template;
