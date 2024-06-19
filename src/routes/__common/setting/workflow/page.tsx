import useSettingConfig from '@/hooks/useSettingConfig';

function WorkFlowSetting() {
  const { setting } = useSettingConfig();
  console.log(setting);
  return <div>workflowSetting</div>;
}
export default WorkFlowSetting;
