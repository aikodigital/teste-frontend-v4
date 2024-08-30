export const Filter = ({ states, selectedState, onStateChange }) => {
    return (
      <div className="filter-container">
        <label htmlFor="state-select">Filtrar por Estado: </label>
        <select id="state-select" value={selectedState} onChange={(e) => onStateChange(e.target.value)} className="selectState">
          <option value="">Todos</option>
          {states.map(state => (
            <option key={state.id} value={state.id}>{state.name}</option>
          ))}
        </select>
      </div>
    );
  };