'use client';
import { useContext } from "react";
import { Layout } from "antd";
import Link from 'next/link';
import Image from 'next/image';
import { EquipmentContext } from "@/lib/contexts/equipment";
import { Map } from '@/app/components/map';
import { Sidebar } from "@/app/components/sidebar";
import { Equipment } from "@/lib/types/equipment";
import styles from "@/app/page.module.scss";
import logo from '@/app/assets/img/aiko.png';

const { Sider, Header, Content } = Layout;

interface DetailsInterface {
  params: {
    id: string;
  }
}

export default function Details({ params: { id } }: DetailsInterface) {
  const context = useContext(EquipmentContext);
  const currentEquipment: Equipment = context.find((eq) => eq.id === id) as Equipment;

  return (
    <EquipmentContext.Provider value={context}>
      <Layout style={{ minHeight: '100vh' }} className="mainLayout">
        <Header style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Link href={'/'} style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Image src={logo} alt="Aiko Digital" width={90} />
          </Link>
        </Header>
        <Layout>
          <Sider width={300} theme="light" className={styles.sidebar}>
            <Sidebar currentEquipment={currentEquipment} />
          </Sider>
          <Content>
            <Map currentEquipment={Array(currentEquipment)} />
          </Content>
        </Layout>
      </Layout>
    </EquipmentContext.Provider>
  )
}