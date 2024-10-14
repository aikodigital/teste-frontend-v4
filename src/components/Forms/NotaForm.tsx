import React, { useState } from 'react';
import { Nota } from '../../types';
import {
    TextField,
    Button,
    Modal,
    Box,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useStudent } from '../../contexts/StudentContext';

interface NotaFormProps {
    grade: Nota;
    classroomId: number;
    id: number;
    studentId: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const NotaForm: React.FC<NotaFormProps> = ({ grade, classroomId, id }) => {
    const { buscarStudents } = useStudent();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [notaValue, setNotaValue] = useState<number>(grade.grade);
    const [frequency, setFrequencia] = useState<number>(grade.frequency);

    const openEditModal = () => {
        setNotaValue(grade.grade);
        setFrequencia(grade.frequency);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const resetForm = () => {
        setNotaValue(0);
        setFrequencia(0);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/classrooms/${classroomId}/students/${grade.studentId}/notas`, {
                grade: notaValue,
                frequency,
            });
            alert(response.data.message);
        } catch (error) {
            alert("Erro ao atualizar notas.");
        }
        buscarStudents(classroomId);
        closeModal();
    };

    return (
        <>
            <Button
                variant="contained"
                color="warning"
                onClick={openEditModal}
                sx={{ mr: 1 }}
            >
                Editar Notas
            </Button>

            {/* Modal para editar notas do student */}
            <Modal open={showModal} onClose={closeModal}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Editar Notas
                    </Typography>
                    <Box component="form" sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nota"
                            type="number"
                            value={notaValue}
                            onChange={(e) => setNotaValue(Number(e.target.value))}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Frequência (%)"
                            type="number"
                            value={frequency}
                            onChange={(e) => setFrequencia(Number(e.target.value))}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ mt: 2 }}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default NotaForm;
