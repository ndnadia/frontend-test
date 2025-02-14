import { Button, ButtonGroup, styled } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NavigationContainer = styled("div")(() => ({
  position: "fixed",
  bottom: 70,
  left: "50%",
  transform: "translateX(-50%)",
  maxWidth: 400,
  width: "90%",
}));

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const menuArr = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Product",
      path: "/product",
    },
  ];

  if (!menuArr.some((item) => item.path === pathname)) return null;
  return (
    <NavigationContainer>
      <ButtonGroup
        disableElevation
        variant="contained"
        style={{
          borderRadius: 10,
          backgroundColor: "#000",
          padding: 10,
        }}
        fullWidth
      >
        {menuArr.map((item, index) => {
          return (
            <Button
              key={index}
              style={{ backgroundColor: "#000", borderRightColor: "white" }}
              onClick={() => router.push(item.path)}
            >
              <span
                style={{
                  color: "white",
                  textDecoration: item.path === pathname ? "underline" : "none",
                  textUnderlineOffset: 5,
                }}
              >
                {item.name}
              </span>
            </Button>
          );
        })}
      </ButtonGroup>
    </NavigationContainer>
  );
};

export default Nav;
