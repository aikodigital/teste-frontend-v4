import React, { useState } from 'react';
import { Typography, Button, Modal, Box, Container, Grid, TextField } from '@mui/material';
import StatisticCards from '../components/Structure/StatisticsCards';
import { Student } from '../types';
import { useClassRoom } from '../contexts/ClassroomContext';
import { useStudent } from '../contexts/StudentContext';
import ClassRoomList from '../components/List/ClassRoomList';
import NewClassModal from '../components/Modal/NewClassModal';
import NewStudentModal from '../components/Modal/NewStudentModal';

const Homepage: React.FC = () => {
    const { criarStudent } = useStudent();
    const { criarClassRoom } = useClassRoom();

    const [openClassRoomModal, setOpenClassRoomModal] = useState(false);
    const [openStudentModal, setOpenStudentModal] = useState(false);
    const [novoStudent, setNovoStudent] = useState<Student>({ id: 0, image_url: '', name: '' });
    const [novaClassRoom, setNovaClassRoom] = useState<{ id: number; name: string }>({ id: 0, name: '' });

    const handleOpenClassRoomModal = () => setOpenClassRoomModal(true);
    const handleCloseClassRoomModal = () => {
        setOpenClassRoomModal(false);
        setNovaClassRoom({ id: 0, name: '' });
    };

    const handleOpenStudentModal = () => setOpenStudentModal(true);
    const handleCloseStudentModal = () => {
        setOpenStudentModal(false);
        setNovoStudent({ id: 0, image_url: '', name: '' });
    };

    const handleSubmitNovoStudent = async () => {
        await criarStudent(novoStudent);
        handleCloseStudentModal();
    };

    const handleSubmitNovaClassRoom = async () => {
        await criarClassRoom(novaClassRoom.name); // Assumindo que você tenha uma função criarClassRoom no contexto
        handleCloseClassRoomModal();
    };

    return (
        <>
            {/* Header */}
            <Container component="header" sx={{ bgcolor: '#7a7abc', color: '#F0F0F0', p: 2, borderRadius: 2, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Bem-vindo, Professor Carlos! Use esta plataforma para gerenciar suas classrooms e students.
                </Typography>
                <Typography variant="body1">
                    Além de lançar notas e presenças, você também pode incluir novos students ou classrooms.
                </Typography>
            </Container>

            {/* Resumo Geral das ClassRooms */}
            <Container id='resumo' sx={{ mb: 4 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Resumo Geral das Turmas
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <NewClassModal />
                        </Grid>
                        <Grid item>
                            <NewStudentModal />
                        </Grid>
                    </Grid>
                </Box>
                <StatisticCards />
            </Container>

            <Container id="lista-classrooms">
                <ClassRoomList />
            </Container>
        </>
    );
};

export default Homepage;
