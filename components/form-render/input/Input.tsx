import { TextField } from "@mui/material";
import React, { Fragment } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import { renderTypeError } from "../page";

interface InputTextProps {
  control: Control<FieldValues>;
  item: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, item: any) => void;
}

export const TextInput = ({ control, item, handleChange }: InputTextProps) => {
  const { rules, name, defaultValue, label, ...propsInput } = item;

  const { field, fieldState } = useController({
    control,
    name,
    rules,
    defaultValue,
  });
  const { error } = fieldState;
  const { value = "" } = field;

  return (
    <Fragment>
      <TextField
        required={rules?.required || false}
        id={name}
        label={label}
        fullWidth
        onChange={(e) =>
          handleChange(e as React.ChangeEvent<HTMLInputElement>, item)
        }
        error={error}
        value={value}
        {...propsInput}
      />
      {error && (
        <div style={{ color: "red", fontSize: 12 }}>{renderTypeError(error)}</div>
      )}
    </Fragment>
  );
};

export const PasswordInput = ({
  control,
  item,
  handleChange,
}: InputTextProps) => {
  const { rules, name, defaultValue, label, ...propsInput } = item;

  const { field, fieldState } = useController({
    control,
    name,
    rules,
    defaultValue,
  });
  const { error } = fieldState;
  const { value = "" } = field;
  return (
    <Fragment>
      <TextField
        required={rules?.required || false}
        id={name}
        label={label}
        fullWidth
        onChange={(e) =>
          handleChange(e as React.ChangeEvent<HTMLInputElement>, item)
        }
        error={error}
        type="password"
        autoComplete="current-password"
        value={value}
        {...propsInput}
      />
      {error && (
        <div style={{ color: "red", fontSize: 12 }}>
          {renderTypeError(error)}
        </div>
      )}
    </Fragment>
  );
};

export const TextArea = ({ control, item, handleChange }: InputTextProps) => {
  const { rules, name, defaultValue, label, rows, ...propsInput } = item;

  const { field, fieldState } = useController({
    control,
    name,
    rules,
    defaultValue,
  });
  const { error } = fieldState;
  const { value = "" } = field;

  return (
    <Fragment>
      <TextField
        required={rules?.required || false}
        id={name}
        label={label}
        fullWidth
        multiline
        rows={rows || 4}
        onChange={(e) =>
          handleChange(e as React.ChangeEvent<HTMLInputElement>, item)
        }
        error={error}
        value={value}
        {...propsInput}
      />
      {error && (
        <div style={{ color: "red", fontSize: 12 }}>
          {renderTypeError(error)}
        </div>
      )}
    </Fragment>
  );
};
