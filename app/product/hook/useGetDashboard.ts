import { ErrorRes, GET, SuccessRes } from "../../services";
import { PRODUCT } from "../../services/path";
import { showAlert } from "../../store/redux/alertSlice";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Product = {
  id: string;
  name: string;
};

const useGetDashboard = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<Product[]>([]);
  const { mutate: onGetDashboard, isPending } = useMutation({
    mutationFn: async () => {
      const response = await GET(PRODUCT);
      return response;
    },
    onSuccess: (res) => {
      const { data } = res as SuccessRes<Product[]>;
      setDataSource(data);
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
  return { onGetDashboard, isPending, dataSource };
};

export default useGetDashboard;
