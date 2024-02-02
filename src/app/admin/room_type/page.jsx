"use client";

import React from "react";
import Sidebar from "../Sidebar/page";
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

const columns = [
  {
    id: "image",
    label: "Image",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "roomtype",
    label: "Room type",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "price",
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
    id: "guest",
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
    id: "roomSize",
    label: "Room Size",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const data = [
  {
    room_id: 1,
    image: "https://placehold.co/400",
    roomtype: "Deluxe",
    price: "3000",
    promotionPrice: "2500",
    guest: "2",
    bedType: "Double Bed",
    roomSize: "32 sqm",
  },
  {
    room_id: 2,
    image: "https://placehold.co/400",
    roomtype: "Deluxe",
    price: "3000",
    promotionPrice: "2500",
    guest: "2",
    bedType: "Double Bed",
    roomSize: "32 sqm",
  },
  {
    room_id: 3,
    image: "https://placehold.co/400",
    roomtype: "Deluxe",
    price: "3000",
    promotionPrice: "2500",
    guest: "2",
    bedType: "Double Bed",
    roomSize: "32 sqm",
  },
];
const rows = [...data];

const RoomType = () => {
  const router = useRouter();
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
      <div className=" w-full flex-col">
        <NavBar
          navName={"Room & Property"}
          button={true}
          buttonName={"+Create Room"}
        />
        <div className="room-type-table mr-7 mt-16 flex items-center justify-center">
          <Paper
            sx={{ width: "100%", height: "100%", overflow: "hidden" }}
            className=" ml-10  "
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
                  .map((row) => {
                    const room_id = row["room_id"];
                    return (
                      <TableBody key={row.code}>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          className=" cursor-pointer"
                          onClick={() =>
                            router.push(`/admin/room_type/${room_id}`)
                          }
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                className=""
                                key={column.id}
                                align={column.align}
                              >
                                {column.format && typeof value === "number" ? (
                                  column.format(value)
                                ) : column.id === "image" ? (
                                  <div className="image flex w-full justify-center">
                                    <img
                                      src={value}
                                      width={100}
                                      alt="room image"
                                    />
                                  </div>
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
    </div>
  );
};

export default RoomType;
