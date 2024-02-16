"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/navbar/SidebarAdmin.jsx";
import NavBar from "@/components/navbar/NavbarAdmin";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    id: "roomMainImage",
    label: "Image",
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
    id: "pricePerNight",
    label: "Price",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "promotionPrice",
    label: "Promotion Price",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "guests",
    label: "Guest(s)",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "bedType",
    label: "Bed Type",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "size",
    label: "Room Size",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const RoomType = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      toast.info("Fetching Room Data...", {
        position: "top-center",
        autoClose: false,
      });
      const res = await axios.get(
        `/api/admin/room_prop?keywords=${search}`,
      );
      const data = res.data;
      setRows(data.data);
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch Room Data. Please try again later.", {
        position: "top-center",
      });
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar setActive={4} />
      <div className="felx w-full flex-col">
        <NavBar
          navName={"Room & Property"}
          button={true}
          handleSubmit={() => {
            router.push("/admin/room_type/create");
          }}
          buttonName={"+Create Room"}
          setSearch={setSearch}
        />
        <div className="room-type-table mr-7 mt-16 flex items-center justify-center">
          <Paper
            sx={{ width: "100%", height: "100%", overflow: "hidden" }}
            className="ml-10 "
          >
            <TableContainer sx={{ maxH: "10vh" }}>
              <Table stickyHeader aria-label="sticky table" key={rows}>
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const id = row["id"];
                    return (
                      <TableBody key={index}>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          className="cursor-pointer text-center transition duration-200 ease-in-out hover:bg-gray-100"
                          onClick={() => router.push(`/admin/room_type/${id}`)}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                className=""
                                key={column.id}
                                align={column.align}
                              >
                                {column.format &&
                                typeof value === "number" &&
                                (column.id === "pricePerNight" ||
                                  column.id === "promotionPrice") ? (
                                  value.toLocaleString() + ".00"
                                ) : column.id === "roomMainImage" ? (
                                  <div className="image flex w-full justify-center">
                                    <img
                                      src={value}
                                      alt="room"
                                      width={75}
                                      height={75}
                                    />
                                  </div>
                                ) : column.id === "size" ? (
                                  value + " sqm"
                                ) : column.id === "promotionPrice" && !value ? (
                                  <h5>-</h5>
                                ) : column.id === "bedType" ? (
                                  value === "singleBed" ? (
                                    "Single Bed"
                                  ) : value === "doubleBed" ? (
                                    "Double Bed"
                                  ) : value === "doubleBed(kingSize)" ? (
                                    "Double bed(king size)"
                                  ) : (
                                    "Twin Bed"
                                  )
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableBody>
                    );
                  })}
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
      <ToastContainer position="top-center" />
    </div>
  );
};

export default RoomType;
