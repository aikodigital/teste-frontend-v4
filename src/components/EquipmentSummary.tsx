
import { useEquipment } from "../hooks/useEquipment";
import { useMemo, FC } from "react";
import StatCard from "./summary/StatCard";
import { FadeContainer } from "./common/FadeContainer";
import LoadingState from "./common/LoadingState";
import ErrorState from "./common/ErrorState";

// Constantes para IDs de estado para facilitar manutenção e evitar erros de digitação
const EQUIPMENT_STATES = {
  OPERATING: "0808344c-454b-4c36-89e8-d7687e692d57",
  STOPPED: "baff9783-84e8-4e01-874b-6fd743b875ad",
  MAINTENANCE: "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
};

const EquipmentSummary: FC = () => {
    // Obtém dados e funções do contexto global de equipamentos
    const { 
        filteredEquipment, 
        selectedDate, 
        getEquipmentStateAtDate, 
        loading, 
        error,
        selectedEquipmentId
    } = useEquipment();

    // Calcula estatísticas apenas quando os dados relevantes mudam
    // Evita recálculos desnecessários durante renderizações
    const equipmentStats = useMemo(() => {
        if (loading || error) return { total: 0, operating: 0, stopped: 0, maintenance: 0 };

        const total = filteredEquipment.length;
        // Filtra equipamentos por estado na data selecionada para mostrar métricas atualizadas
        const operating = filteredEquipment.filter(
            eq => getEquipmentStateAtDate(eq.id, selectedDate) === EQUIPMENT_STATES.OPERATING
        ).length;
        const stopped = filteredEquipment.filter(
            eq => getEquipmentStateAtDate(eq.id, selectedDate) === EQUIPMENT_STATES.STOPPED
        ).length;
        const maintenance = filteredEquipment.filter(
            eq => getEquipmentStateAtDate(eq.id, selectedDate) === EQUIPMENT_STATES.MAINTENANCE
        ).length;

        return { total, operating, stopped, maintenance };
    }, [filteredEquipment, selectedDate, getEquipmentStateAtDate, loading, error]);

    // Renderização condicional para estados de carregamento e erro
    // Fornece feedback visual ao usuário enquanto os dados são carregados
    if (loading) return <LoadingState message="Carregando..." />;
    if (error) return <ErrorState message={`Erro ao carregar dados: ${error}`} />;

    return (
        // Oculta o resumo quando um equipamento específico é selecionado
        // Usa animação de fade para transição suave entre visualizações
        <FadeContainer isVisible={!selectedEquipmentId}>
            <div className="bg-white rounded-lg shadow-sm p-3">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-medium text-gray-600">Resumo de Equipamentos</h2>
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                        Total: {equipmentStats.total}
                    </span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    {/* Cards de estatísticas com esquema de cores consistente para facilitar identificação visual */}
                    <div className="flex-1 min-w-[120px] basis-0">
                        <StatCard 
                            label="Operando"
                            value={equipmentStats.operating}
                            color="#2ecc71"
                            bgColorClass="from-green-50 to-green-100"
                        />
                    </div>
                    
                    <div className="flex-1 min-w-[120px] basis-0">
                        <StatCard 
                            label="Parados"
                            value={equipmentStats.stopped}
                            color="#f1c40f"
                            bgColorClass="from-yellow-50 to-yellow-100"
                        />
                    </div>
                    
                    <div className="flex-1 min-w-[120px] basis-0 xl:w-auto">
                        <StatCard 
                            label="Manutenção"
                            value={equipmentStats.maintenance}
                            color="#e74c3c"
                            bgColorClass="from-red-50 to-red-100"
                        />
                    </div>
                </div>
            </div>
        </FadeContainer>
    );
};

export default EquipmentSummary;