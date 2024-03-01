import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface CustomDialogProps {
  open: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "sm" | "lg" | "md" | "xl";
  handleClose: (value: boolean) => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomDialog(props: CustomDialogProps) {
  const { actions, content, open, title, maxWidth, handleClose } = props;

  return (
    <React.Fragment>
      <BootstrapDialog
        fullWidth
        maxWidth={maxWidth || "md"}
        onClose={() => handleClose(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleClose(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
