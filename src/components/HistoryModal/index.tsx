import './styles.css'

import { Modal } from '@mui/material'

import { dateFormatter } from '../../utils/date-formatter'

interface HistoryModalProps {
  open: boolean
  handleClose: () => void
  fullStateHistory: {
    equipmentState:
      | {
          id: string
          name: string
          color: string
        }
      | undefined
    date: string
    equipmentStateId: string
  }[]
  equipmentName: string
}

function HistoryModal({
  open,
  handleClose,
  fullStateHistory,
  equipmentName,
}: HistoryModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-box">
        <h2>Histórico de estado - {equipmentName}</h2>
        <table className="history-table ">
          <thead>
            <tr>
              <th></th>
              <th>Data</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {fullStateHistory?.map((item) => (
              <tr key={item.date}>
                <td>
                  <div
                    className="status-dot"
                    style={{
                      backgroundColor: item.equipmentState?.color,
                    }}
                  />
                </td>
                <td>{dateFormatter(item.date)}</td>
                <td>{item.equipmentState?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {fullStateHistory?.map((item) => (
          <div key={item.date} className="history-item">
            
            <span>{dateFormatter(item.date)}</span>
            <span>{item.equipmentState?.name}</span>
          </div>
        ))} */}
      </div>
    </Modal>
  )
}

export default HistoryModal
