import PropTypes from "prop-types";
import { TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Checkbox, Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import theme from "../../../assets/Theme";

function StaffEnhancedTableHead(props) {
    const {order, orderBy, rowCount, onRequestSort, headerCells } = props;

    console.log("this is th eheader cell>>>>>>>",headerCells)

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead
            sx={{
                width: "100%",
                "& .MuiTableCell-root": {
                    // borderRight: `1px solid ${theme.palette.primary.border_color}`,
                    // borderTop: `1px solid ${theme.palette.primary.border_color}`,

                    "&:last-child": {
                        borderRight: "none",
                    },
                    fontSize: { xs: "12px", sm: "14px", md: "14px", xl: "20px" },
                    minHeight: "34px",
                    color: `${theme.palette.primary.main}`,
                    fontFamily: "GontserratRegular",
                    fontWeight: 500
                },
            }}
        >
            <TableRow>
                {headerCells.map((headCell) => (
                    <TableCell key={headCell.id} align={headCell.numeric ? "center" : "left"} padding={headCell.disablePadding ? "none" : "normal"} sortDirection={orderBy === headCell.id ? order : false} sx={{ background: "#FFF", width: headCell.width }}>
                        {(headCell?.label == "Actions" || headCell?.label == "Status") ? headCell.label :  <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                            <span></span>
                        </TableSortLabel>}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

StaffEnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default StaffEnhancedTableHead;
