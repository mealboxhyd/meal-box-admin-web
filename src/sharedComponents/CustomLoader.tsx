import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  open: boolean;
}
export default function CustomeLoader(props: Props) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
