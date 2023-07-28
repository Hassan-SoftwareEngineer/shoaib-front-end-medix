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
import IndoorEnhancedTableHead from "./IndoorEnhancedTableHead";
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
import { useParams } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "../../../assets/Theme";
import MDButton from "../../../components/MDButton";
import MDTextField from "../../../components/MDTextField";
import MDContainer from "../../../components/MDContainer";
import MDToggleButton from "../../../components/MDToggleButton";
import MDHeadingSub from "../../../components/MDHeadingSub";
import { UpdatePatient } from "../indoorAPi/ipdReducer";
import Swal from 'sweetalert2'
import { GetOPDPatient } from "../../HMOpd/OpdAPi/opdReducer";
import apiInstance from "../../../Api/axios";
import { GetAllDoctor, GetPatient } from "../../hospitalsettingStap/hospitalApi/hospitalApiSlice";

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
  const allDoctor = useSelector((state) => state?.hospital?.allDoctor);

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState("");
  const [alignment, setAlignment] = React.useState("M");

  const [patientName, setPatientName] = useState();
  const [fatherName, setFatherName] = useState();
  const [age, setAge] = useState();

  const [doctor, setDoctor] = useState();
  const [mr, setMr] = useState();
  const [admisiionDate, setAdmisiionDate] = useState();
  const [dischargeDate, setDischargeDate] = useState();


  const openDropdown = async (row) => {
   
    setDoctor(row?.allData?.staffEntities[0]?.id)
    setPatientName(row?.patientName);
    setFatherName(row?.fatherName);
    setAge(row?.age);
    setAlignment(row?.sex);
    setMr(row?.mr)
    setAdmisiionDate(row?.allData?.admittedOn)
    setDischargeDate(row?.allData?.dischargedOn)
  };

  const handleStaff = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [selectedDoctor, setSelectedDoctor] = useState();


  useEffect(()=>{
    dispatch(GetAllDoctor())

  },[])
  const handleDelete = (row) => {
    const user = localStorage.getItem("user")

    Swal.fire({
      title: 'Are you sure?',
      text: `You want to Delete ${row?.patientName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        await apiInstance.delete(`/patient/${row?.id}?username=${user}`)
        await dispatch(GetPatient({page:1,pageSize:5}));
        toast.success(`${row?.patientName} Deleted!`)
      }
    })

  };
  const handleDoctor = (event) => {
    setDoctor(event.target.value);
  };


  const handleUpdate = async (row) => {
    const body = {
      age: age,
      fatherName: fatherName,
      gender: alignment,
      patientName: patientName,
      patientType: "ipd",
      discharged: dischargeDate,
      admittedOn: admisiionDate,
      mrNumber: mr,
      staffEntities: [selectedDoctor ? selectedDoctor : row?.staffEntities && row?.staffEntities[0]],
    };
    await dispatch(UpdatePatient({ body: body, id: row?.id }));
    await setOpen(!open);
    await dispatch(GetPatient({page:1,pageSize:5}));
    ;
  };

  useEffect(() => {
    setPatientName(selectedRow?.patientName);
    setFatherName(selectedRow?.fatherName);
    setAge(selectedRow?.age);
    setAlignment(selectedRow?.sex);
  }, [selectedRow]);


  console.log("<<<<<<<<<<<<<<",doctor)

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
          {row.patientName}
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
          {row.fatherName}
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
          {row.gender}
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
          {row.patientType}
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
          {row.mr}
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
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    ml: 2,
                  }}
                >
                  Name
                </MDHeadingSub>
                <MDTextField
                 value={patientName}
                 name="patientName"
                 onChange={(e) => {
                   setPatientName(e.target.value);
                 }}

                />

              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    ml: 2,
                  }}
                >
                  Father Name
                </MDHeadingSub>
                <MDTextField
                  placeholder="Father Name"
                  name="fatherName"
                  value={fatherName}
                  onChange={(e) => {
                    setFatherName(e.target.value);
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
                  Age
                </MDHeadingSub>
                <MDTextField
                  placeholder="Age"
                  name="age"
                  type="number"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
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
                  Sex
                </MDHeadingSub>
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
                  <MDToggleButton value="M">Male</MDToggleButton>
                  <MDToggleButton value="F">Female</MDToggleButton>
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
                  Doctor
                </MDHeadingSub>
              <Select
          value={parseInt(doctor)}
          defaultValue={parseInt(doctor)}
          onChange={handleDoctor}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            width:"100%",
            fontFamily: theme.fonts.primary,
            color:theme.palette.black.main,
            border: `2px solid transparent`,
            letterSpacing: "1px",
            fontSize: "1.6rem",
            boxShadow: "none",
            background:"#fff",
            borderRadius:"50px",
            "& .MuiSelect-outlined": {
              padding: "10px"
            },
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
              "&.MuiOutlinedInput-root:active .MuiOutlinedInput-notchedOutline":
              {
                border: `2px solid ${theme.palette.primary.main}`,

              },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
          }}

        >
          <MenuItem value="-1">
            <em>Select Doctor</em>
          </MenuItem>
          {
            allDoctor && allDoctor?.doctors?.length != 0 && allDoctor?.doctors?.map((item)=>{
              return(
                <MenuItem value={parseInt(item?.id)} onClick={()=>{setSelectedDoctor(item)}}>{`${item?.staffName}/${item?.specialization}`}</MenuItem>
              )
            })
          }
         
        </Select>

              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    ml: 2,
                  }}
                >
                  MR#
                </MDHeadingSub>
                <MDTextField
                  placeholder="MR#"
                  name="mr"
                  type="number"
                  value={mr}
                  onChange={(e) => {
                    setMr(e.target.value);
                  }}
                />

              </Grid>
              <Grid item xs={12} sm={6} lg={3} xl={2}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Date of admission
                </MDHeadingSub>
              </Grid>
              <Grid item xs={12} sm={6} lg={3} xl={3}>
                <MDTextField
                  name="admission"
                  type="date"
                  value={admisiionDate}
                  onChange={(e) => {
                    setAdmisiionDate(e.target.value);
                  }}

                />

              </Grid>
              <Grid item xs={12} sm={6} lg={3} xl={2}>
                <MDHeadingSub
                  sx={{
                    color: `${theme.palette.primary.main}`,
                    fontSize: { md: "1.8rem" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Date of Discharge
                </MDHeadingSub>
              </Grid>
              <Grid item xs={12} sm={6} lg={3} xl={3}>
                <MDTextField
                  type="date"
                  name="discharge"
                  value={dischargeDate}
                  onChange={(e) => {
                    setDischargeDate(e.target.value);
                  }}

                />

              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                <MDButton
                  sx={{
                    width: { xs: "100%", lg: "80px!important" },
                  }}
                  onClick={()=>{handleUpdate(row)}}
                >
                  Update
                </MDButton>
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

export default function IpdCollapsibleTable(props) {
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
          <IndoorEnhancedTableHead
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

IpdCollapsibleTable.defaultProps = {
  pageNo: 1,
  pagelength: window.localStorage.getItem("DTTable_Pagination_Rows"),
};
