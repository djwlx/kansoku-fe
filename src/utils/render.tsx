export const renderMap = {
  optionRender: (value: any, optionList: any[]) => {
    const sourceList = Array.isArray(optionList) ? optionList : [];
    const find = sourceList.find(item => item.value === value);
    if (find) {
      return find.label;
    } else {
      return value;
    }
  },
};
