/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../../sharedComponents/CustomCard";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import CustomDialog from "../../sharedComponents/CustomDialog";
import AddEditProject from "./components/project/AddEditProject";
import CustomMatTable from "../../sharedComponents/CustomeTable/CustomMatTable";
import data from "./mockData.json";
import CustomChip from "../../sharedComponents/CustomChip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useNavigate } from "react-router-dom";
import { usersSlice, usersState } from "./slices/slice";

const cellStyle = {
  whiteSpace: "nowrap",
  paddingTop: 5,
  paddingBottom: 5,
};

export default function UsersDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sampleData } = useSelector(usersState);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  console.log(sampleData, "[sampleData]");

  useEffect(() => {
    dispatch(usersSlice.actions.fetchSampleData());
  }, []);

  const handleSave = () => {
    setOpenProjectModal(false);
  };

  const constructColumns = () => {
    const columns: any[] = [];
    columns.push({
      field: "projectName",
      title: "Project Name",
      align: "center",
      searchable: true,
      render: (row: any) => row.projectName,
      cellStyle,
    });

    columns.push({
      field: "projectDescription",
      title: "Project Description",
      align: "center",
      render: (row: any) => row.projectDescription,
      cellStyle: {
        maxWidth: 300,
        whiteSpace: "inherit",
        padding: 0,
      },
    });
    columns.push({
      field: "task",
      title: "Task",
      align: "center",
      filterField: true,
      render: (row: any) => <CustomChip label={row.task} status="new" />,
      cellStyle,
    });
    columns.push({
      field: "startDate",
      title: "Start Date",
      align: "center",
      filterField: true,
      render: (row: any) => row.startDate,
      cellStyle,
    });
    columns.push({
      field: "endDate",
      title: "End Date",
      align: "center",
      filterField: true,
      render: (row: any) => row.endDate,
      cellStyle,
    });
    columns.push({
      field: "actions",
      title: "Actions",
      align: "center",
      render: () => (
        <Box>
          <Tooltip title="View">
            <IconButton>
              <RemoveRedEyeIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton>
              <EditIcon style={{ color: "#00BFA5" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteOutlineIcon style={{ color: "#E91E63" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View time sheets">
            <IconButton>
              <ScheduleIcon style={{ color: "#9D2CC5" }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      cellStyle,
    });

    columns.map((_x: any) => {
      _x["headerStyle"] = {
        whiteSpace: "nowrap",
        fontWeight: "bold",
        align: "center",
        color: "707070d9 !important",
      };
    });
    return columns;
  };

  return (
    <div>
      <CustomDialog
        handleClose={(value: boolean) => setOpenProjectModal(value)}
        open={openProjectModal}
        title={
          <Typography color="primary" variant="h6">
            Enter project details
          </Typography>
        }
        content={<AddEditProject />}
        actions={
          <Box>
            <Button variant="contained" onClick={() => handleSave()}>
              Save
            </Button>
          </Box>
        }
      />
      <CustomCard
        title={
          <Typography variant="h6" color="primary">
            Projects List
          </Typography>
        }
        content={
          <CustomMatTable
            columns={constructColumns()}
            data={data}
            sortOrder={"asc"}
            emptyStateProps
            paging={true}
            orderBy={"req_status"}
            rowsPerPage={10}
            enableRowHover={true}
            emptyRecordsMessage={"No records found "}
            enableSearchBar={true}
            enableFilterByFields={true}
            rowIdentifier={"usr_ref_key"}
          />
        }
        titleAction={
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpenProjectModal(true)}
          >
            Add Project
          </Button>
        }
      />
    </div>
  );
}
