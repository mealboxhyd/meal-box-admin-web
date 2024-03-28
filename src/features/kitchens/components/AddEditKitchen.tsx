import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  FormControl,
  Grid,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kicthensSlice, kitchensState } from "../slices/slice";
import CustomeLoader from "../../../sharedComponents/CUstomLoader";
import { KITCHEN_LOOKUPS } from "../constants/constants";
import ImageIcon from "@mui/icons-material/Image";
import UploadWidget from "../../../sharedComponents/UploadWidget";
import { BackgroundImage } from "../../../sharedComponents/BackgroundImage";
import { makeStyles } from "@mui/styles";
import CustomChip from "../../../sharedComponents/CustomChip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  markAsThumbnail: {
    position: "absolute",
    bottom: "0rem",
    width: "100%",
    transition: "width 5s height 4s",
  },
  activeThumbnail: {
    position: "absolute",
    top: "2rem",
    // width: "100%",
  },
});

interface AddEditKitchenProps {
  handleCbData: any;
}

export const AddEditKitchen = (props: AddEditKitchenProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isLoading, plans, kitchenImageUrls, kitchenInfo } =
    useSelector(kitchensState);
  const [bannerImage, setBannerImage] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formState, setFormState]: any = useState(null);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [kitchenTypes, setKitchenTypes] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    dispatch(kicthensSlice.actions.fetchKitchenPlans());
    dispatch(kicthensSlice.actions.getMealsByKitchenId());
  }, []);

  useEffect(() => {
    if (kitchenInfo?._id) {
      setFormState(kitchenInfo);
      setSelectedPlans(kitchenInfo?.availablePlans);
      setKitchenTypes(kitchenInfo?.type);
      setPaymentOptions(kitchenInfo?.paymentsAccepted);
    }
  }, [kitchenInfo, kitchenImageUrls]);

  const handleFormState = (value: any, field: string) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleMouseOver = (index: number) => {
    setBannerImage(true);
    setActiveImageIndex(index);
  };

  const handleMouseOut = () => {
    setBannerImage(false);
    setActiveImageIndex(0);
  };

  const handleBannerImage = (image: string) => {
    setFormState({
      ...formState,
      bannerImage: image,
      images: kitchenImageUrls,
    });
  };

  const handleAddressChange = (value: string, field: string) => {
    setFormState({
      ...formState,
      location: {
        ...formState?.location,
        [field]: value,
      },
    });
  };

  useEffect(() => {
    props.handleCbData(formState);
  }, [formState]);

  useEffect(() => {
    setFormState({
      ...formState,
      availablePlans: selectedPlans,
      type: kitchenTypes,
      paymentsAccepted: paymentOptions,
    });
  }, [selectedPlans, paymentOptions, kitchenTypes]);

  console.log(formState, "[form state]");

  return (
    <div>
      <CustomeLoader open={isLoading} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Kitchen Name"
            value={formState?.name || ""}
            onChange={(e) => handleFormState(e.target.value, "name")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Description"
            value={formState?.description || ""}
            onChange={(e) => handleFormState(e.target.value, "description")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <Autocomplete
              size="medium"
              multiple
              value={formState?.availablePlans || []}
              defaultValue={formState?.availablePlans}
              onChange={(event, newValue: any) => {
                setSelectedPlans(newValue);
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={plans}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.name;
              }}
              renderOption={(props, option) => (
                <li {...props}>{option.name}</li>
              )}
              freeSolo
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label={"Plans"} />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            fullWidth
            size="medium"
            multiple
            value={formState?.type || []}
            defaultValue={formState?.type}
            onChange={(event, newValue: any) => {
              setKitchenTypes(newValue);
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={KITCHEN_LOOKUPS.KITCHEN_TYPES}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.label;
            }}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            freeSolo
            renderInput={(params) => (
              <TextField variant="outlined" {...params} label={"Type"} />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Search Tags"
            placeholder="Use comma seperated text ,eg:- Veg,Thali,Non veg"
            value={formState?.searchTags || ""}
            onChange={(e) => handleFormState(e.target.value, "searchTags")}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            fullWidth
            size="medium"
            multiple
            value={formState?.paymentsAccepted || []}
            // defaultValue={value}
            onChange={(event, newValue: any) => {
              setPaymentOptions(newValue);
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={KITCHEN_LOOKUPS.PAYMENTS_TYPES}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.label;
            }}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            freeSolo
            renderInput={(params) => (
              <TextField
                variant="outlined"
                {...params}
                label={"Payment Options"}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Contact"
            placeholder="Use comma seperated text ,eg:- 7779998882,8882228882"
            value={formState?.contact || ""}
            onChange={(e) => handleFormState(e.target.value, "contact")}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Badge"
            placeholder="Eg:- Best Seller"
            value={formState?.badges || ""}
            onChange={(e) => handleFormState(e.target.value, "badges")}
          />
        </Grid>

        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="House/ Flat no"
                    placeholder="Eg:- Flat no :301"
                    value={formState?.location?.houseNo || ""}
                    onChange={(e) =>
                      handleAddressChange(e.target.value, "houseNo")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    placeholder="Eg:- Sitara Apartments , Rami reddy nagar"
                    value={formState?.location?.addressLine1 || ""}
                    onChange={(e) =>
                      handleAddressChange(e.target.value, "addressLine1")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    placeholder="Eg:- Miyapur cross roads"
                    value={formState?.location?.addressLine2 || ""}
                    onChange={(e) =>
                      handleAddressChange(e.target.value, "addressLine2")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    placeholder="Eg:- Hyderabad"
                    value={formState?.location?.city || ""}
                    onChange={(e) =>
                      handleAddressChange(e.target.value, "city")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="State"
                    placeholder="Eg:- Telangana"
                    value={formState?.location?.state || ""}
                    onChange={(e) =>
                      handleAddressChange(e.target.value, "state")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    placeholder="Eg:- 522018"
                    value={formState?.location?.pincode || ""}
                    onChange={(e) =>
                      handleAddressChange(e.target.value, "pincode")
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    placeholder="Eg:- 522018"
                    value={formState?.location?.country || ""}
                    onChange={(e) =>
                      handleAddressChange(e.target.value, "country")
                    }
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <UploadWidget />
          <Grid
            container
            spacing={3}
            style={{ marginTop: "0.2rem" }}
            className={classes.root}
          >
            {kitchenImageUrls?.map((url: any, index: number) => {
              return (
                <Grid
                  item
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={() => handleMouseOut()}
                >
                  <BackgroundImage
                    imageUrl={url}
                    width="300px"
                    height="180px"
                  />
                  <div className={classes.activeThumbnail}>
                    {formState?.bannerImage === url && (
                      <CustomChip label="Banner Image" status="completed" />
                    )}
                  </div>

                  <Slide
                    direction="up"
                    in={bannerImage && index === activeImageIndex}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div className={classes.markAsThumbnail}>
                      <Button
                        startIcon={<ImageIcon />}
                        variant="contained"
                        onClick={() => handleBannerImage(url)}
                      >
                        Select as Banner Image
                      </Button>
                    </div>
                  </Slide>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
