import { useEquipmentsContext } from "@/app/context/equipmentsContext"
import styles from './gainProductivityPanel.module.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function GainProductivityPanel() {
    const { gainProductivity } = useEquipmentsContext();
    const [productivity, setProductivity] = useState();
    const [gains, setGains] = useState();
    const equipmentModel = useSelector((state) => state.equipmentModel.data);
    useEffect(() => {
        if (gainProductivity) {
            const operating = gainProductivity.hoursStates.find((state) => state.id == "0808344c-454b-4c36-89e8-d7687e692d57")
            setProductivity((operating.hours * 100) / gainProductivity.totalHour)

            gainCalculator();
        }

    }, [gainProductivity])

    const gainCalculator = () => {
        const operatingTime = gainProductivity.hoursStates.find((state) => state.id == "0808344c-454b-4c36-89e8-d7687e692d57");
        const stoppedTime = gainProductivity.hoursStates.find((state) => state.id == "baff9783-84e8-4e01-874b-6fd743b875ad");
        const maintenanceTime = gainProductivity.hoursStates.find((state) => state.id == "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f");
        const equipmentModelDetails = equipmentModel.find(e => e.id === gainProductivity.equipmentModelId);

        const operatingValue = equipmentModelDetails.hourlyEarnings.find(e =>
            e.equipmentStateId === "0808344c-454b-4c36-89e8-d7687e692d57"
        )?.value * operatingTime.hours;

        const stoppedValue = equipmentModelDetails.hourlyEarnings.find(e =>
            e.equipmentStateId === "baff9783-84e8-4e01-874b-6fd743b875ad"
        )?.value * stoppedTime.hours;

        const maintenanceValue = equipmentModelDetails.hourlyEarnings.find(e =>
            e.equipmentStateId === "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
        )?.value * maintenanceTime.hours;

        setGains(operatingValue + stoppedValue + maintenanceValue)
    }
    return (
        <>
            {gainProductivity && <div className={styles.main}>
                <div>
                    <strong>Produtividade: </strong>
                    <span>
                        {`${productivity?.toFixed(2)} %`}
                    </span>
                </div>
                <div>
                    <strong>Ganhos: </strong>
                    <span>
                        {gains}
                    </span>
                </div>
            </div>}
        </>
    )
}