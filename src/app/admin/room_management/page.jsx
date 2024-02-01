"use client";
import React from "react";
import Sidebar from "../Sidebar/page.jsx";
import NavBarAdmin from "@/components/navbar/NavbarAdmin.jsx";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "roomNo",
    label: "Room no.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Room type",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "bedType",
    label: "Bed type",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, guest, roomType, amount, bedType, checkIn, checkOut) {
  return { name, guest, roomType, amount, bedType, checkIn, checkOut };
}

const rows = [
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
  createData(
    "Chayanon",
    "2",
    "Superior Garden View",
    "1",
    "SingleBed",
    "Th,19 Oct 2022",
    "Fri , 20 Oct 2022",
  ),
];

function RoomManagement() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar />
      <div className="flex w-full flex-col ">
        <NavBarAdmin navName={"Room Management"} />

        <Paper
          sx={{ width: "95%", height: "87%", overflow: "hidden" }}
          className=" ml-10  "
        >
          <TableContainer sx={{ maxH: "100vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
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
  );
}

export default RoomManagement;
