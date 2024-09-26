import React, { useState } from "react";
import { useClassRoom } from "../../contexts/ClassroomContext";
import {
    Tabs,
    Tab,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStatistics } from "../../contexts/StatisticsContext";
import GradedStudentList from "./GradedStudentList";

interface ClassRoomListProps { }

const ClassRoomList: React.FC<ClassRoomListProps> = () => {
    const { classrooms, criarClassRoom, editarClassRoom, removerClassRoom } = useClassRoom();
    const { values } = useStatistics();
    const [novaClassRoom, setNovaClassRoom] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [classroomEdit, setClassRoomEdit] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditMode(false);
        setClassRoomEdit(null);
        setNovaClassRoom("");
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, classroomId: number) => {
        setAnchorEl(event.currentTarget);
        setClassRoomEdit(classroomId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleEditClassRoom = () => {
        const classroom = classrooms.find(t => t.id === classroomEdit);
        if (classroom) {
            setNovaClassRoom(classroom.name);
            setEditMode(true);
            setOpenModal(true);
        }
        handleCloseMenu();
    };

    const handleDeleteClassRoom = () => {
        if (classroomEdit) {
            removerClassRoom(classroomEdit);
            if (activeTab === classrooms.length - 1) {
                setActiveTab(activeTab - 1);
            }
        }
        handleCloseMenu();
    };

    const handleSubmit = () => {
        if (editMode && classroomEdit) {
            editarClassRoom(classroomEdit, novaClassRoom);
        } else {
            criarClassRoom(novaClassRoom);
        }
        handleCloseModal();
    };

    return (
        <div className="container classroom-list-container">
            <Typography variant="h4" gutterBottom className="classroom-list-title">
                Turmas
            </Typography>

            <Tabs
                value={activeTab}
                onChange={handleChangeTab}
                aria-label="tabs de classrooms"
                className="classroom-list-tabs"
            >
                {classrooms.map((classroom) => (
                    <Tab
                        key={classroom.id}
                        label={
                            <Box className="classroom-list-tab">
                                {classroom.name}
                                {classroom?.id && (classroom.id > -1) &&
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleOpenMenu(e, classroom.id ?? -1)}
                                        className="classroom-list-settings-icon"
                                    >
                                        <SettingsIcon />
                                    </IconButton>
                                }
                            </Box>
                        }
                    />
                ))}
            </Tabs>

            {activeTab >= 0 && activeTab < classrooms.length && (
                <Box className="classroom-list-student-list">
                    <GradedStudentList classroomId={classrooms[activeTab]?.id ?? -1} mediaGeral={values.mediaGradedStudent} />
                </Box>
            )}

            <Dialog open={openModal} onClose={handleCloseModal} className="classroom-list-dialog">
                <DialogTitle>{editMode ? "Editar Turma" : "Criar Nova Turma"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome da ClassRoom"
                        value={novaClassRoom}
                        onChange={(e) => setNovaClassRoom(e.target.value)}
                        className="classroom-list-textfield"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className="classroom-list-actions">
                    <Button onClick={handleCloseModal} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        {editMode ? "Salvar" : "Criar"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={handleEditClassRoom}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Editar
                </MenuItem>
                <MenuItem onClick={handleDeleteClassRoom}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    Remover
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ClassRoomList;
