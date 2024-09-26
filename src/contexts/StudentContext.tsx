import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { Student } from '../types';

interface StudentContextProps {
    students: Student[];
    buscarStudents: (classroomId: number) => void;
    criarStudent: (student: Student) => void;
    editarStudent: (student: Student) => void;
    removerStudent: (id: number) => void;
}

const StudentContext = createContext<StudentContextProps | undefined>(undefined);

export const useStudent = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudent must be used within an StudentProvider');
    }
    return context;
};

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [students, setStudents] = useState<Student[]>([]);

    const buscarStudents = async (classroomId: number) => {
        try {
            let response;
            if (classroomId === -1) {
                response = await axios.get(`http://localhost:5000/api/students/ListarMediaGradedStudentsFrequency`);
            } else {
                response = await axios.get(`http://localhost:5000/api/classrooms/${classroomId}/ListarStudents`);
            }

            if (response.data && response.data.data) {
                setStudents(response.data.data);
            } else {
                console.warn('Formato de resposta inesperado ao buscar students:', response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar students:', error);
        }
    };

    const criarStudent = async (student: Student) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/students`, student);
            if (response.data && response.data.data) {
                setStudents((prev) => [...prev, response.data.data]);
            } else {
                console.warn('Formato de resposta inesperado ao criar student:', response.data);
            }
        } catch (error) {
            console.error('Erro ao criar student:', error);
        }
    };

    const editarStudent = async (student: Student) => {
        try {
            console.log(student);
            const response = await axios.put(`http://localhost:5000/api/students/${student.id}`, student);
            if (response.data && response.data.data) {
                setStudents((prev) =>
                    prev.map((a) => (a.id === student.id ? response.data.data : a))
                );
            } else {
                console.warn('Formato de resposta inesperado ao editar student:', response.data);
            }
        } catch (error) {
            console.error('Erro ao editar student:', error);
        }
    };

    const removerStudent = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/students/DeletarStudent/${id}`);
            if (response.data && response.data.data) {
                setStudents((prev) => prev.filter((student) => student.id !== id));
            } else {
                console.warn('Formato de resposta inesperado ao remover student:', response.data);
            }
        } catch (error) {
            console.error('Erro ao remover student:', error);
        }
    };

    return (
        <StudentContext.Provider value={{ students, buscarStudents, criarStudent, editarStudent, removerStudent }}>
            {children}
        </StudentContext.Provider>
    );
};
