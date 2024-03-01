import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableProps,
  TableContainerProps,
  TableHead,
  TableHeadProps,
  TableRow,
  TableRowProps,
  TablePagination,
  TablePaginationProps,
  TableSortLabel,
  TableSortLabelProps,
  TableBodyProps,
  TableCellProps,
} from "@mui/material";
import { withStyles } from "@mui/styles";

/** MatTable */
const MatTableComponent = withStyles(() => ({}))(Table);
export function MatTable(props: TableProps) {
  return <MatTableComponent {...props} />;
}

/** MatTableBody  */
const MatTableBodyComponent = withStyles(() => ({}))(TableBody);
export function MatTableBody(props: TableBodyProps) {
  return <MatTableBodyComponent {...props} />;
}

/**  MatTableCell */
const MatTableCellComponent = withStyles(() => ({
  head: {
    whiteSpace: "nowrap",
    fontWeight: "bold",
    textAlign: "center",
    "&:nth-of-type(1)": { borderLeft: "none" },
    "&:nth-last-child": { borderRight: "none" },
    fontSize: "0.8rem",
    padding: "0.5rem 0rem",
  },
  body: {
    whiteSpace: "nowrap",
    textAlign: "center",
    padding: "12px 0px",
    fontSize: "0.8rem",
  },
}))(TableCell);
export function MatTableCell(props: TableCellProps) {
  return <MatTableCellComponent {...props} />;
}

/** MatTableContainer */
const MatTableContainerComponent = withStyles(() => ({}))(TableContainer);
export function MatTableContainer(props: TableContainerProps) {
  return <MatTableContainerComponent {...props} />;
}

/**
 * MatTableHead
 */
const MatTableHeadComponent = withStyles(() => ({
  root: { backgroundColor: "none", color: "#707070d9 !important" },
  //root:{backgroundColor:"#1565c0"}
}))(TableHead);
export function MatTableHead(props: TableHeadProps) {
  return <MatTableHeadComponent {...props} />;
}

/** MatTableRow */
const MatTableRowComponent = withStyles(() => ({
  // root: {"&:nth-of-type(2n)": { backgroundColor: "#f0f8ff"}},
  head: { borderBottom: "thin solid #DCDCDC" },
  hover: { backgroundColor: "#ffffff" },
}))(TableRow);
export function MatTableRow(props: TableRowProps) {
  return <MatTableRowComponent {...props} />;
}
/** Mat Table Paginations */
const MatTablePaginationComponent = withStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "50px!important",
    border: "none",
  },
}))(TablePagination);

export function MatTablePagination(props: TablePaginationProps) {
  return <MatTablePaginationComponent {...props} />;
}

/** Mat Table Sort Label */
const MatTableSortLabelComponent = withStyles(() => ({
  root: { width: "100%", justifyContent: "center" },
  icon: { position: "absolute", right: "10px" },
}))(TableSortLabel);

export function MatTableSortLabel(props: TableSortLabelProps) {
  return <MatTableSortLabelComponent {...props} />;
}
