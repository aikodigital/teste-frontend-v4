import React, { useState } from 'react';
import Map from '../Map';
import { Container, Title, Options } from './styles';

const Body: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedStates((prev) =>
      prev.includes(value) ? prev.filter((state) => state !== value) : [...prev, value]
    );
  };

  return (
    <Container>
      <Title>Status:</Title>
      <Options>
        <label>
          <input
            name="Operando"
            value="Operando"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          Operando
        </label>
        <label>
          <input
            name="Parado"
            value="Parado"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          Parado
        </label>
        <label>
          <input
            name="Manutenção"
            value="Manutenção"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          Manutenção
        </label>
      </Options>
      <Map selectedStates={selectedStates} />
    </Container>
  );
};

export default Body;
