// src/components/Footer.tsx
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 4,
        mt: 'auto',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Georgia Rocha - Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
