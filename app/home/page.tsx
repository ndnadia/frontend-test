"use client";
import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import CardTheme from "../../components/card/Card";

const HomePage = () => {
  return (
    <CardTheme
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: 20,
        }}
      >
        <Typography
          variant="h5"
          style={{
            color: "black",
            padding: 5,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Home Page
        </Typography>
        <Image
          src="/images/building.png"
          width={300}
          height={200}
          alt="loginImage"
          style={{ objectFit: "contain" }}
        />
      </div>
    </CardTheme>
  );
};

export default HomePage;
