import { useRef, useState } from "react";
import * as S from "./style";

const FiltersSection = ({
  nameHandler,
  status,
  statusHandler,
  model,
  modelHandler,
  modelMap,
  statusMap,
}) => {
  const [textName, setTextName] = useState("");
  const nameRef = useRef();

  const clearTextField = () => {
    setTextName("");
    nameHandler("");
  };

  const clearAllFilters = () => {
    clearTextField();
    modelHandler(-1);
    statusHandler(-1);
  };

  const searchForText = e => {
    e.preventDefault();
    nameHandler(nameRef.current.value);
  };

  return (
    <S.Filters>
      <form onSubmit={searchForText}>
        <S.TextBox>
          <input
            id="search_input"
            type="text"
            placeholder="Buscar equipamento..."
            value={textName}
            onChange={e => setTextName(e.target.value)}
            ref={nameRef}
          />
          <button
            type="submit"
            onClick={() => nameHandler(nameRef.current.value)}
          >
            <span className="material-symbols-rounded">search</span>
          </button>
          <button type="button" onClick={clearTextField}>
            <span className="material-symbols-rounded">close</span>
          </button>
        </S.TextBox>
      </form>

      <S.Select value={model} onChange={e => modelHandler(e.target.value)}>
        <option value={-1}>Filtrar por modelo...</option>
        {Array.from(modelMap).map((model, i) => (
          <option key={i} value={i}>
            {model[1].name}
          </option>
        ))}
      </S.Select>

      <S.Select value={status} onChange={e => statusHandler(e.target.value)}>
        <option value={-1}>Filtrar por estado...</option>
        {Array.from(statusMap).map((status, i) => (
          <option key={i} value={i}>
            {status[1].name}
          </option>
        ))}
      </S.Select>

      <S.Clear type="button" onClick={clearAllFilters}>
        Limpar filtros
      </S.Clear>
    </S.Filters>
  );
};

export default FiltersSection;
