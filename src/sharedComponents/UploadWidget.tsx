import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { kicthensSlice } from "../features/kitchens/slices/slice";
import { homeSlice } from "../features/home/slices/slice";
import { Button } from "@mui/material";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef: any = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /* @ts-expect-error' */
    cloudinaryRef.current = window?.cloudinary;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /* @ts-expect-error' */
    widgetRef.current = cloudinaryRef?.current?.createUploadWidget(
      {
        cloudName: "mealboxhyd",
        uploadPreset: "ml_default",
      },
      function (error: any, result: any) {
        if (error) {
          dispatch(
            homeSlice.actions.storeSnackbarData({
              message: "Failed to uplaod images",
              open: true,
              severity: "error",
            })
          );
        } else {
          const imageUrls = result?.info?.files?.map(
            (file: any) => file.uploadInfo.url
          );
          if (imageUrls) {
            dispatch(
              kicthensSlice.actions.storeKitchenImagesSuccess(imageUrls)
            );
            dispatch(
              homeSlice.actions.storeSnackbarData({
                message: "Successfully uploaded the images",
                open: true,
                severity: "success",
              })
            );
          }
        }
      }
    );
  }, []);

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => widgetRef.current.open()}
      >
        Upload Kitchen Images
      </Button>
    </>
  );
};

export default UploadWidget;
