"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import { RenderForm } from "../../components/form-render/page";
import { useForm } from "react-hook-form";
import { LOGIN_FORM } from "./forms/forms";
import useLogin from "./hook/useLogin";
import Loading from "../../components/loading/page";
import CardTheme from "../../components/card/Card";
import { Fragment } from "react";
import { AlertTheme } from "../../components/alert/Alert";

export type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { control, handleSubmit, setValue, getValues } = useForm<LoginForm>();
  const { onLogin, isPending } = useLogin();

  return (
    <Fragment>
      <Loading open={isPending} />
      <CardTheme>
        <div
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/images/building.png"
            width={300}
            height={200}
            alt="loginImage"
            style={{ objectFit: "contain" }}
          />
        </div>
        <RenderForm
          setValue={setValue}
          getValues={getValues}
          control={control}
          forms={LOGIN_FORM()}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            borderRadius: 20,
            backgroundColor: "#000",
            padding: 10,
          }}
          fullWidth
          onClick={handleSubmit((values: LoginForm) => onLogin(values))}
        >
          Login
        </Button>
      </CardTheme>
      <AlertTheme />
    </Fragment>
  );
};

export default LoginPage;
