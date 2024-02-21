"use client";

import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
export default function DatePickerComponent({ getdateOfBirth, value }) {
  //   const [date, setDate] = React.useState(dayjs(valueDate));
  //   console.log(date);
  //   console.log(new Date(date?.$d).toISOString());
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
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
            InputLabelProps={{
              sx: { color: "red", "&.Mui-focused": { color: "green" } },
            }}
            slotProps={{
              layout: {
                sx: {
                  ".MuiPickersMonth-monthButton": {
                    color: "#f8bbd0",
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: "#e91e63",
                    border: "1px solid",
                    backgroundColor: "#880e4f",
                  },
                },
              },
              textField: {
                sx: {
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#e76b39",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e76b39",
                    },
                    "& label": {
                      borderColor: "#e76b39",
                    },
                  },
                },
              },
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
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

const theme = createTheme({
  components: {
    MuiPickersYear: {
      styleOverrides: {
        yearButton: {
          "&.Mui-selected": {
            backgroundColor: "#e76b39",
            color: "white",
            borderRadius: 0,
            borderWidth: 1,
            "&:focus, &:hover": {
              backgroundColor: "#e76b39",
              color: "white",
              borderRadius: 0,
              borderWidth: 1,
            },
          },
        },
      },
    },
  },
});
