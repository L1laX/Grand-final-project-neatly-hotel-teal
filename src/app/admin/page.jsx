"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/navbar/SidebarAdmin.jsx";
import NavBarAdmin from "@/components/navbar/NavbarAdmin.jsx";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "date-fns";

function CustomerBooking() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [newRowsPerPage, setNewRowsPerPage] = useState(10);
  const [highestPage, setHighestPage] = React.useState(0);
  const [newPage, setNewPage] = React.useState(0);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const fetchData = async (isNew, newPage) => {
    toast.info("Fetching data...", { position: "top-center", autoClose: 5000 });

    try {
      const { data } = await axios.get("/api/admin/customer_booking", {
        params: { keywords: search, page: newPage, pageSize: rowsPerPage },
      });

      isNew ? setRows([...data.data]) : setRows([...rows, ...data.data]);
      console.log(data);
      setTotalRows(data.totalRows);
      toast.dismiss();
    } catch (error) {
      toast.error("Failed to fetch data. Please try again later.", {
        position: "bottom-center",
      });
    }
  };
  useEffect(() => {
    if (newRowsPerPage !== rowsPerPage) {
      setNewRowsPerPage(rowsPerPage);
      setHighestPage(0);
      fetchData("new");
    } else if (newPage > page && newPage <= highestPage) {
      setPage(newPage);
    } else if (newPage > page && newPage > highestPage) {
      setHighestPage(newPage);
      setPage(newPage);
      fetchData("", newPage);
    } else if (newPage < page) {
      setPage(newPage);
    } else if (newPage === page) {
      setPage(newPage);
      fetchData();
    }
  }, [search, newPage, rowsPerPage]);

  const handleChangePage = (_event, newPage) => {
    setNewPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to the first page when rows per page changes
  };

  const handleRowClick = (id) => {
    router.push(`/admin/booking/${id}`);
  };

  const columns = [
    {
      id: "customerName",
      label: "Customer Name",
      minWidth: 170,
      align: "center",
    },
    { id: "guestCount", label: "Guest(s)", minWidth: 100, align: "center" },
    { id: "roomType", label: "Room Type", minWidth: 170, align: "center" },
    { id: "totalPrice", label: "Total Price", minWidth: 170, align: "center" },
    { id: "bedType", label: "Bed Type", minWidth: 170, align: "center" },
    { id: "checkInDate", label: "Check-in", minWidth: 170, align: "center" },
    { id: "checkOutDate", label: "Check-out", minWidth: 170, align: "center" },
  ];

  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar setActive={1} />
      <div className="flex w-full flex-col">
        <NavBarAdmin navName={"Customer Booking"} setSearch={setSearch} />
        <div className="room-type-table mr-7 mt-16 flex items-center justify-center">
          <Paper
            sx={{ width: "100%", height: "100%", overflow: "hidden" }}
            className="ml-10"
          >
            <TableContainer sx={{ maxHeight: "100vh" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        className="bg-gray-200 font-bold"
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            key={row.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            onClick={() => handleRowClick(row.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {columns.map((column) => {
                              let value = row[column.id];
                              if (column.id === "roomType") {
                                value =
                                  row.customerBooking_room
                                    .map((room) => room.room.name)
                                    .join(", ") || "N/A";
                              } else if (column.id === "bedType") {
                                value =
                                  row.customerBooking_room
                                    .map((room) => room.room.bedType)
                                    .join(", ") || "N/A";
                              } else if (
                                column.id === "checkInDate" ||
                                column.id === "checkOutDate"
                              ) {
                                value = formatDate(row[column.id]);
                              } else if (column.id === "totalPrice") {
                                value = row.totalPrice.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD", // Adjust currency code as necessary
                                });
                              }
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CustomerBooking;
