import { model } from '@modern-js/runtime/model';
import { ProgressData } from './config';

interface WorkFlowModelState {
  // 当前步骤
  currentStep: number;
  //全部数据
  workFlowData: ProgressData;
}

const workFlowModel = model<WorkFlowModelState>('workflow').define({
  state: {
    currentStep: 0,
    workFlowData: {},
  },

  actions: {
    setCurrentStep(state, payload: number) {
      state.currentStep = payload;
    },
    setWorkFlowData(state, payload: ProgressData) {
      state.workFlowData = payload;
    },
  },
});

export default workFlowModel;
