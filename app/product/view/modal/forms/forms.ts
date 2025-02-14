export const PRODUCT_FORM = () => {
  const required = true;
  return [
    {
      name: "name",
      label: "Name",
      type: "INPUT",
      span: 12,
      rules: {
        required,
      },
    },
    {
      name: "description",
      label: "Description",
      type: "AREA",
      span: 12,
    },
  ];
};
