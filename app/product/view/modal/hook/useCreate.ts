import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { ProductForm } from "../ModalProduct";
import { showAlert } from "../../../../store/redux/alertSlice";
import { ErrorRes, POST, SuccessRes } from "../../../../services/index";
import { PRODUCT } from "../../../../services/path";

const useCreateProduct = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const dispatch = useDispatch();

  const { mutate: onCreateProduct, isPending } = useMutation({
    mutationFn: async (values: ProductForm) => {
      const { name, prices, description } = values;

      const mapPrices = prices
        .filter((item: { price: number }) => item.price)
        .map((item: { price: number }) => item.price);
      const objBody = {
        name,
        prices: mapPrices,
        description,
      };
      const response = await POST(PRODUCT, objBody);
      return response;
    },
    onSuccess: (res) => {
      const { error } = res as SuccessRes<{
        id: string;
      }>;
      if (error) {
        return dispatch(
          showAlert({
            open: true,
            message: error,
            type: "info",
          })
        );
      }
      onCloseModal();
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
  return { onCreateProduct, isPending };
};

export default useCreateProduct;
