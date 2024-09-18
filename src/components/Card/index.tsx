import { CardContent, Typography, Box, Card } from "@mui/material";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

type Props = {
  name?: string;
  totalValue: number;
  bg: string;
  children: React.ReactNode;
};

export const CardDetails = ({ name, totalValue, bg, children }: Props) => (
  <Card
    variant="elevation"
    elevation={12}
    sx={{
      display: "flex",
      minWidth: 350,
      flexWrap: "wrap",
      borderRadius: 2,
      ml: 5,
      backgroundColor: bg,
      margin: {
        xs: 1,
        sm: 1,
      },
    }}
  >
    <CardContent>
      <Box>
        <Box>{children}</Box>
        <Typography
          color="#fff"
          fontWeight={500}
          fontSize={20}
          fontFamily="sans-serif"
        >
          {name}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography color="#fff" fontSize={21}>
            {totalValue}R$
          </Typography>
          {totalValue > 0 ? (
            <TrendingUpOutlinedIcon
              color="success"
              fontSize="large"
              sx={{ ml: 1 }}
            />
          ) : (
            <TrendingDownOutlinedIcon
              color="error"
              fontSize="large"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);
//
