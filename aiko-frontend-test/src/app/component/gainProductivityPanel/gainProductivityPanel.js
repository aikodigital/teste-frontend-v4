import { useEquipmentsContext } from "@/app/context/equipmentsContext"
import styles from './gainProductivityPanel.module.css';


export default function GainProductivityPanel() {
    const { gainProductivity } = useEquipmentsContext();
    console.log(gainProductivity)
    return (
        <>
            {gainProductivity && <div className={styles.main}>

            </div>}
        </>
    )
}