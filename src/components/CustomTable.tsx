import React, { useState } from "react";

import { useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Grid, TableCell, TableHead } from "@material-ui/core";

import { useNavigate } from "react-router";

import { DataAllCharacters } from "./AllCharacters";
import I18n from "./common/I18n";

import "./CustomTable2.css";

import { useWindowSize } from "../utils/hooks";

export const WIDTH_MAX_MOBILE = 500;
const DEFAULT_ROWS_PER_PAGE = 10;
const PAGE_INITIAL = 0;

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const { count, page, rowsPerPage, onPageChange } = props;
  const theme = useTheme();
  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Grid container direction="row">
      <Grid item xs={2}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
      </Grid>

      <Grid item xs={2}>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </Grid>

      <Grid item xs={2}>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
};

const renderCellDesktop = (
  column: ColumnTableCharacters,
  row: DataAllCharacters
) => {
  switch (column.id) {
    case "img":
      return <img alt="avatar-user" width={200} src={row.img} />;

    case "appearance":
      return row.appearance.map((item: number) => item).join(",");

    case "name":
      return row.name;

    case "nickname":
      return row.nickname;
    // default:
    //   return row[column.id];
  }
};

const renderBody = (
  row: DataAllCharacters,
  windowSizeWidth: number,
  navigation: any
) => {
  const redirectToCharacter = (rowId: number, navigation: any) => {
    navigation(`/character/${rowId}`);
  };
  if (windowSizeWidth < WIDTH_MAX_MOBILE) {
    return (
      <TableRow key={row.char_id}>
        <TableCell key={`${row.char_id}-${row.name}`}>
          <Grid container style={{ textAlign: "center" }}>
            <Grid item xs={12} sm={3}>
              <img alt="avatar-user" width={100} src={row.img} />
            </Grid>
            <Grid item xs={12} sm={3}>
              {row.name}
            </Grid>
            <Grid item xs={12} sm={3}>
              {row.nickname}
            </Grid>
            <Grid item xs={12} sm={3}>
              {row.appearance.map((item: any) => item).join(",")}
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <TableRow
        className="rowSelected"
        key={row.char_id}
        onClick={() => {
          redirectToCharacter(row.char_id, navigation);
        }}
      >
        {columns.map((column: ColumnTableCharacters, index) => (
          <TableCell
            key={column.id}
            align="center"
            //   style={{ minWidth: column.minWidth }}
          >
            {renderCellDesktop(column, row)}
          </TableCell>
        ))}
      </TableRow>
    );
  }
};

interface RenderTableProps {
  page: number;
  rowsPerPage: number;
  props: CustomTableProps;
  windowSize: any;
  navigation: any;
  onSetPage: (newPage: number) => void;
}

const TableCharacters = (propsRenderTable: RenderTableProps) => {
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    propsRenderTable.onSetPage(newPage);
  };

  const { page, rowsPerPage, props, windowSize, navigation } = propsRenderTable;

  return (
    <Table aria-label="custom pagination table">
      {windowSize.width > WIDTH_MAX_MOBILE && (
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="center"
                style={{ fontWeight: 800 }}
              >
                {column.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {(rowsPerPage > 0
          ? props.data.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          : props.data
        ).map((row: DataAllCharacters) =>
          renderBody(row, windowSize.width, navigation)
        )}
      </TableBody>

      {props.pagination && (
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[DEFAULT_ROWS_PER_PAGE]}
              colSpan={11}
              count={props.totalData}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

interface CustomTableProps {
  rowsPerPage?: number;
  pagination?: boolean;
  data: DataAllCharacters[];
  totalData: number;
}

interface ColumnTableCharacters {
  id: string;
  value: JSX.Element | string;
}

const columns: ColumnTableCharacters[] = [
  { id: "img", value: <I18n text="image" /> },
  { id: "name", value: <I18n text="name" /> },
  { id: "nickname", value: <I18n text="nick name" /> },
  { id: "appearance", value: <I18n text="appearance" /> },
];

const CustomTable = (props: CustomTableProps) => {
  const [page, setPage] = useState(PAGE_INITIAL);
  const rowsPerPage = props.rowsPerPage || DEFAULT_ROWS_PER_PAGE;

  const windowSize = useWindowSize();

  const navigation = useNavigate();

  return (
    <TableContainer component={Paper}>
      <TableCharacters
        page={page}
        rowsPerPage={rowsPerPage}
        props={props}
        windowSize={windowSize}
        navigation={navigation}
        onSetPage={(newPage: number) => setPage(newPage)}
      />
    </TableContainer>
  );
};

export default CustomTable;
