import "./style.scss";

import * as React from "react";

// Material UI
import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { eventApi, userApi } from "@/api";
import { fetchEventDelete, fetchUserDelete } from "./constants";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Fragment } from "react";
// Components
import Loader from "@/components/Loader";
import EventModal from "../../EventDashBoard/components/EventModal";
import PropTypes from "prop-types";
import ScheduleModal from "../../EventDashBoard/ScheduleModal";
import UserModal from "../../UserDashBoard/component/UserModal";
//Others
import { actFetchEventDelete } from "@/store/actions/eventManagement";
import actFetchEventDetails from "@/store/actions/eventDetails";
import actGetUserDetails from "@/store/actions/userDetails";
import { actGetUserDetele } from "@/store/actions/userManagement";
import actGetUserList from "@/store/actions/userList";
import { actGetUserSearch } from "@/store/actions/userManagement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortFunction ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                sx={{ fontWeight: "600" }}
                className="event-table__head-item"
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography sx={{ fontWeight: "600" }} className="management-table__head-item">
                {headCell.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          Quản lý Phim
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function MuiEnhancedTable(props) {
  const { tableType, loading, headCells, TableCellList } = props;
  let { dataList } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("maPhim");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModalEvent, setOpenModalEvent] = React.useState(false);
  const [openModalUser, setOpenModalUser] = React.useState(false);
  const [openScheduleModal, setOpenScheduleModal] = React.useState(false);
  const [eventEdit, setEventEdit] = React.useState("");
  const [userEdit, setUserEdit] = React.useState("");
  const [showTimeEvent, setShowTimeEvent] = React.useState("");

  const dispatch = useDispatch();

  const rows = dataList ? dataList : [];
  const eventEditData = useSelector((state) => state.eventDetails.data);
  const eventLoading = useSelector((state) => state.eventDetails.loading);
  let userEditData = useSelector((state) => state.userDetails.data);
  const userLoading = useSelector((state) => state.userDetails.loading);

  const handleEditEvent = (id) => {
    if (tableType === "user") {
      setOpenModalUser(true);
      setUserEdit(id);
      dispatch(actGetUserDetails(id));
    } else {
      setOpenModalEvent(true);
      setEventEdit(id);
      dispatch(actFetchEventDetails(id));
    }
  };

  const handleDeleteItem = async (id) => {
    const msg =
      tableType === "user" ? "Bạn có chắc muốn xoá tài khoản " : "Bạn có chắc muốn xoá phim có mã ";

    if (window.confirm(msg + id)) {
      if (tableType === "user") {
        await fetchUserDelete(id);
        window.location.reload();
      } else {
        await fetchEventDelete(id);
        window.location.reload();
      }
    }
  };

  const handleSchedule = (id) => {
    setShowTimeEvent(id);
    setOpenScheduleModal(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length || 0}
                    headCells={headCells}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                          >
                            <TableCellList
                              row={row}
                              index={index}
                              labelId={labelId}
                              handleDeleteEvent={handleDeleteItem}
                              handleEditEvent={handleEditEvent}
                              handleSchedule={handleSchedule}
                            />
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
          <EventModal
            openModalEvent={openModalEvent}
            setOpenModalEvent={setOpenModalEvent}
            title="Sửa thông tin phim"
            button="Cập nhập"
            data={eventEditData}
            loading={eventLoading}
            modalType="editEvent"
            eventId={eventEdit}
          />
          <UserModal
            openModalUser={openModalUser}
            setOpenModalUser={setOpenModalUser}
            title="Sửa thông tin người dùng"
            button="Sửa thông tin"
            data={userEditData}
            loading={userLoading}
            modalType="editUser"
            userAccount={userEdit}
          />
          <ScheduleModal
            eventId={showTimeEvent}
            openScheduleModal={openScheduleModal}
            setOpenScheduleModal={setOpenScheduleModal}
          />
        </Fragment>
      )}
    </>
  );
}

export default MuiEnhancedTable;
