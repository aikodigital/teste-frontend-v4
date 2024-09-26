import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Classroom } from '../types';

interface ClassRoomContextProps {
    classrooms: Classroom[];
    criarClassRoom: (name: string) => Promise<void>;
    editarClassRoom: (id: number, name: string) => Promise<void>;
    removerClassRoom: (id: number) => Promise<void>;
    buscarClassRooms: () => Promise<void>;
}

const ClassRoomContext = createContext<ClassRoomContextProps | undefined>(undefined);

export const useClassRoom = () => {
    const context = useContext(ClassRoomContext);
    if (!context) {
        throw new Error('useClassRoom must be used within a ClassRoomProvider');
    }
    return context;
};

export const ClassRoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [classrooms, setClassRooms] = useState<Classroom[]>([]);

    const buscarClassRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/classrooms/ListarClassRooms');
            if (Array.isArray(response.data?.data)) {
                setClassRooms(response.data.data);
            } else {
                console.warn('Formato de resposta inesperado ao buscar classrooms:', response.data);
                setClassRooms([]);
            }
        } catch (error) {
            console.error('Erro ao buscar classrooms:', error);
            setClassRooms([]);
        }
    };

    const criarClassRoom = async (name: string) => {
        try {
            const response = await axios.post('http://localhost:5000/api/classrooms', { name });
            setClassRooms((prev) => [...prev, response.data]);
            console.log('Classroom criada com sucesso!', response.data);
        } catch (error) {
            console.error('Erro ao criar classroom:', error);
        }
    };

    const editarClassRoom = async (id: number, name: string) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/classrooms/${id}`, { name });
            setClassRooms((prev) =>
                prev.map((classroom) => (classroom.id === id ? response.data : classroom))
            );
            console.log('Classroom atualizada com sucesso!', response.data);
        } catch (error) {
            console.error('Erro ao editar classroom:', error);
        }
    };

    const removerClassRoom = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/classrooms/${id}`);
            setClassRooms((prev) => prev.filter((classroom) => classroom.id !== id));
            console.log('Classroom removida com sucesso!');
        } catch (error) {
            console.error('Erro ao remover classroom:', error);
        }
    };

    useEffect(() => {
        buscarClassRooms();
    }, []);

    return (
        <ClassRoomContext.Provider value={{ classrooms, criarClassRoom, editarClassRoom, removerClassRoom, buscarClassRooms }}>
            {children}
        </ClassRoomContext.Provider>
    );
};