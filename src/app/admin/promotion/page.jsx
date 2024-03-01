"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/navbar/SidebarAdmin";
import NavBar from "@/components/navbar/NavbarAdmin";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "next-auth/client/_utils";

const orangeTheme = createTheme({
  palette: {
    primary: {
      main: "#FC5B2C",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FC5B2C",
          "&:hover": {
            backgroundColor: "#FC5B2C",
            color: "white",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          style: { color: "#FC5B2C" },
        },
        InputProps: {
          style: { color: "#FC5B2C" },
        },
      },
    },
  },
});

function Promotion() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPromotionCode, setCurrentPromotionCode] = useState("");
  const [currentPromotionId, setCurrentPromotionId] = useState("");
  const [newPromotion, setNewPromotion] = useState({
    promotionCode: "",
    discount: "",
  });

  console.log("data:", data);
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/admin/promotion");
      if (res.status !== 200) throw new Error("Failed to fetch");
      const promotions = res.data.data.promotions;
      console.log("promotions:", promotions);
      setData(promotions);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load data.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (_event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewPromotion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPromotion = async () => {
    try {
      const promotionData = {
        promotionCode: newPromotion.promotionCode,
        discount: parseInt(newPromotion.discount),
        name: newPromotion.roomType,
      };

      const response = await axios.post(
        "/api/admin/promotion/create",
        promotionData,
      );
      console.log(response);
      if (response.status === 201) {
        console.log("Promotion added:", response.data);
        toast.success("Promotion added successfully");
        setOpen(false);
        fetchData();
        return;
      } else if (response.status === 400) {
        toast.error("Failed to add promotion: " + response.data.message);
      } else {
        toast.error("Failed to create promotion");
      }
    } catch (error) {
      console.error("Error adding promotion:", error);
      toast.error(
        "Failed to add promotion: " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    try {
      await axios.delete(`/api/admin/promotion/${promotionId}`);
      toast.success("Promotion deleted successfully");

      setData(data.filter((item) => item.id !== promotionId));
    } catch (error) {
      console.error(
        "Error deleting promotion:",
        error.response?.data?.error || "An error occurred",
      );
      toast.error("Failed to delete promotion");
    }
  };

  console.log("promotionId:", currentPromotionId);

  const handleDeleteClick = (promotionId) => {
    setCurrentPromotionId(promotionId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    await handleDeletePromotion(currentPromotionId);
    setDeleteDialogOpen(false);
  };

  const columns = [
    { id: "promotionCode", label: "Promotion Code", minWidth: 170 },
    { id: "discount", label: "Discount", minWidth: 100 },
    { id: "name", label: "Applies To", minWidth: 170 },
    { id: "delete", label: "Delete", minWidth: 100 },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex w-full flex-col pl-4">
          <NavBar
            navName="Promotion Management"
            button={true}
            buttonName="Add Promotion"
            handleSubmit={handleOpen}
            notSearch={true}
            backarrow={false}
          />
          <div className="flex flex-row justify-center bg-slate-50 p-16 leading-[150%] text-slate-400">
            <Paper
              sx={{ width: "100%", height: "100%", overflow: "hidden" }}
              className="ml-10 "
            >
              <TableContainer sx={{ maxHeight: "100vh" }}>
                <Table stickyHeader aria-label="promotion table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="center"
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((promotion) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={promotion.id}
                        >
                          {columns.map((column) => {
                            if (column.id !== "delete") {
                              return (
                                <TableCell key={column.id} align="center">
                                  {promotion[column.id]}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align="center">
                                  <Button
                                    color="error"
                                    onClick={() =>
                                      handleDeleteClick(promotion.id)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
          <ThemeProvider theme={orangeTheme}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Promotion</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="promotionCode"
                  label="Promotion Code"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newPromotion.promotionCode}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  name="discount"
                  label="Discount Rate"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={newPromotion.discount}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  name="roomType"
                  label="Room Type"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newPromotion.roomType}
                  onChange={handleFormChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPromotion}
                  color="primary"
                  variant="contained"
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={deleteDialogOpen}
              onClose={handleCloseDeleteDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Deletion"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this promotion?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}

export default Promotion;
