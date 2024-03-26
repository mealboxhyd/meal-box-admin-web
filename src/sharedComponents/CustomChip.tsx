import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const statusColorMap = {
  common: {
    color: "#2C323E",
    fontSize: "0.75rem",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "0.06rem",
  },
  new: {
    backgroundColor: "#F3E6F8",
    borderColor: "#E2C0EE",
  },
  pending: {
    backgroundColor: "#FFF176",
    borderColor: "#FDD835",
  },
  running: {
    backgroundColor: "#ffe0b2",
    borderColor: "#ff9800",
  },
  failed: {
    backgroundColor: "#FFC9CE",
    borderColor: "#e53935",
  },
  completed: {
    backgroundColor: "#B2DFDB",
    borderColor: "#009688",
  },
  info: {
    backgroundColor: "#B4E6FB",
    borderColor: "#0091EA",
  },
};
export interface CustomStatusBadgeProps {
  label: string;
  status: "new" | "pending" | "running" | "failed" | "completed" | "info";
  labelText?: "uppercase" | "capitalize" | "lowercase";
  disableLetterSpacing?: boolean;
  marginTop?: string;
  marginLeft?: string;
  style?: any;
}
export interface CustomStatusType {
  backgroundColor?: string;
  borderColor?: string;
}

const StyledChip = styled(Chip)(() => ({
  "& .MuiChip-label": {
    textOverflow: "clip",
  },
}));

export default function CustomChip(props: CustomStatusBadgeProps) {
  const [statusProp, setStatusProp] = useState<CustomStatusType>({});
  useEffect(() => {
    if (props.status) {
      const statusVal = props.status;
      setStatusProp({ ...statusColorMap[statusVal] });
    }
  }, [props.status]);
  return (
    <StyledChip
      label={props.label}
      variant="outlined"
      size="small"
      style={{
        backgroundColor: statusProp.backgroundColor
          ? statusProp.backgroundColor
          : "white",
        color: statusColorMap.common.color,
        borderColor: statusProp.borderColor
          ? statusProp.borderColor
          : "#2C323E",
        fontSize: statusColorMap.common.fontSize,
        fontWeight: statusColorMap.common.fontWeight,
        letterSpacing: props.disableLetterSpacing
          ? "inherit"
          : statusColorMap.common.letterSpacing,
        textTransform: props.labelText ? props.labelText : "uppercase",
        marginTop: props.marginTop,
        marginLeft: props.marginLeft,
      }}
    />
  );
}
