import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kicthensSlice, kitchensState } from "./slices/slice";
import CustomeLoader from "../../sharedComponents/CUstomLoader";
import CustomMatTable from "../../sharedComponents/CustomeTable/CustomMatTable";
import {
  Box,
  Tooltip,
  IconButton,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import CustomChip from "../../sharedComponents/CustomChip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import CustomCard from "../../sharedComponents/CustomCard";
import CachedIcon from "@mui/icons-material/Cached";
import { BackgroundImage } from "../../sharedComponents/BackgroundImage";
import { formatDate, formatDateTime } from "../../utils/dateUtils";
import CustomDialog from "../../sharedComponents/CustomDialog";
import { AddEditKitchen } from "./components/AddEditKitchen";
const cellStyle = {
  whiteSpace: "nowrap",
  paddingTop: 5,
  paddingBottom: 5,
};

export default function KitchensDashboard() {
  const dispatch = useDispatch();
  const { isLoading, kitchens, kitchenModal } = useSelector(kitchensState);
  const [formState, setFormState]: any = useState({
    name: "",
    description: "",
    bannerImage: "",
    images: "",
    meals: [],
    contact: [],
    location: {
      houseNo: "",
      addressLine1: "",
      addressLine2: "",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "",
      country: "India",
    },
    startingPrice: 0,
    availablePlans: [],
    discounts: [],
    openingHours: "",
    closingHours: "",
    type: [],
    badges: [],
    searchTags: [],
    paymentsAccepted: [],
  });
  const [deletKitchen, setDeleteKitchen]: any = useState({
    open: false,
    kitchen: {},
  });

  useEffect(() => {
    fetchKitchens();
  }, []);

  const fetchKitchens = () => {
    dispatch(kicthensSlice.actions.fetchKitchens());
  };

  const constructColumns = () => {
    const columns: any[] = [];
    columns.push({
      field: "name",
      title: "Kitchen Name",
      align: "center",
      searchable: true,
      render: (row: any) => row.name,
      cellStyle,
    });

    columns.push({
      field: "bannerImage",
      title: "Banner Image",
      align: "center",
      searchable: true,
      render: (row: any) => <BackgroundImage imageUrl={row.bannerImage} />,
      cellStyle,
    });

    columns.push({
      field: "description",
      title: "Description",
      align: "center",
      render: (row: any) => row.description,
      cellStyle: {
        maxWidth: 300,
        whiteSpace: "inherit",
        padding: 0,
      },
    });
    columns.push({
      field: "type",
      title: "Type",
      align: "center",
      filterField: true,
      render: (row: any) => {
        return row.type.map((t: any) => {
          return (
            <span style={{ paddingLeft: "5px" }}>
              <CustomChip label={t} status="new" />
            </span>
          );
        });
      },
      cellStyle,
    });

    columns.push({
      field: "avgRating",
      title: "Avg Rating",
      align: "center",
      render: (row: any) => (
        <CustomChip label={row.avgRating || "N.A"} status="completed" />
      ),
      cellStyle: {
        maxWidth: 300,
        whiteSpace: "inherit",
        padding: 0,
      },
    });

    columns.push({
      field: "updatedBy",
      title: "Updated By",
      align: "center",
      filterField: true,
      render: (row: any) => {
        return (
          <>
            <Typography>{row.updatedBy}</Typography>
            <Typography variant="caption">
              {formatDateTime(row.updatedAt)}
            </Typography>
          </>
        );
      },
      cellStyle,
    });

    columns.push({
      field: "actions",
      title: "Actions",
      align: "center",
      render: (row) => (
        <Box>
          <Tooltip title="View">
            <IconButton>
              {/* <RemoveRedEyeIcon color="primary" /> */}
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton>
              <EditIcon style={{ color: "#00BFA5" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => setDeleteKitchen({ open: true, kitchen: row })}
            >
              <DeleteOutlineIcon style={{ color: "#E91E63" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View time sheets">
            <IconButton>
              {/* <ScheduleIcon style={{ color: "#9D2CC5" }} /> */}
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

  const AccordianContent = (row: any) => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4} style={{ textAlign: "left" }}>
          <Typography gutterBottom variant="body1">
            Available Plans
          </Typography>
          {row.availablePlans.map((plan: any) => {
            return (
              <span style={{ paddingLeft: "2px" }}>
                <CustomChip status="default" label={plan.name} />
              </span>
            );
          })}
        </Grid>

        <Grid item xs={4} style={{ textAlign: "left" }}>
          <Typography gutterBottom variant="body1">
            Meals
          </Typography>
          {row.meals.map((meal: any) => {
            return (
              <span key={meal._id} style={{ paddingLeft: "2px" }}>
                <CustomChip status="default" label={meal.name} />
              </span>
            );
          })}
        </Grid>
        <Grid item xs={4} style={{ textAlign: "left" }}>
          <Typography gutterBottom variant="body1">
            Address
          </Typography>
          <Typography variant="caption" style={{ display: "block" }}>
            {row.location.addressLine1}
          </Typography>
          <Typography variant="caption">{row.location.addressLine2}</Typography>
          <Typography variant="caption">{row.location.addressLine3}</Typography>
        </Grid>
      </Grid>
    );
  };

  const handleRefresh = () => {
    fetchKitchens();
  };

  const handleCbData = (data: any) => {
    setFormState(data);
  };

  const handleSaveKitchen = () => {
    dispatch(kicthensSlice.actions.createKitchen(formState));
  };

  const getDisabledStatusFOrSave = () => {
    const {
      name,
      description,
      contact,
      location,
      paymentsAccepted,
      bannerImage,
      availablePlans,
      type,
    } = formState || {};
    return !(
      name &&
      description &&
      contact &&
      location &&
      paymentsAccepted &&
      bannerImage &&
      availablePlans &&
      type
    );
  };

  const handleDeleteKitchen = () => {
    dispatch(kicthensSlice.actions.deleteKitchen(deletKitchen?.kitchen?._id));
    setDeleteKitchen({ open: false, kitchen: {} });
  };

  console.log(formState, "FORM STATE");

  return (
    <div>
      <CustomeLoader open={isLoading} />

      <CustomDialog
        open={deletKitchen?.open}
        content={
          <Typography>
            Are you sure you want to delete this{" "}
            <strong>{deletKitchen?.kitchen?.name}</strong>?
          </Typography>
        }
        title="Delete Kitchen"
        handleClose={() => setDeleteKitchen({ open: false })}
        actions={
          <Box>
            <Button
              color="secondary"
              style={{ marginRight: "0.5rem" }}
              variant="outlined"
              onClick={() => setDeleteKitchen({ open: false })}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              variant="contained"
              onClick={() => handleDeleteKitchen()}
            >
              Delete
            </Button>
          </Box>
        }
      />

      <CustomDialog
        open={kitchenModal}
        content={<AddEditKitchen handleCbData={handleCbData} />}
        title="Add Kitchen"
        handleClose={() =>
          dispatch(kicthensSlice.actions.handleKitchenModal(false))
        }
        actions={
          <Box>
            <Button
              color="secondary"
              style={{ marginRight: "0.5rem" }}
              variant="outlined"
              onClick={() =>
                dispatch(kicthensSlice.actions.handleKitchenModal(false))
              }
            >
              Cancel
            </Button>

            <Button
              color="primary"
              variant="contained"
              disabled={getDisabledStatusFOrSave()}
              onClick={() => handleSaveKitchen()}
            >
              Save
            </Button>
          </Box>
        }
      />
      <CustomCard
        title={
          <Typography variant="h5">
            <Box fontWeight={500}>Kitchens Dashboard</Box>
          </Typography>
        }
        titleAction={
          <>
            <IconButton onClick={() => handleRefresh()}>
              <CachedIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                dispatch(kicthensSlice.actions.handleKitchenModal(true))
              }
            >
              New Kitchen
            </Button>
          </>
        }
        content={
          <CustomMatTable
            columns={constructColumns()}
            data={kitchens}
            sortOrder={"asc"}
            emptyStateProps
            paging={true}
            orderBy={"req_status"}
            rowsPerPage={10}
            enableRowHover={true}
            emptyRecordsMessage={"No records found "}
            enableSearchBar={true}
            enableFilterByFields={true}
            rowIdentifier={"_id"}
            hasAccordianRows={true}
            renderAccordian={AccordianContent}
          />
        }
      />
    </div>
  );
}
