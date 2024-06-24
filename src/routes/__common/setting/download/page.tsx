import {
  Button,
  Card,
  Space,
  CardGroup,
  Popconfirm,
  Descriptions,
  Toast,
  Typography,
} from '@douyinfe/semi-ui';
import EditModal from './EditModal';
import useSettingConfig from '@/hooks/useSettingConfig';
import {
  addProviderConfig,
  deleteProviderConfig,
  updateProviderConfig,
} from '@/services/setting';
import useModalHook from '@/hooks/useModalHook';

const { Text } = Typography;
function DownloadSetting() {
  const { setting, fetchData } = useSettingConfig({ type: 'download' });
  const downloadList = setting?.download || [];
  const keyArray = downloadList.map((item: any) => item.name);
  const { setModalData, closeModal, ...rest } = useModalHook();

  const onDelete = async (item: any) => {
    const result = await deleteProviderConfig('download', item.id);
    if (result.data?.code === 200) {
      Toast.success('删除成功');
      fetchData();
      closeModal();
    }
  };

  const onEdit = async (id: string, item: any) => {
    const param = { id, ...item };
    const result = await updateProviderConfig('download', param);
    if (result.data?.code === 200) {
      Toast.success('修改成功');
      fetchData();
      closeModal();
    }
  };

  const onAdd = async (item: any) => {
    const result = await addProviderConfig('download', item);
    if (result.data?.code === 200) {
      Toast.success('添加成功');
      fetchData();
      closeModal();
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Space>
        <Button type="secondary" onClick={() => setModalData('open')}>
          添加下载器
        </Button>
      </Space>
      <div>
        <CardGroup style={{ marginTop: 16 }}>
          {downloadList.map((item: any) => {
            return (
              <Card
                shadows="hover"
                key={item.id}
                title={item.name}
                style={{ width: 300 }}
                footerLine={true}
                footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
                footer={
                  <Space>
                    <Button
                      type="secondary"
                      onClick={() => setModalData('open', item)}
                    >
                      编辑
                    </Button>
                    <Popconfirm
                      trigger="click"
                      title="确定要删除这个下载器吗？"
                      content="此删除将不可逆"
                      okType="danger"
                      onConfirm={() => onDelete(item)}
                    >
                      <Button type="danger">删除</Button>
                    </Popconfirm>
                  </Space>
                }
              >
                <center>
                  <Descriptions
                    data={[
                      {
                        key: '下载器类型',
                        value: (
                          <Text
                            ellipsis={{ showTooltip: true }}
                            style={{ width: 130 }}
                          >
                            {item.type}
                          </Text>
                        ),
                      },
                      {
                        key: '下载器连接地址',
                        value: (
                          <Text
                            ellipsis={{ showTooltip: true }}
                            style={{ width: 130 }}
                          >
                            {item.addr}
                          </Text>
                        ),
                      },
                      {
                        key: '下载器保存路径',
                        value: (
                          <Text
                            ellipsis={{ showTooltip: true }}
                            style={{ width: 130 }}
                          >
                            {item.save_path}
                          </Text>
                        ),
                      },
                    ]}
                  />
                </center>
                <center style={{ fontSize: 20 }}>...</center>
              </Card>
            );
          })}
        </CardGroup>
      </div>
      <EditModal
        keyArray={keyArray}
        closeModal={closeModal}
        onAdd={onAdd}
        onEdit={onEdit}
        {...rest}
      />
    </div>
  );
}
export default DownloadSetting;
