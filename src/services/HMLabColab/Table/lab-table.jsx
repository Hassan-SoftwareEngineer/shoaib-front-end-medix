import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { StyledEngineProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MDButton from "../../../components/MDButton";
import theme from "../../../assets/Theme";
import MDBadge from "../../../components/MDBadge";
const rows = [
  {
    id: 1,
    name: "Snow",
    parent: "Jon",
    doctor:"Divs",
    age: "36502-1234567-1",
  
  },
  {
    id: 2,
    name: "Lannister",
    parent: "Cersei",
    doctor:"Divs",
    age: "36502-1234567-1",
  },
  {
    id: 3,
    name: "Lannister",
    parent: "Jaime",
    doctor:"Divs",
    age: "36502-1234567-1",
  },
  {
    id: 4,
    name: "Stark",
    parent: "Arya",
    doctor:"Divs",
    age: "36502-1234567-1",
  },
  {
    id: 5,
    name: "Targaryen",
    parent: "Daenerys",
    doctor:"Divs",
    age: "36502-1234567-1",
  },
  {
    id: 6,
    name: "Melisandre",
    parent: "asd",
    doctor:"Divs",
    age: "36502-1234567-1",
  },
  {
    id: 7,
    name: "Clifford",
    parent: "Ferrara",
    doctor:"Divs",
    age: "36502-1234567-1",
  },
  {
    id: 8,
    name: "Frances",
    parent: "Rossini",
    doctor:"Divs",
    age: "36502-1234567-1",
  },
  {
    id: 9,
    name: "Roxie",
    parent: "Harvey",
    doctor:"Divs",
    age: "36502-1234567-1",
  },
];

const columns = [
  { field: "id", headerName: "Sr#", width: 80 },
  {
    field: "name",
    headerName: "Test Name",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "parent",
    headerName: "Doctor",
    minWidth: 200,
    editable: true,
  },
  {
    field: "age",
    headerName: "MR#",
    editable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    field: "doctor",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
         <MDBadge sx={{padding:"0.8rem 3rem!important",display:"block"}}>Complete</MDBadge>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,

    renderCell: (params) => {
      const onClick = (e) => {
        const currentRow = params.row;
        return alert(JSON.stringify(currentRow, null, 4));
      };

      return (
        <Stack direction="row" spacing={2}>
          <MDButton
            sx={{
              width: { xs: "57px!important" },
              height: { xs: "32px!important" },
              color: `${theme.palette.primary.main}`,
              fontSize: { xs: "1rem", md: "1.2rem", lg: "1.5rem" },
            }}
          >
            Print
          </MDButton>
          <MDButton
            sx={{
              width: { xs: "57px!important" },
              height: { xs: "32px!important" },
              color: `${theme.palette.primary.main}`,
              background: `${theme.palette.mintcream.main}`,
              fontSize: { xs: "1rem", md: "1.2rem", lg: "1.5rem" },
            }}
          >
            View
          </MDButton>
          {/* <Button variant="outlined" color="warning" size="small" onClick={onClick}>Edit</Button>
                <Button variant="outlined" color="error" size="small" onClick={onClick}>Delete</Button> */}
        </Stack>
      );
    },
  },
];

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function LabTable() {
  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          pagination
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Pagination: CustomPagination,
          }}
          rows={rows}
          columns={columns}
          // checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(ids) => {
            console.log(ids);
          }}
          sx={{
            border: 0,
            color: "#757575",
            fontFamily: "GontserratRegular",
            WebkitFontSmoothing: "auto",
            letterSpacing: "normal",
            // "& .MuiDataGrid-row": {
            //     width: "1191px",
            //     height: "34px",
            //     background: "#FFFFFF",
            //     borderRadius: "27px",
            // },
            "& .MuiDataGrid-main": {
              borderRadius: `${theme.shape.primary}`,

              background: `${theme.palette.white.main}`,
            },
            "& .MuiDataGrid-iconSeparator": {
              display: "none",
            },
            // "& .MuiDataGrid-columnHeaders": {
            //     width: "1191px",
            //     minHeight: "34px",
            //     background: "#D5DFED",
            //     borderRadius: "20px",
            // },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
              minHeight: "34px",
              color: `${theme.palette.primary.main}`,
              fontFamily: "GontserratRegular",
            },
            // "& .MuiDataGrid-row.Mui-selected": {
            //     background: " #FFFFFF",
            //     border: "1px solid #73A0FF",
            //     borderRadius: " 27px",
            // },
            "& .MuiDataGrid-cell": {
              fontWeight: 400,
              lineHeight: "17px",
              color: `${theme.palette.black.main}`,
              fontFamily: "GontserratRegular",
              fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },

              // boxSizing: "none",
              // borderBottom: "none",
            },
            // "& .MuiPaginationItem-root": {
            //     borderRadius: 0,
            // },
            "& .MuiDataGrid-footerContainer ": {
              border: "none",
              justifyContent: "center",
            },
            "& .MuiPagination-ul li:first-child button>svg ": {
              // display: "none",
            },
            "& .MuiPagination-ul li:first-child button::before": {},
          }}
        />
      </Box>
    </StyledEngineProvider>
  );
}
// css-17jjc08-MuiDataGrid-footerContainer

export default LabTable;
