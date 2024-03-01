/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import { LayersOutlined, List } from "@mui/icons-material";

/* eslint-disable-next-line */
export interface ListViewSwitcherProps {
  viewMode: "list" | "cards";
  onViewChange: any;
}

const ListViewSwitcher = (props: ListViewSwitcherProps) => {
  const [viewModeSelected, setViewModeSelected] = useState(props.viewMode);

  const handleChange = (event: any, value: any) => {
    setViewModeSelected(value);
    props.onViewChange(value);
  };

  return (
    <ButtonGroup color="secondary" aria-label="outlined secondary button group">
      <Button
        variant={viewModeSelected === "cards" ? "contained" : "outlined"}
        size="small"
        color="primary"
        aria-label="Apps"
        onClick={(e) => handleChange(e, "cards")}
      >
        <LayersOutlined />
      </Button>
      <Button
        variant={viewModeSelected === "list" ? "contained" : "outlined"}
        size="small"
        color="primary"
        aria-label="List"
        onClick={(e) => handleChange(e, "list")}
      >
        <List />
      </Button>
    </ButtonGroup>
  );
};

export default ListViewSwitcher;
