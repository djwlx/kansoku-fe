import { FormilyForm } from '@/components';
import { useProvider, useProviderList, useProviderSchema } from '@/hooks';
import {
  Button,
  Modal,
  Form as SemiForm,
  Space,
  Tooltip,
} from '@douyinfe/semi-ui';
import { Form } from '@formily/core';
import { useEffect, useState } from 'react';
import { nodeTypeList } from '../../../config';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { StepFuncType } from '../../../page';

interface ProcessFormProps {
  currentNode: any;
  flows: any[];
  setCurrentNode: (nodeData: any) => void;
  saveData: StepFuncType;
}

const { Select } = SemiForm;
function ProcessForm(props: ProcessFormProps) {
  const { currentNode = {}, flows, setCurrentNode, saveData } = props;
  const [baseForm, setBaseForm] = useState<FormApi>();
  const [mainForm, setMainForm] = useState<Form>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const { schema: mainSchema } = useProviderSchema({
    type: currentNode?.provider_type,
  });
  const { getProvider } = useProvider();
  const { providerOptionList } = useProviderList({
    type: currentNode?.provider_type,
  });
  const isFirstNode = currentNode.front_uid === flows[0].front_uid;
  const isLastNode =
    currentNode.front_uid === flows[flows.length - 1].front_uid;
  const isFinished = flows.every(item => item.status === 'finished');

  const onProviderChange = async (id: any, isCopy?: boolean) => {
    if (!id) {
      mainForm?.setFormState({
        display: 'hidden',
        values: {},
      });
    }
    const res = await getProvider({ id });
    if (res) {
      mainForm?.setFormState({
        display: 'visible',
        readPretty: !isCopy,
        values: res,
      });
    }
  };

  const onProviderTypeChange = (type?: any) => {
    if (type === 3) {
      mainForm?.setFormState({
        display: 'visible',
        values: {},
      });
    } else {
      mainForm?.setFormState({
        display: 'hidden',
        values: {},
      });
    }
  };
  const getNodeIndex = () => {
    const nodeIndex = flows.findIndex(
      item => item.front_uid === currentNode.front_uid,
    );
    return nodeIndex;
  };

  const getNodeInfo = () => {
    const basicInfo = baseForm?.getValues();
    const mainInfo = mainForm?.getFormState()?.values;
    return { ...basicInfo, ...mainInfo };
  };

  const onNodeChange = async (nodeData: any) => {
    try {
      await Promise.all([baseForm?.validate(), mainForm?.submit()]);
      const info = getNodeInfo();
      const newFlow = flows.map((item, index) => {
        if (item.front_uid === currentNode.front_uid) {
          return {
            ...item,
            ...info,
            status: 'finished',
          };
        }
        return item;
      });
      saveData('flows', newFlow);
      setCurrentNode(nodeData);
    } catch (e) {
      console.log(e, 'eee');
      modal.info({
        title: '提示',
        content: '当前节点未配置完成，是否暂存跳过？',
        cancelText: '继续配置',
        okText: '暂存跳过',
        onOk: () => {
          const newFlow = flows.map((item, index) => {
            if (item.front_uid === currentNode.front_uid) {
              const info = getNodeInfo();
              return {
                ...item,
                ...info,
                status: 'cyan',
              };
            }
            return item;
          });
          saveData('flows', newFlow);
          setCurrentNode(nodeData);
        },
      });
    }
  };

  const onNextStep = () => {
    const findIndex = getNodeIndex();
    const nextNode = flows[findIndex + 1];
    if (findIndex === flows.length - 1) {
      onNodeChange(currentNode);
    } else {
      onNodeChange(nextNode);
    }
  };
  const onPreviousStep = () => {
    const findIndex = getNodeIndex();
    const nextNode = flows[findIndex - 1];
    setCurrentNode(nextNode);
  };

  const submitAll = () => {
    const params = {};
  };

  // 切换节点初始化
  useEffect(() => {
    baseForm?.reset();
    mainForm?.reset();
    onProviderChange(currentNode?.id, currentNode?.nodeType === 2);
    baseForm?.setValues(
      {
        nodeType: currentNode?.nodeType || 1,
        id: currentNode?.id,
      },
      { isOverride: true },
    );
    mainForm?.setValues(currentNode);
  }, [currentNode]);

  return (
    <>
      <SemiForm
        getFormApi={setBaseForm}
        style={{ width: '100%' }}
        initValues={{ nodeType: 1 }}
        render={({ values }) => {
          const showProvider = values?.nodeType === 1 || values?.nodeType === 2;
          return (
            <>
              <Select
                label="节点类型"
                field="nodeType"
                showClear
                style={{ width: '100%' }}
                optionList={nodeTypeList}
                onChange={onProviderTypeChange}
                rules={[{ required: true, message: '该字段是必填字段' }]}
              />
              {showProvider && (
                <Select
                  label="预设列表"
                  field="id"
                  showClear
                  onChange={i => onProviderChange(i, values?.nodeType === 2)}
                  style={{ width: '100%' }}
                  rules={[{ required: true, message: '该字段是必填字段' }]}
                  optionList={providerOptionList}
                />
              )}
            </>
          );
        }}
      />
      <FormilyForm
        initConfig={{ display: 'hidden' }}
        getFormInstance={setMainForm}
        schema={mainSchema}
      />
      <Space>
        {!isFirstNode && (
          <Button type="secondary" theme="solid" onClick={onPreviousStep}>
            上一步
          </Button>
        )}
        {!isLastNode && (
          <Button type="secondary" theme="solid" onClick={onNextStep}>
            下一步
          </Button>
        )}
        {isLastNode && (
          <Button theme="solid" onClick={onNextStep}>
            配置完成
          </Button>
        )}
        {isFinished ? (
          <Button theme="solid" loading={submitLoading} onClick={submitAll}>
            提交工作流
          </Button>
        ) : (
          <Tooltip content={'节点未全部配置完成'}>
            <Button theme="solid" disabled>
              提交工作流
            </Button>
          </Tooltip>
        )}
      </Space>
      {contextHolder}
    </>
  );
}
export default ProcessForm;
