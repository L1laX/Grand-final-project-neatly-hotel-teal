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

function CustomerBooking() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const fetchData = async () => {
    toast.info("Fetching data...", { position: "top-center" });

    try {
      const { data } = await axios.get("/api/admin/customer_booking", {
        params: { keywords: search, page, pageSize: rowsPerPage },
      });
      console.log(data.data);
      setRows(data.data);
      setTotalRows(data.totalRows);
      toast.dismiss();
    } catch (error) {
      toast.error("Failed to fetch data. Please try again later.", {
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount and when dependencies change
  }, [search, page, rowsPerPage]);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
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

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    console.log("Fetched Data:", rows);
  }, [rows]);

  useEffect(() => {
    console.log("Total Rows:", totalRows);
  }, [totalRows]);

  const calculateStayDuration = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const duration = (checkOut - checkIn) / millisecondsPerDay;
    return Math.max(duration, 1);
  };

  const calculateTotalPrice = (
    customerBooking_room,
    checkInDate,
    checkOutDate,
  ) => {
    const stayDuration = calculateStayDuration(checkInDate, checkOutDate);
    const totalPrice = customerBooking_room.reduce(
      (acc, cur) => acc + cur.room.pricePerNight * stayDuration,
      0,
    );
    return Math.round(totalPrice);
  };

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
                        const totalPrice = calculateTotalPrice(
                          row.customerBooking_room,
                          row.checkInDate,
                          row.checkOutDate,
                        );

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
                                const isWholeNumber = totalPrice % 1 === 0;
                                value = totalPrice.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "THB",
                                  minimumFractionDigits: isWholeNumber ? 0 : 2,
                                  maximumFractionDigits: 2,
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
              rowsPerPageOptions={[10, 25, 50, 100, 1000]}
              component="div"
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={page} // Make sure this is correctly representing the current page
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
