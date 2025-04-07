import { useEquipment } from "../hooks/useEquipment"
import { useEffect, useState, useMemo, FC } from "react";
import TableHeader from "./table/TableHeader";
import EquipmentRow from "./table/EquipmentRow";
import LoadingState from "./common/LoadingState";
import ErrorState from "./common/ErrorState";


const EquipmentTable: FC = () => {
    // Obtém dados e funções do contexto global de equipamentos
    const {
        filteredEquipment,
        equipmentModels,
        equipmentStates,
        getEquipmentName,
        selectedDate,
        getEquipmentStateAtDate,
        loading,
        error,
        openEquipmentHistory,
        selectedEquipmentId
    } = useEquipment();

    // Estados para controlar a animação de fade-out antes de remover o componente da DOM
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    // Implementa transição suave ao alternar entre tabela e detalhes do equipamento
    useEffect(() => {
        if (selectedEquipmentId) {
            // Primeiro torna invisível (fade-out) e depois remove da DOM para animação suave
            setIsVisible(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 300); // Tempo sincronizado com a duração da transição CSS
            return () => clearTimeout(timer);
        } else {
            // Primeiro adiciona à DOM (invisível) e depois torna visível (fade-in)
            setShouldRender(true);
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 50); // Pequeno delay para garantir que o DOM foi atualizado
            return () => clearTimeout(timer);
        }
    }, [selectedEquipmentId]);

    // Processa os dados brutos em formato adequado para a tabela
    // Usa memoização para evitar recálculos desnecessários durante renderizações
    const tableData = useMemo(() => {
        if (loading || error) return [];

        return filteredEquipment.map(eq => {
            const model = equipmentModels.find(m => m.id === eq.equipmentModelId);
            const stateId = getEquipmentStateAtDate(eq.id, selectedDate);
            const stateInfo = stateId ? equipmentStates.find(s => s.id === stateId) : null;
        
            return {
                id: eq.id,
                name: getEquipmentName(eq.id),
                type: model?.name || 'Desconhecido',
                state: stateInfo?.name || 'Desconhecido',
                stateColor: stateInfo?.color || '#999', // Cor padrão para estados desconhecidos
            };
        });
    }, [
        loading, 
        error,
        filteredEquipment, 
        equipmentModels, 
        equipmentStates, 
        getEquipmentName, 
        selectedDate, 
        getEquipmentStateAtDate
    ]);

    // Renderização condicional para estados de carregamento e erro
    if (loading) {
        return <LoadingState message="Carregando..." />;
    }

    if (error) {
        return <ErrorState message={`Erro ao carregar dados: ${error}`} />;
    }

    // Evita renderização quando o componente deve estar oculto
    if (!shouldRender) return null;

    // Define classes CSS para animação de fade baseada no estado de visibilidade
    const fadeClass = isVisible 
        ? "opacity-100 transition-opacity duration-300 ease-in" 
        : "opacity-0 transition-opacity duration-300 ease-out";

    return (
        <div className={`bg-white rounded-lg shadow-sm p-3 ${fadeClass}`}>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-medium text-gray-600">
                    Lista de Equipamentos
                </h2>
            </div>
            <div className="overflow-x-auto rounded-md border border-gray-100">
                <table className="min-w-full divide-y divide-gray-100" aria-label="Lista de equipamentos">
                    <TableHeader />
                    <tbody className="bg-white divide-y divide-gray-50">
                        {tableData.map((item) => (
                            <EquipmentRow 
                                key={item.id}
                                equipment={item}
                                onSelect={openEquipmentHistory}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EquipmentTable;