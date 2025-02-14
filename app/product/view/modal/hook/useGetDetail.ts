import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { ProductForm } from "../ModalProduct";
import { useDispatch } from "react-redux";
import { ErrorRes, GET, SuccessRes } from "../../../../services/index";
import { GET_PRODUCT_DETAIL } from "../../../../services/path";
import { showAlert } from "../../../../store/redux/alertSlice";

type Product = {
  id: string;
  name: string;
  description: string;
  prices: number[];
};
const useGetProductDetail = ({
  reset,
}: {
  reset: UseFormReset<ProductForm>;
}) => {
  const dispatch = useDispatch();
  const { mutate: onGetProductDetail, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await GET(GET_PRODUCT_DETAIL(id));
      return response;
    },
    onSuccess: (res) => {
      const { data } = res as SuccessRes<Product>;
      reset({
        ...data,
        prices: data.prices.map((item: number) => ({ price: item })),
      });
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
  return { onGetProductDetail, isPending };
};

export default useGetProductDetail;
