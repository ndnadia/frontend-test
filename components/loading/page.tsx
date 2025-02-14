import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({ open }: { open: boolean }) => {
  return (
    <Backdrop open={open} style={{ zIndex: 10000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
