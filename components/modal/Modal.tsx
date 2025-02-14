import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import React from "react";

export const ModalTheme = ({
  children,
  open,
  handleClose,
  onSubmit,
  title,
}: {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  onSubmit: () => void;
  title: string;
}) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <GridCloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={onSubmit}
          style={{ backgroundColor: "#000", color: "#fff" }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          onClick={handleClose}
          style={{ borderColor: "#000", color: "#000" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
