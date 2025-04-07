import EquipmentItem from "./EquipmentItem";
import { motion, AnimatePresence } from 'framer-motion';
import { useContext} from 'react'
import EquipmentContext from "../context/EquipmentContext";
import Spinner from './shared/Spinner'

function EquipmentList() {
    const { equipment, isLoading } = useContext(EquipmentContext)

    if(!isLoading && (!equipment || equipment.length === 0)) {
        return <p>No equipment yet</p>
    }

    return isLoading? ( <Spinner/> ) : 
        (
            <div className="equipment-list">
                <AnimatePresence>
                    {equipment.map((item) => (
                        <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <EquipmentItem key={item.id} item={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        )
}

export default EquipmentList;