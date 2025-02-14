"use client";
import { Divider, Typography, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  COOKIE_KEY,
  getCookies,
  removeCookies,
  setCookies,
} from "../../app/store/useCookies";
import { usePathname, useRouter } from "next/navigation";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useMutation } from "@tanstack/react-query";
import { RootState } from "../../app/store/index";
import { logout, setUser } from "../../app/store/redux/userSlice";
import { POST, SuccessRes } from "../../app/services/index";
import { REFRESH_TOKEN } from "../../app/services/path";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const userName = useSelector((state: RootState) => state.user.userName);
  const refreshToken = getCookies(COOKIE_KEY.REFRESH_TOKEN);

  const onLogout = () => {
    removeCookies(COOKIE_KEY.ACCESS_TOKEN);
    removeCookies(COOKIE_KEY.REFRESH_TOKEN);
    removeCookies(COOKIE_KEY.USER_DETAIL);
    dispatch(logout());
    router.push("/");
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await POST(REFRESH_TOKEN, { refreshToken });
      return response;
    },
    onSuccess: (res) => {
      const { data } = res as SuccessRes<{
        accessToken: string;
        refreshToken: string;
      }>;
      setCookies(COOKIE_KEY.ACCESS_TOKEN, data.accessToken);
      setCookies(COOKIE_KEY.REFRESH_TOKEN, data.refreshToken);
      dispatch(setUser({ userName: getCookies(COOKIE_KEY.USER_DETAIL) }));
    },
    onError: () => {
      onLogout();
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, [pathname]);

  return (
    <header>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "black",
            width: "80%",
          }}
        />
        <Typography variant="h6" style={{ color: "black", padding: 5 }}>
          {userName}
        </Typography>
        <IconButton aria-label="logout" onClick={onLogout}>
          <PowerSettingsNewIcon />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
