import { Button, Grid, Typography } from "@mui/material";
import CustomCard from "../../../../sharedComponents/CustomCard";
import "./styles.css";
import TimeSheetForm from "./TimeSheetForm";

export default function EmployeeTimeSheets() {
  return (
    <div>
      <CustomCard
        title={
          <Typography variant="h6" color="primary">
            Time Sheets
          </Typography>
        }
        titleAction={<Button variant="outlined">Add new</Button>}
        content={
          <>
            <Grid container spacing={0}>
              <Grid item xs={12} md={4} lg={2} className="GridItemBorder">
                <Typography color="primary" variant="subtitle1">
                  Project Name
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} lg={2} className="GridItemBorder">
                <Typography color="primary" variant="subtitle1">
                  Task
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} lg={2} className="GridItemBorder">
                <Typography color="primary" variant="subtitle1">
                  Day
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} lg={2} className="GridItemBorder">
                <Typography color="primary" variant="subtitle1">
                  Location
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} lg={2} className="GridItemBorder">
                <Typography color="primary" variant="subtitle1">
                  Comments
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} lg={2} className="GridItemBorder">
                <Typography color="primary" variant="subtitle1">
                  No of hours
                </Typography>
              </Grid>
            </Grid>
            <TimeSheetForm />
          </>
        }
      />
    </div>
  );
}
