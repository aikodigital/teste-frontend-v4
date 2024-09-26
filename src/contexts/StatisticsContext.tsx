import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type CardsResumeValues = {
  mediaGradedStudent: number;
  mediaFrequency: number;
  totalStudents: number;
  mediaPorClassRoom: {
    classroomId: number;
    classroomName: string;
    mediaGradedStudent: number;
    mediaFrequency: number;
  }[];
};

type StatisticsContextType = {
  values: CardsResumeValues;
};

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [values, setValues] = useState<CardsResumeValues>({ mediaGradedStudent: 0, mediaFrequency: 0, totalStudents: 0, mediaPorClassRoom: [] });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/classrooms/statistics`);
        
        if (response.data && response.data.data) {
          setValues(response.data.data);
        } else {
          console.warn('Formato de resposta inesperado ao buscar estatísticas:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <StatisticsContext.Provider value={{ values }}>
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
};
