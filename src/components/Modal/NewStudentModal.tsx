import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import GenericModal from './GenericModal';
import { useStudent } from '../../contexts/StudentContext';
import { Student } from '../../types';

const NewStudentModal: React.FC = () => {
    const { criarStudent } = useStudent();
    const [novoStudent, setNovoStudent] = useState<Student>({ id: 0, image_url: '', name: '' });
    const [openStudentModal, setOpenStudentModal] = useState(false);

    const handleOpenStudentModal = () => setOpenStudentModal(true);
    const handleCloseStudentModal = () => {
        setOpenStudentModal(false);
        setNovoStudent({ id: 0, image_url: '', name: '' });
    };

    const handleSubmitNovoStudent = async () => {
        await criarStudent(novoStudent);
        handleCloseStudentModal();
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpenStudentModal}>
                Adicionar Aluno
            </Button>

            <GenericModal
                open={openStudentModal}
                onClose={handleCloseStudentModal}
                onSubmit={handleSubmitNovoStudent}
                title="Adicionar Aluno"
                submitText="Adicionar Aluno"
            >
                <TextField
                    label="Nome do Aluno"
                    fullWidth
                    value={novoStudent.name}
                    onChange={(e) => setNovoStudent({ ...novoStudent, name: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="URL da Imagem"
                    fullWidth
                    value={novoStudent.image_url}
                    onChange={(e) => setNovoStudent({ ...novoStudent, image_url: e.target.value })}
                    sx={{ mb: 2 }}
                />
            </GenericModal>
        </>
    );
};

export default NewStudentModal;