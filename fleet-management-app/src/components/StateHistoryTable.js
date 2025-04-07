import { format } from "date-fns";

export default function StateHistoryTable({ stateHistory, textColors }) {
  const formatDate = (dateTime) => format(dateTime, 'dd/MM/yyyy');
  const formatTime = (dateTime) => format(dateTime, 'p');
  
  const thClassName = "p-1.5 bg-gray-50";
  const tdClassName = "p-1.5";

  return (
    <table 
      className="w-full"
    >
      <thead>
        <tr className="border-b border-t border-gray-200">
          <th className={thClassName}>Data</th>
          <th className={thClassName}>Hora</th>
          <th className={thClassName}>Status</th>
        </tr>
      </thead>
      <tbody>
        { stateHistory.map((state) => (
          <tr
            key={state.dateTime}
            className="even:bg-gray-50"
          >
            <td className={tdClassName}>{formatDate(state.dateTime)}</td>
            <td className={tdClassName}>{formatTime(state.dateTime)}</td>
            <td className={`${tdClassName} ${textColors[state.color]}`}>{state.name}</td>
          </tr>
          ))
        }
      </tbody>
    </table> 
  )
}