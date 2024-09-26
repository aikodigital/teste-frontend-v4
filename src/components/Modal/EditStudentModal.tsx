import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import GenericModal from './GenericModal';
import { Student } from '../../types';
import { useStudent } from '../../contexts/StudentContext';

interface EditStudentModalProps {
    student: Student;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ student }) => {
    const { editarStudent, removerStudent } = useStudent();
    const [name, setNome] = useState<string>(student.name);
    const [imageUrl, setImageUrl] = useState<string>(student.image_url);
    const [openEditStudentModal, setOpenEditStudentModal] = useState(false);

    const handleOpenEditStudentModal = () => setOpenEditStudentModal(true);
    const handleCloseEditStudentModal = () => {
        setOpenEditStudentModal(false);
        resetForm();
    };

    const resetForm = () => {
        setNome(student.name);
        setImageUrl(student.image_url);
    };

    const handleSubmitEditStudent = async () => {
        await editarStudent({ id: student.id, name, image_url: imageUrl });
        handleCloseEditStudentModal();
    };

    const handleRemoveStudent = async () => {
        if (student.id) {
            await removerStudent(student.id);
            handleCloseEditStudentModal();
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpenEditStudentModal}>
                Editar Aluno
            </Button>

            <GenericModal
                open={openEditStudentModal}
                onClose={handleCloseEditStudentModal}
                onSubmit={handleSubmitEditStudent}
                title="Editar Aluno"
                submitText="Salvar"
            >
                <TextField
                    label="Nome do Aluno"
                    fullWidth
                    value={name}
                    onChange={(e) => setNome(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="URL da Imagem"
                    fullWidth
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleRemoveStudent}
                    sx={{ mt: 2 }}
                >
                    Remover Aluno
                </Button>
            </GenericModal>
        </>
    );
};

export default EditStudentModal;