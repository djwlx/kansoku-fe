function useFlowConfig() {
  const prefix = 'flow';

  const getFlowNodeField = (field: string, index?: number) => {
    if (typeof index === 'number') {
      return `${prefix}[${index}].${field}`;
    }
    return `${prefix}.${field}`;
  };

  return {
    config: {},
    getFlowNodeField,
  };
}
export default useFlowConfig;
