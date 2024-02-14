"use client";

import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Input } from "@/components/ui/input";

export default function DatePickerComponent({ getdateOfBirth, value }) {
  //   const [date, setDate] = React.useState(dayjs(valueDate));
  //   console.log(date);
  //   console.log(new Date(date?.$d).toISOString());
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="dateOfBirth"
          className=" w-full rounded-md border border-gray-300 bg-white"
          //     value={date}
          format="dd, DD MMMM YYYY"
          label="Date of Birth"
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            getdateOfBirth(newValue);
          }}
          slotProps={{
            day: {
              sx: {
                "&.MuiPickersDay-root.Mui-selected": {
                  backgroundColor: "#e76b39",
                  color: "white",
                  borderRadius: 0,
                  borderWidth: 1,
                },
                "&.MuiPickersDay-root.Mui-day": {
                  backgroundColor: "#e76b39",
                  color: "white",
                  borderRadius: 0,
                  borderWidth: 1,
                },
                ":hover": {
                  color: "black",
                  backgroundColor: "#f7f7fb",
                  borderRadius: 0,
                  borderWidth: 1,
                },
                "&.MuiPickersDay-today": {
                  color: "black",
                  borderRadius: 0,
                  // borderWidth: 5,
                  border: "2px solid #e76b39",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
}
