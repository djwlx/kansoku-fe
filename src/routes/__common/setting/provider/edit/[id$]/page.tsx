import { useQuery } from 'djwl-module';
import { useParams } from '@modern-js/runtime/router';
import { useEffect, useState } from 'react';
import ProviderEdit from '../../components/ProviderEdit';
import { getProviderItem } from '@/services/provider';

function Edit() {
  const { query } = useQuery();
  const { id } = useParams();
  const [initValue, setInitValue] = useState({});
  const isEdit = Boolean(id);

  useEffect(() => {
    if (id) {
      getProviderItem(id).then(res => {
        if (res.data?.code === 200) {
          setInitValue(res.data?.data?.data || {});
        }
      });
    }
  }, [id]);

  return (
    <ProviderEdit
      initValue={isEdit ? initValue : undefined}
      mode={isEdit ? 'edit' : 'create'}
      type={query?.type}
    />
  );
}
export default Edit;
