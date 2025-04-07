import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { getStatusIcon } from '../utils/statusIcon';

type EquipmentStateCardProps = {
  stateName: string;
  date: string;
};

const EquipmentStateCard = ({ stateName, date }: EquipmentStateCardProps) => {
  return (
    <Card variant="outlined" sx={{ boxShadow: 1, borderRadius: 2 }}>
      <CardHeader
        avatar={getStatusIcon(stateName)}
        title={stateName}
        subheader={new Date(date).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Nenhuma observação adicional.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EquipmentStateCard;
