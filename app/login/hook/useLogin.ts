import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "../page";

import { useRouter } from "next/navigation";
import { ErrorRes, POST, SuccessRes } from "../../services";
import { setUser } from "../../store/redux/userSlice";
import { showAlert } from "../../store/redux/alertSlice";
import { LOGIN } from "../../services/path";
import { useDispatch } from "react-redux";
import { COOKIE_KEY, setCookies } from "../../store/useCookies";

const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: onLogin, isPending } = useMutation({
    mutationFn: async (values: LoginForm) => {
      const response = await POST(LOGIN, values);
      return response;
    },
    onSuccess: (res) => {
      const { data } = res as SuccessRes<{
        accessToken: string;
        refreshToken: string;
        fullName: string;
      }>;

      setCookies(COOKIE_KEY.ACCESS_TOKEN, data.accessToken);
      setCookies(COOKIE_KEY.REFRESH_TOKEN, data.refreshToken);
      setCookies(COOKIE_KEY.USER_DETAIL, JSON.stringify(data.fullName));

      dispatch(
        setUser({
          userName: data.fullName,
        })
      );
      router.push("/home");
    },
    onError: (res: ErrorRes) => {
      const { error = "เกิดข้อผิดพลาด" } = res;
      dispatch(
        showAlert({
          open: true,
          message: error,
          type: "error",
        })
      );
    },
  });
  return {
    onLogin,
    isPending,
  };
};

export default useLogin;
