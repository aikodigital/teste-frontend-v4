import { FC } from 'react';

interface StatCardProps {
    label: string;
    value: number;
    color: string;
    bgColorClass: string;
}

const StatCard: FC<StatCardProps> = ({ label, value, color, bgColorClass }) => {
    return (
        <div className={`flex-1 bg-gradient-to-r ${bgColorClass} rounded-md px-3 py-1.5`}>
            <div className="flex items-center">
                <div 
                    className="w-2 h-2 rounded-full mr-1.5" 
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                ></div>
                <span className="text-xs text-gray-700">{label}:</span>
                <span 
                    className="text-sm font-bold ml-1" 
                    style={{ color }}
                    aria-label={`${value} equipamentos ${label.toLowerCase()}`}
                >
                    {value}
                </span>
            </div>
        </div>
    );
};

export default StatCard;