import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Nota } from '../types';

interface GradedStudentContextProps {
    notas: Nota[];
    buscarNotas: (classroomId: number) => void;
    criarNota: (classroomId: number, grade: Nota) => void;
    editarNota: (grade: Nota) => void;
    removerNota: (id: number) => void;
}

const GradedStudentContext = createContext<GradedStudentContextProps | undefined>(undefined);

export const useGradedStudent = () => {
    const context = useContext(GradedStudentContext);
    if (!context) {
        throw new Error('useGradedStudent must be used within an GradedStudentProvider');
    }
    return context;
};

export const GradedStudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notas, setNotas] = useState<Nota[]>([]);

    const buscarNotas = async (classroomId: number) => {
        try {
            setNotas([])
            let response;
            if (classroomId === -1) {
                response = await axios.get(`http://localhost:5000/api/students/ListarMediaGradedStudentsFrequency`);
            } else {
                response = await axios.get(`http://localhost:5000/api/classrooms/${classroomId}/ListarStudents`);
            }
            setNotas(response.data.data || [])
        } catch (error) {
            console.error('Erro ao buscar notas:', error);
        }
    };

    const criarNota = async (classroomId: number, grade: Nota) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/classrooms/${classroomId}/Notas`, grade);
            setNotas((prev) => [...prev, response.data.data]);
        } catch (error) {
            console.error('Erro ao criar grade:', error);
        }
    };

    const editarNota = async (grade: Nota) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/classrooms/${grade.classroomId}/Notas/${grade.id}`, grade);
            setNotas((prev) =>
                prev.map((n) => (n.id === grade.id ? response.data.data : n))
            );
        } catch (error) {
            console.error('Erro ao editar grade:', error);
        }
    };

    const removerNota = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/classrooms/notas/${id}`);
            setNotas((prev) => prev.filter((grade) => grade.id !== id));
        } catch (error) {
            console.error('Erro ao remover grade:', error);
        }
    };

    return (
        <GradedStudentContext.Provider value={{ notas, buscarNotas, criarNota, editarNota, removerNota }}>
            {children}
        </GradedStudentContext.Provider>
    );
};
