import PropTypes from 'prop-types';

const Busca = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        placeholder="Pesquisar por equipamento"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-400 p-2 w-64 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

Busca.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Busca;
