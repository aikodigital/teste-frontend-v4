import { useContext } from "react"
import { modeloContext, modeloEquipament } from "../../context/ModeloContext"

function Header() {
  const { modelo } = useContext(modeloContext);
  const { setEquipamentoId } = useContext(modeloEquipament);
  
  const handleOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEquipamentoId(event.target.value);
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
            onChange={handleOption}
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
        </nav>
    </header>
  )
}

export default Header