import {
  CheckCircle,
  PauseCircle,
  BuildCircle,
} from '@mui/icons-material';
import { ReactElement } from 'react';

export const getStatusIcon = (status: string): ReactElement | null => {
  switch (status.toLowerCase()) {
    case 'operando':
      return <CheckCircle color="success" />;
    case 'parado':
      return <PauseCircle sx={{ color: 'red' }} />;
    case 'manutenção':
      return <BuildCircle sx={{ color: 'orange' }} />;
    default:
      return null;
  }
};

