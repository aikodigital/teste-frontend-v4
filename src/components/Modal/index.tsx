import { IEquipamentView } from '@/interface/equipament';
import { converterDate } from '../../hooks/converter';
import styles from './styles.module.css';

interface IModal {
    data: IEquipamentView;
    handleClose: () => void;
}

export function Modal({ data, handleClose }: IModal) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <p className={styles.title}>{data.name}</p>
                    <button className={styles.button} onClick={handleClose}>
                        <p className={styles.buttonText}>X</p>
                    </button>
                </div>
                <div className={styles.headerBottom} style={{ backgroundColor: data.lastState.color }} >
                    <p>{data.lastState.name}</p>
                </div>
            </div>
            <div className={styles.content}>
                {data.stateHistory.map((item, index) => {
                    return (
                        <div key={index} style={{ backgroundColor: item.state?.color }} className={styles.contentHistory}>
                            <p className={styles.text}>{converterDate(item.date)}</p>
                            <p className={styles.text}>{item.state?.name}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}