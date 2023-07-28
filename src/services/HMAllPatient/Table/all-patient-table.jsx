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
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    age: "common flue",
    mr: "36502-1234567-1",
  },
  {
    id: 2,
    name: "Lannister",
    parent: "Cersei",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    age: "common flue",
    mr: "36502-1234567-1",
  },
  {
    id: 3,
    name: "Lannister",
    parent: "Jaime",
    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    age: "common flue",
    mr: "36502-1234567-1",
  },
  {
    id: 4,
    name: "Stark",
    parent: "Arya",
    age: "common flue",

    des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  
  },
];

const columns = [
  // { field: "id", headerName: "Sr#", width: 80 },
  {
    field: "name",
    Date: "Name",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "parent",
    headerName: "Doctor",
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "age",
    headerName: "Diagonosis",
    editable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    field: "des",
    headerName: "Description",
    width: 400,
    editable: true,
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
              height: { xs: "32px!important" },
              color: `${theme.palette.primary.main}`,
              fontSize: { xs: "1rem", md: "1.2rem", lg: "1.5rem" },
              width:"125px!important"
            }}
          >
            View More
          </MDButton>
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

function AllPatientTable() {
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
            //     height: "900px",
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
            // "& .MuiDataGrid-row":{
            //   minHeight:"70px!important"
            // },
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
            "& .MuiDataGrid-columnHeaders": {
              // background:`${theme.palette.mintcream.main}`
            },
         
            "& .MuiDataGrid-cell": {
              fontWeight: 400,
              lineHeight: "17px",
              color: `${theme.palette.black.main}`,
              fontFamily: "GontserratRegular",
              fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
            },
         
            "& .MuiDataGrid-footerContainer ": {
              border: "none",
              justifyContent: "center",
            },
            "& .MuiPagination-ul li:first-child button>svg ": {
            },
            "& .MuiPagination-ul li:first-child button::before": {},
          }}
        />
      </Box>
    </StyledEngineProvider>
  );
}
// css-17jjc08-MuiDataGrid-footerContainer

export default AllPatientTable;
