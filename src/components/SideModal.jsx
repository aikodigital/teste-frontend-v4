import React from 'react';

const SideModal = ({ showSideModal, setShowSideModal, sideModalEquipment, calculateProductivity, calculateTotalEarnings }) => {
    if (!showSideModal || !sideModalEquipment) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-[99999] bg-black/50 backdrop-blur-md"
            onClick={() => setShowSideModal(false)}
        >
            <div
                className="bg-white p-6 rounded-xl shadow-2xl w-[400px] h-[80vh] overflow-hidden border border-gray-300 relative transition-all transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={() => setShowSideModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold transition-transform transform hover:scale-110"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">{sideModalEquipment.name}</h2>

                <div className="overflow-y-auto max-h-[65vh] space-y-4 px-2">

                    <p className="flex justify-between text-gray-700">
                        <strong className="text-gray-800">Modelo:</strong>
                        <span className="text-gray-600">
                            {sideModalEquipment.model ? sideModalEquipment.model.name : "Desconhecido"}
                        </span>
                    </p>

                    <p className="flex flex-col text-gray-700">
                        <strong className="text-gray-800">Posição:</strong>
                        <span className="text-gray-600">
                            Latitude: {sideModalEquipment.position.lat}, Longitude: {sideModalEquipment.position.lon}
                        </span>
                    </p>

                    <div className="flex justify-between items-center">
                        <strong className="text-gray-800">Estado Atual:</strong>
                        <span
                            className={`text-lg font-medium ${sideModalEquipment.stateHistory.length
                                ? sideModalEquipment.stateHistory[0].stateInfo?.name === "Operando"
                                    ? "text-green-500"
                                    : sideModalEquipment.stateHistory[0].stateInfo?.name === "Manutenção"
                                        ? "text-red-500"
                                        : sideModalEquipment.stateHistory[0].stateInfo?.name === "Parado"
                                            ? "text-yellow-500"
                                            : "text-gray-500"
                                : "text-gray-500"
                                }`}
                        >
                            {sideModalEquipment.stateHistory.length ? sideModalEquipment.stateHistory[0].stateInfo?.name : "Desconhecido"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <strong className="text-gray-800">Produtividade:</strong>
                        <span className="text-gray-600">
                            {calculateProductivity(sideModalEquipment, sideModalEquipment.stateHistory)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <strong className="text-gray-800">Ganho Total:</strong>
                        <span className="text-gray-600">
                            {calculateTotalEarnings(sideModalEquipment, sideModalEquipment.stateHistory, sideModalEquipment.model)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideModal;
