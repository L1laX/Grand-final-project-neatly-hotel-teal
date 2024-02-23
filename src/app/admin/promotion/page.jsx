"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/navbar/SidebarAdmin";
import NavBar from "@/components/navbar/NavbarAdmin";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    promotionCode: "",
    discount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/promotion");
        if (res.status !== 200) throw new Error("Failed to fetch");
        const { promotions, rooms } = res.data.data;

        // Mapping to include promotion details with each room
        const mappedData = rooms.map((room) => {
          // Finding the promotion by room name
          const promotion = promotions.find(
            (promo) => promo.name.toLowerCase() === room.name.toLowerCase(),
          );

          return {
            ...room,
            // Here, you're ensuring that if a promotion is found, you use its details
            promotionCode: promotion ? promotion.promotionCode : "N/A",
            discount: promotion ? promotion.discount : "N/A",
            promotionName: promotion ? promotion.name : "N/A", // Using a different key to avoid overwriting the room's name
            validUntil: promotion ? "Valid date here" : "N/A", // Assuming you have a validUntil or similar field to add
          };
        });
        setData(mappedData);
      } catch (error) {
        toast.error("Failed to load data.");
      }
    };
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
        discount: parseInt(newPromotion.discount), // Ensuring it's an integer
        name: newPromotion.roomType, // Match the 'name' field with your form's input
      };

      // Ensure the endpoint matches your file structure
      const response = await axios.post(
        "/api/admin/promotion/create",
        promotionData,
      );

      // Check for success status code (201 for creation)
      if (response.status === 201) {
        console.log("Promotion added:", response.data);
        toast.success("Promotion added successfully");
        // Handle additional success actions such as state reset or dialog close
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
  const columns = [
    { id: "name", label: "Room", minWidth: 170 },
    { id: "pricePerNight", label: "Price per night", minWidth: 170 },
    { id: "promotionCode", label: "Promotion code", minWidth: 170 },
    { id: "discount", label: "Discount", minWidth: 100 },

    { id: "promotionName", label: "Promotion Name", minWidth: 170 },
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
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
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
                      .map((row) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            let value = row[column.id];
                            return (
                              <TableCell key={column.id} align="center">
                                {value}
                              </TableCell>
                            );
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
          </ThemeProvider>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}

export default Promotion;
