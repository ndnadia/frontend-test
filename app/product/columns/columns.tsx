import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export const productColumn = ({
  onToggle,
  onDelete,
}: {
  onToggle: (values: object) => void;
  onDelete: (id: string) => void;
}) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "delete",
      headerName: "Delete",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          color="error"
          variant="text"
          style={{
            textTransform: "none",
          }}
          onClick={() => {
            onDelete(params.row.id);
          }}
        >
          delete
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          variant="text"
          style={{
            textTransform: "none",
            color: "black",
          }}
          onClick={() => {
            onToggle(params.row);
          }}
        >
          edit
        </Button>
      ),
    },
  ];

  return columns;
};
