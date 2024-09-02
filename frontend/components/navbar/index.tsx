import React from 'react';
import {    Container, Group, Button, Box, Text } from '@mantine/core';
import Link from 'next/link';

export default function Navbar() {
  return (
    <Box component="nav" style={{ padding: '10px 20px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#1a1a1a' }}>
      <Group  >
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Text style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>
            GeoTrack Dashboard
          </Text>
        </Link>
        <Group>
          <Link href="/" passHref  style={{ textDecoration: 'none' }}>
            <Text  style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>
                Dashboard
            </Text>
          </Link> 
          <Link href="/faq" passHref  style={{ textDecoration: 'none' }}>
            <Text   style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>
              FAQ
            </Text>
          </Link>
          {/* <Link href="/contact" passHref  style={{ textDecoration: 'none' }}>
            <Text style={{ color: '#fff', textDecoration: 'none' }}>
              Contato
            </Text>
          </Link> */}
        </Group>
      </Group>
    </Box>
  );
}
