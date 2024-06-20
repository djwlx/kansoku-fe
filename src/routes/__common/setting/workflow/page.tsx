import EditWorkFlow from './EditWorkFlow';
import useSettingConfig from '@/hooks/useSettingConfig';

function WorkFlowSetting() {
  const { setting } = useSettingConfig();
  console.log(setting);

  return (
    <div style={{ padding: 16 }}>
      <EditWorkFlow />
    </div>
  );
}
export default WorkFlowSetting;
