import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Container estilizado para centralizar o conteúdo
export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  height: "80vh",
  padding: theme.spacing(3),
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(2),
  textTransform: "uppercase",
  letterSpacing: "0.1rem",
}));
