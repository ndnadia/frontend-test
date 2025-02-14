import axios from "axios";
import { COOKIE_KEY, getCookies } from "../store/useCookies";

export type SuccessRes<T> = {
  data: T;
  error: string;
};

export type ErrorRes = {
  error: string;
};

export const api = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const POST = (
  path: string,
  values: object,
  token = getCookies(COOKIE_KEY.ACCESS_TOKEN)
) =>
  new Promise((resolve, reject) => {
    api
      .post(path, values, {
        headers: {
          Authorization: token || "",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject({ success: false, message: response.statusText });
        }
      })
      .catch((err) => {
        reject(err.response ? err.response.data : err.message);
      });
  });

export const GET = (
  path: string,
  token = getCookies(COOKIE_KEY.ACCESS_TOKEN)
) =>
  new Promise((resolve, reject) => {
    api
      .get(path, {
        headers: {
          Authorization: token || "",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject({ success: false, message: response.statusText });
        }
      })
      .catch((err) => {
        reject(err.response ? err.response.data : err.message);
      });
  });

export const PATCH = (
  path: string,
  values: object,
  token = getCookies(COOKIE_KEY.ACCESS_TOKEN)
) =>
  new Promise((resolve, reject) => {
    api
      .patch(path, values, {
        headers: {
          Authorization: token || "",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject({ success: false, message: response.statusText });
        }
      })
      .catch((err) => {
        reject(err.response ? err.response.data : err.message);
      });
  });

export const DELETE = (
  path: string,
  values: object,
  token = getCookies(COOKIE_KEY.ACCESS_TOKEN)
) =>
  new Promise((resolve, reject) => {
    api
      .delete(path, {
        headers: {
          Authorization: token || "",
        },
        data: values,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject({ success: false, message: response.statusText });
        }
      })
      .catch((err) => {
        reject(err.response ? err.response.data : err.message);
      });
  });
