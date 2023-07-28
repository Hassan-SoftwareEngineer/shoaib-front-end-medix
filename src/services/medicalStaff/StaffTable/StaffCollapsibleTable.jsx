import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Grid,
  ToggleButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "../../../assets/Theme";
import MDButton from "../../../components/MDButton";
import MDTextField from "../../../components/MDTextField";
import MDToggleButton from "../../../components/MDToggleButton";
import MDHeadingSub from "../../../components/MDHeadingSub";
import Swal from 'sweetalert2'
import apiInstance from "../../../Api/axios";
import StaffEnhancedTableHead from "./StaffEnhancedTableHead";
import { GetStaff } from "../../hospitalsettingStap/hospitalApi/hospitalApiSlice";

const SelectBox = styled(Select)(({ theme }) => ({
  color: theme.palette.primary.yellow_dark,
  fontSize: "14px",
  // borderRadius: theme.shapes.borderRadius,
  border: `1px solid ${theme.palette.primary.yellow_dark}`,
  // backgroundColor: theme.palette.primary.yellow_with_opacity,
  height: "32px",
  marginLeft: "20px",
  svg: {
    color: theme.palette.primary.yellow_dark,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (orderBy == "assignedDate") {
    return new Date(b[orderBy]).valueOf() - new Date(a[orderBy]).valueOf();
  }

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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function Row(props) {
  const dispatch = useDispatch();

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState("");
  const [alignment, setAlignment] = React.useState("M");
  const [staffName, setStaffName] = useState()
  const [specialization, setSpecialization] = useState()
  const [fee, setFee] = useState()
  const [phone, setPhone] = useState()
  const [timing, setTiming] = useState()





  const openDropdown = async (row) => {
    console.log(row)
    setStaffName(row?.staffName)
    setSpecialization(row?.specialization)
    setFee(row?.fee)
    setPhone(row?.fee)
    setTiming(row?.timing)
  };

  const handleStaff = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [selectedDoctor, setSelectedDoctor] = useState();

  const handleDelete = (row) => {
    console.log(row)
    const user = localStorage.getItem("user")
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to Delete ${row?.staffName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          `${row?.staffName} has been deleted.`,
          'success'
        )
        await apiInstance.delete(`/staff/delete/${row?.id}?username=${user}`)
        await dispatch(GetStaff({page:1,pageSize:5}))
      }
    })

  };



  const handleUpdate = async (row) => {
    const body = {

    };
    // await dispatch(UpdatePatient({ body: body, id: row?.id }));
    await setOpen(!open);
    await dispatch(GetStaff({page:1,pageSize:5}))

    ;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          width="5%"
          align="center"
          sx={{
            fontWeight: 400,
            lineHeight: "17px",
            color: `${theme.palette.black.main}`,
            fontFamily: "GontserratRegular",
            fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
          }}
        >
          {row?.id}
        </TableCell>
        <TableCell
          width="15%"
          align="left"
          sx={{
            fontWeight: 400,
            lineHeight: "17px",
            color: `${theme.palette.black.main}`,
            fontFamily: "GontserratRegular",
            fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
          }}
        >
          {row.staffName}
        </TableCell>
        <TableCell
          width="15%"
          align="left"
          sx={{
            fontWeight: 400,
            lineHeight: "17px",
            color: `${theme.palette.black.main}`,
            fontFamily: "GontserratRegular",
            fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
          }}
        >
          {row.specialization}
        </TableCell>
        <TableCell
          width="10%"
          align="left"
          sx={{
            fontWeight: 400,
            lineHeight: "17px",
            color: `${theme.palette.black.main}`,
            fontFamily: "GontserratRegular",
            fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
          }}
        >
          {row.fee}
        </TableCell>
        <TableCell
          width="10%"
          align="left"
          sx={{
            fontWeight: 400,
            lineHeight: "17px",
            color: `${theme.palette.black.main}`,
            fontFamily: "GontserratRegular",
            fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
          }}
        >
          {row.staffType}
        </TableCell>

        <TableCell
          width="10%"
          align="left"
          sx={{
            fontWeight: 400,
            lineHeight: "17px",
            color: `${theme.palette.black.main}`,
            fontFamily: "GontserratRegular",
            fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
          }}
        >
          {row.timing}
        </TableCell>
        <TableCell
          width="10%"
          align="left"
          sx={{
            fontWeight: 400,
            lineHeight: "17px",
            color: `${theme.palette.black.main}`,
            fontFamily: "GontserratRegular",
            fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
          }}
        >
          {row.phone}
        </TableCell>

        <TableCell width="30%" align="left">
          <Box sx={{ display: "flex" }}>
            <MDButton
              sx={{
                width: { xs: "57px!important" },
                height: { xs: "32px!important" },
                color: `${theme.palette.primary.main}`,
                fontSize: { xs: "1rem", md: "1.2rem", lg: "1.5rem" },
              }}
              onClick={async () => {
                await setOpen(!open);
                await setSelectedRow(row);
                await openDropdown(row);
              }}
            >{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              Edit
            </MDButton>
            <MDButton
              sx={{
                width: { xs: "57px!important" },
                height: { xs: "32px!important" },
                color: `${theme.palette.primary.main}`,
                background: `${theme.palette.mintcream.main}`,
                ml: 2,
              }}
              onClick={() => { handleDelete(row) }}
            >
              <DeleteOutlineIcon
                sx={{
                  fontSize: { xs: "1.8rem", lg: "2rem" },
                }}
              />
            </MDButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={12}
          sx={{
            background: `${theme.palette.mintcream.main}`,
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>

            <Grid container spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { xs: 1, md: 2 },
                mb: { xs: 2, md: 4 }
              }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    ml: 2,
                  }}
                >
                  Name
                </MDHeadingSub>
                <MDTextField placeholder="Name" name="staffName"
                  value={staffName}
                  onChange={(e) => {
                    setStaffName(e.target.value)
                  }}
                />

              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    ml: 2,
                  }}
                >
                  Specialization
                </MDHeadingSub>
                <MDTextField placeholder="Specialization" name="specialization"
                  value={specialization}
                  onChange={(e) => {
                    setSpecialization(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    ml: 2,
                  }}
                >
                  Fee
                </MDHeadingSub>
                <MDTextField placeholder="500" name="fee" type="number"
                  value={fee}
                  onChange={(e) => {
                    setFee(e.target.value)
                  }}
                />           </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  onChange={handleStaff}
                  exclusive
                  aria-label="Platform"
                  sx={{
                    background: "#F5F5F5",
                    border: "none",
                    borderRadius: "50px",
                    width: "100%",
                  }}
                >
                  <MDToggleButton value="Receptionist">Recep</MDToggleButton>
                  <MDToggleButton value="Doctor">Doctor</MDToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    ml: 2,
                  }}
                >
                  Phone
                </MDHeadingSub>
                <MDTextField placeholder="Phone" type="number" name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                />

              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    ml: 2,
                  }}
                >
                  Timing
                </MDHeadingSub>
                <MDTextField type="time" placeholder="Timing" name="timing"
                  value={timing}
                  onChange={(e) => {
                    setTiming(e.target.value)
                  }}
                />

              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={1}>
                <MDButton sx={{ width: { xs: "100%", lg: "80px!important" } }} >Update</MDButton>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    sr: PropTypes.string.isRequired,
    nameq: PropTypes.string.isRequired,
    mac_address: PropTypes.number.isRequired,
  }).isRequired,
};

export default function HospitalStaffCollapsibleTable(props) {
  const { rows, headerCells } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("sr");
  const [newRows, setNewRows] = React.useState([]);

  const [rowsPerPage, setRowsPerPage] = React.useState(props.pagelength);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    props.setPageNo(newPage);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <StaffEnhancedTableHead
            {...props}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={newRows?.length}
            headerCells={headerCells}
          />
          <TableBody>
            {rows &&
              stableSort(rows, getComparator(order, orderBy))?.map(
                (row, index) => (
                  <Row {...props} key={row.name + index} row={row} />
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      {props.hidePagination ? null : (
        <Stack direction="row-reverse" sx={{ p: 3, justifyContent: "center" }}>
          <FormControl
            size="small"
            fullWidth={false}
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
          >
            <SelectBox
              {...props}
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(e.target.value);
                props.setpagelength(e.target.value);
                if (
                  props.pageNo >=
                  Math.ceil(
                    props.totalElements / Number.parseInt(e.target.value)
                  )
                ) {
                  props.setPageNo(1);
                }
                window.localStorage.setItem(
                  "DTTable_Pagination_Rows",
                  e.target.value
                );
              }}
              IconComponent={(props) => <ExpandMoreIcon {...props} />}
              MenuProps={{
                sx: {
                  "&& .MuiList-root": {
                    backgroundColor: "#FFF",
                    fontSize: "14px",
                    color: "#6D7A83",
                  },
                  "&& .MuiMenuItem-root:hover": {
                    backgroundColor: "#AFDECC",
                  },
                  "&& .MuiMenuItem-root": {
                    fontSize: "12px",
                    padding: "8px",
                  },
                  "&& .Mui-selected": {
                    backgroundColor: "#AFDECC",
                    color: "#6D7A83",
                    fontSize: "14px",
                  },
                },
              }}
            >
              {[{ value: "5" }, { value: "10" }, { value: "25" }].map(
                (item) => (
                  <MenuItem value={item.value}>
                    {item.value} / per page
                  </MenuItem>
                )
              )}
            </SelectBox>
          </FormControl>
          <Pagination
            sx={{
              "& ul > li > button": {
                borderRadius: "50%",
                borderColor: theme.palette.primary.main,
              },
              "& ul > li > button:not(.Mui-selected)": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.white.main,
                border: "none"

              },
              "& ul > li > .Mui-selected": {
                color: theme.palette.white.main,
                backgroundColor: theme.palette.primary.main,
              },
            }}
            count={Math.ceil(props.totalElements / rowsPerPage)}
            page={props.pageNo}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}
    </>
  );
}

HospitalStaffCollapsibleTable.defaultProps = {
  pageNo: 1,
  pagelength: window.localStorage.getItem("DTTable_Pagination_Rows"),
};
