import { useCallback, useState } from 'react';

export type ModalModeType = 'closed' | 'open';

export type UseModalHookReturnValue<T> = {
  mode: ModalModeType;
  visible: boolean;
  data?: T;
  setModalData: (mode: ModalModeType, data?: T | undefined) => void;
  closeModal: () => void;
};

export type ModalHookProps<T = any> = {
  mode: ModalModeType;
  visible: boolean;
  data?: T;
  closeModal: () => void;
};

const useModalHook = <T>(): UseModalHookReturnValue<T> => {
  const [mode, setMode] = useState<ModalModeType>('closed');
  const [data, setData] = useState<T>();

  const closeModal = useCallback(() => {
    setMode('closed');
    setData(undefined);
  }, []);

  const setModalData = useCallback((mode: ModalModeType, data?: T) => {
    if (['open'].includes(mode)) {
      data && setData(data);
    }
    setMode(mode);
  }, []);

  return {
    mode,
    visible: mode !== 'closed',
    data,
    setModalData,
    closeModal,
  };
};

export default useModalHook;
