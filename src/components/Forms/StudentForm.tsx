import React, { useState } from 'react';
import { Student } from '../../types';
import {
    TextField,
    Button,
    Modal,
    Box,
    Typography,
} from '@mui/material';
import { useStudent } from '../../contexts/StudentContext';
import EditStudentModal from '../Modal/EditStudentModal';

interface StudentFormProps {
    student?: Student;
    classroomId: number;
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

const StudentForm: React.FC<StudentFormProps> = ({ student, classroomId, studentId }) => {
    const { criarStudent, editarStudent, removerStudent, buscarStudents } = useStudent();
    const [name, setNome] = useState<string>(student ? student.name : '');
    const [imageUrl, setImageUrl] = useState<string>(student ? student.image_url : '');
    const [showModal, setShowModal] = useState<boolean>(false);

    const openEditModal = () => {
        if (student) {
            setNome(student.name);
            setImageUrl(student.image_url);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const resetForm = () => {
        setNome('')
        setImageUrl('');
    };



    const handleSubmit = async () => {
        if (student || (studentId > 0)) {
            await editarStudent({ id: studentId, name, image_url: imageUrl });
        } else {
            await criarStudent({ id: Date.now(), name, image_url: imageUrl });
        }
        buscarStudents(classroomId);
    };

    const handleRemove = async () => {
        if (student?.id) {
            await removerStudent(student.id);
        }
        buscarStudents(classroomId);
    };

    if (!student) return <></>;
    return (
        <EditStudentModal student={student} />
    );
};

export default StudentForm;
