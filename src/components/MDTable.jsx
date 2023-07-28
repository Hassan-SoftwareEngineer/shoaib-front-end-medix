import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { StyledEngineProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import theme from "../assets/Theme";
import MDButton from "./MDButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const rows = [
    { id: 1, name: "Snow", parent: "Jon", age: "35/male",doctor:"Arya Start",nic:"36502-1234567-1"},
    { id: 2, name: "Lannister", parent: "Cersei", age: "42/female" ,doctor:"Arya Start",nic:"36502-1234567-1"},
    { id: 3, name: "Lannister", parent: "Jaime", age: "45/male" ,doctor:"Arya Start",nic:"36502-1234567-1"},
    { id: 4, name: "Stark", parent: "Arya", age: "16/male" ,doctor:"Arya Start",nic:"36502-1234567-1"},
    { id: 5, name: "Targaryen", parent: "Daenerys", age: "21/female" ,doctor:"Arya Start",nic:"36502-1234567-1"},
    { id: 6, name: "Melisandre", parent: "asd", age: "50/female" ,doctor:"Arya Start",nic:"36502-1234567-1"},
    { id: 7, name: "Clifford", parent: "Ferrara", age: "44/male" ,doctor:"Arya Start",nic:"36502-1234567-1"},
    { id: 8, name: "Frances", parent: "Rossini", age: "36/female" ,doctor:"Arya Start",nic:"36502-1234567-1"},
    { id: 9, name: "Roxie", parent: "Harvey", age: "65/male" ,doctor:"Arya Start",nic:"36502-1234567-1"},
];


const columns = [
    { field: "id", headerName: "Sr#", width: 80 },
    {
        field: "name",
        headerName: "Name",
        minWidth: 200,
        flex:1,
        editable: true,
    },
    {
        field: "parent",
        headerName: "Parent Name",
        minWidth: 200,
        flex:1,
        editable: true,
    },
    {
        field: "age",
        headerName: "Age/Sex",
        editable: true,
        width: 200,
        minWidth: 50,
    },
    {
        field: "doctor",
        headerName: "Doctor",
        width: 200,
        editable: true,


        // description: "This column has a value getter and is not sortable.",
        // sortable: false,
        // minWidth: 150,
        // valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
        field: "nic",
        headerName: "NIC",
        width: 200,
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
          width: {  xs: "57px!important" },
          height: {  xs: "32px!important" },
          color: `${theme.palette.primary.main}`,
          fontSize:{xs:"1rem",md:"1.2rem",lg:"1.5rem"}
        }}
      >
        View
      </MDButton>
      <MDButton
        sx={{
          width: {  xs: "57px!important" },
          height: {  xs: "32px!important" },
          color: `${theme.palette.primary.main}`,
          background: `${theme.palette.mintcream.main}`,
        }}
      >
  <DeleteOutlineIcon sx={{
          fontSize:{xs:"1.8rem",lg:"2rem"}
  }}/>
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


    return <Pagination color="primary"  count={pageCount} page={page + 1} onChange={(event, value) => apiRef.current.setPage(value - 1)} />;
}


function MDTable() {
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
                        "& .MuiDataGrid-main":{
                        borderRadius:`${theme.shape.primary}`,

                            background:`${theme.palette.white.main}`,
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
                            fontSize: {xs:"12px",sm:"14px",md:"14px",xl:"20px"},
                            minHeight: "34px",
                            color:`${theme.palette.primary.main}`,
                            fontFamily:"GontserratRegular"
                        },
                        // "& .MuiDataGrid-row.Mui-selected": {
                        //     background: " #FFFFFF",
                        //     border: "1px solid #73A0FF",
                        //     borderRadius: " 27px",
                        // },
                        "& .MuiDataGrid-cell": {
                            fontWeight: 400,
                            lineHeight: "17px",
                            color:`${theme.palette.black.main}`,
                            fontFamily:"GontserratRegular",
                            fontSize: {xs:"12px",sm:"14px",md:"14px",xl:"20px"},


                            // boxSizing: "none",
                            // borderBottom: "none",
                        },
                        // "& .MuiPaginationItem-root": {
                        //     borderRadius: 0,
                        // },
                        "& .MuiDataGrid-footerContainer ":{
                            border:"none",
                            justifyContent:"center"
                        },
                        "& .MuiPagination-ul li:first-child button>svg ":{
                            // display: "none",
                        },
                        "& .MuiPagination-ul li:first-child button::before":{
                        }
                    }}
                />
            </Box>
            </StyledEngineProvider>
       
    );
}
// css-17jjc08-MuiDataGrid-footerContainer


export default MDTable