import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { ProductForm } from "../ModalProduct";
import { ErrorRes, PATCH } from "../../../../services/index";
import { PRODUCT } from "../../../../services/path";
import { showAlert } from "../../../../store/redux/alertSlice";

const useEditProduct = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const dispatch = useDispatch();
  const { mutate: onEditProduct, isPending } = useMutation({
    mutationFn: async ({ values, id }: { values: ProductForm; id: string }) => {
      const { name, prices, description } = values;
      const mapPrices = prices
        .filter((item: { price: number }) => item.price)
        .map((item: { price: number }) => item.price);
      const objBody = {
        id,
        name,
        prices: mapPrices,
        description,
      };
      const response = await PATCH(PRODUCT, objBody);
      return response;
    },
    onSuccess: () => {
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
  return { onEditProduct, isPending };
};

export default useEditProduct;
