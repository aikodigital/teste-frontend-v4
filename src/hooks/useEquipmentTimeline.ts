import { useState, useCallback } from 'react';
import { DATE_LIMITS } from '../constants/dateConstants';

export function useEquipmentTimeline() {
    const [selectedDate, setSelectedDate] = useState<Date>(() => new Date(DATE_LIMITS.END));
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

    const updateSelectedDate = useCallback((date: Date): void => {
        setSelectedDate(date);
    }, []);

    const advanceTime = useCallback((hours: number): void => {
        const newDate = new Date(selectedDate);
        newDate.setHours(newDate.getHours() + hours);
        
        const maxDate = new Date(DATE_LIMITS.END);
        const minDate = new Date(DATE_LIMITS.START);
        
        if (newDate > maxDate) {
            setSelectedDate(maxDate);
        } else if (newDate < minDate) {
            setSelectedDate(minDate);
        } else {
            setSelectedDate(newDate);
        }
    }, [selectedDate]);

    const jumpToTime = useCallback((
        timePoint: 'start' | 'end' | 'specific', 
        specificDate?: Date
    ): void => {
        if (timePoint === 'start') {
            setSelectedDate(new Date(DATE_LIMITS.START));
        } else if (timePoint === 'end') {
            setSelectedDate(new Date(DATE_LIMITS.END));
        } else if (timePoint === 'specific' && specificDate) {
            setSelectedDate(specificDate);
        }
    }, []);

    const openEquipmentHistory = useCallback((equipmentId: string): void => {
        setSelectedEquipmentId(equipmentId);
    }, []);

    const closeEquipmentHistory = useCallback((): void => {
        setSelectedEquipmentId(null);
    }, []);

    return {
        selectedDate,
        selectedEquipmentId,
        updateSelectedDate,
        advanceTime,
        jumpToTime,
        openEquipmentHistory,
        closeEquipmentHistory
    };
}