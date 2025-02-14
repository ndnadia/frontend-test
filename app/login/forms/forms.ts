export const LOGIN_FORM = () => {
  const required = true;
  return [
    {
      name: "email",
      label: "Email",
      type: "INPUT",
      span: 12,
      rules: {
        required,
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "รูปแบบไม่ถูกต้อง ตัวอย่าง: example@example.com",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      type: "PASSWORD",
      span: 12,
      rules: {
        required,
      },
    },
  ];
};
