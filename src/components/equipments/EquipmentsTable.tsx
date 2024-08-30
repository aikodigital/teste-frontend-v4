import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IEquipment } from "../../models/Equipment";
import { useMediaQuery } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EquipmentTable = ({ equipments }: { equipments: IEquipment[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: isMobile ? "100%" : 650,
          maxWidth: 950,
          tableLayout: "fixed",
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell
              align={isMobile ? "center" : "left"}
              sx={{ fontWeight: "bold" }}
            >
              Id
            </StyledTableCell>
            <StyledTableCell
              align={isMobile ? "center" : "right"}
              sx={{ fontWeight: "bold" }}
            >
              Nome
            </StyledTableCell>
            <StyledTableCell
              align={isMobile ? "center" : "right"}
              sx={{ fontWeight: "bold" }}
            >
              Model Id
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((equipment) => (
            <StyledTableRow
              key={equipment.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {equipment.id}
              </StyledTableCell>
              <StyledTableCell align="right">{equipment.name}</StyledTableCell>
              <StyledTableCell align="right">
                {equipment.equipmentModelId}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EquipmentTable;
