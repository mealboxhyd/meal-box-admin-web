import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kicthensSlice, kitchensState } from "../slices/slice";
import CustomeLoader from "../../../sharedComponents/CUstomLoader";
import { Theme, useTheme } from "@mui/material/styles";
import { KITCHEN_LOOKUPS } from "../constants/constants";
import ImageIcon from "@mui/icons-material/Image";
import UploadWidget from "../../../sharedComponents/UploadWidget";
import { BackgroundImage } from "../../../sharedComponents/BackgroundImage";
import { makeStyles } from "@mui/styles";
import CustomChip from "../../../sharedComponents/CustomChip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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

export const AddEditKitchen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isLoading, plans, kitchenImageUrls } = useSelector(kitchensState);
  const theme = useTheme();
  const [bannerImage, setBannerImage] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    bannerImage: "",
    images: "",
    meals: [],
    contact: [],
    address: {},
    startingPrice: 0,
    availablePlans: [],
    discounts: [],
    openingHours: "",
    closingHours: "",
    type: [],
    badges: [],
    searchTags: [],
  });

  useEffect(() => {
    dispatch(kicthensSlice.actions.fetchKitchenPlans());
  }, []);

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
    setFormState({ ...formState, bannerImage: image });
  };

  console.log(formState, "[form state]");

  return (
    <div>
      <CustomeLoader open={isLoading} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Kitchen Name"
            value={formState.name}
            onChange={(e) => handleFormState(e.target.value, "name")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Description"
            value={formState.description}
            onChange={(e) => handleFormState(e.target.value, "description")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Plans</InputLabel>
            <Select
              fullWidth
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={formState.availablePlans}
              onChange={(e) =>
                handleFormState(e.target.value, "availablePlans")
              }
              variant="standard"
              input={<OutlinedInput id="select-multiple-chip" label="Plans" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {plans.map((plan: any) => (
                <MenuItem
                  key={plan._id}
                  value={plan.name}
                  style={getStyles(plan.name, formState.availablePlans, theme)}
                >
                  {plan.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Type</InputLabel>
            <Select
              fullWidth
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={formState.type}
              onChange={(e) => handleFormState(e.target.value, "type")}
              variant="standard"
              input={<OutlinedInput id="select-multiple-chip" label="Type" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {KITCHEN_LOOKUPS.KITCHEN_TYPES.map((type: any) => (
                <MenuItem
                  key={type.value}
                  value={type.label}
                  style={getStyles(type.label, formState.type, theme)}
                >
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <UploadWidget />
          <Grid
            container
            spacing={3}
            style={{ marginTop: "0.2rem" }}
            className={classes.root}
          >
            {kitchenImageUrls.map((url: any, index: number) => {
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
                    {formState.bannerImage === url && (
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

        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
};
