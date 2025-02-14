import { jwtDecode } from "jwt-decode";

export const checkExpToken = (token: string): boolean => {
  if (!token) return true;

  const decoded = jwtDecode<{ exp: number }>(token);
  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  return currentTime > expirationTime;
};

export const onCheckInputNumber = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  const { key } = e;
  const isValidKey =
    /^[0-9.]$/.test(key) ||
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight";

  if (!isValidKey) {
    e.preventDefault();
  }
};
