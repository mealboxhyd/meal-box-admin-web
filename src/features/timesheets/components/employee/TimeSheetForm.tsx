import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./styles.css";
import { HOURS_LIST, TASK_OPTIONS } from "../../constants/constants";
import { currentDay } from "../../../../utils/dateUtils";

export default function TimeSheetForm() {
  const [formData, setFormData] = useState({
    projectName: "IKEA",
    task: "soilManagement",
    day: "",
    location: "Hyderabad",
    comments: "",
    noOfHrs: "",
  });

  const handleFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} md={4} lg={2} className="GridItem">
          <Typography>{formData?.projectName}</Typography>
        </Grid>

        <Grid item xs={12} md={4} lg={2} className="GridItem">
          <FormControl variant="standard" sx={{ minWidth: "100%" }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={formData?.task}
              onChange={(e) => handleFormData("task", e.target.value)}
            >
              {TASK_OPTIONS.map((task) => {
                return <MenuItem value={task.value}>{task.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={2} className="GridItem">
          {currentDay}
        </Grid>

        <Grid item xs={12} md={4} lg={2} className="GridItem">
          <Typography>{formData?.location}</Typography>
        </Grid>

        <Grid item xs={12} md={4} lg={2} className="GridItem">
          <TextareaAutosize placeholder="Enter comments"></TextareaAutosize>
        </Grid>
        <Grid item xs={12} md={4} lg={2} className="GridItem">
          <FormControl variant="standard" sx={{ minWidth: "100%" }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={formData?.noOfHrs}
              onChange={(e) => handleFormData("noOfHrs", e.target.value)}
            >
              {HOURS_LIST.map((hour) => {
                return <MenuItem value={hour.value}>{hour.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
