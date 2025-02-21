import PropTypes from 'prop-types';

const Filtro = ({ stateFilters, setStateFilters }) => {
  const handleCheckboxChange = (key) => {
    setStateFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex space-x-6 justify-center items-center">
      <label className="flex items-center space-x-1">
        <input
          type="checkbox"
          checked={stateFilters.operando}
          onChange={() => handleCheckboxChange('operando')}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="text-sm">Operando</span>
      </label>
      <label className="flex items-center space-x-1">
        <input
          type="checkbox"
          checked={stateFilters.parado}
          onChange={() => handleCheckboxChange('parado')}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="text-sm">Parado</span>
      </label>
      <label className="flex items-center space-x-1">
        <input
          type="checkbox"
          checked={stateFilters.manutencao}
          onChange={() => handleCheckboxChange('manutencao')}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="text-sm">Manutenção</span>
      </label>
    </div>
  );
};

Filtro.propTypes = {
  stateFilters: PropTypes.shape({
    operando: PropTypes.bool.isRequired,
    parado: PropTypes.bool.isRequired,
    manutencao: PropTypes.bool.isRequired,
  }).isRequired,
  setStateFilters: PropTypes.func.isRequired,
};

export default Filtro;
