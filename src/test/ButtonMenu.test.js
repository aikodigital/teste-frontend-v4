import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ButtonMenu } from '../components/ButtonMenu';


test('renders button menu correctly', () => {
  const title = 'Menu Button';
  const onClick = jest.fn();
  const icon = 'path/to/icon.png';

  const { getByText, getByAltText } = render(
    <ButtonMenu title={title} onClick={onClick} icon={icon} />
  );

  const buttonElement = getByText(title);
  expect(buttonElement).toBeInTheDocument();

  const iconElement = getByAltText('Button Icon');
  expect(iconElement).toBeInTheDocument();

  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalled();
});
