/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  SortDirection,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  MatTable,
  MatTableContainer,
  MatTableHead,
  MatTableRow,
  MatTableCell,
  MatTableSortLabel,
  MatTableBody,
  MatTablePagination,
} from "./CustomMatTableStyles";
import React from "react";
import TablePaginationActions from "./TablePaginationActions";
import ListViewSwitcher from "./ListViewSwitcher";
import { CollectionUtils } from "../../utils/CollectionUtils";
import { StringUtils } from "../../utils/StringUtils";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  ArrowDownward,
  ArrowUpward,
  FilterAltOff,
  Search,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

/* eslint-disable-next-line */

/**
 * Properties required for Card display format.
 */
export interface CustomMatTableCardProps {
  titleField: any;
  titleRender?: any;
  bodyField: any;
  titleIcon?: any;
  titleStyle?: any;
  headerStyle?: any;
  bodyStyle?: any;
  bodyRender?: any;
  footerStyle?: any;
  titleActions?: any;
  footerActions?: any;
}
/**
 * Column properties used for tabular display format.
 */
export interface CustomMatTableRowProps {
  field: string;
  title: any;
  width?: string;
  align?: "left" | "right" | "center";
  cellStyle?: any;
  headerStyle?: any;
  render?: any;
  searchable?: boolean;
  filterField?: boolean;
  hidden?: boolean;
  stopEventPropogation?: boolean;
}
/**
 * Table properties.
 */
export interface CustomMatTableProps {
  data: any[];
  rowsPerPage: number;
  columns: CustomMatTableRowProps[];
  emptyStateProps?: any;
  paging: boolean;
  orderBy?: string;
  sortOrder?: SortDirection;
  enableRowHover: boolean;
  rowIdentifier: string;
  enableSelection?: boolean;
  multipleSelect?: boolean;
  onSelect?: any;
  selectedRows?: string[];
  enableFilter?: boolean;
  emptyRecordsMessage: string;
  cards?: CustomMatTableCardProps;
  enableSearchBar?: boolean;
  enableFilterByFields?: boolean;
  includeViewSwithcher?: boolean;
  defaultListViewMode?: "list" | "cards";
  disableSort?: boolean;
  tableTitle?: any;
  hasAccordianRows?: boolean;
  renderAccordian?: any;
}
const useStyles = makeStyles((theme: any) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    backgroundColor: "white",
    marginLeft: "6%",
    marginRight: "3.1%",
    marginTop: "20vh",
    height: "auto",
    fontSize: "0.8vw",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

/**
 * Customized Material table for Copernicus UI requriements.
 *
 * Note#1: "enableSearchBar" and "enableFilterByFields" use column field "searchable" as a qualifier to filter the data.
 * If search / filtering is enabled, then filter and search logic is based on only the columns which are marked as searchable:true.
 *
 * Note#2:
 * To display in Cards or Table format use the property "viewMode", valid values are "list" or "cards". Value "list" will
 * display data in tabular format and "cards" in Cards layout.
 *
 * Note#2.1:
 * Use the component <ListViewSwitcher> if you wish to have view switching outside the table container view.
 *
 **/
export function CustomMatTable(props: CustomMatTableProps) {
  const classes = useStyles();
  const [filters, setFilters] = React.useState<any>({});
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [listViewMode, setListViewMode] = React.useState<"cards" | "list">(
    "list"
  );
  const [tableProps, setTableProps] = React.useState({
    page: 0,
    rowsPerPage: props.rowsPerPage,
    orderBy: props.orderBy,
    sortOrder: props.sortOrder,
    data: props.data,
    fData: props.data,
  });
  React.useEffect(() => {
    setListViewMode(
      props.defaultListViewMode ? props.defaultListViewMode : "list"
    );
  }, [props.defaultListViewMode]);

  React.useEffect(() => {
    // console.log("custom mat table loaded.. ",props.data)
    const tData: any[] = [];
    props.data?.forEach((_x) => {
      tData.push({ ..._x, expanded: false });
    });

    const rowIds = props.selectedRows ? props.selectedRows : [];
    let selectedData = [];
    let unselectedData = [];
    setSelectedRowIds(rowIds);
    if (props.data) {
      selectedData = tData.filter((row) =>
        rowIds.includes(row[props.rowIdentifier])
      );
      unselectedData = tData.filter(
        (row) => !rowIds.includes(row[props.rowIdentifier])
      );
      if (props.orderBy) {
        selectedData = CollectionUtils.sortArray(
          selectedData,
          props.orderBy,
          "asc"
        );
        unselectedData = CollectionUtils.sortArray(
          unselectedData,
          props.orderBy,
          "asc"
        );
      }
      setSelectedRows(selectedData);
    }
    if (props.onSelect) {
      props.onSelect(selectedRows);
    }

    setTableProps({
      page: 0,
      rowsPerPage: props.rowsPerPage,
      orderBy: props.orderBy,
      sortOrder: props.sortOrder,
      data: [...selectedData, ...unselectedData],
      fData: [...selectedData, ...unselectedData],
    });
    if (props.columns) {
      const filters: any = {};
      props.columns.forEach((col) => {
        if (col.filterField) {
          filters[col.field] = "";
        }
      });
      if (props.enableSearchBar) {
        filters["searchBar"] = "";
      }
      setFilters(filters);
    }
  }, [props.data, props.selectedRows]);

  const handlePageChange = (e: any, newPage: any) => {
    setTableProps({ ...tableProps, page: newPage });
  };
  const handleChangeRowsPerPage = (event: any) => {
    setTableProps({ ...tableProps, rowsPerPage: event.target.value, page: 0 });
  };
  const handleSort = (e: any, field: string) => {
    if (props.disableSort) {
      e.preventDefault();
      return;
    }
    const sOrder: SortDirection =
      tableProps.sortOrder === "asc" ? "desc" : "asc";
    const sData = stableSort(tableProps.data, getComparator(sOrder, field));

    const selected = selectedRowIds ? [...selectedRowIds] : [];

    let selectedData = [];
    let unselectedData = [];
    selectedData = sData.filter((row) =>
      selected.includes(row[props.rowIdentifier])
    );
    unselectedData = sData.filter(
      (row) => !selected.includes(row[props.rowIdentifier])
    );

    setTableProps({
      ...tableProps,
      fData: [...selectedData, ...unselectedData],
      page: 0,
      sortOrder: sOrder,
      orderBy: field,
    });
  };
  const descendingComparator = (a: any, b: any, orderBy: string) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const getComparator = (order: string, orderBy: string) => {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array: any[], comparator: any) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };
  const sortTitle = () => {
    return tableProps.sortOrder === "asc"
      ? "Sort Down"
      : tableProps.sortOrder === "desc"
      ? "Sort Up"
      : "";
  };
  const doFilter = (e: any, column: any) => {
    // console.log("[doFilter] column:",column," fVal:",e.target);
    let fVal = e.target.value;
    fVal = fVal?.trim();
    setFilters({ ...filters, [column.field]: fVal });
    let fData = tableProps.data;
    if (props.columns) {
      props.columns.forEach((col: any) => {
        fData = fData.filter(
          (fd) =>
            filters[col.field] &&
            filters[col.field] !== "" &&
            fd[col.field] &&
            fd[col.field].indexOf(filters[col.field]) !== -1
        );
      });
    }
    setTableProps({ ...tableProps, fData: fData, page: 0 });
  };

  const getFilterControl = (column: any) => {
    return (
      <TextField
        type="text"
        name={column?.field + "_filter"}
        size="small"
        style={{
          color: "#000 !important",
          display: "flex",
          justifyContent: "center",
          width: "90%",
        }}
        placeholder={`Filter ${column.title}`}
        defaultValue={filters[column.field] ? filters[column.field] : ""}
        onChange={(e) => doFilter(e, column)}
      ></TextField>
    );
  };

  const handleFilterChange = (e: any, field: string) => {
    const { value } = e.target;
    const newFilters = { ...filters };
    newFilters[field] = value;
    if (field === "searchBar" && StringUtils.isNotEmpty(value)) {
      const fVal = value.trim().toLowerCase();
      const fData = tableProps.data;

      const columnFields = props.columns
        .filter((_x) => _x.searchable)
        .map((_x) => _x.field);
      const newFData = fData.filter((d) => {
        const rowValues = [];
        for (const column of columnFields) {
          if (typeof d[column] === "string") {
            rowValues.push(d[column]?.toLowerCase());
          } else {
            rowValues.push(d[column]);
          }
        }
        return rowValues.join("-").indexOf(fVal) !== -1;
      });

      setTableProps({ ...tableProps, fData: newFData, page: 0 });
    } else {
      setTableProps({
        ...tableProps,
        fData: tableProps.data.filter((data) => data[field] === value),
        page: 0,
      });
    }

    let allFilterEmpty = true;
    for (const fKey in newFilters) {
      allFilterEmpty = allFilterEmpty && StringUtils.isEmpty(newFilters[fKey]);
    }
    allFilterEmpty &&
      setTableProps({ ...tableProps, fData: tableProps.data, page: 0 });
    setFilters(newFilters);
  };
  const getFieldFilterData = (field: string) => {
    const fData = tableProps.fData;
    const filterData: any[] = [];
    fData.forEach((_x) => {
      if (
        StringUtils.isNotEmpty(_x[field]) &&
        !filterData.includes(_x[field])
      ) {
        filterData.push(_x[field]);
      }
    });
    return filterData;
  };
  const isFilterInForce = () => {
    let inForce = false;
    Object.values(filters).forEach((fVal) => {
      inForce = inForce || fVal ? true : false;
    });
    return inForce;
  };
  const clearFilter = () => {
    const clearedFilters: any = { ...filters };
    Object.keys(clearedFilters).forEach((key: string) => {
      clearedFilters[key] = "";
    });
    setFilters(clearedFilters);
    setTableProps({ ...tableProps, fData: tableProps.data, page: 0 });
  };
  const handleColSelectAll = (e: any) => {
    const { checked } = e.target;
    setSelectAll(checked);
    let selected: string[] = [];
    if (checked) {
      selected = tableProps.fData.map(
        (_x) => _x[props.rowIdentifier ? props.rowIdentifier : ""]
      );
    }
    setSelectedRowIds(selected);
    const rowsSelected = tableProps.data.filter((row) =>
      selected.includes(row[props.rowIdentifier])
    );
    setSelectedRows(rowsSelected);
    props.onSelect(rowsSelected);
  };
  const handleRowSelect = (e: any) => {
    const { value, checked } = e.target;
    let selected = selectedRowIds ? [...selectedRowIds] : [];
    if (checked) {
      if (props.multipleSelect) {
        if (!selected.includes(value)) {
          selected.push(value);
        }
      } else {
        selected = [value];
      }
    } else {
      selected = selected.filter((_x) => _x !== value);
      setSelectAll(false);
    }
    setSelectedRowIds(selected);

    const rowsSelected = tableProps.data.filter((row) =>
      selected.includes(row[props.rowIdentifier])
    );
    setSelectedRows(rowsSelected);
    props.onSelect(rowsSelected);
  };
  const handleListViewSwitch = (e: any) => {
    if (listViewMode === "list") {
      setListViewMode("cards");
    } else {
      setListViewMode("list");
    }
  };
  const toggleRowAccordian = (e: any, row: any) => {
    // e.preventDefault();
    //console.log("[toggleRowAccordian] e.target:",e.target);
    const fData: any[] = [];
    tableProps.fData.forEach((_x) => {
      const nfData: any = { ..._x };
      if (_x[props.rowIdentifier] === row[props.rowIdentifier]) {
        nfData.expanded = !_x.expanded;
      }
      fData.push(nfData);
    });
    setTableProps({ ...tableProps, fData: fData });
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        style={{ width: "100%", display: "flex", alignItems: "flex-end" }}
      >
        <Grid item xs={4} md={3} sm={4}>
          {props.enableSearchBar && (
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              name="searchBar"
              id="tgfilter_id"
              placeholder={"Search"}
              required={false}
              type="text"
              fullWidth
              onChange={(e) => handleFilterChange(e, "searchBar")}
              value={filters["searchBar"] ? filters["searchBar"] : ""}
              style={{ margin: "0px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small"></Search>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            style={{ display: "flex", alignItems: "flex-end" }}
            spacing={3}
          >
            {props.enableFilterByFields &&
              props.columns
                .filter((_x) => _x.filterField)
                .map((col) => {
                  return (
                    <Grid item key={col.field + "_filter_key"}>
                      <TextField
                        variant="standard"
                        select
                        name={col.field + "_filter"}
                        label={col.title}
                        onChange={(e) => handleFilterChange(e, col.field)}
                        value={filters[col.field] ? filters[col.field] : ""}
                        style={{ width: "120px" }}
                      >
                        {getFieldFilterData(col.field).map((_x, i) => {
                          return (
                            <MenuItem
                              key={`${col.field}_filterop_${i}`}
                              value={_x}
                              style={{ textTransform: "capitalize" }}
                            >
                              {_x}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                  );
                })}
            {props.enableFilterByFields && (
              <Grid item>
                {isFilterInForce() && (
                  <IconButton onClick={clearFilter} title="Clear Filters">
                    <FilterAltOff fontSize="small"></FilterAltOff>
                  </IconButton>
                )}
                {!isFilterInForce() && (
                  <IconButton>
                    <FilterAltIcon fontSize="small"></FilterAltIcon>
                  </IconButton>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {listViewMode === "list" && (
        <MatTableContainer>
          <MatTable>
            <MatTableHead>
              {props.includeViewSwithcher && (
                <MatTableRow>
                  <MatTableCell width={"100%"} colSpan={props.columns.length}>
                    <Grid
                      container
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid item>
                        {props.tableTitle ? props.tableTitle : ""}
                      </Grid>
                      <Grid item>
                        <ListViewSwitcher
                          viewMode="list"
                          onViewChange={handleListViewSwitch}
                        ></ListViewSwitcher>
                      </Grid>
                    </Grid>
                  </MatTableCell>
                </MatTableRow>
              )}
              <MatTableRow>
                {props.enableSelection && (
                  <MatTableCell width={"40px"}>
                    {props.multipleSelect && (
                      <Checkbox
                        name="table_select_all"
                        checked={selectAll}
                        onChange={handleColSelectAll}
                        value="all"
                        color="primary"
                        indeterminate={!selectAll && selectedRowIds?.length > 0}
                      ></Checkbox>
                    )}
                  </MatTableCell>
                )}
                {props.columns
                  .filter((col) => !col.hidden)
                  .map((_col, i) => (
                    <MatTableCell
                      key={i}
                      sortDirection={
                        tableProps.orderBy === _col.field
                          ? tableProps.sortOrder
                          : undefined
                      }
                      onClick={(e) => handleSort(e, _col.field)}
                      width={_col.width}
                      style={_col.headerStyle}
                    >
                      <MatTableSortLabel
                        active={tableProps.orderBy === _col.field}
                        direction={
                          tableProps.orderBy === _col.field &&
                          tableProps.sortOrder === "desc"
                            ? "desc"
                            : "asc"
                        }
                        title={sortTitle()}
                        disabled={props.disableSort}
                        style={{
                          justifyContent: _col.headerStyle?.align
                            ? _col.headerStyle?.align
                            : "center",
                        }}
                      >
                        {_col.title}
                        {tableProps.orderBy === _col.field ? (
                          <span className={classes.visuallyHidden}></span>
                        ) : null}
                      </MatTableSortLabel>
                    </MatTableCell>
                  ))}
                {props.hasAccordianRows && (
                  <MatTableCell width={"10px"}></MatTableCell>
                )}
              </MatTableRow>
              {props.enableFilter && (
                <MatTableRow>
                  {props.enableSelection && (
                    <MatTableCell width={"40px"}></MatTableCell>
                  )}
                  {props.columns
                    .filter((col) => !col.hidden)
                    .map((_col, i) => (
                      <MatTableCell key={`filter_${i}`} width={_col.width}>
                        {getFilterControl(_col)}
                      </MatTableCell>
                    ))}
                </MatTableRow>
              )}
            </MatTableHead>
            <MatTableBody>
              {tableProps.fData &&
                tableProps.fData
                  .slice(
                    tableProps.page * tableProps.rowsPerPage,
                    tableProps.page * tableProps.rowsPerPage +
                      tableProps.rowsPerPage
                  )
                  .map((_row, i) => {
                    return (
                      <React.Fragment key={"rowrap" + i}>
                        <MatTableRow
                          style={{
                            backgroundColor:
                              i % 2 === 0 ? "#f0f8ff" : "#ffffff",
                          }}
                          key={i}
                          hover={props.enableRowHover ? true : false}
                          onClick={(e) => toggleRowAccordian(e, _row)}
                        >
                          {props.enableSelection && (
                            <MatTableCell
                              width={"40px"}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Checkbox
                                name={`_row_${i}`}
                                checked={selectedRowIds.includes(
                                  _row[props.rowIdentifier]
                                )}
                                value={_row[props.rowIdentifier]}
                                onChange={handleRowSelect}
                                color="primary"
                              ></Checkbox>
                            </MatTableCell>
                          )}
                          {props.columns
                            .filter((col) => !col.hidden)
                            .map((_col, k) => (
                              <MatTableCell
                                key={k}
                                align={_col.align ? _col.align : "center"}
                                width={_col.width}
                                style={_col.cellStyle}
                              >
                                {_col.render
                                  ? _col.render(_row)
                                  : _row[_col.field]}
                              </MatTableCell>
                            ))}
                          {props.hasAccordianRows && (
                            <MatTableCell
                              width={"10px"}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Tooltip
                                title={_row.expanded ? "Hide" : "Show Details"}
                              >
                                <IconButton
                                  aria-label="expand row"
                                  size="small"
                                  style={
                                    _row.expanded
                                      ? { boxShadow: "0px 0px 3px" }
                                      : { boxShadow: "none" }
                                  }
                                  onClick={(e) => toggleRowAccordian(e, _row)}
                                >
                                  {_row.expanded ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )}
                                </IconButton>
                              </Tooltip>
                            </MatTableCell>
                          )}
                        </MatTableRow>
                        {props.hasAccordianRows &&
                          props.renderAccordian &&
                          _row.expanded && (
                            <MatTableRow key={"addl_row_" + i}>
                              <MatTableCell
                                colSpan={props.columns.length + 1}
                                style={{ padding: "0px" }}
                              >
                                <div>{props.renderAccordian(_row, i)}</div>
                              </MatTableCell>
                            </MatTableRow>
                          )}
                      </React.Fragment>
                    );
                  })}
              {(!tableProps.fData || tableProps.fData.length === 0) && (
                <MatTableRow>
                  <MatTableCell colSpan={props.columns.length} key={0}>
                    {props.emptyRecordsMessage
                      ? props.emptyRecordsMessage
                      : "No records found."}
                  </MatTableCell>
                </MatTableRow>
              )}
            </MatTableBody>
          </MatTable>
        </MatTableContainer>
      )}
      {listViewMode === "cards" && (
        <Grid container spacing={3}>
          {props.includeViewSwithcher && (
            <Grid item xs={12}>
              <Grid
                container
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item>{props.tableTitle ? props.tableTitle : ""}</Grid>
                <Grid item>
                  <ListViewSwitcher
                    viewMode={listViewMode}
                    onViewChange={handleListViewSwitch}
                  ></ListViewSwitcher>
                </Grid>
              </Grid>
            </Grid>
          )}
          {tableProps.fData &&
            tableProps.fData
              .slice(
                tableProps.page * tableProps.rowsPerPage,
                tableProps.page * tableProps.rowsPerPage +
                  tableProps.rowsPerPage
              )
              .map((_row, i) => {
                return (
                  <Grid
                    key={"wor_" + i}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                  >
                    <Card elevation={3}>
                      <CardHeader
                        title={
                          <Typography
                            variant="h3"
                            style={props.cards?.titleStyle}
                          >
                            {props.cards?.titleRender
                              ? props.cards?.titleRender(_row)
                              : _row[props.cards?.titleField]}
                          </Typography>
                        }
                        action={
                          props.cards?.titleActions
                            ? props.cards.titleActions(_row)
                            : null
                        }
                        avatar={props.cards?.titleIcon ? "" : null}
                        style={props.cards?.headerStyle}
                      ></CardHeader>
                      <CardContent style={props.cards?.bodyStyle}>
                        {props.cards?.bodyRender
                          ? props.cards.bodyRender(_row)
                          : _row[props.cards?.bodyField]}
                      </CardContent>
                      {props.cards?.footerActions && (
                        <CardActions>
                          {props.cards.footerActions(_row)}
                        </CardActions>
                      )}
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      )}
      {props.paging && tableProps.fData.length > props.rowsPerPage && (
        <MatTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={
            tableProps.fData && tableProps.fData.length > 0
              ? tableProps.fData.length
              : 0
          }
          rowsPerPage={tableProps.rowsPerPage}
          page={tableProps.page}
          onPageChange={handlePageChange}
          labelRowsPerPage={"Items per page:"}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={(props) => <TablePaginationActions {...props} />}
        />
      )}
    </React.Fragment>
  );
}

export default CustomMatTable;
