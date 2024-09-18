import React, { useEffect, useState } from 'react';
import './Sidebar.styles.scss';
import Select from 'react-select';
import logo from '../../assets/img/aiko.png';
import { useContextApi } from '../../context/ContextApi';

type IFilterSelect = {
  value: string;
  label: string;
};

interface ISidebar {
  setSearch: (value: string) => void;
  search: string;
  filterSelect: IFilterSelect | null;
  setFilterSelect: (value: IFilterSelect | null) => void;
}

function Sidebar({
  setSearch,
  search,
  filterSelect,
  setFilterSelect,
}: ISidebar) {
  const [isExpanded, setIsExpanded] = useState(true);

  const { equipamentsState } = useContextApi();

  const situations = equipamentsState.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const options = [{ value: 'all', label: 'Todos' }, ...situations];

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: '#cad1db',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#cad1db',
      },
    }),
  };

  useEffect(() => {
    setIsExpanded(true);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelectChange = (selectedOption: IFilterSelect | null) => {
    setFilterSelect(selectedOption);
  };

  return (
    <div className={isExpanded ? 'sidebar expanded' : 'sidebar collapsed'}>
      <div className="container-logo">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="menu-items">
        <input
          className="input"
          type="text"
          placeholder="Pesquisar"
          value={search}
          onChange={handleSearchChange}
        />

        <Select
          className="filter"
          value={filterSelect}
          onChange={handleSelectChange}
          placeholder="Selecione"
          options={options}
          styles={customStyles}
        />
      </div>
    </div>
  );
}

export default Sidebar;
