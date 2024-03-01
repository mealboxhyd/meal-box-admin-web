/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { TASK_OPTIONS } from "../../constants/constants";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "./styles.css";

export default function AddEditProject() {
  const [formData, setFormData] = useState({
    projectName: "",
    task: "",
    location: "Hyderabad",
    description: "",
    startDate: null,
    endDate: null,
  });

  const handleFormData = (field: string, value: string | Date) => {
    if (field === "startDate" || field === "endDate") {
      value = new Date(value);
    }
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Project Name"
            variant="standard"
            value={formData?.projectName}
            onChange={(e) => handleFormData("projectName", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Project Description"
            variant="standard"
            value={formData?.description}
            onChange={(e) => handleFormData("description", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl variant="standard" sx={{ minWidth: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">Task</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={formData?.task}
              onChange={(e) => handleFormData("task", e.target.value)}
              label="Age"
            >
              {TASK_OPTIONS.map((task) => {
                return <MenuItem value={task.value}>{task.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Location"
            variant="standard"
            value={formData?.location}
            onChange={(e) => handleFormData("location", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Project start date"
                className="fullWidth"
                value={formData?.startDate}
                onChange={(newValue: any) =>
                  handleFormData("startDate", newValue)
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Project estimated end date"
                className="fullWidth"
                value={formData?.endDate}
                onChange={(newValue: any) =>
                  handleFormData("endDate", newValue)
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </div>
  );
}
