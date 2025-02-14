import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [recordValues, setRecordValues] = useState({});

  const onToggle = (values: object) => {
    setRecordValues(values);
    setOpen(!open);
  };

  return {
    open,
    onToggle,
    recordValues,
  };
};
