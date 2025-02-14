import Cookies from "universal-cookie";

const config = {
  path: "/",
  expires: getExpire(),
};

const cookies = new Cookies();

function getExpire() {
  return new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 15);
}

export const setCookies = (name: string, value: string) => {
  cookies.set(name, value, { ...config });
};

export const getCookies = (name: string) => {
  const value = cookies.get(name);
  return value;
};

export const removeCookies = (name: string) => {
  return cookies.remove(name);
};

export const COOKIE_KEY = {
  ACCESS_TOKEN: "SbtyEJjHSAANbNs",
  REFRESH_TOKEN: "JEBzPXsDNnXeNvO",
  USER_DETAIL: "PaqstULPWXVTfVs",
};
