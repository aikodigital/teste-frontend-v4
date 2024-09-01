import Link from 'next/link';
import { useContext } from 'react';
import { Divider, Space, Tag, Timeline, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { EquipmentContext } from '@/lib/contexts/equipment';
import { Equipment, EquipmentState } from '@/lib/types/equipment';
import { Card } from './components/card';
import styles from './sidebar.module.scss';

const { Title } = Typography;

interface SidebarInterface {
  currentEquipment?: Equipment;
}

export function Sidebar({ currentEquipment }: SidebarInterface) {
  const context = useContext(EquipmentContext);
  console.log(currentEquipment, 'currentEquipment?.stateHistory >>>>')

  const timelineItems = currentEquipment?.stateHistory.toReversed().slice(1).map((state, i) => ({
    color: state.color,
    children: (<>
      <div key={i}>
        <Tag color={state.color}>
          {state.name}
        </Tag>
        {state.date && (
          <p suppressHydrationWarning>{new Date(state.date).toLocaleString('pt-BR')}</p>
        )}
      </div>
    </>)
  }))

  if (currentEquipment) {
    return (
      <>
        <Link href={'/'} className={styles.returnLink}><LeftOutlined />Voltar</Link>
        <div className={styles.details}>
          <div className={styles.detailsHeader}>
            <Title level={3}>{currentEquipment.name}</Title>
            <p>{currentEquipment.model.name}</p>
            <div className={styles.detailsSpacer}>
              {currentEquipment.currentState.date &&
                <p style={{ marginBottom: '8px' }}>
                  {new Date(currentEquipment.currentState.date).toLocaleString('pt-BR')}
                </p>}
            </div>
            <div className={styles.detailsSpacer}>
              <Tag color={currentEquipment.currentState.color}>
                {currentEquipment.currentState.name}
              </Tag>
            </div>
          </div>

          <Divider />
          <Title level={4}>Histórico</Title>
          <Timeline
            items={timelineItems}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <Space direction="vertical" size={16} style={{ display: 'flex' }}>
        {context?.map((equipment) =>
          <Link href={`/details/${equipment.id}`} key={equipment.id}>
            <Card equipment={equipment} key={equipment.id} />
          </Link>
        )}
      </Space>
    </>
  )
};