/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";

/* eslint-disable-next-line */
export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: any;
}

export const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const [pagesCount, setPagesCount] = useState(1);
  const { count, page, rowsPerPage, onPageChange } = props;
  const handleChange = (event: any, value: any) => {
    onPageChange(event, value - 1);
  };
  useEffect(() => {
    setPagesCount(Math.ceil(count / rowsPerPage));
  }, [rowsPerPage]);
  return (
    <Box>
      <Pagination
        count={pagesCount}
        page={page + 1}
        boundaryCount={1}
        onChange={handleChange}
        variant="text"
        color="primary"
      />
    </Box>
  );
};

export default TablePaginationActions;
