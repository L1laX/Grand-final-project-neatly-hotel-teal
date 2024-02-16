"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/navbar/SidebarAdmin.jsx";
import NavBarAdmin from "@/components/navbar/NavbarRoomManagement.jsx";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Dropdown from "@/components/navbar/StatusDropdown";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoomTableRow = ({ row, columns, onStatusUpdate }) => (
  <TableRow
    hover
    role="checkbox"
    tabIndex={-1}
    key={row.id}
    className="cursor-pointer"
  >
    {columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        className="break-all text-center"
      >
        {column.render
          ? column.render(row[column.id], row, onStatusUpdate)
          : column.format && typeof row[column.id] === "number"
            ? column.format(row[column.id])
            : row[column.id]}
      </TableCell>
    ))}
  </TableRow>
);

const StatusDropdownCell = ({ status, row, onStatusUpdate }) => (
  <TableCell align="center">
    <Dropdown status={status} row={row} onStatusUpdate={onStatusUpdate} />
  </TableCell>
);

const RoomManagement = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      toast.info("Fetching Room Data...", {
        position: "top-center",
        autoClose: false,
      });

      const response = await axios.get("/api/admin/room_management");
      const data = response.data;
      setRows(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Room Data. Please try again later.", {
        position: "top-center",
      });
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (roomId, newStatus) => {
    try {
      toast.info("Updating Room Status...", {
        position: "top-center",
        autoClose: false,
      });

      console.log("Room status updated successfully");

      window.location.reload();
    } catch (error) {
      console.error("Error updating room status:", error);
      toast.error("Failed to update Room Status. Please try again later.", {
        position: "top-center",
      });
    } finally {
      toast.dismiss();
    }
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchInput.toLowerCase()),
    ),
  );

  const columns = [
    {
      id: "id",
      label: "Room no.",
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "name",
      label: "Room type",
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "bedType",
      label: "Bed type",
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      render: (status, row) => (
        <StatusDropdownCell
          status={status}
          row={row}
          onStatusUpdate={handleStatusUpdate}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar setActive={2} />
      <div className="flex w-[100vw] flex-col">
        <NavBarAdmin navName={"Room Management"} setFilteredResults={setRows} />
        <div className="room-type-table ml-8 mr-7 mt-16 flex items-center justify-center">
          <Paper
            sx={{ width: "100%", height: "100%", overflow: "hidden" }}
            className="ml-10"
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
                        className="bg-gray-200 text-center font-bold"
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
                  ) : filteredRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        No matching records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row) => (
                        <RoomTableRow
                          key={row.id}
                          row={row}
                          columns={columns}
                          onStatusUpdate={handleStatusUpdate}
                        />
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default RoomManagement;
