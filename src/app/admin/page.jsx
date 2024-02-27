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

function Admin() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    try {
      toast.info("Fetching data...", {
        position: "top-center",
        autoClose: false,
      });

      const response = await axios.get(
        `/api/admin/customer_booking?keywords=${search}`,
      );

      const data = response.data;
      setRows(data.data);
      toast.dismiss();
    } catch (error) {
      console.error("Error fetching data from API:", error.message);
      toast.error("Failed to fetch data. Please try again later.", {
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    console.log("Fetched Data:", rows);
  }, [rows]);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (id) => {
    router.push(`/admin/booking/${id}`);
  };

  const columns = [
    {
      id: "customerName",
      label: "Customer name",
      minWidth: 100,
      align: "center",
    },
    { id: "guestCount", label: "Guest(s)", minWidth: 100, align: "center" },
    { id: "roomType", label: "Room Type", minWidth: 100, align: "center" },

    {
      id: "totalPrice",
      label: "Amount",
      minWidth: 100,
      align: "center",
    },
    { id: "bedType", label: "Bed Type", minWidth: 100, align: "center" },
    { id: "checkInDate", label: "Check-in", minWidth: 100, align: "center" },
    { id: "checkOutDate", label: "Check-out", minWidth: 100, align: "center" },
  ];

  const calculateStayDuration = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const duration = (checkOut - checkIn) / millisecondsPerDay;
    return Math.max(duration, 1);
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
                        const roomDetails = row.customerBooking_room[0]?.room;

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
                                value = roomDetails?.name || "N/A";
                              } else if (column.id === "bedType") {
                                value = roomDetails?.bedType || "N/A";
                              } else if (
                                column.id === "checkInDate" ||
                                column.id === "checkOutDate"
                              ) {
                                value = formatDate(row[column.id]);
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
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
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

export default Admin;
