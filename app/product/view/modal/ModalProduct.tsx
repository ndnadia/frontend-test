import { Button, Divider, TextField } from "@mui/material";
import { RenderForm } from "../../../../components/form-render/page";
import React, { useEffect } from "react";
import { PRODUCT_FORM } from "./forms/forms";
import { useFieldArray, useForm } from "react-hook-form";
import { ModalTheme } from "../../../../components/modal/Modal";
import { GridAddIcon } from "@mui/x-data-grid";
import useGetDetail from "./hook/useGetDetail";
import useCreate from "./hook/useCreate";
import useEdit from "./hook/useEdit";
import Loading from "../../../../components/loading/page";
import { onCheckInputNumber } from "../../../functions/index";

export type ProductForm = {
  name: string;
  description: string;
  prices: {
    price: number;
  }[];
};

const ModalProduct = ({
  open,
  onToggle,
  onCloseModal,
  recordValues,
}: {
  open: boolean;
  onToggle: (value: object) => void;
  onCloseModal: () => void;
  recordValues: any;
}) => {
  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<ProductForm>({
      defaultValues: {
        name: "",
        description: "",
        prices: [
          {
            price: 0,
          },
        ],
      },
    });
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "prices",
  });

  const { onGetProductDetail, isPending } = useGetDetail({
    reset,
  });
  const { onCreateProduct, isPending: isPendingCreate } = useCreate({
    onCloseModal,
  });
  const { onEditProduct, isPending: isPendingEdit } = useEdit({
    onCloseModal,
  });

  useEffect(() => {
    recordValues?.id && onGetProductDetail(recordValues.id);
  }, [open]);

  return (
    <ModalTheme
      open={open}
      handleClose={() => onToggle({})}
      title="Product Info"
      onSubmit={handleSubmit((values) =>
        recordValues?.id
          ? onEditProduct({ values, id: recordValues.id })
          : onCreateProduct(values)
      )}
    >
      <div>
        <Loading open={isPending || isPendingCreate || isPendingEdit} />
        <RenderForm
          forms={PRODUCT_FORM()}
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Divider
            sx={{
              borderBottomWidth: "1px",
              borderColor: "black",
              width: "70%",
            }}
          />
          <Button
            onClick={() => append({ price: 0 })}
            style={{
              color: "black",
              padding: 5,
              textTransform: "none",
              fontSize: 18,
            }}
          >
            <GridAddIcon /> add price
          </Button>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{ display: "flex", alignItems: "center", paddingTop: 8 }}
          >
            <TextField
              id={field.id}
              label={"price"}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(`prices.${index}.price`, Number(e.target.value));
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                onCheckInputNumber(e);
              }}
              defaultValue={field.price || ""}
            />
            <Button
              color="error"
              variant="outlined"
              onClick={() => remove(index)}
              sx={{ marginLeft: 2, height: 55 }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </ModalTheme>
  );
};

export default ModalProduct;
