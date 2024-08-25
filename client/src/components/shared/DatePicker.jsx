import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";

export default function DatePickerBox({
  label,
  onChange,
  value,
  type = "date",
}) {
  const parsedValue = value ? dayjs(value) : null;
  if (type === "date") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker label={label} value={parsedValue} onChange={onChange} />
        </DemoContainer>
      </LocalizationProvider>
    );
  } else if (type === "date-time") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            label={label}
            value={parsedValue}
            onChange={onChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  } else if (type === "time") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker label={label} value={parsedValue} onChange={onChange} />
        </DemoContainer>
      </LocalizationProvider>
    );
  }
}
