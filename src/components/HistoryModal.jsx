import React from 'react';

const HistoryModal = ({ showModal, setShowModal, selectedEquipment }) => {
    if (!showModal || !selectedEquipment) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-[99999]">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full h-[85vh] overflow-hidden border-4 border-gray-300 relative">
                <h2 className="text-2xl font-bold mb-6 text-center">{selectedEquipment.name} - Histórico de Posições</h2>

                {/* Conteúdo com a tabela rolável */}
                <div className="overflow-y-auto max-h-[65vh] mb-6">
                    <table className="min-w-full table-auto">
                        <thead className="sticky top-0 bg-white border-b">
                            <tr>
                                <th className="px-4 py-2 text-left text-lg">Data</th>
                                <th className="px-4 py-2 text-left text-lg">Status</th>
                                <th className="px-4 py-2 text-left text-lg">Duração</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedEquipment.stateHistory.length > 0 ? (
                                selectedEquipment.stateHistory.map((entry, index) => {
                                    const previousEntry = selectedEquipment.stateHistory[index - 1];
                                    let duration = "N/A";

                                    // Para o primeiro item (sem estado anterior), calculamos a duração até o próximo estado
                                    if (previousEntry) {
                                        const diffInMs = new Date(entry.date) - new Date(previousEntry.date);
                                        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                                        const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
                                        duration = `${diffInHours}h ${diffInMinutes}m`;
                                    } else {
                                        // Se for o primeiro item, durações até o próximo estado ou até o momento atual
                                        const nextEntry = selectedEquipment.stateHistory[index + 1];

                                        if (nextEntry) {
                                            const diffInMs = new Date(nextEntry.date) - new Date(entry.date);
                                            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                                            const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
                                            duration = `${diffInHours}h ${diffInMinutes}m`;
                                        }
                                    }

                                    return (
                                        <tr key={index} className="border-b">
                                            <td className="px-4 py-2 text-sm">{new Date(entry.date).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-sm flex items-center">
                                                {/* Bolinha colorida dependendo do estado */}
                                                <span
                                                    className={`w-3 h-3 rounded-full mr-2 ${entry.stateInfo?.name === "Operando"
                                                        ? "bg-green-500"
                                                        : entry.stateInfo?.name === "Manutenção"
                                                            ? "bg-red-500"
                                                            : entry.stateInfo?.name === "Parado"
                                                                ? "bg-yellow-500"
                                                                : "bg-gray-400"
                                                        }`}
                                                ></span>
                                                {entry.stateInfo?.name || "Desconhecido"}
                                            </td>
                                            <td className="px-4 py-2 text-sm">{duration}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-4 py-2 text-center text-gray-500 text-sm">Nenhum histórico de estado disponível.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Seção fixa para o botão de fechar */}
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300">
                    <button
                        onClick={() => setShowModal(false)}
                        className="w-full bg-red-500 text-white py-2 text-lg rounded-lg hover:bg-red-600 transition-all cursor-pointer"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryModal;
