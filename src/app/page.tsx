'use client'
import { useContext } from "react";
import { Layout } from "antd";
import Link from 'next/link';
import Image from 'next/image';
import { Sidebar } from '@/app/components/sidebar';
import { Map } from '@/app/components/map';
import { EquipmentContext } from "@/lib/contexts/equipment";
import styles from "@/app/page.module.scss";
import logo from '@/app/assets/img/aiko.png';

const { Sider, Header, Content } = Layout;

export default function Home() {
  const context = useContext(EquipmentContext);
  return (
    <EquipmentContext.Provider value={context}>
      <Layout style={{ minHeight: '100vh' }}>
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
          <Sider width={300} theme="light" className={styles.sidebar} style={{ padding: '16px 8px' }}>
            <Sidebar />
          </Sider>
          <Content>
            <Map currentEquipment={context} />
          </Content>
        </Layout>
      </Layout>
    </EquipmentContext.Provider>
  );
}
