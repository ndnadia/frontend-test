"use client";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import CardTheme from "../../components/card/Card";
import { productColumn } from "./columns/columns";
import { useModal } from "./hook/useModal";
import ModalProduct from "./view/modal/ModalProduct";
import useGetDashboard from "./hook/useGetDashboard";
import Loading from "../../components/loading/page";
import { AlertTheme } from "../../components/alert/Alert";
import { showAlert } from "../store/redux/alertSlice";
import useDelete from "./hook/useDelete";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { open, onToggle, recordValues } = useModal();
  const { onGetDashboard, isPending, dataSource } = useGetDashboard();
  const { onDelete, isPending: isPendingDelete } = useDelete();

  useEffect(() => {
    onGetDashboard();
  }, []);

  const onCloseModal = () => {
    onToggle({});
    onGetDashboard();
    dispatch(showAlert({ open: true, message: "สำเร็จ", type: "success" }));
  };

  return (
    <CardTheme>
      <Loading open={isPending || isPendingDelete} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{
            borderRadius: 20,
            backgroundColor: "#000",
            padding: 10,
            textTransform: "none",
          }}
          fullWidth
          onClick={() => onToggle({})}
          startIcon={<GridAddIcon />}
        >
          Add Product
        </Button>
        <div style={{ width: "100%", marginTop: 20 }}>
          <DataGrid
            rows={dataSource}
            columns={productColumn({ onToggle, onDelete })}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </div>
        {open && (
          <ModalProduct
            open={open}
            onToggle={onToggle}
            onCloseModal={onCloseModal}
            recordValues={recordValues}
          />
        )}
      </div>
      <AlertTheme />
    </CardTheme>
  );
};

export default ProductPage;
