import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search equipment..."
        className="bg-slate-100 p-3 rounded-lg mr-3"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
