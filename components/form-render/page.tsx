import { Grid2 as Grid } from "@mui/material";
import React, { Fragment } from "react";
import {
  Control,
  FieldValues,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { PasswordInput, TextArea, TextInput } from "./input/Input";

interface RenderFormProps<T extends FieldValues> {
  forms: object[];
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  control: Control<T>;
  styleRow?: React.CSSProperties;
  onChange?: (value: any) => void;
  onClear?: () => void;
}

export const RenderForm = <T extends FieldValues>({
  forms = [],
  setValue,
  getValues,
  control,
  styleRow,
}: RenderFormProps<T>) => {
  const handleChange = (e: any, item: any) => {
    setValue(item.name, e.target.value);
  };

  const rest = {
    control,
    setValue,
    getValues,
    handleChange,
  };

  return (
    <Fragment>
      <Grid container spacing={2} style={styleRow}>
        {forms.map((item, index) => {
          return (
            <Grid
              key={`colForm${index}`}
              size={{
                xs: 12,
                md: 12,
                lg: 12,
                xl: 12,
              }}
            >
              {renderInputType(item, rest)}
            </Grid>
          );
        })}
      </Grid>
      <div style={{ marginBottom: "16px" }} />
    </Fragment>
  );
};

export const renderTypeError = (error: any) => {
  if (error && error.message) {
    return error.message;
  }
  switch (error.type) {
    case "required":
      return `โปรดระบุ`;
    case "pattern":
      return `รูปแบบไม่ถูกต้อง`;
    case "maxLength":
      return `ระบุไม่เกิน ${error.message} ตัวอักษร`;
    case "max":
      return `ระบุจำนวนไม่เกิน ${error.message} ตัวอักษร`;
    case "minLength":
      return `ระบุไม่น้อยกว่า ${error.message} ตัวอักษร`;
    case "min":
      return `ระบุไม่น้อยกว่า ${error.message} ตัวอักษร`;
  }
};

export function renderInputType(item: any, globalProps: any) {
  const { type } = item;
  switch (type) {
    case "INPUT":
      return <TextInput item={{ ...item }} {...globalProps} />;
    case "PASSWORD":
      return <PasswordInput item={{ ...item }} {...globalProps} />;
    case "AREA":
      return <TextArea item={{ ...item }} {...globalProps} />;
    default:
      return <div />;
  }
}
