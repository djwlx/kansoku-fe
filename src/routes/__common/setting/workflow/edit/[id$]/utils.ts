export const parseData = (data: any) => {
  if (!data) {
    return {};
  }

  return data;
};

export const formatterData = async (data: any) => {
  console.log(data, 'data');
  return {
    data: data,
  };
};
