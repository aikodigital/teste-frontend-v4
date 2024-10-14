import React, { ReactNode } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    title: string;
    children: ReactNode;
    submitText?: string;
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
    borderRadius: 2,
};

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, onSubmit, title, children, submitText }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {children}
                </Box>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} sx={{ mr: 2 }} variant="outlined" color="error">
                        Cancelar
                    </Button>
                    {onSubmit && (
                        <Button onClick={onSubmit} variant="contained" color="primary">
                            {submitText || 'Salvar'}
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default GenericModal;