import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TextField,
    Box
} from '@mui/material';
import { styled } from '@mui/system';
import { useGradedStudent } from '../../contexts/GradedStudent';
import { Nota } from '../../types';
import NotaForm from '../Forms/NotaForm';
import StudentForm from '../Forms/StudentForm';
import { useStatistics } from '../../contexts/StatisticsContext';

interface GradedStudentListProps {
    classroomId: number;
    mediaGeral: number;
}

const StyledImage = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
    objectFit: 'cover',
});

const GradedStudentList: React.FC<GradedStudentListProps> = ({ classroomId }) => {
    const { notas, buscarNotas, criarNota, removerNota, editarNota } = useGradedStudent();
    const { values } = useStatistics();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [novoStudent, setNovoStudent] = useState<string>('');
    const [grade, setNota] = useState<number>(0);
    const [frequency, setFrequency] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editingNota, setEditingNota] = useState<Nota | null>(null);

    useEffect(() => {
        buscarNotas(classroomId);
    }, [classroomId]);

    const openEditModal = (grade: Nota) => {
        setEditingNota(grade);
        setNovoStudent(grade.name);
        setNota(grade.grade);
        setFrequency(grade.frequency);
        setImageUrl(grade.image_url);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingNota(null);
        resetForm();
    };

    const resetForm = () => {
        setNovoStudent('');
        setNota(0);
        setFrequency(0);
        setImageUrl('');
    };

    const handleSubmit = async () => {
        if (editingNota) {
            await editarNota({ ...editingNota, grade, frequency });
        } else {
            const notaData: Nota = {
                id: 0,
                studentId: 0,
                classroomId,
                classroomName: '',
                name: novoStudent,
                grade,
                frequency,
                image_url: imageUrl || 'https://via.placeholder.com/50',
            };
            criarNota(classroomId, notaData);
        }
        closeModal();
    };

    // Lógica de Filtro
    const filteredGrades = notas.filter((grade) =>
        grade.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Barra de pesquisa */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                <TextField
                    label="Pesquisar por nome"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                />
            </Box>

            {/* Tabela de notas */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Foto</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Nota</TableCell>
                            <TableCell>Frequência (%)</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredGrades.map((grade) => (
                            <TableRow key={grade.id}>
                                <TableCell>
                                    <StyledImage
                                        src={grade.image_url || 'https://via.placeholder.com/50'}
                                        alt={grade.name}
                                    />
                                </TableCell>
                                <TableCell>{grade.name}</TableCell>
                                <TableCell>
                                    <strong style={{ color: grade.grade > values.mediaGradedStudent ? "#43d669" : 'inherit' }}>
                                        {grade.grade?.toFixed(2) ?? '--'}
                                    </strong>
                                </TableCell>
                                <TableCell>
                                <strong style={{ color: grade.grade < 75 ? "orange" : 'inherit' }}>
                                {grade.frequency?.toFixed(2) ?? '--'}%
                                </strong>
                                </TableCell>
                                <TableCell>
                                    {classroomId > -1 ?
                                        <NotaForm classroomId={classroomId} id={grade.id ?? -1} studentId={grade.studentId} grade={grade} />
                                        : <StudentForm
                                            classroomId={classroomId}
                                            studentId={grade.studentId}
                                            student={{ id: grade.studentId, image_url: grade.image_url, name: grade.name }}
                                        />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default GradedStudentList;
