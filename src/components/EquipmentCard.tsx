import { Card, CardContent, Avatar, Typography } from '@mui/material';
import { EquipmentDetail } from '../types/equipment';
import { getStatusIcon } from '../utils/statusIcon';

type EquipmentCardProps = {
  equipment: EquipmentDetail;
};

const EquipmentCard = ({ equipment }: EquipmentCardProps) => {  
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        boxShadow: 2,
        borderRadius: 2,
        p: 1,
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: 'transparent',
          mr: 2,
        }}
      >
        {getStatusIcon(equipment.currentState.name)}
      </Avatar>
      <CardContent sx={{ padding: '8px 0' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {equipment.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Modelo: {equipment.model.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estado atual: {equipment.currentState.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Produtividade: {equipment.productivity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ganho por equipamento: {equipment.earnings}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
