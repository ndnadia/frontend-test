import { DELETE, ErrorRes } from "../../services";
import { PRODUCT } from "../../services/path";
import { showAlert } from "../../store/redux/alertSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useDelete = () => {
  const dispatch = useDispatch();
  const { mutate: onDelete, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await DELETE(PRODUCT, { id });
      return response;
    },
    onSuccess: () => {
      dispatch(
        showAlert({
          open: true,
          message: "ลบสำเร็จ",
          type: "success",
        })
      );
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
  return { onDelete, isPending };
};

export default useDelete;
