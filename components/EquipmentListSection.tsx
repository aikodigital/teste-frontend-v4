import React from "react";

interface EquipmentListSectionProps {
    title: string;
    items: string[];
    emptyMessage: string;
}

const EquipmentListSection: React.FC<EquipmentListSectionProps> = ({
    title,
    items,
    emptyMessage,
}) => {
    return (
        <div className="mt-4">
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="max-h-4 overflow-y-auto border p-2 rounded bg-gray-50">
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {items.length > 0 ? (
                        items.map((item, index) => <li key={index}>{item}</li>)
                    ) : (
                        <li className="italic text-gray-400">{emptyMessage}</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default EquipmentListSection;
