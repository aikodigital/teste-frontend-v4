import { useContext } from "react"
import { modeloContext } from "../../context/ModeloContext"

function Header() {
  const { modelo } = useContext(modeloContext);
  console.log(modelo);
  
  
  const handleOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
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