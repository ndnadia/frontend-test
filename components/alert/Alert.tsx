"use client";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/index";
import { hideAlert } from "../../app/store/redux/alertSlice";

export const AlertTheme = () => {
  const dispatch = useDispatch();
  const openAlert = useSelector((state: RootState) => state.alert);

  const ALERT_ITEM = {
    success: {
      title: "Success",
      type: "success",
    },
    error: {
      title: "Error",
      type: "error",
    },
    warning: {
      title: "Warning",
      type: "warning",
    },
    info: {
      title: "Info",
      type: "info",
    },
  };

  const onClose = () => {
    dispatch(hideAlert());
  };

  return (
    <Snackbar
      open={openAlert.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={
          ALERT_ITEM[openAlert.type as keyof typeof ALERT_ITEM]
            ?.type as AlertColor
        }
        variant="filled"
        sx={{ width: "100%" }}
      >
        {openAlert.message ||
          ALERT_ITEM[openAlert.type as keyof typeof ALERT_ITEM]?.title}
      </Alert>
    </Snackbar>
  );
};
