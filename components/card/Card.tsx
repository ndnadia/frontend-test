import { Card, CardContent } from "@mui/material";
import React from "react";

const CardTheme = (props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const { children, style, ...rest } = props;
  return (
    <Card
      sx={{ width: 500, height: 600 }}
      style={{
        padding: 20,
        ...style,
      }}
      {...rest}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardTheme;
