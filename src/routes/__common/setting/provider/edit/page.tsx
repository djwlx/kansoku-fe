import { getURLParams } from '@/utils/url';
import ProviderEdit from '../components/ProviderEdit';

function Edit() {
  const params = getURLParams();
  console.log(params, 'params');
  return <ProviderEdit type={params.type} />;
}
export default Edit;
