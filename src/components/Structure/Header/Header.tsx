import React from 'react';
import { Typography, Container } from '@mui/material';

import './header.css';

const Header: React.FC = () => {
    return (
        <section className="header">
            <Container>
                <Typography variant="h5" gutterBottom>
                    Bem-vindo, Professor! Use esta plataforma para gerenciar suas classrooms e students.
                </Typography>
                <Typography variant="body1">
                    Clique em "Criar Nova Classroom" para adicionar uma classroom ou "Adicionar Student" para incluir um novo student na classroom selecionada.
                </Typography>
            </Container>
        </section>
    );
};

export default Header;
