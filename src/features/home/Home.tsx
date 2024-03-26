import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { homeSlice, homeState } from "./slices/slice";

export default function Home() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(homeState);

  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome</h1>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Button color="primary" variant="contained">
        Get Kitchens
      </Button>
      <Button
        color="secondary"
        variant="contained"
        style={{ marginLeft: "40px" }}
      >
        Get Meals
      </Button>
      <br />
      <Button
        color="secondary"
        variant="contained"
        style={{ marginTop: "1rem" }}
      >
        Go to Settngs
      </Button>
    </div>
  );
}
