export const renderMap = {
  optionRender: (value: any, optionList: any[]) => {
    const find = optionList.find(item => item.value === value);
    if (find) {
      return find.label;
    } else {
      return value;
    }
  },
};
