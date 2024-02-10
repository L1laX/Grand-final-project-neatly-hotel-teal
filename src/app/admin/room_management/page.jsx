"use client";

import React, { useState, useEffect } from "react";
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
import { NextUIProvider } from "@nextui-org/react";
import { Button } from "@nextui-org/react"; // Import Button from @nextui-org/react
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

const columns = [
  {
    id: "id",
    label: "Room no.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
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
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "right",
    render: (status) => {
      let buttonClass = "";

      switch (status) {
        case "Vacant":
          buttonClass =
            "justify-center whitespace-nowrap rounded bg-slate-100 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-emerald-800";
          break;
        case "Occupied":
          buttonClass =
            "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-blue-800 whitespace-nowrap bg-indigo-100 rounded";
          break;
        case "Assign Clean":
          buttonClass =
            "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-emerald-800 whitespace-nowrap bg-cyan-50 rounded";
          break;
        case "Assign Dirty":
          buttonClass =
            "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-red-800 whitespace-nowrap bg-rose-100 rounded";
          break;
        case "Vacant Clean":
          buttonClass =
            "justify-center whitespace-nowrap rounded bg-cyan-50 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-emerald-800";
          break;

        case "Vacant Clean Inspected":
          buttonClass =
            "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-yellow-800 whitespace-nowrap bg-yellow-50 rounded";
          break;
        case "Vacant Clean Pick Up":
          buttonClass =
            "justify-center whitespace-nowrap rounded bg-cyan-50 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-emerald-800";
          break;
        case "Occupied Clean":
          buttonClass =
            "text-sm font-medium tracking-tight leading-5 text-justify text-blue-800 max-w-[100px]";
          break;
        case "Occupied Clean Inspected":
          buttonClass =
            "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-yellow-800 whitespace-nowrap bg-yellow-50 rounded";
          break;
        case "Occupied Dirty":
          buttonClass =
            "justify-center px-3 pt-1 text-sm font-medium tracking-tight leading-5 text-justify text-red-800 whitespace-nowrap bg-rose-100 rounded";
          break;
        case "Out of Order":
          buttonClass =
            "text-sm font-medium tracking-tight leading-5 text-justify text-gray-500 max-w-[79px]";
          break;
        case "Out of Service":
          buttonClass =
            "text-sm font-medium tracking-tight leading-5 text-justify text-gray-500 max-w-[79px]";
          break;
        case "Out of Inventory":
          buttonClass =
            "text-sm font-medium tracking-tight leading-5 text-justify text-gray-500 max-w-[79px]";
          break;
        default:
          break;
      }

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button className={buttonClass} variant="bordered">
              {status}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              className="justify-center whitespace-nowrap rounded bg-slate-100 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-emerald-800"
              key="copy"
            >
              Vacant
            </DropdownItem>
            <DropdownItem
              className=" justify-center whitespace-nowrap rounded bg-indigo-100 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-blue-800"
              key="copy"
            >
              Occupied
            </DropdownItem>
            <DropdownItem
              className=" justify-center whitespace-nowrap rounded bg-cyan-50 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-emerald-800"
              key="copy"
            >
              Assign Clean
            </DropdownItem>
            <DropdownItem
              className=" justify-center whitespace-nowrap rounded bg-rose-100 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-red-800"
              key="copy"
            >
              Assign Dirty
            </DropdownItem>
            <DropdownItem
              className=" justify-center whitespace-nowrap rounded bg-cyan-50 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-emerald-800"
              key="copy"
            >
              Vacant Clean
            </DropdownItem>
            <DropdownItem
              className=" justify-center whitespace-nowrap rounded bg-yellow-50 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-yellow-800"
              key="copy"
            >
              Vacant Clean Inspected
            </DropdownItem>
            <DropdownItem
              className=" justify-center whitespace-nowrap rounded bg-cyan-50 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-emerald-800"
              key="copy"
            >
              Vacant Clean Pick Up
            </DropdownItem>
            <DropdownItem
              className=" max-w-[100px] text-justify text-sm font-medium leading-5 tracking-tight text-blue-800"
              key="copy"
            >
              Occupied Clean
            </DropdownItem>
            <DropdownItem
              className=" justify-center whitespace-nowrap rounded bg-yellow-50 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-yellow-800"
              key="copy"
            >
              Occupied Clean Inspected
            </DropdownItem>
            <DropdownItem
              className=" justify-center whitespace-nowrap rounded bg-rose-100 px-3 pt-1 text-justify text-sm font-medium leading-5 tracking-tight text-red-800"
              key="copy"
            >
              Occupied Dirty
            </DropdownItem>
            <DropdownItem
              className=" max-w-[79px] text-justify text-sm font-medium leading-5 tracking-tight text-gray-500"
              key="copy"
            >
              Out of Order
            </DropdownItem>
            <DropdownItem
              className=" max-w-[79px] text-justify text-sm font-medium leading-5 tracking-tight text-gray-500"
              key="copy"
            >
              Out of Service
            </DropdownItem>
            <DropdownItem
              className=" max-w-[79px] text-justify text-sm font-medium leading-5 tracking-tight text-gray-500"
              key="copy"
            >
              Out of Inventory
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];

function RoomManagement() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from API and update rows state
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/room_management");
        const data = await response.json();
        setRows(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchInput.toLowerCase()),
    ),
  );

  return (
    <NextUIProvider>
      <div className="flex flex-row bg-gray-100">
        <Sidebar setActive={2} />
        <div className="flex w-full flex-col ">
          <NavBarAdmin navName={"Room Management"} />
          <div className="room-type-table mr-7 mt-16 flex items-center justify-center">
            <Paper
              sx={{ width: "100%", height: "100%", overflow: "hidden" }}
              className=" h-full w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-lg"
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
                                  ? column.render(row[column.id], row)
                                  : column.format &&
                                      typeof row[column.id] === "number"
                                    ? column.format(row[column.id])
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
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default RoomManagement;
