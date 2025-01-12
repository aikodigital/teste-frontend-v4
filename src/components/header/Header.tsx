import { useContext } from "react"
import { modeloContext, modeloEquipament, position } from "../../context/ModeloContext"

function Header() {
  const { modelo } = useContext(modeloContext);
  const { positions } = useContext(position);
  const { equipamentoId, setEquipamentoId } = useContext(modeloEquipament);
  
  console.log(equipamentoId);
  

  const handleOption = (
    event: React.ChangeEvent<HTMLSelectElement>,
    key: keyof typeof equipamentoId
  ) => {
    setEquipamentoId({
      ...equipamentoId,
      [key]: event.target.value
    })
  }
  
  return (
    <header>
        <img src="../../img/aiko.png" alt="logo" />
        <nav>
          <label htmlFor="modelos">
            Modelo do Equipamento:
            {' '}
          <select
            name="modelos"
            id="modelos"
            // value={equipamentoId.modelEquipment}
            onChange={(e) => handleOption(e, "modelEquipment")}
            >
            
            {modelo.map((model) => (
              <option 
                key={model.id} 
                value={model.name}
                >
                  {model.name}
                </option>
            ))}
          </select>
          </label>
          <label htmlFor="date">
            History date:
            {' '}
            <select
             name="date" 
             id="date"
            //  value={equipamentoId.datePosition}
             onChange={(e) => handleOption(e, 'datePosition')}
            >
              {positions[2].positions.map((dates, index) => (
                <option
                  key={index}
                  value={dates.date}
                >
                  {dates.date}
                </option>
              ))}
            </select>
          </label>
        </nav>
    </header>
  )
}

export default Header