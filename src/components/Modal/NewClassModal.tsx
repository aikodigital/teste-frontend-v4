import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import GenericModal from './GenericModal';
import { useClassRoom } from '../../contexts/ClassroomContext';

const NewClassModal: React.FC = () => {
    const { criarClassRoom } = useClassRoom();
    const [novaClassRoom, setNovaClassRoom] = useState<{ id: number; name: string }>({ id: 0, name: '' });
    const [openClassRoomModal, setOpenClassRoomModal] = useState(false);

    const handleOpenClassRoomModal = () => setOpenClassRoomModal(true);
    const handleCloseClassRoomModal = () => {
        setOpenClassRoomModal(false);
        setNovaClassRoom({ id: 0, name: '' });
    };

    const handleSubmitNovaClassRoom = async () => {
        await criarClassRoom(novaClassRoom.name);
        handleCloseClassRoomModal();
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpenClassRoomModal}>
                Criar Nova Turma
            </Button>

            <GenericModal
                open={openClassRoomModal}
                onClose={handleCloseClassRoomModal}
                onSubmit={handleSubmitNovaClassRoom}
                title="Criar Nova Turma"
                submitText="Adicionar Turma"
            >
                <TextField
                    label="Nome da Turma"
                    fullWidth
                    value={novaClassRoom.name}
                    onChange={(e) => setNovaClassRoom({ ...novaClassRoom, name: e.target.value })}
                    sx={{ mb: 2 }}
                />
            </GenericModal>
        </>
    );
};

export default NewClassModal;
