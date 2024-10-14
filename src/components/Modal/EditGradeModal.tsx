import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import GenericModal from './GenericModal';
import { Nota } from '../../types';
import axios from 'axios';
import { useStudent } from '../../contexts/StudentContext';

interface EditGradeModalProps {
    grade: Nota;
    classroomId: number;
}

const EditGradeModal: React.FC<EditGradeModalProps> = ({ grade, classroomId }) => {
    const { buscarStudents } = useStudent();
    const [notaValue, setNotaValue] = useState<number>(grade.grade);
    const [frequency, setFrequencia] = useState<number>(grade.frequency);
    const [openNotaModal, setOpenNotaModal] = useState(false);

    const handleOpenNotaModal = () => setOpenNotaModal(true);
    const handleCloseNotaModal = () => {
        setOpenNotaModal(false);
        resetForm();
    };

    const resetForm = () => {
        setNotaValue(grade.grade);
        setFrequencia(grade.frequency);
    };

    const handleSubmitNota = async () => {
        try {
            await axios.post(
                `http://localhost:5000/api/classrooms/${classroomId}/students/${grade.studentId}/notas`,
                { nota: notaValue, frequencia: frequency }
            );
        } catch (error) {
            alert("Erro ao atualizar notas.");
        }
        buscarStudents(classroomId);
        handleCloseNotaModal();
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpenNotaModal}>
                Editar Notas
            </Button>

            <GenericModal
                open={openNotaModal}
                onClose={handleCloseNotaModal}
                onSubmit={handleSubmitNota}
                title="Editar Notas"
                submitText="Salvar"
            >
                <TextField
                    label="Nota"
                    fullWidth
                    type="number"
                    value={notaValue}
                    onChange={(e) => setNotaValue(Number(e.target.value))}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Frequência (%)"
                    fullWidth
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequencia(Number(e.target.value))}
                    sx={{ mb: 2 }}
                />
            </GenericModal>
        </>
    );
};

export default EditGradeModal;