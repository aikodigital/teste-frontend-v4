import Search from './Search';
import PropTypes from 'prop-types';

export default function Header({ onSearch }) {
  const handleSearch = (searchTerm) => {
    onSearch(searchTerm);
  };

  return (
    <header className="bg-slate-100 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Search onSearch={handleSearch} />
      </div>
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
