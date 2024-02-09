"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/navbar/SidebarAdmin.jsx";
import NavBarAdmin from "@/components/navbar/NavbarAdmin.jsx";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

function CustomerBooking() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/customer_booking");
        const data = await response.json();

        setRows(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error.message);
      }
    };

    fetchData();
  }, []);

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
    { id: "customerName", label: "Customer name", minWidth: 100 },
    { id: "guestCount", label: "Guest(s)", minWidth: 100 },
    { id: "room.name", label: "Room type", minWidth: 100, align: "right" },
    { id: "totalPrice", label: "Amount", minWidth: 100, align: "right" },
    { id: "room.bedType", label: "Bed type", minWidth: 100, align: "right" },
    { id: "checkInDate", label: "Check-in", minWidth: 100, align: "right" },
    { id: "checkOutDate", label: "Check-out", minWidth: 100, align: "right" },
  ];

  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar setActive={1} />
      <div className="flex w-full flex-col">
        <NavBarAdmin navName={"Customer Booking"} />
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          onClick={() => handleRowClick(row.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {columns.map((column) => (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "checkInDate" ||
                              column.id === "checkOutDate"
                                ? new Date(row[column.id]).toLocaleString()
                                : column.id === "room.name" ||
                                    column.id === "room.bedType"
                                  ? row.room[column.id.split(".")[1]]
                                  : row[column.id]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
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
    </div>
  );
}

export default CustomerBooking;
