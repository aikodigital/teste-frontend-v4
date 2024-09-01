import { Card as CardComponent, Flex, Space, Tag, Typography } from 'antd';
import { Equipment } from '@/lib/types/equipment';

const { Title, Text } = Typography;

interface CardInterface {
  equipment: Equipment;
}

export function Card({ equipment }: CardInterface) {
  return (
    <CardComponent
      hoverable
      title={<>
        <Title level={4} style={{margin: '0'}}>{equipment.name}</Title>
        {equipment.currentState.date &&
            <Text>{new Date(equipment.currentState.date).toLocaleString('pt-BR')}</Text>}
      </>}
    >
      <Tag color={equipment.currentState.color}>
        {equipment.currentState.name}
      </Tag>
      <p>{equipment.model.name}</p>
    </CardComponent>
  )
}